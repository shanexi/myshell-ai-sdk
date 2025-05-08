#!/usr/bin/env node

/**
 * Tailwind CSS Variable Updater
 *
 * This script adds a version suffix to CSS variables in Tailwind theme configuration
 * and updates corresponding class names in TSX/JSX files.
 *
 * Features:
 * - Adds suffix to CSS variables in the Tailwind theme file
 * - Updates CSS variable references in values
 * - Updates class names in TSX/JSX files to match the new variable names
 * - Supports multiple CSS variable types (radius, color, spacing, etc.)
 * - Handles different class name patterns for each variable type
 * - Dry run mode to preview changes without modifying files
 * - Verbose mode to show detailed changes
 * - Supports diff view to see exactly what would change
 *
 * Usage:
 *   node update-tailwind-vars.js [options] <directory1> <directory2> ...
 *
 * Options:
 *   --dry-run, -d      Preview changes without modifying files
 *   --suffix TEXT      Specify a custom suffix (default: -v1)
 *   --help, -h         Show this help message
 *   --skip-backup      Skip creating a backup of the CSS file
 *   --verbose, -v      Display more detailed output
 *   --css-file PATH    Specify the path to the CSS file (default: ../libs/tailwind-cfg/styles.css)
 *
 * Example:
 *   node update-tailwind-vars.js --dry-run libs/biz/ui
 *   node update-tailwind-vars.js --suffix -v2 libs/biz/ui apps/chat
 *   node update-tailwind-vars.js --css-file ../libs/agent/ui/src/styles.css libs/biz/ui
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * CSS 变量和 Tailwind CSS 类名映射关系
 * 该对象定义了各种 CSS 变量命名空间与对应生成的 Tailwind CSS 类名前缀的映射
 */
const CSS_VAR_CLASS_MAPPINGS = {
  // 边框圆角 - Border radius
  '--radius-': 'rounded',

  // 颜色相关
  '--color-': [
    'bg',
    'text',
    'border',
    'fill',
    'stroke',
    'accent',
    'caret',
    'outline',
    'ring',
    'shadow',
    'decoration',
  ],

  // 字体相关
  '--font-': 'font',
  '--font-weight-': 'font',
  '--text-': 'text', // 字体大小
  '--tracking-': 'tracking', // 字符间距
  '--leading-': 'leading', // 行高

  // 间距与尺寸 - 细分为独立的边距映射更容易精确处理
  '--spacing-': [
    'gap',
    'space',
    'w',
    'h',
    'min-w',
    'min-h',
    'max-w',
    'max-h',
    // 边距相关
    'm',
    'mt',
    'mr',
    'mb',
    'ml',
    'mx',
    'my',
    // 内边距相关
    'p',
    'pt',
    'pr',
    'pb',
    'pl',
    'px',
    'py',
    // 定位相关
    'top',
    'right',
    'bottom',
    'left',
    'inset',
    'inset-x',
    'inset-y',
    // 间隙相关
    'gap-x',
    'gap-y',
  ],

  // 阴影相关
  '--shadow-': 'shadow',
  '--drop-shadow-': 'drop-shadow',
  '--inset-shadow-': 'inset-shadow',

  // 滤镜相关
  '--blur-': 'blur',
  '--perspective-': 'perspective',

  // 其他
  '--aspect-': 'aspect',
  '--animate-': 'animate',
  '--ease-': 'ease',
};

// Default configuration
let CONFIG = {
  dryRun: false,
  suffix: '-v1',
  skipBackup: true,
  cssFilePath: path.resolve(__dirname, '../libs/tailwind-cfg/styles.css'),
  verbose: false,
};

// Variables to track statistics
let STATS = {
  updatedDefinitions: 0,
  updatedReferences: 0,
};

