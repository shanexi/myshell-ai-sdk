const fs = require('fs');
const path = require('path');

// Function to apply shorthand replacements
function applyShorthands(content) {
  return (
    content
      // Order matters! Do component-colors before components and colors
      .replace(/--component-colors-/g, '--CCr-')
      .replace(/--components-/g, '--C-')
      .replace(/--colors-/g, '--Cr-')
      .replace(/foreground/g, 'Fg')
      .replace(/background/g, 'Bg')
  );
}

// Function to add -v2 suffix to CSS variables
function addV2Suffix(content) {
  // First clean any existing -v2 suffixes
  content = content.replace(/(-v2)+/g, '');

  // Add -v2 to variable declarations (--var-name:)
  content = content.replace(/--([^:}\s]+):/g, '--$1-v2:');

  // Add -v2 to variable references (var(--var-name))
  content = content.replace(/var\(--([^,)]+)\)/g, 'var(--$1-v2)');

  return content;
}

// Function to merge desktop-dark and mobile-dark when they have the same value
function mergeDarkVariants(content) {
  // Use regex to find all desktop-dark and mobile-dark pairs
  const darkPairsRegex =
    /--([^-\s]+(?:-[^-\s]+)*)-desktop-dark(-v2)?:\s*(var\([^)]+\)|[^;]+);[\s\n]*--\1-mobile-dark\2:\s*(var\([^)]+\)|[^;]+);/g;

  return content.replace(
    darkPairsRegex,
    (match, base, v2Suffix, desktopValue, mobileValue) => {
      // If values are the same, merge to a single dark variant
      if (desktopValue.trim() === mobileValue.trim()) {
        return `--${base}-dark${v2Suffix || ''}: ${desktopValue};`;
      }
      // If values are different, keep both and add a new dark variant with desktop value
      return `${match}\n  --${base}-dark${v2Suffix || ''}: ${desktopValue};`;
    },
  );
}

// 读取 styles.css 文件
const stylesPath = path.join(
  __dirname,
  '../libs/tailwind-cfg/design-system-v2.css',
);
const content = fs.readFileSync(stylesPath, 'utf8');

// 找到相关的区域
const baseToDesignTokenRegex = /\/\* BASE \*\/([\s\S]*?)\/\* DESIGN TOKEN \*\//;
const designTokenToGradientRegex =
  /\/\* DESIGN TOKEN \*\/([\s\S]*?)\/\* _GRADIENT PALETTE \*\//;

// 处理文件内容
let newContent = content;

// 0. Apply shorthand replacements first
newContent = applyShorthands(newContent);

// 1. 在 BASE 和 DESIGN TOKEN 之间替换 --redius-radius 为 --radius
const baseMatch = newContent.match(baseToDesignTokenRegex);
if (baseMatch) {
  let baseSection = baseMatch[1];

  // 替换 --redius-radius 为 --radius
  baseSection = baseSection.replace(/--redius-radius-/g, '--radius-');

  // 添加 --spacing- 前缀到特定变量
  // 1. 包含 width 的变量
  baseSection = baseSection.replace(
    /--(?!spacing-)([\w-]*width[\w-]*):/g,
    '--spacing-$1:',
  );

  // 2. 包含 padding 的变量
  baseSection = baseSection.replace(
    /--(?!spacing-)([\w-]*padding[\w-]*):/g,
    '--spacing-$1:',
  );

  // 3. 包含 height 的变量
  baseSection = baseSection.replace(
    /--(?!spacing-)([\w-]*height[\w-]*):/g,
    '--spacing-$1:',
  );

  // 4. 包含 spacing 的变量
  baseSection = baseSection.replace(
    /--(?!spacing-)([\w-]*spacing[\w-]*):/g,
    '--spacing-$1:',
  );

  // 5. 包含 radius 的变量
  baseSection = baseSection.replace(
    /--(?!radius-)([\w-]*radius[\w-]*):/g,
    '--radius-$1:',
  );

  // 更新文件内容
  newContent = newContent.replace(
    baseToDesignTokenRegex,
    `/* BASE */${baseSection}/* DESIGN TOKEN */`,
  );
}

// 2. 在 DESIGN TOKEN 和 GRADIENT PALETTE 之间添加 --color 前缀
const designTokenMatch = newContent.match(designTokenToGradientRegex);
if (designTokenMatch) {
  let designTokenSection = designTokenMatch[1];

  // 添加 --color 前缀（只处理没有 --color 前缀的变量）
  const updatedSection = designTokenSection.replace(
    /--(?!color-)([\w-]+):/g,
    '--color-$1:',
  );

  // 替换原文件中的内容
  newContent = newContent.replace(
    designTokenToGradientRegex,
    `/* DESIGN TOKEN */${updatedSection}/* _GRADIENT PALETTE */`,
  );

  // 3. Merge desktop-dark and mobile-dark variants when they have the same value
  newContent = mergeDarkVariants(newContent);

  // 4. Add -v2 suffix to all CSS variables
  newContent = addV2Suffix(newContent);

  // 写入文件
  fs.writeFileSync(stylesPath, newContent, 'utf8');

  console.log('Successfully:');
  console.log('1. Applied shorthand replacements (C, Cr, CCr, Fg, Bg)');
  console.log('2. Replaced --redius-radius- with --radius- in BASE section');
  console.log(
    '3. Added --spacing- prefix to width, padding, height, and spacing variables in BASE section',
  );
  console.log('4. Added --color prefix to design tokens');
  console.log(
    '5. Merged desktop-dark and mobile-dark variants with same values',
  );
  console.log('6. Added -v2 suffix to all CSS variables');
} else {
  console.error('Could not find required sections in the file');
}
