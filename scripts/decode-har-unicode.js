#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 解码 unicode 字符串为中文
 * @param {string} str - 包含 unicode 编码的字符串
 * @returns {string} - 解码后的字符串
 */
function decodeUnicode(str) {
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

/**
 * 递归处理 JSON 对象，解码所有 unicode 字符串
 * @param {any} obj - 要处理的对象
 * @returns {any} - 处理后的对象
 */
function processObject(obj) {
  if (typeof obj === 'string') {
    return decodeUnicode(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(processObject);
  } else if (obj !== null && typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = processObject(value);
    }
    return result;
  }
  return obj;
}

function main() {
  const harFilePath = path.join(__dirname, '../libs/agent/ui/src/components/agent-chat/HAR.json');
  const outputPath = path.join(__dirname, '../libs/agent/ui/src/components/agent-chat/HAR-decoded.json');

  try {
    console.log('Reading HAR file...');
    const harContent = fs.readFileSync(harFilePath, 'utf8');

    console.log('Parsing JSON...');
    const harData = JSON.parse(harContent);

    console.log('Processing unicode strings...');
    const processedData = processObject(harData);

    console.log('Writing decoded file...');
    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2), 'utf8');

    console.log(`Successfully decoded HAR file!`);
    console.log(`Original: ${harFilePath}`);
    console.log(`Decoded: ${outputPath}`);

    // 显示一些统计信息
    const originalSize = fs.statSync(harFilePath).size;
    const decodedSize = fs.statSync(outputPath).size;
    console.log(`File size: ${originalSize} bytes -> ${decodedSize} bytes`);

  } catch (error) {
    console.error('Error processing HAR file:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { decodeUnicode, processObject };