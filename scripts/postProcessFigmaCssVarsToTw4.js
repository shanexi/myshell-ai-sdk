const fs = require('fs');
const path = require('path');

// 读取 styles.css 文件
const stylesPath = path.join(__dirname, '../libs/ui/src/styles.css');
const content = fs.readFileSync(stylesPath, 'utf8');

// 找到相关的区域
const baseToDesignTokenRegex = /\/\* BASE \*\/([\s\S]*?)\/\* DESIGN TOKEN \*\//;
const designTokenToGradientRegex =
  /\/\* DESIGN TOKEN \*\/([\s\S]*?)\/\* _GRADIENT PALETTE \*\//;

// 处理文件内容
let newContent = content;

// 1. 在 BASE 和 DESIGN TOKEN 之间替换 --redius-radius 为 --radius
const baseMatch = content.match(baseToDesignTokenRegex);
if (baseMatch) {
  let baseSection = baseMatch[1];
  const updatedBaseSection = baseSection.replace(
    /--redius-radius-/g,
    '--radius-',
  );
  newContent = newContent.replace(
    baseToDesignTokenRegex,
    `/* BASE */${updatedBaseSection}/* DESIGN TOKEN */`,
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

  // 写入文件
  fs.writeFileSync(stylesPath, newContent, 'utf8');

  console.log('Successfully:');
  console.log('1. Replaced --redius-radius- with --radius- in BASE section');
  console.log('2. Added --color prefix to design tokens');
} else {
  console.error('Could not find required sections in the file');
}
