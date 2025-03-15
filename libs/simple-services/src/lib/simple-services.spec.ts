import { simpleServices } from './simple-services';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss-3';
import autoprefixer from 'autoprefixer';
import { JSDOM } from 'jsdom';

describe('simpleServices', () => {
  it('should work', () => {
    expect(simpleServices()).toEqual('simple-services');
  });

  it('应该处理带有Tailwind类的HTML并将样式注入到head中', async () => {
    // 创建一个简单的HTML，包含Tailwind类名
    const inputHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tailwind测试</title>
        </head>
        <body>
          <div class="bg-blue-500 text-white">
            这是一个Tailwind样式的按钮
          </div>
        </body>
      </html>
    `;

    // 创建一个包含Tailwind类的CSS
    const inputCss = `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `;

    // 使用PostCSS处理CSS
    const result = await postcss([
      tailwindcss({
        content: [{ raw: inputHtml }],
        theme: {
          extend: {},
        },
        plugins: [],
      }),
      autoprefixer,
    ]).process(inputCss, { from: undefined });

    // 获取处理后的CSS
    const processedCss = result.css;

    // 使用JSDOM解析HTML
    const dom = new JSDOM(inputHtml);
    const document = dom.window.document;

    // 创建style标签并添加处理后的CSS
    const style = document.createElement('style');
    style.textContent = processedCss;
    document.head.appendChild(style);

    // 获取最终的HTML
    const outputHtml = dom.serialize();

    // 验证结果包含了生成的CSS
    expect(outputHtml).toMatchSnapshot();
  });
});
