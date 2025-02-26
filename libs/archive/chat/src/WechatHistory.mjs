import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';
import { style, script1, script2 } from './WechatHistory.constants.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFilePath = path.join(
  __dirname,
  './WechatHistory/MyShell ShellAgent 内测.html',
);
const outputDir = path.join(__dirname, './WechatHistory');

const splitHtmlByDate = (inputFilePath, outputDir) => {
  const htmlContent = fs.readFileSync(inputFilePath, 'utf-8');
  const $ = cheerio.load(htmlContent);

  const messagesByDate = {};

  $('.msg').each((_, element) => {
    const dateText = $(element).find('.nt-box').text().trim();
    const dateMatch = dateText.match(/\d{4}-\d{2}-\d{2}/);
    if (dateMatch) {
      const date = dateMatch[0];
      if (!messagesByDate[date]) {
        messagesByDate[date] = [];
      }
      messagesByDate[date].push($.html(element));
    }
  });

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  Object.keys(messagesByDate).forEach((date) => {
    const outputFilePath = path.join(outputDir, `${date}.html`);
    const fileContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta content="yes" name="apple-touch-fullscreen">
${style}
    <title>Messages from ${date}</title>
${script1}
	</head>
      <body>

      		<div class="main">
			<div class="header">
				<span class="sname">${date}</span>
				<div class="msgfilter">
					<!-- filter.html -->
					<input placeholder="Press [Enter] key after inputting keywords" id="filter-keyword" class="filter-btn" onkeypress="javascript:searchElements(event);" />
					&nbsp;
					<a title="Show Photos Only" id="filter-image" class="filter-btn" href="javascript:showImageMsgs(event);">Photos</a>
					<a title="Show Videos Only" id="filter-video" class="filter-btn" href="javascript:showVideoMsgs();">Videos</a>
					<a title="Show All Messages" id="filter-none" class="filter-btn" href="javascript:showAllMsgs();">All</a>
				</div>
			</div>
			<div class="msgs" id="msgs-div">
        ${messagesByDate[date].join('\n')}
        </div>
			<div id="footer" class="footer">
			</div>
      </body>
${script2}
      </html>
    `;
    fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
  });

  const indexFilePath = path.join(__dirname, './WechatHistory/index.html');
  const indexHtmlContent = fs.readFileSync(indexFilePath, 'utf-8');
  const index$ = cheerio.load(indexHtmlContent);

  const tbody = index$('tbody');

  tbody.empty();

  tbody.append(`       <tr height="60">
          <td width="100" align="center">
            <img src="Portrait/56097882030@chatroom.jpg" style="float: left; max-width: 60px; max-height: 60px">
          </td>
          <td>
            <a href="MyShell%20ShellAgent%20%E5%86%85%E6%B5%8B.html">MyShell ShellAgent 内测</a>
          </td>
        </tr>`);
  Object.keys(messagesByDate)
    .reverse()
    .forEach((date) => {
      const tr = `
<tr height="60">
  <td width="100" align="center">
    <img src="" style="float:left;max-width:60px;max-height:60px">
  </td>
  <td>
    <a href="${date}.html">${date}</a>
  </td>
</tr>`;
      tbody.append(tr);
    });

  fs.writeFileSync(indexFilePath, index$.html(), 'utf-8');

  console.log('HTML files have been split by date and saved to:', outputDir);
};

splitHtmlByDate(inputFilePath, outputDir);
