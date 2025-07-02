#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 读取源文件
const sourceFile = 'libs/tailwind-cfg/design-system-v2.css';
const outputFile = 'libs/tailwind-cfg/design-system-v2.new.css';

function convertDesignSystem() {
  console.log('开始转换设计系统文件...');

  const content = fs.readFileSync(sourceFile, 'utf8');

  // 存储变量的对象和注释
  const lightVariables = new Map();
  const darkVariables = new Map();
  const sections = []; // 存储按顺序的sections，包括注释和变量

  // 分析现有的 CSS 内容 - 先处理多行变量定义
  let cleanedContent = content;

  // 将多行变量定义合并为单行
  cleanedContent = cleanedContent.replace(
    /--([^:]+):\s*var\(\s*\n\s*([^)]+)\s*\n\s*\)/g,
    '--$1: var($2)',
  );

  const lines = cleanedContent.split('\n');

  // 找到 @theme 块的开始和结束
  let inThemeBlock = false;
  let themeStartIndex = -1;
  let themeEndIndex = -1;
  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '@theme {') {
      inThemeBlock = true;
      themeStartIndex = i;
      continue;
    }

    if (inThemeBlock && line === '}') {
      themeEndIndex = i;
      break;
    }

    if (inThemeBlock) {
      // 检查是否是注释行
      if (line.startsWith('/*') && line.endsWith('*/')) {
        currentSection = {
          type: 'comment',
          content: line,
          variables: [],
        };
        sections.push(currentSection);
        continue;
      }

      if (line.startsWith('--')) {
        // 提取变量定义
        const match = line.match(/^(--[^:]+):\s*(.+?);?\s*$/);
        if (match) {
          const [, varName, varValue] = match;
          // 清理变量值，移除末尾的分号
          const cleanValue = varValue.replace(/;$/, '');

          const variableInfo = { name: varName, value: cleanValue };

          if (varName.includes('-light-v2')) {
            // Light mode 变量
            const baseName = varName.replace('-light-v2', '-v2');
            lightVariables.set(baseName, cleanValue);
            variableInfo.baseName = baseName;
            variableInfo.mode = 'light';
          } else if (varName.includes('-dark-v2')) {
            // Dark mode 变量
            const baseName = varName.replace('-dark-v2', '-v2');
            darkVariables.set(baseName, cleanValue);
            variableInfo.baseName = baseName;
            variableInfo.mode = 'dark';
          } else {
            // 其他变量（不是 light/dark 的）
            variableInfo.mode = 'base';

            // 如果当前没有section，创建一个默认的
            if (!currentSection) {
              currentSection = {
                type: 'variables',
                variables: [],
              };
              sections.push(currentSection);
            }

            // 如果当前section是注释类型，创建一个新的变量section
            if (currentSection.type === 'comment') {
              const newSection = {
                type: 'variables',
                variables: [],
              };
              sections.push(newSection);
              currentSection = newSection;
            }

            // 添加基础变量到当前section
            currentSection.variables.push(variableInfo);
          }
        }
      }
    }
  }

  // 生成新的 CSS 内容
  let newContent = '';

  // 添加文件头部注释
  newContent += '/* BEGIN */\n';
  // newContent += '@custom-variant dark (&:where(.dark, .dark *));\n\n';

  // 开始 @theme 块
  newContent += '@theme {\n';

  // 按原来的顺序处理各个section
  sections.forEach((section) => {
    if (section.type === 'comment') {
      newContent += `  ${section.content}\n`;
    } else if (section.type === 'variables' && section.variables.length > 0) {
      section.variables.forEach((variable) => {
        newContent += `  ${variable.name}: ${variable.value};\n`;
      });
    }
  });

  // 添加COLOR TOKENS部分（所有基础变量使用light模式的值）
  if (lightVariables.size > 0) {
    newContent += '\n  /* COLOR TOKENS */\n';
    const allBaseNames = new Set([
      ...lightVariables.keys(),
      ...darkVariables.keys(),
    ]);
    const sortedBaseNames = Array.from(allBaseNames).sort();

    sortedBaseNames.forEach((baseName) => {
      const lightValue = lightVariables.get(baseName);
      if (lightValue) {
        newContent += `  ${baseName}: ${lightValue};\n`;
      }
    });
  }

  // 结束 @theme 块
  newContent += '}\n\n';

  // 添加 .dark 类定义
  if (darkVariables.size > 0) {
    newContent += '.dark {\n';

    // 添加所有 dark 模式的变量覆盖
    const allBaseNames = new Set([
      ...lightVariables.keys(),
      ...darkVariables.keys(),
    ]);
    const sortedBaseNames = Array.from(allBaseNames).sort();

    sortedBaseNames.forEach((baseName) => {
      const darkValue = darkVariables.get(baseName);
      if (darkValue) {
        newContent += `  ${baseName}: ${darkValue};\n`;
      }
    });

    newContent += '}\n\n';
  }

  newContent += '/* END */\n';

  // 写入新文件
  fs.writeFileSync(outputFile, newContent);

  console.log(`转换完成！`);
  console.log(`- 处理了 ${lightVariables.size} 个 light 变量`);
  console.log(`- 处理了 ${darkVariables.size} 个 dark 变量`);
  console.log(
    `- 处理了 ${sections.filter((s) => s.type === 'variables').reduce((acc, s) => acc + s.variables.length, 0)} 个其他变量`,
  );
  console.log(
    `- 保留了 ${sections.filter((s) => s.type === 'comment').length} 个注释`,
  );
  console.log(`- 输出文件: ${outputFile}`);

  // 打印一些示例变量查看转换效果
  console.log('\n示例转换结果:');
  const sampleKeys = Array.from(lightVariables.keys()).slice(0, 3);
  sampleKeys.forEach((key) => {
    console.log(`  ${key}:`);
    console.log(`    Light: ${lightVariables.get(key)}`);
    console.log(`    Dark:  ${darkVariables.get(key) || 'N/A'}`);
  });

  // 检查不完整的变量
  console.log('\n检查不完整的变量:');
  let incompleteCount = 0;
  [...lightVariables.entries(), ...darkVariables.entries()].forEach(
    ([key, value]) => {
      if (value.includes('var(') && !value.includes(')')) {
        console.log(`  不完整变量: ${key} = ${value}`);
        incompleteCount++;
      }
    },
  );
  console.log(`发现 ${incompleteCount} 个不完整的变量`);
}

// 检查源文件是否存在
if (!fs.existsSync(sourceFile)) {
  console.error(`源文件不存在: ${sourceFile}`);
  process.exit(1);
}

// 运行转换
convertDesignSystem();