// Function to add suffix to CSS variables in Tailwind theme config
function updateCssVars(filePath) {
  console.log(`Processing CSS file: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract all CSS variable names before we modify them
  const allVarsRegex = /(--[a-zA-Z0-9-_]+)(?=\s*:)/g;
  const allMatches = [...content.matchAll(allVarsRegex)];
  const allVarNames = allMatches.map((match) => match[0]);

  // Create a map of original var names to suffixed var names
  const varMap = {};
  allVarNames.forEach((name) => {
    // Only add suffix if the variable doesn't already have it
    if (!name.endsWith(CONFIG.suffix)) {
      varMap[name] = `${name}${CONFIG.suffix}`;
    } else {
      // If it already has the suffix, keep it as is
      varMap[name] = name;
    }
  });

  // Extract original radius variables for the class name updates
  const radiusVarRegex = /--radius-([a-zA-Z0-9-_]+)(?=\s*:)/g;
  const radiusMatches = [...content.matchAll(radiusVarRegex)];
  const radiusNames = radiusMatches.map((match) => match[1]);

  console.log(
    `Found ${allVarNames.length} CSS variables (${radiusNames.length} radius variables)`,
  );

  if (CONFIG.verbose) {
    console.log('First 10 variables that will be updated:');
    const sampleVars = allVarNames.slice(0, 10);
    sampleVars.forEach((v) => console.log(`  ${v} -> ${varMap[v]}`));
    if (allVarNames.length > 10) {
      console.log(`  ... and ${allVarNames.length - 10} more`);
    }
  }

  // First, add suffix to all CSS variable references in values
  // We need to be careful with the order to avoid partial replacements
  let updatedContent = content;

  // Sort variable names by length (longest first) to avoid partial replacements
  const sortedVarNames = [...allVarNames].sort((a, b) => b.length - a.length);

  // Count how many references are updated
  let valueRefsUpdated = 0;

  // First, handle direct var() references
  // Replace all variable references in values (var(--name) pattern)
  for (const varName of sortedVarNames) {
    // Skip variables that already have the suffix
    if (varName.endsWith(CONFIG.suffix)) {
      continue;
    }

    // This pattern matches var(--name) including with whitespace
    // Escape varName to handle special characters properly
    const escapedVarName = varName.replace(/[-_]/g, '\\$&');
    const regex = new RegExp(`var\\(\\s*${escapedVarName}\\s*\\)`, 'g');
    const matches = updatedContent.match(regex) || [];
    valueRefsUpdated += matches.length;
    updatedContent = updatedContent.replace(regex, `var(${varMap[varName]})`);
  }

  // Also handle more complex var() references with fallbacks
  // Like: var(--name, fallback)
  for (const varName of sortedVarNames) {
    // Skip variables that already have the suffix
    if (varName.endsWith(CONFIG.suffix)) {
      continue;
    }

    // Escape varName to handle special characters properly
    const escapedVarName = varName.replace(/[-_]/g, '\\$&');
    const regex = new RegExp(`var\\(\\s*${escapedVarName}\\s*,`, 'g');
    const matches = updatedContent.match(regex) || [];
    valueRefsUpdated += matches.length;
    updatedContent = updatedContent.replace(regex, `var(${varMap[varName]},`);
  }

  // Step 2: Add suffix to all CSS variable definitions
  // Count variable definitions updated
  let varDefsUpdated = 0;

  for (const varName of sortedVarNames) {
    // Skip variables that already have the suffix
    if (varName.endsWith(CONFIG.suffix)) {
      continue;
    }

    // Escape varName to handle special characters properly
    const escapedVarName = varName.replace(/[-_]/g, '\\$&');
    const regex = new RegExp(`${escapedVarName}(?=\\s*:)`, 'g');
    const matches = updatedContent.match(regex) || [];
    varDefsUpdated += matches.length;
    updatedContent = updatedContent.replace(regex, varMap[varName]);
  }

  // Store the values in global stats
  STATS.updatedDefinitions = varDefsUpdated;
  STATS.updatedReferences = valueRefsUpdated;

  console.log(
    `Updated ${varDefsUpdated} CSS variable definitions and ${valueRefsUpdated} variable references`,
  );

  if (!CONFIG.dryRun) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated CSS variables in ${filePath}`);
  } else {
    console.log('DRY RUN: Would update CSS variables in', filePath);
    const changedLines = content.split('\n').filter((line, index) => {
      return line !== updatedContent.split('\n')[index];
    });

    if (CONFIG.verbose) {
      console.log('Sample of changes:');
      const sampleChanges = changedLines.slice(0, 5);
      sampleChanges.forEach((line) => console.log(`  ${line}`));
      if (changedLines.length > 5) {
        console.log(`  ... and ${changedLines.length - 5} more lines`);
      }
    } else {
      console.log(
        'Changes:',
        changedLines.length > 5
          ? `${changedLines.length} lines would change`
          : changedLines.join('\n'),
      );
    }
  }

  // 提取所有类型的变量名，将前缀删除，这样才能匹配到类名
  // 例如: --radius-xl -> xl, --color-red-500 -> red-500
  const namespacedVars = {};

  for (const varName of allVarNames) {
    // Skip variables that already have the suffix to prevent double suffixing in class names
    if (varName.endsWith(CONFIG.suffix)) {
      continue;
    }

    for (const [cssPrefix] of Object.entries(CSS_VAR_CLASS_MAPPINGS)) {
      if (varName.startsWith(cssPrefix)) {
        const key = cssPrefix;
        const value = varName.replace(cssPrefix, '');

        if (!namespacedVars[key]) {
          namespacedVars[key] = [];
        }

        namespacedVars[key].push(value);
      }
    }
  }

  return { allVarNames, radiusNames, namespacedVars };
}

// Function to process a file
function processFile(file, updatePatterns) {
  const content = fs.readFileSync(file, 'utf8');
  let updatedContent = content;
  let fileClassesModified = 0;

  // 应用每个更新模式
  for (const pattern of updatePatterns) {
    const { classPrefix, matchingVars } = pattern;

    // 创建匹配所有可能类名的正则表达式
    // 例如: rounded-xl, bg-red-500, etc.
    // Properly escape special regex characters in variable names
    const escapedVarNames = matchingVars
      .map((v) => v.replace(/[-_]/g, '\\$&'))
      .join('|');
    if (!escapedVarNames) continue;

    // 基本类名匹配，如 bg-red-500, m-4
    const classRegex = new RegExp(
      `(\\s|"|'|{|\\()${classPrefix}-((?:${escapedVarNames}))(?=\\s|"|'|}|\\)|-)`,
      'g',
    );

    updatedContent = updatedContent.replace(
      classRegex,
      (match, prefix, suffix) => {
        // 检查是否已经有后缀，避免重复添加
        if (suffix.endsWith(CONFIG.suffix)) return match;
        fileClassesModified++;
        return `${prefix}${classPrefix}-${suffix}${CONFIG.suffix}`;
      },
    );

    // 处理带有方向/变种的类，例如 rounded-t-xl, p-x-4
    // 支持如下模式: rounded-t-lg, p-x-4, m-y-2
    const directionRegex = new RegExp(
      `(\\s|"|'|{|\\()${classPrefix}-(t|b|l|r|x|y|tl|tr|bl|br)-((?:${escapedVarNames}))(?=\\s|"|'|}|\\))`,
      'g',
    );

    updatedContent = updatedContent.replace(
      directionRegex,
      (match, prefix, direction, suffix) => {
        // 检查是否已经有后缀，避免重复添加
        if (suffix.endsWith(CONFIG.suffix)) return match;
        fileClassesModified++;
        return `${prefix}${classPrefix}-${direction}-${suffix}${CONFIG.suffix}`;
      },
    );

    // 处理紧跟在类名后面的伪类和响应式修饰符，如 hover:bg-red-500, sm:p-4
    // 这种情况需要特殊处理，因为它们有更复杂的模式
    const modifierRegex = new RegExp(
      `(\\s|"|'|{|\\()([a-z0-9\\-]+:)${classPrefix}-((?:${escapedVarNames}))(?=\\s|"|'|}|\\))`,
      'g',
    );

    updatedContent = updatedContent.replace(
      modifierRegex,
      (match, prefix, modifier, suffix) => {
        // 检查是否已经有后缀，避免重复添加
        if (suffix.endsWith(CONFIG.suffix)) return match;
        fileClassesModified++;
        return `${prefix}${modifier}${classPrefix}-${suffix}${CONFIG.suffix}`;
      },
    );

    // 处理带有方向和修饰符的组合，如 hover:p-x-4, sm:m-y-2
    const modifierDirectionRegex = new RegExp(
      `(\\s|"|'|{|\\()([a-z0-9\\-]+:)${classPrefix}-(t|b|l|r|x|y|tl|tr|bl|br)-((?:${escapedVarNames}))(?=\\s|"|'|}|\\))`,
      'g',
    );

    updatedContent = updatedContent.replace(
      modifierDirectionRegex,
      (match, prefix, modifier, direction, suffix) => {
        // 检查是否已经有后缀，避免重复添加
        if (suffix.endsWith(CONFIG.suffix)) return match;
        fileClassesModified++;
        return `${prefix}${modifier}${classPrefix}-${direction}-${suffix}${CONFIG.suffix}`;
      },
    );
  }

  // 特殊处理 rounded 圆角类，这里用的是直接函数调用
  const roundedResult = handleRoundedClasses(updatedContent);
  updatedContent = roundedResult.content;
  fileClassesModified += roundedResult.count;

  return {
    content: updatedContent,
    fileClassesModified,
    wasModified: content !== updatedContent,
    originalContent: content,
  };
}

/**
 * 处理 TSX 文件中的 Tailwind CSS 类名
 * 根据 CSS 变量映射更新相应的类名
 */
function updateTsxFiles(directories, variableNames) {
  console.log(
    `Preparing to update CSS classes in ${directories.length} directories/files`,
  );

  // 创建变量名映射
  const varMap = {};
  variableNames.forEach((name) => {
    // Only add suffix if the variable doesn't already have it
    if (!name.endsWith(CONFIG.suffix)) {
      varMap[name] = `${name}${CONFIG.suffix}`;
    } else {
      // If it already has the suffix, keep it as is
      varMap[name] = name;
    }
  });

  let totalFilesModified = 0;
  let totalClassesModified = 0;
  let totalFilesScanned = 0;

  // 根据映射关系创建更新模式
  const updatePatterns = [];

  // 处理单个前缀的映射，如 --radius- -> rounded
  for (const [varPrefix, classPrefix] of Object.entries(
    CSS_VAR_CLASS_MAPPINGS,
  )) {
    // 找出匹配此前缀的变量，例如 --radius-xl 应该找出 xl
    const matchingVars = [];

    variableNames.forEach((varName) => {
      if (varName.startsWith(varPrefix)) {
        // 从变量名中提取部分，例如 --radius-xl -> xl
        const extracted = varName.replace(varPrefix, '');
        if (extracted) {
          matchingVars.push(extracted);
        }
      }
    });

    if (matchingVars.length > 0) {
      if (typeof classPrefix === 'string') {
        // 单一类前缀如 rounded
        updatePatterns.push({
          varPrefix,
          classPrefix,
          matchingVars,
        });
      } else if (Array.isArray(classPrefix)) {
        // 多个类前缀如 [bg, text, border]
        classPrefix.forEach((prefix) => {
          updatePatterns.push({
            varPrefix,
            classPrefix: prefix,
            matchingVars,
          });
        });
      }
    }
  }

  if (CONFIG.verbose) {
    console.log('Generated update patterns:');
    updatePatterns.forEach((pattern, i) => {
      console.log(`${i + 1}. ${pattern.varPrefix} -> ${pattern.classPrefix}`);
      if (pattern.matchingVars.length > 5) {
        console.log(
          `   Matching vars: ${pattern.matchingVars.slice(0, 5).join(', ')}... (${pattern.matchingVars.length - 5} more)`,
        );
      } else {
        console.log(`   Matching vars: ${pattern.matchingVars.join(', ')}`);
      }
    });
  }

  // 处理每个目录或文件
  directories.forEach((dirOrFile) => {
    // 检查是目录还是文件
    const stats = fs.statSync(dirOrFile);
    let tsxFiles = [];

    if (stats.isDirectory()) {
      tsxFiles = glob.sync(`${dirOrFile}/**/*.{tsx,jsx,js,ts}`);
      console.log(`\nFound ${tsxFiles.length} files in ${dirOrFile}`);
    } else if (dirOrFile.match(/\.(tsx|jsx|js|ts)$/)) {
      tsxFiles = [dirOrFile];
      console.log(`\nProcessing file: ${dirOrFile}`);
    } else {
      console.log(
        `\nSkipping ${dirOrFile} - not a directory or supported file type`,
      );
      return;
    }

    totalFilesScanned += tsxFiles.length;

    const filesModified = [];
    let directoryClassCount = 0;

    // 设置简单的进度指示器
    let processedCount = 0;
    const progressInterval = Math.max(1, Math.floor(tsxFiles.length / 20)); // 最多显示20次进度

    tsxFiles.forEach((file) => {
      // 更新进度
      processedCount++;
      if (
        processedCount % progressInterval === 0 ||
        processedCount === tsxFiles.length
      ) {
        const percent = Math.floor((processedCount / tsxFiles.length) * 100);
        process.stdout.write(
          `\rProcessing files: ${percent}% complete (${processedCount}/${tsxFiles.length})${' '.repeat(20)}`,
        );
      }

      const result = processFile(file, updatePatterns);

      if (result.wasModified) {
        if (!CONFIG.dryRun) {
          fs.writeFileSync(file, result.content, 'utf8');
          console.log(
            `\rUpdated ${result.fileClassesModified} class names in ${file}${' '.repeat(20)}`,
          );
        } else {
          console.log(
            `\rDRY RUN: Would update ${result.fileClassesModified} class names in ${file}${' '.repeat(20)}`,
          );
          if (CONFIG.verbose) {
            showDiff(result.originalContent, result.content, file);
          }
        }
        filesModified.push(file);
        directoryClassCount += result.fileClassesModified;
      }
    });

    console.log(
      `\nModified ${filesModified.length} files in ${dirOrFile} with ${directoryClassCount} class name changes`,
    );
    totalFilesModified += filesModified.length;
    totalClassesModified += directoryClassCount;
  });

  console.log(
    `\nTotal: Modified ${totalClassesModified} class names in ${totalFilesModified} files (scanned ${totalFilesScanned} files)`,
  );
  return { totalFilesModified, totalClassesModified, totalFilesScanned };
}

// 特殊处理 rounded 圆角类
function handleRoundedClasses(content) {
  let counter = 0;
  const roundedBaseRegex =
    /(\s|"|'|{|\()rounded(-([a-zA-Z0-9-_]+))?(?=\s|"|'|}|\))/g;
  let updatedContent = content.replace(
    roundedBaseRegex,
    (match, prefix, suffix, sizeName) => {
      // 如果没有后缀或者大小不在我们的列表中，保持不变
      if (!suffix) return match;

      // 检查是否已经有后缀，避免重复添加
      if (suffix.endsWith(CONFIG.suffix)) return match;

      // 特殊处理 'none' 和 'full'
      if (sizeName === 'none' || sizeName === 'full') {
        counter++;
        return `${prefix}rounded-${sizeName}${CONFIG.suffix}`;
      }

      counter++;
      return `${prefix}rounded${suffix}${CONFIG.suffix}`;
    },
  );

  // 处理特定角落的 rounded 类 (top, bottom, left, right, tl, tr, bl, br)
  // 匹配如 rounded-t-xl, rounded-l-md, rounded-tr, rounded-bl-lg 等
  const cornerRoundedRegex =
    /(\s|"|'|{|\()rounded-(t|b|l|r|tl|tr|bl|br)(-([a-zA-Z0-9-_]+))?(?=\s|"|'|}|\))/g;
  updatedContent = updatedContent.replace(
    cornerRoundedRegex,
    (match, prefix, corner, suffix, sizeName) => {
      // 如果没有大小后缀，保持角落指示器不变
      if (!suffix) return match;

      // 检查是否已经有后缀，避免重复添加
      if (suffix.endsWith(CONFIG.suffix)) return match;

      // 特殊处理 'none' 和 'full'
      if (sizeName === 'none' || sizeName === 'full') {
        counter++;
        return `${prefix}rounded-${corner}-${sizeName}${CONFIG.suffix}`;
      }

      counter++;
      return `${prefix}rounded-${corner}${suffix}${CONFIG.suffix}`;
    },
  );

  return {
    content: updatedContent,
    count: counter,
  };
}

// Function to create a backup of the CSS file
function backupFile(filePath) {
  const backupPath = `${filePath}.backup-${Date.now()}`;
  fs.copyFileSync(filePath, backupPath);
  console.log(`Created backup at ${backupPath}`);
  return backupPath;
}

// Function to show help message
function showHelp() {
  console.log(`
Tailwind CSS Variable Updater

This script adds a version suffix to CSS variables in Tailwind theme configuration
and updates corresponding class names in TSX/JSX files.

Usage:
  node update-tailwind-vars.js [options] <directory1> <directory2> ...

Options:
  --dry-run, -d      Preview changes without modifying files
  --suffix TEXT      Specify a custom suffix (default: -v1)
  --help, -h         Show this help message
  --skip-backup      Skip creating a backup of the CSS file
  --verbose, -v      Display more detailed output
  --css-file PATH    Specify the path to the CSS file (default: ../libs/tailwind-cfg/styles.css)

Example:
  node update-tailwind-vars.js --dry-run libs/biz/ui
  node update-tailwind-vars.js --suffix -v2 libs/biz/ui apps/chat
  node update-tailwind-vars.js --css-file ../libs/agent/ui/src/styles.css libs/biz/ui
`);
  process.exit(0);
}

// Function to parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: false,
    suffix: '-v1',
    skipBackup: true,
    directories: [],
    verbose: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--dry-run' || arg === '-d') {
      options.dryRun = true;
    } else if (arg === '--help' || arg === '-h') {
      showHelp();
    } else if (arg === '--skip-backup') {
      options.skipBackup = true;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (arg === '--suffix' && i + 1 < args.length) {
      options.suffix = args[++i];
    } else if (arg === '--css-file' && i + 1 < args.length) {
      options.cssFilePath = args[++i];
    } else if (arg.startsWith('--suffix=')) {
      options.suffix = arg.split('=')[1];
    } else {
      options.directories.push(arg);
    }
  }

  return options;
}

// Function to show diff between original and updated content
function showDiff(original, updated, filePath) {
  // Split both files into lines
  const originalLines = original.split('\n');
  const updatedLines = updated.split('\n');

  // Find differing lines with line numbers
  const diffLines = [];
  for (
    let i = 0;
    i < Math.max(originalLines.length, updatedLines.length);
    i++
  ) {
    const origLine = originalLines[i] || '';
    const updLine = updatedLines[i] || '';

    if (origLine !== updLine) {
      diffLines.push({
        lineNum: i + 1,
        original: origLine,
        updated: updLine,
      });
    }
  }

  // Display diff
  console.log(`\nDifferences in ${filePath}:`);
  diffLines.forEach((diff) => {
    console.log(`Line ${diff.lineNum}:`);
    console.log(`  - ${diff.original}`);
    console.log(`  + ${diff.updated}`);
    console.log();
  });
}

// Main function
function main() {
  // Parse command line arguments
  const options = parseArgs();
  Object.assign(CONFIG, options);

  if (CONFIG.directories.length === 0) {
    console.error('Error: No directories specified.');
    console.error(
      'Usage: node update-tailwind-vars.js [options] <directory1> <directory2> ...',
    );
    console.error('Run with --help for more information.');
    process.exit(1);
  }

  // Resolve the CSS file path properly
  if (CONFIG.cssFilePath.startsWith('/')) {
    // Absolute path, use as is
  } else if (CONFIG.cssFilePath.startsWith('../')) {
    // Relative to script directory
    CONFIG.cssFilePath = path.resolve(__dirname, CONFIG.cssFilePath);
  } else {
    // Relative to current working directory
    CONFIG.cssFilePath = path.resolve(process.cwd(), CONFIG.cssFilePath);
  }

  console.log(
    `Running in ${CONFIG.dryRun ? 'DRY RUN' : 'LIVE'} mode with suffix "${CONFIG.suffix}"`,
  );
  console.log(`Using CSS file: ${CONFIG.cssFilePath}`);

  // Check if CSS file exists
  if (!fs.existsSync(CONFIG.cssFilePath)) {
    console.error(`Error: CSS file not found: ${CONFIG.cssFilePath}`);
    console.error(
      'You can specify a different CSS file with the --css-file option.',
    );
    process.exit(1);
  }

  // Verify directories exist
  for (const dir of CONFIG.directories) {
    if (!fs.existsSync(dir)) {
      console.error(`Error: Directory not found: ${dir}`);
      process.exit(1);
    }
  }

  // Create a backup before making changes
  let backupPath = null;

  if (!CONFIG.dryRun && !CONFIG.skipBackup) {
    backupPath = backupFile(CONFIG.cssFilePath);
  } else if (CONFIG.dryRun) {
    console.log('DRY RUN: Would create backup of', CONFIG.cssFilePath);
  } else if (CONFIG.skipBackup) {
    console.log('Skipping backup (--skip-backup specified)');
  }

  try {
    // Update CSS variables in the Tailwind theme file
    const { allVarNames, radiusNames, namespacedVars } = updateCssVars(
      CONFIG.cssFilePath,
    );

    // Update TSX files in the specified directories
    const results = updateTsxFiles(CONFIG.directories, allVarNames);

    console.log(
      `All updates ${CONFIG.dryRun ? 'would be' : 'were'} completed successfully!`,
    );

    if (!CONFIG.dryRun) {
      console.log(`\nSummary:
- CSS file updated: ${CONFIG.cssFilePath}
- ${backupPath ? `Backup created: ${backupPath}` : 'No backup created (--skip-backup)'}
- CSS variables updated: ${STATS.updatedDefinitions} definitions and ${STATS.updatedReferences} references
- Total files modified: ${results.totalFilesModified}
- Total class names modified: ${results.totalClassesModified}
- Total files scanned: ${results.totalFilesScanned}
      `);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();
