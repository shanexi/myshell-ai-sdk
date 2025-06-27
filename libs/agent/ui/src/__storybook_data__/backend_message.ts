export const msg1 = {
  id: 59,
  message_id: 1750824249263064,
  timestamp: '2025-06-25T04:04:09.263044',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'think',
        content: {
          text: '📝 ! Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-10.12.3.tgz',
        },
      },
    ],
  },
};

export const msg2 = {
  id: 60,
  message_id: 1750824249263064,
  timestamp: '2025-06-25T04:04:09.271771',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'think',
        content: {
          text: '📝 {"role":"user","content":[{"type":"input_text","text":"\\nCreate a new ShellAgent custom widget using the MCP (Model Context Protocol) architecture.\\n\\nWidget Details:\\n- Class Name: ShanghaiWeatherWidget\\n- Folder Name: shanghai_weather\\n\\nExternal Library Usage:\\n# Python Requests库使用指南\\n\\n## 简介\\nRequests是Python中最受欢迎的HTTP库，简洁优雅，每周下载量约3000万次，专门用于发送HTTP请求和处理API调用。\\n\\n## 安装\\n```bash\\npip install requests\\n```\\n\\n## 基本用法示例\\n\\n### 1. GET请求\\n```python\\nimport requests\\n\\n# 基本GET请求\\nresponse = requests.get(\'https://api.github.com\')\\nprint(response.status_code)  # 200\\nprint(response.json())       # JSON数据\\n\\n# 带参数的GET请求\\nparams = {\'q\': \'python\', \'sort\': \'stars\'}\\nresponse = requests.get(\'https://api.github.com/search/repositories\', params=params)\\n```\\n\\n### 2. POST请求\\n```python\\n# 表单数据\\ndata = {\'username\': \'test\', \'password\': \'123\'}\\nresponse = requests.post(\'https://httpbin.org/post\', data=data)\\n\\n# JSON数据\\njson_data = {\'name\': \'张三\', \'age\': 25}\\nresponse = requests.post(\'https://httpbin.org/post\', json=json_data)\\n```\\n\\n### 3. 请求头设置\\n```python\\nheaders = {\\n    \'User-Agent\': \'Mozilla/5.0\',\\n    \'Authorization\': \'Bearer TOKEN\'\\n}\\nresponse = requests.get(\'https://api.github.com/user\', headers=headers)\\n```\\n\\n### 4. 响应处理\\n```python\\nresponse = requests.get(\'https://httpbin.org/get\')\\n\\nprint(response.status_code)   # 状态码\\nprint(response.text)          # 文本内容\\nprint(response.json())        # JSON格式\\nprint(response.headers)       # 响应头\\n```\\n\\n### 5. 错误处理与超时\\n```python\\ntry:\\n    response = requests.get(\'https://api.example.com\', timeout=5)\\n    response.raise_for_status()  # 检查HTTP错误\\nexcept requests.exceptions.Timeout:\\n    print(\\"请求超时\\")\\nexcept requests.exceptions.HTTPError as e:\\n    print(f\\"HTTP错误: {e}\\")\\n```\\n\\n### 6. 会话管理\\n```python\\nwith requests.Session() as session:\\n    session.post(\'https://httpbin.org/cookies/set\', data={\'key\': \'value\'})\\n    response = session.get(\'https://httpbin.org/cookies\')  # 自动带cookie\\n```\\n\\n### 7. 身份验证\\n```python\\n# 基本认证\\nresponse = requests.get(\'https://api.example.com\', auth=(\'username\', \'password\'))\\n\\n# Bearer Token\\nheaders = {\'Authorization\': \'Bearer your_token\'}\\nresponse = requests.get(\'https://api.example.com\', headers=headers)\\n```\\n\\n## 完整API调用示例\\n```python\\nimport requests\\n\\ndef call_api(endpoint, method=\'GET\', **kwargs):\\n    \\"\\"\\"通用API调用函数\\"\\"\\"\\n    base_url = \\"https://api.example.com\\"\\n    url = f\\"{base_url}/{endpoint}\\"\\n    \\n    headers = {\\n        \'Content-Type\': \'application/json\',\\n        \'User-Agent\': \'Python App 1.0\'\\n    }\\n    \\n    try:\\n        response = requests.request(\\n            method=method,\\n            url=url,\\n            headers=headers,\\n            timeout=10,\\n            **kwargs\\n        )\\n        response.raise_for_status()\\n        return response.json()\\n    \\n    except requests.exceptions.RequestException as e:\\n        print(f\\"API调用失败: {e}\\")\\n        return None\\n\\n# 使用示例\\n# GET请求\\ndata = call_api(\'users/123\')\\n\\n# POST请求\\nnew_user = call_api(\'users\', method=\'POST\', \\n                   json={\'name\': \'李四\', \'email\': \'li@example.com\'})\\n```\\n\\n## 主要特点\\n- **简洁易用**：API设计直观，代码简洁\\n- **功能完整**：支持所有HTTP方法、认证、代理、SSL等\\n- **自动处理**：自动处理cookies、重定向、编码等\\n- **广泛应用**：API调用、网页爬虫、自动化测试的首选工具\\n\\nRequests库已成为Python HTTP客户端的事实标准，是进行API集成和网络编程的必备工具。# Python JSON库数据处理使用指南\\n\\n## 概述\\nJSON（JavaScript Object Notation）是一种轻量级数据交换格式，Python通过内置的`json`模块提供完整支持，可以方便地在Python数据类型和JSON格式之间进行转换。\\n\\n## 基本用法\\n\\n### 1. 导入模块\\n```python\\nimport json\\n```\\n\\n### 2. Python对象转JSON字符串（序列化）\\n```python\\nimport json\\n\\n# Python字典\\ndata = {\\n    \\"name\\": \\"张三\\",\\n    \\"age\\": 30,\\n    \\"city\\": \\"北京\\",\\n    \\"hobbies\\": [\\"读书\\", \\"游泳\\"]\\n}\\n\\n# 转换为JSON字符串\\njson_string = json.dumps(data, ensure_ascii=False)\\nprint(json_string)\\n\\n# 格式化输出\\njson_pretty = json.dumps(data, indent=4, ensure_ascii=False)\\nprint(json_pretty)\\n```\\n\\n### 3. JSON字符串转Python对象（反序列化）\\n```python\\nimport json\\n\\n# JSON字符串\\njson_string = \'{\\"name\\": \\"李四\\", \\"age\\": 25, \\"is_student\\": true}\'\\n\\n# 解析JSON字符串\\ndata = json.loads(json_string)\\nprint(data)  # {\'name\': \'李四\', \'age\': 25, \'is_student\': True}\\nprint(data[\\"name\\"])  # 李四\\n```\\n\\n### 4. 文件操作\\n\\n#### 读取JSON文件\\n```python\\nimport json\\n\\n# 读取JSON文件\\nwith open(\'data.json\', \'r\', encoding=\'utf-8\') as file:\\n    data = json.load(file)\\n    print(data)\\n```\\n\\n#### 写入JSON文件\\n```python\\nimport json\\n\\ndata = {\\n    \\"员工\\": [\\n        {\\"姓名\\": \\"王五\\", \\"部门\\": \\"技术部\\", \\"工资\\": 8000},\\n        {\\"姓名\\": \\"赵六\\", \\"部门\\": \\"市场部\\", \\"工资\\": 7000}\\n    ]\\n}\\n\\n# 写入JSON文件\\nwith open(\'output.json\', \'w\', encoding=\'utf-8\') as file:\\n    json.dump(data, file, indent=4, ensure_ascii=False)\\n```\\n\\n## 实际应用示例\\n\\n### 1. 数据处理示例\\n```python\\nimport json\\n\\n# 销售数据处理\\nsales_data = \'\'\'\\n{\\n    \\"销售记录\\": [\\n        {\\"产品\\": \\"笔记本电脑\\", \\"数量\\": 5, \\"单价\\": 8000},\\n        {\\"产品\\": \\"鼠标\\", \\"数量\\": 50, \\"单价\\": 50},\\n        {\\"产品\\": \\"键盘\\", \\"数量\\": 30, \\"单价\\": 150}\\n    ]\\n}\\n\'\'\'\\n\\n# 解析数据\\ndata = json.loads(sales_data)\\n\\n# 计算总收入\\ntotal_revenue = 0\\nfor item in data[\'销售记录\']:\\n    revenue = item[\'数量\'] * item[\'单价\']\\n    total_revenue += revenue\\n    print(f\\"{item[\'产品\']}: {revenue}元\\")\\n\\nprint(f\\"\\\\n总收入: {total_revenue}元\\")\\n```\\n\\n### 2. API数据处理\\n```python\\nimport json\\nimport requests\\n\\n# 模拟API响应处理\\ndef process_api_data():\\n    # 假设从API获取的JSON数据\\n    api_response = \'\'\'\\n    {\\n        \\"status\\": \\"success\\",\\n        \\"data\\": {\\n            \\"users\\": [\\n                {\\"id\\": 1, \\"name\\": \\"用户1\\", \\"email\\": \\"user1@example.com\\"},\\n                {\\"id\\": 2, \\"name\\": \\"用户2\\", \\"email\\": \\"user2@example.com\\"}\\n            ]\\n        }\\n    }\\n    \'\'\'\\n    \\n    # 解析数据\\n    response_data = json.loads(api_response)\\n    \\n    if response_data[\'status\'] == \'success\':\\n        users = response_data[\'data\'][\'users\']\\n        for user in users:\\n            print(f\\"ID: {user[\'id\']}, 姓名: {user[\'name\']}, 邮箱: {user[\'email\']}\\")\\n\\nprocess_api_data()\\n```\\n\\n### 3. 错误处理\\n```python\\nimport json\\n\\ndef safe_json_parse(json_string):\\n    try:\\n        data = json.loads(json_string)\\n        return data\\n    except json.JSONDecodeError as e:\\n        print(f\\"JSON解析错误: {e}\\")\\n        return None\\n\\n# 测试无效JSON\\ninvalid_json = \'{\\"name\\": \\"张三\\", \\"age\\": 30,}\'  # 多余的逗号\\nresult = safe_json_parse(invalid_json)\\n```\\n\\n### 4. 复杂数据结构处理\\n```python\\nimport json\\n\\n# 复杂嵌套数据\\ncomplex_data = {\\n    \\"公司\\": \\"科技有限公司\\",\\n    \\"员工\\": [\\n        {\\n            \\"id\\": 1,\\n            \\"姓名\\": \\"张三\\",\\n            \\"部门\\": \\"研发部\\",\\n            \\"项目\\": [\\"项目A\\", \\"项目B\\"],\\n            \\"技能\\": {\\"Python\\": 5, \\"JavaScript\\": 4}\\n        },\\n        {\\n            \\"id\\": 2,\\n            \\"姓名\\": \\"李四\\",\\n            \\"部门\\": \\"运营部\\",\\n            \\"项目\\": [\\"活动X\\"],\\n            \\"技能\\": {\\"营销\\": 5, \\"数据分析\\": 3}\\n        }\\n    ],\\n    \\"成立年份\\": 2020,\\n    \\"运营中\\": True\\n}\\n\\n# 序列化并格式化输出\\njson_output = json.dumps(complex_data, indent=2, ensure_ascii=False, sort_keys=True)\\nprint(json_output)\\n\\n# 提取特定信息\\ndata = json.loads(json_output)\\nfor employee in data[\'员工\']:\\n    print(f\\"{employee[\'姓名\']} - {employee[\'部门\']} - 项目数量: {len(employee[\'项目\'])}\\")\\n```\\n\\n## 性能优化\\n\\n### 使用ujson提升性能\\n```python\\n# 安装: pip install ujson\\nimport ujson\\n\\ndata = {\\"key\\": \\"value\\", \\"numbers\\": list(range(1000))}\\n\\n# 更快的序列化\\njson_string = ujson.dumps(data)\\n\\n# 更快的反序列化\\nparsed_data = ujson.loads(json_string)\\n```\\n\\n## 最佳实践\\n\\n1. **文件操作使用上下文管理器**\\n2. **处理可能无效的JSON时添加异常处理**\\n3. **使用indent参数提高可读性**\\n4. **中文内容设置ensure_ascii=False**\\n5. **大数据量考虑使用ujson等高性能库**\\n\\n## 常用参数说明\\n\\n- `indent`: 缩进空格数，用于格式化输出\\n- `ensure_ascii=False`: 允许非ASCII字符（中文等）\\n- `sort_keys=True`: 按键名排序\\n- `separators`: 自定义分隔符\\n\\n这些示例覆盖了JSON库在数据处理中的主要应用场景，可以根据具体需求进行调整和扩展。# Python datetime库使用指南\\n\\n## 概述\\nPython的datetime模块是处理日期和时间的标准库，提供了完整的日期时间操作功能。\\n\\n## 核心类介绍\\n- **date**: 处理日期（年、月、日）\\n- **time**: 处理时间（时、分、秒、微秒）\\n- **datetime**: 组合日期和时间\\n- **timedelta**: 表示时间差\\n- **timezone**: 处理时区信息\\n\\n## 基础用法示例\\n\\n### 1. 导入和获取当前时间\\n```python\\nfrom datetime import datetime, date, time, timedelta\\n\\n# 获取当前日期和时间\\nnow = datetime.now()\\nprint(now)  # 2024-12-19 14:30:25.123456\\n\\n# 获取当前日期\\ntoday = date.today()\\nprint(today)  # 2024-12-19\\n```\\n\\n### 2. 创建日期时间对象\\n```python\\n# 创建特定日期\\nd = date(2024, 12, 25)\\nprint(d)  # 2024-12-25\\n\\n# 创建特定时间\\nt = time(14, 30, 0)\\nprint(t)  # 14:30:00\\n\\n# 创建完整的日期时间\\ndt = datetime(2024, 12, 25, 14, 30, 0)\\nprint(dt)  # 2024-12-25 14:30:00\\n```\\n\\n### 3. 访问时间属性\\n```python\\nnow = datetime.now()\\nprint(f\\"年: {now.year}\\")\\nprint(f\\"月: {now.month}\\")\\nprint(f\\"日: {now.day}\\")\\nprint(f\\"时: {now.hour}\\")\\nprint(f\\"分: {now.minute}\\")\\nprint(f\\"秒: {now.second}\\")\\n```\\n\\n### 4. 格式化日期时间\\n```python\\nnow = datetime.now()\\n\\n# 基本格式化\\nformatted = now.strftime(\\"%Y-%m-%d %H:%M:%S\\")\\nprint(formatted)  # 2024-12-19 14:30:25\\n\\n# 中文格式\\nchinese_format = now.strftime(\\"%Y年%m月%d日 %H时%M分\\")\\nprint(chinese_format)  # 2024年12月19日 14时30分\\n\\n# 英文格式\\nenglish_format = now.strftime(\\"%A, %B %d, %Y\\")\\nprint(english_format)  # Thursday, December 19, 2024\\n```\\n\\n### 5. 字符串转时间对象\\n```python\\n# 解析日期字符串\\ndate_string = \\"2024-12-25\\"\\nparsed_date = datetime.strptime(date_string, \\"%Y-%m-%d\\")\\nprint(parsed_date)  # 2024-12-25 00:00:00\\n\\n# 解析复杂格式\\ncomplex_string = \\"25/12/2024 15:30:45\\"\\nparsed_datetime = datetime.strptime(complex_string, \\"%d/%m/%Y %H:%M:%S\\")\\nprint(parsed_datetime)  # 2024-12-25 15:30:45\\n```\\n\\n### 6. 时间差计算（timedelta）\\n```python\\nfrom datetime import timedelta\\n\\nnow = datetime.now()\\n\\n# 计算未来时间\\nfuture = now + timedelta(days=7, hours=3, minutes=30)\\nprint(f\\"7天3小时30分后: {future}\\")\\n\\n# 计算过去时间\\npast = now - timedelta(weeks=2)\\nprint(f\\"2周前: {past}\\")\\n\\n# 计算两个时间的差值\\ndate1 = datetime(2024, 12, 25)\\ndate2 = datetime(2024, 12, 19)\\ndifference = date1 - date2\\nprint(f\\"相差: {difference.days} 天\\")\\n```\\n\\n## 实用功能示例\\n\\n### 年龄计算器\\n```python\\ndef calculate_age(birth_date):\\n    today = datetime.today()\\n    age = today.year - birth_date.year\\n    if today.month < birth_date.month or (today.month == birth_date.month and today.day < birth_date.day):\\n        age -= 1\\n    return age\\n\\nbirth = datetime(1990, 5, 15)\\nprint(f\\"年龄: {calculate_age(birth)} 岁\\")\\n```\\n\\n### 倒计时功能\\n```python\\ndef countdown_to_event(event_date):\\n    now = datetime.now()\\n    delta = event_date - now\\n    if delta.total_seconds() > 0:\\n        days = delta.days\\n        hours, remainder = divmod(delta.seconds, 3600)\\n        minutes, seconds = divmod(remainder, 60)\\n        return f\\"{days}天 {hours}小时 {minutes}分钟 {seconds}秒\\"\\n    else:\\n        return \\"活动已结束\\"\\n\\nnew_year = datetime(2025, 1, 1, 0, 0, 0)\\nprint(f\\"距离新年: {countdown_to_event(new_year)}\\")\\n```\\n\\n### 工作日计算\\n```python\\ndef is_weekday(date_obj):\\n    return date_obj.weekday() < 5  # 周一到周五\\n\\ndef next_workday(date_obj):\\n    next_day = date_obj + timedelta(days=1)\\n    while not is_weekday(next_day):\\n        next_day += timedelta(days=1)\\n    return next_day\\n\\ntoday = date.today()\\nprint(f\\"下一个工作日: {next_workday(today)}\\")\\n```\\n\\n## 常用格式化代码\\n- `%Y` - 4位年份 (2024)\\n- `%m` - 月份 (01-12)\\n- `%d` - 日期 (01-31)\\n- `%H` - 小时 (00-23)\\n- `%M` - 分钟 (00-59)\\n- `%S` - 秒 (00-59)\\n- `%A` - 星期全名 (Monday)\\n- `%B` - 月份全名 (December)\\n\\n## 时区处理（需要pytz库）\\n```python\\nimport pytz\\n\\n# 创建带时区的时间\\nutc_now = datetime.now(pytz.UTC)\\nbeijing_tz = pytz.timezone(\'Asia/Shanghai\')\\nbeijing_time = utc_now.astimezone(beijing_tz)\\n\\nprint(f\\"UTC时间: {utc_now}\\")\\nprint(f\\"北京时间: {beijing_time}\\")\\n```\\n\\ndatetime库功能强大，是Python处理日期时间的首选工具，适用于各种时间相关的编程需求。\\n\\nUser Requirements:\\n创建一个上海天气查询组件，功能要求：\\n1. 自动获取上海市今日的实时天气信息\\n2. 返回详细的天气数据，包括：\\n   - 当前温度\\n   - 天气状况描述（晴天、多云、雨天等）\\n   - 湿度百分比\\n   - 风速和风向\\n   - 今日最高温度和最低温度\\n   - 空气质量指数（如果可用）\\n3. 使用免费的天气API服务（如OpenWeatherMap或其他可靠的免费API）\\n4. 处理API调用失败的情况，返回友好的错误信息\\n5. 返回结构化的JSON数据，方便在应用中显示\\n6. 组件应该是稳定可靠的，能够在生产环境中长期使用\\n\\n🚨 CRITICAL CONSTRAINTS:\\n- ONLY work with files in the custom_widgets folder\\n- Use \'uv init custom_widgets/shanghai_weather --no-workspace\' to initialize the working directory\\n- DO NOT attempt to list or view files outside custom_widgets directory\\n- DO NOT enumerate the entire project structure - focus exclusively on the widget being developed\\n\\nIMPORTANT GUIDELINES:\\n# ShellAgent Custom Widget Development Guide\\n\\n## Overview\\n\\nShellAgent Custom Widgets are extension components for the ShellAgent platform, allowing developers to create custom functionalities and seamlessly integrate them into ShellAgent workflows. The new version of Custom Widgets adopts the MCP (Model Context Protocol) service architecture, making components more modular, independent, and easier to develop. Each custom widget has its own independent uv Python environment.\\n\\n## 🚨 CRITICAL: Folder Restrictions\\n\\n**IMPORTANT**: When generating or modifying custom widgets:\\n- **ONLY** work with files in the `custom_widgets` folder\\n- **ONLY** modify code in the corresponding widget\'s subfolder under `custom_widgets`\\n- **DO NOT** attempt to view or list contents of other folders\\n- **DO NOT** access or modify files outside the `custom_widgets` directory\\n- **FOCUS EXCLUSIVELY** on the custom widget being developed\\n\\n## Quick Start\\n\\n### 1. Initialize the project using uv\\n\\n```bash\\n# Create and initialize the project in one step\\nuv init custom_widgets/my_widget --no-workspace\\n\\n# Enter the project directory\\ncd custom_widgets/my_widget\\n\\n# Add basic dependencies, **please ensure that fastmcp version >= 2.3.4**\\nuv add fastmcp>=2.3.4 pydantic==2.9.2\\n\\n# For any dependencies required by the project, call\\nuv add xxx\\n```\\n\\n**Note**: The `uv init` command automatically creates these files:\\n- `pyproject.toml` - Project configuration\\n- `README.md` - Required for `uv sync` to work\\n- `.gitignore` - Git ignore rules\\n\\n### 2. Project Structure\\n\\nAfter initialization, create the following files:\\n\\n```\\ncustom_widgets/\\n├── my_custom_widget/\\n│   ├── __init__.py      # import shellagent widget class\\n│   ├── main.py          # Test script\\n│   ├── server.py        # MCP service definition\\n│   ├── widget.py        # Widget class definition\\n│   ├── pyproject.toml   # Project configuration (auto-created by uv init)\\n│   └── README.md        # Required for uv sync (auto-created by uv init)\\n```\\n\\n## Core Development Files\\n\\n### 1. Widget Class (`widget.py`)\\n\\n⚠️ **CRITICAL**: This file must NOT import any external dependencies! Only use standard library and ShellAgent internal modules.\\n\\n```python\\n# ✅ ALLOWED IMPORTS ONLY - No external dependencies!\\nimport os\\nimport asyncio\\nfrom pydantic import Field\\nfrom typing import Any, Optional\\nfrom proconfig.widgets.base import WIDGETS, BaseWidget\\nfrom proconfig.widgets.custom_widgets import run_custom_widgets\\n\\n# ❌ NEVER ADD EXTERNAL IMPORTS HERE - They belong in server.py\\n\\n@WIDGETS.register_module()\\nclass MyCustomWidget(BaseWidget):\\n    # CATEGORY and NAME should be defined mandatory\\n    CATEGORY = \\"Custom Widgets/My Category\\"\\n    NAME = \\"My Custom Widget\\"\\n    \\n    class InputsSchema(BaseWidget.InputsSchema):\\n        # Define inputs using Pydantic types with Field\\n        input_param: str = Field(\\"Default Value\\", description=\\"Input parameter description\\")\\n        count: int = Field(10, description=\\"Number of items to process\\")\\n        enabled: bool = Field(True, description=\\"Whether to enable processing\\")\\n    \\n    class OutputsSchema(BaseWidget.OutputsSchema):\\n        # Define outputs - these will be populated from server.py return dict\\n        output_param: str\\n        result_count: int\\n        success: bool\\n        \\n    def execute(self, environ, config):\\n        # Call MCP service, format: folder_name/ComponentClassName\\n        output = asyncio.run(run_custom_widgets(\\n            \'my_widget/MyCustomWidget\',  # Note the naming convention here\\n            environ, \\n            config\\n        ))\\n        return output\\n```\\n\\n### 2. MCP Service (`server.py`)\\n\\n✅ **All external dependencies go here!** This file can import any packages installed via `uv add`.\\n\\n⚠️ **CRITICAL**: MCP tool function parameters must use Python basic types only (str, int, float, bool, list, dict), NOT Pydantic models!\\n\\n```python\\n# ✅ External dependencies are allowed and encouraged here\\nimport argparse\\nfrom fastmcp import FastMCP\\n# Add any other external imports you need\\n\\n# REQUIRED: Parse command line arguments for MCP transport\\nparser = argparse.ArgumentParser(description=\'My Custom Widget MCP Server\')\\nparser.add_argument(\'--host\', default=\'127.0.0.1\', help=\'Host to bind the server to\')\\nparser.add_argument(\'--port\', type=int, default=8000, help=\'Port to run the server on\')\\nparser.add_argument(\'--transport\', default=\\"stdio\\", help=\'Transport protocol (stdio or streamable-http)\')\\nargs = parser.parse_args()\\n\\n# Initialize MCP service\\nmcp = FastMCP(\\"MyCustomWidget\\")\\n\\n@mcp.tool(name=\\"MyCustomWidget\\")\\ndef my_widget_tool(environ: dict, input_param: str, count: int, enabled: bool) -> dict:\\n    \\"\\"\\"\\n    MCP service tool implementation\\n    \\n    IMPORTANT: \\n    - Parameters must use basic Python types (str, int, bool, dict, list)\\n    - Return must be a dict that matches widget.py OutputsSchema fields\\n    - The returned dict will be automatically converted to OutputsSchema\\n    \\"\\"\\"\\n    # Implement your logic here with external libraries\\n    processed_data = process_with_external_lib(input_param)\\n    \\n    return {\\n        \\"output_param\\": f\\"Processed: {processed_data}\\",\\n        \\"result_count\\": count if enabled else 0,\\n        \\"success\\": enabled\\n    }\\n\\nif __name__ == \\"__main__\\":\\n    # REQUIRED: Use transport configuration\\n    if args.transport == \\"stdio\\":\\n        mcp.run()\\n    else:\\n        mcp.run(transport=\\"streamable-http\\", host=args.host, port=args.port)\\n```\\n\\n### 3. Test Script (`main.py`)\\n\\n**IMPORTANT**: After creating your widget, you MUST write test cases in `main.py` and verify they pass using `uv run main.py`.\\n\\nBasic test script template:\\n\\n```python\\nimport json\\nimport asyncio\\nfrom fastmcp import Client\\n\\nasync def main():\\n    \\"\\"\\"Test the custom widget with various test cases\\"\\"\\"\\n    async with Client(\\"server.py\\") as client:\\n        print(f\\"✓ Client connected: {client.is_connected()}\\")\\n\\n        # List available tools\\n        tools = await client.list_tools()\\n        print(f\\"✓ Available tools: {tools}\\")\\n\\n        # Test Case 1: Basic functionality\\n        print(\\"\\\\n--- Test Case 1: Basic Functionality ---\\")\\n        try:\\n            # Note: Parameters match server.py function signature (basic types)\\n            result = await client.call_tool(\\"MyCustomWidget\\", {\\n                \\"environ\\": {}, \\n                \\"input_param\\": \\"Test Data\\",\\n                \\"count\\": 5,\\n                \\"enabled\\": True\\n            })\\n            result_data = json.loads(result[0].text)\\n            print(f\\"✓ Basic test passed: {result_data}\\")\\n            \\n            # Verify returned dict has fields matching OutputsSchema\\n            assert result_data[\\"success\\"] == True\\n            assert result_data[\\"result_count\\"] == 5\\n            assert \\"output_param\\" in result_data\\n        except Exception as e:\\n            print(f\\"✗ Basic test failed: {e}\\")\\n            raise\\n\\n        # Test Case 2: Edge case - disabled processing\\n        print(\\"\\\\n--- Test Case 2: Disabled Processing ---\\")\\n        try:\\n            result = await client.call_tool(\\"MyCustomWidget\\", {\\n                \\"environ\\": {}, \\n                \\"input_param\\": \\"Test Data\\",\\n                \\"count\\": 10,\\n                \\"enabled\\": False\\n            })\\n            result_data = json.loads(result[0].text)\\n            print(f\\"✓ Disabled test passed: {result_data}\\")\\n            assert result_data[\\"success\\"] == False\\n            assert result_data[\\"result_count\\"] == 0\\n        except Exception as e:\\n            print(f\\"✗ Disabled test failed: {e}\\")\\n            raise\\n\\n        # Test Case 3: Error handling\\n        print(\\"\\\\n--- Test Case 3: Error Handling ---\\")\\n        try:\\n            # Test with invalid input to verify error handling\\n            result = await client.call_tool(\\"MyCustomWidget\\", {\\n                \\"environ\\": {},\\n                \\"input_param\\": \\"\\",  # Empty input\\n                \\"count\\": -1,  # Invalid count\\n                \\"enabled\\": True\\n            })\\n            result_data = json.loads(result[0].text)\\n            print(f\\"✓ Error handling test completed: {result_data}\\")\\n        except Exception as e:\\n            print(f\\"✓ Error correctly caught: {e}\\")\\n\\n        print(\\"\\\\n✅ All tests completed successfully!\\")\\n\\nif __name__ == \\"__main__\\":\\n    asyncio.run(main())\\n```\\n\\nFor image/media widgets, include CDN upload tests:\\n\\n```python\\n# Test Case 4: Media upload test (for widgets that return media)\\nprint(\\"\\\\n--- Test Case 4: Media Upload ---\\")\\ntry:\\n    result = await client.call_tool(\\"ImageWidget\\", {\\n        \\"environ\\": {},\\n        \\"prompt\\": \\"Generate a test image\\"\\n    })\\n    result_data = json.loads(result[0].text)\\n    \\n    # Verify CDN URL is returned, not base64\\n    assert \\"image_url\\" in result_data\\n    assert result_data[\\"image_url\\"].startswith(\\"http\\")\\n    assert \\"base64\\" not in result_data[\\"image_url\\"]\\n    print(f\\"✓ Media upload test passed: {result_data[\'image_url\']}\\")\\nexcept Exception as e:\\n    print(f\\"✗ Media upload test failed: {e}\\")\\n    raise\\n```\\n\\nSee `widgets/04_widget_examples.md` for more complete test examples.\\n\\n### 4. Init File (`__init__.py`)\\n\\n```python\\nfrom .widget import MyCustomWidget\\n```\\n\\n## Key Concepts\\n\\n### MCP Service Naming Convention\\n- Folder: `custom_widgets/my_widget`\\n- Component Class: `MyCustomWidget`\\n- Tool name in run_custom_widgets: `my_widget/MyCustomWidget`\\n- MCP Tool Name: `MyCustomWidget`\\n\\n### Type Requirements\\n\\n**🚨 CRITICAL SEPARATION:**\\n\\n**widget.py (ShellAgent Environment)**:\\n- ✅ **USE Pydantic**: InputsSchema and OutputsSchema with Field definitions\\n- ✅ **MUST HAVE** InputsSchema and OutputsSchema classes\\n\\n**server.py (MCP Environment)**:\\n- ✅ **USE basic Python types**: `str`, `int`, `float`, `bool`, `list`, `dict`\\n- ❌ **NO Pydantic models** in tool function signatures\\n- ❌ **NO complex type hints** in MCP tool parameters\\n- ✅ **RETURN dict** that matches OutputsSchema field names, but return the dict directly, no need to use pydantic validation\\n\\n**Connection**: \\n- widget.py calls server.py via `run_custom_widgets()`\\n- server.py returns dict → automatically converted to OutputsSchema\\n\\n### Media File Support\\nTo return images/audio/video, you must implement the upload functionality in your MCP server.py file, NOT in widget.py:\\n\\n⚠️ **CRITICAL**: \\n1. Custom widgets CANNOT import from ShellAgent\'s codebase! The upload functionality must be implemented in server.py.\\n2. **NEVER return base64 encoded media** - ShellAgent cannot recognize base64!\\n3. **ALWAYS upload images/audio/video to CDN and return URLs**\\n\\n**In server.py** (where external dependencies are allowed):\\n```python\\nimport argparse\\nimport requests\\nimport logging\\nimport time\\nfrom fastmcp import FastMCP\\n\\n# REQUIRED: Parse command line arguments\\nparser = argparse.ArgumentParser(description=\'My Custom Widget MCP Server\')\\nparser.add_argument(\'--host\', default=\'127.0.0.1\', help=\'Host to bind the server to\')\\nparser.add_argument(\'--port\', type=int, default=8000, help=\'Port to run the server on\')\\nparser.add_argument(\'--transport\', default=\\"stdio\\", help=\'Transport protocol (stdio or streamable-http)\')\\nargs = parser.parse_args()\\n\\nmcp = FastMCP(\\"MyCustomWidget\\")\\n\\n# Define supported file types\\next_to_type = {\\n    # image\\n    \'.png\': \'image/png\',\\n    \'.jpg\': \'image/jpeg\',\\n    \'.jpeg\': \'image/jpeg\',\\n    \'.gif\': \'image/gif\',\\n    \'.bmp\': \'image/bmp\',\\n    \'.webp\': \'image/webp\',\\n    # video\\n    \'.mp4\': \'video/mp4\',\\n    \'.mkv\': \'video/x-matroska\',\\n    \'.webm\': \'video/webm\',\\n    \'.avi\': \'video/x-msvideo\',\\n    \'.mov\': \'video/quicktime\',\\n    # audio\\n    \'.mp3\': \'audio/mpeg\',\\n    \'.wav\': \'audio/wav\',\\n    \'.m4a\': \'audio/mp4\',\\n    # json\\n    \'.json\': \'application/json\',\\n    # .zip\\n    \'.zip\': \'application/zip\',\\n}\\n\\ndef upload_file_to_myshell(local_file: str) -> str:\\n    \\"\\"\\"Upload a file to MyShell CDN and return the URL\\"\\"\\"\\n    server_url = \\"https://openapi.myshell.ai/public/v1/store\\"\\n    headers = {\\n        \'x-myshell-openapi-key\': \\"OPENSOURCE_FIXED\\"\\n    }\\n\\n    assert os.path.isfile(local_file)\\n    start_time = time.time()\\n    ext = os.path.splitext(local_file)[1]\\n    if ext.lower() in ext_to_type.keys():\\n        files = [\\n            (\'file\', (os.path.basename(local_file), open(local_file, \'rb\'), ext_to_type[ext.lower()])),\\n        ]\\n    else:\\n        error = {\\n            \'error_code\': \'SHELL-1109\',\\n            \'error_head\': \'HTTP Request Error\', \\n            \'msg\': f\\"Unsupported file type: {ext}\\",\\n        }\\n        raise Exception(**error)\\n    response = requests.request(\\"POST\\", server_url, headers=headers, files=files)\\n    if response.status_code == 200:\\n        end_time = time.time()\\n        logging.info(f\\"{local_file} uploaded, time elapsed: {end_time - start_time}\\")\\n        return response.json()[\'url\']\\n    else:\\n        error = {\\n            \'error_code\': \'SHELL-1109\',\\n            \'error_head\': \'HTTP Request Error\', \\n            \'msg\': f\\"[HTTP ERROR] {response.status_code} - {response.text} \\\\n\\",\\n        }\\n        raise Exception(**error)\\n\\n@mcp.tool(name=\\"MyCustomWidget\\")\\ndef my_widget_tool(environ: dict, input_param: str) -> dict:\\n    \\"\\"\\"MCP service tool implementation\\"\\"\\"\\n    # Process and generate an image\\n    output_path = \\"/tmp/generated_image.png\\"\\n    # ... your image generation logic ...\\n    \\n    # Upload to CDN\\n    cdn_url = upload_file_to_myshell(output_path)\\n    \\n    return {\\n        \\"image_url\\": cdn_url,\\n        \\"success\\": True\\n    }\\n\\nif __name__ == \\"__main__\\":\\n    # REQUIRED: Use transport configuration\\n    if args.transport == \\"stdio\\":\\n        mcp.run()\\n    else:\\n        mcp.run(transport=\\"streamable-http\\", host=args.host, port=args.port)\\n```\\n\\n**Environment Separation Reminder**:\\n- **widget.py** runs in the ShellAgent environment → NO external imports allowed\\n- **server.py** runs in the MCP environment → External imports and custom implementations are allowed\\n\\n**Media File Rules**:\\n- ❌ **NEVER** return base64 encoded images/audio/video - ShellAgent cannot recognize them!\\n- ✅ **ALWAYS** upload media files to CDN using `upload_file_to_myshell` and return URLs\\n- ✅ The upload function MUST be implemented in server.py, NOT imported\\n\\n## Testing\\n\\n### Running Tests\\n\\n**CRITICAL**: Always run and verify your tests before delivering the widget!\\n\\n#### 1. MCP Service Tests (Required)\\n\\n```bash\\n# Enter the component directory\\ncd custom_widgets/my_widget\\n\\n# Install the project in development mode\\nuv sync\\n\\n# Run the test script using uv\\nuv run python main.py\\n\\n# Expected output:\\n# ✓ Client connected: True\\n# ✓ Available tools: [...]\\n# --- Test Case 1: Basic Functionality ---\\n# ✓ Basic test passed: {...}\\n# --- Test Case 2: Disabled Processing ---\\n# ✓ Disabled test passed: {...}\\n# --- Test Case 3: Error Handling ---\\n# ✓ Error correctly caught: ...\\n# ✅ All tests completed successfully!\\n```\\n\\n#### 2. ShellAgent Environment Tests (Required)\\n\\n**CRITICAL**: After MCP tests pass, you MUST test the widget in the ShellAgent environment to ensure it can be properly imported and executed.\\n\\nCreate a test script in the **root directory** (ShellAgentInternal/) to test widget integration:\\n\\n```bash\\n# Create test script in root directory (where uv environment has ShellAgent dependencies)\\ncd /path/to/ShellAgentInternal\\n\\n# Create widget integration test script\\ncat > test_widget_my_custom.py << \'EOF\'\\nfrom proconfig.widgets.base import build_widgets\\n\\n# Test widget import and instantiation\\nprint(\\"Testing widget import...\\")\\ntry:\\n    module = build_widgets(\\"MyCustomWidget\\")\\n    print(\\"✓ Widget imported successfully\\")\\nexcept Exception as e:\\n    print(f\\"✗ Widget import failed: {e}\\")\\n    exit(1)\\n\\n# Test widget execution with sample data\\nprint(\\"\\\\nTesting widget execution...\\")\\ntry:\\n    # Prepare test inputs matching your InputsSchema\\n    inputs = {\\n        \\"input_param\\": \\"Test Data\\",\\n        \\"count\\": 5,\\n        \\"enabled\\": True\\n    }\\n    \\n    # Execute widget\\n    result = module({}, inputs)\\n    print(f\\"✓ Widget execution successful: {result}\\")\\n    \\n    # Validate output structure\\n    assert isinstance(result, dict), \\"Result must be a dictionary\\"\\n    print(\\"✓ Output validation passed\\")\\n    \\nexcept Exception as e:\\n    print(f\\"✗ Widget execution failed: {e}\\")\\n    exit(1)\\n\\nprint(\\"\\\\n✅ All ShellAgent environment tests passed!\\")\\nEOF\\n\\n# Run the test using uv in the root directory\\nuv run test_widget_my_custom.py\\n\\n# Expected output:\\n# Testing widget import...\\n# ✓ Widget imported successfully\\n# \\n# Testing widget execution...\\n# ✓ Widget execution successful: {...}\\n# ✓ Output validation passed\\n# \\n# ✅ All ShellAgent environment tests passed!\\n```\\n\\n**Why ShellAgent Environment Testing is Critical:**\\n- Verifies the widget can be imported by ShellAgent\'s build_widgets system\\n- Tests the actual execution path that will be used in production\\n- Catches issues with ShellAgent-specific dependencies\\n- Validates the widget works in the same uv environment as ShellAgent\\n\\n### Test Requirements\\n\\nYour testing must include both levels:\\n\\n#### MCP Service Tests (`main.py` in widget directory):\\n1. **Connection test** - Verify MCP server is reachable\\n2. **Basic functionality test** - Test normal operation with valid inputs\\n3. **Edge case tests** - Test boundary conditions and special cases\\n4. **Error handling test** - Verify graceful error handling\\n5. **Media upload test** (if applicable) - Verify CDN URLs are returned, not base64\\n\\n#### ShellAgent Environment Tests (script in root directory):\\n1. **Import test** - Verify widget can be imported via build_widgets\\n2. **Instantiation test** - Verify widget class can be created\\n3. **Execution test** - Verify widget.execute() works correctly\\n4. **Output validation** - Verify result matches expected schema\\n5. **Dependency test** - Verify all required dependencies are available\\n\\n### Test Validation\\n\\nBefore delivering, ensure:\\n- ✅ All MCP test cases pass without errors\\n- ✅ MCP server starts successfully\\n- ✅ ShellAgent environment tests pass\\n- ✅ Widget can be imported via build_widgets\\n- ✅ Widget executes successfully in ShellAgent environment\\n- ✅ Output matches expected schema\\n- ✅ Media files return CDN URLs (not base64)\\n- ✅ Error cases are handled gracefully\\n- ✅ No import conflicts or dependency issues\\n\\n## Complete Documentation References\\n\\nFor detailed information, consult these modular documentation files:\\n\\n### Widget Development\\n- **Widget Lifecycle**: `widgets/01_widget_lifecycle.md`\\n- **MCP Integration**: `widgets/02_mcp_integration.md`\\n- **Input/Output Schemas**: `widgets/03_input_output_schemas.md`\\n- **Widget Examples**: `widgets/04_widget_examples.md`\\n- **Common Failures**: `widgets/05_common_failures.md`\\n- **Best Practices**: `widgets/06_best_practices.md`\\n- **External APIs**: `widgets/07_external_apis.md`\\n\\n## Critical Requirements\\n\\n1. **🚨 widget.py MUST NOT import external dependencies!** All external imports go in server.py.\\n2. **🚨 server.py MUST include argument parser** with `--host`, `--port`, and `--transport` arguments.\\n3. **🚨 server.py MUST use transport-aware startup** logic (stdio vs streamable-http).\\n4. Always use `uv` to manage dependencies - never edit pyproject.toml manually.\\n5. Use `uv init xxx --no-workspace` to generate the custom_widget folder (this creates README.md automatically).\\n6. Ensure fastmcp version >= 2.3.4\\n7. **Write comprehensive test cases in main.py** and verify with `uv run python main.py`\\n8. **Test thoroughly until ALL test cases pass without errors**\\n9. Include complete uv venv folder when delivering.\\n10. Please ensure the generated widget can be imported and loaded directly.\\n\\n## Common Issues\\n\\n| Issue | Solution |\\n|-------|----------|\\n| Import error in ShellAgent | Remove external imports from widget.py |\\n| MCP connection failed | Check server is running, verify transport settings |\\n| Parameter mismatch | Ensure MCP parameters match InputsSchema |\\n| Missing dependencies | Use `uv add` to install packages |\\n| Missing README.md | Run `uv init` first to create the project structure |\\n\\nFor complete troubleshooting, see `widgets/05_common_failures.md`.\\n\\n## External API Integration\\n\\n⚠️ **CRITICAL**: When user requirements involve ANY external API calls, you MUST first consult `widgets/07_external_apis.md` for approved implementations.\\n\\n### 🚨 Web Scraping MUST Use Apify\\n\\n**IMPORTANT**: For ALL web scraping tasks (YouTube, Twitter, Instagram, TikTok, LinkedIn, etc.):\\n- ✅ **ONLY use Apify** - It\'s the only commercially viable solution with guaranteed performance\\n- ❌ **NEVER use** other scraping libraries (BeautifulSoup, Scrapy, Selenium, etc.) - they are unreliable for production use\\n- ❌ **NEVER implement** custom scrapers - they will fail with anti-bot measures\\n\\n**Why Apify is mandatory:**\\n- **Commercial-grade reliability** - Battle-tested for production environments\\n- **Legal compliance** - Handles robots.txt and rate limiting properly\\n- **Anti-bot protection** - Built-in proxy rotation and browser fingerprinting\\n- **Maintained actors** - Regular updates to handle platform changes\\n\\n### Implementation Rules\\n\\n1. **ALWAYS check `widgets/07_external_apis.md` FIRST** before implementing any external API\\n2. **Use `environ` parameter for API keys** - NEVER use `os.environ`\\n3. **NEVER add unapproved external dependencies** without consulting the documentation\\n4. **All external API code MUST be in `server.py`**, never in `widget.py`\\n5. **Follow the exact patterns** shown in the external APIs documentation\\n\\nFor complete API integration documentation and approved implementations, see `widgets/07_external_apis.md`.\\n\\n"}],"type":"message"}',
        },
      },
    ],
  },
};
export const msg3 = {
  id: 52,
  message_id: 1750767479197312,
  timestamp: '2025-06-24T12:18:09.800676',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'agent_log',
        content: {
          text: '\ud83d\udcdd {"id":"rs_685a977c970c819b88d3f3faf34888d20c6a39901c840833","type":"reasoning","summary":[],"duration_ms":6592}',
        },
      },
    ],
  },
};

export const msg4 = {
  id: 53,
  message_id: 1750767479197312,
  timestamp: '2025-06-24T12:18:10.302446',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'agent_log',
        content: {
          text: '\ud83d\udcdd {"id":"fc_685a97814c88819ba3c5ab579284fef40c6a39901c840833","type":"function_call","status":"completed","arguments":"{\\"command\\":[\\"bash\\",\\"-lc\\",\\"ls -R\\"]}","call_id":"call_r6SZeqznNiABZoWhYqf3SFDu","name":"shell"}',
        },
      },
    ],
  },
};

export const msg0 = {
  id: 67,
  message_id: 1750767479197312,
  timestamp: '2025-06-24T12:18:23.567574',
  source: 'agent',
  type: 'agent_state_changed',
  status: 'completed',
  args: { agent_state: 'idle', reason: '' },
  runtime_image_id: 'im-AUNGjoMeWtzPCs4yWlglEt',
};

export const msg5 = {
  id: 68,
  message_id: 1750767505381877,
  timestamp: '2025-06-24T12:18:25.381859',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'agent_log',
        content: {
          text: '\ud83d\udcdd {"id":"rs_685a978f4c14819b980a2a11f91890930c6a39901c840833","type":"reasoning","summary":[],"duration_ms":22101}',
        },
      },
    ],
  },
};
export const msg6 = {
  id: 69,
  message_id: 1750767505381877,
  timestamp: '2025-06-24T12:18:25.883996',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'agent_log',
        content: {
          text: '\ud83d\udcdd {"id":"fc_685a97908724819b85aaeccd0521bf060c6a39901c840833","type":"function_call","status":"completed","arguments":"{\\"command\\":[\\"bash\\",\\"-lc\\",\\"uv add --project custom_widgets/xinjiang_attraction_recommendation fastmcp>=2.3.4 pydantic==2.9.2\\"],\\"timeout\\":100000}","call_id":"call_WO7HVTihb9LjFmIbpHxIHRWd","name":"shell"}',
        },
      },
    ],
  },
};

export const think_msg_1 = {
  id: 3,
  message_id: 1750938574846908,
  timestamp: '2025-06-26T11:49:42.599125',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'think',
        content: {
          text: '🔧 正在调用工具: **requirements_create**\n参数: {\n  "title": "中英文翻译机器人",\n  "items": [\n    "创建需求列表和用户旅程",\n    "获取现有翻译相关组件",\n    "设计翻译流程状态机",\n    "生成完整的翻译应用程序"\n  ]\n}',
        },
      },
    ],
  },
};

export const think_msg_2 = {
  id: 4,
  message_id: 1750938574846908,
  timestamp: '2025-06-26T11:49:48.779975',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'think',
        content: {
          text: '🔧 正在调用工具: **requirements_create**\n参数: {\n  "title": "中英文翻译机器人",\n  "items": [\n    "创建需求列表和用户旅程",\n    "获取现有翻译相关组件",\n    "设计翻译流程状态机",\n    "生成完整的翻译应用程序"\n  ]\n}',
        },
      },
    ],
  },
};

export const think_msg_3 = {
  id: 5,
  message_id: 1750938574846908,
  timestamp: '2025-06-26T11:49:55.200830',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'think',
        content: {
          text: '🔧 正在调用工具: **requirements_create**\n参数: {\n  "title": "中英文翻译机器人",\n  "items": [\n    "创建需求列表和用户旅程",\n    "获取现有翻译相关组件",\n    "设计翻译流程状态机",\n    "生成完整的翻译应用程序"\n  ]\n}',
        },
      },
    ],
  },
};

export const loading_msg_1 = {
  id: 69,
  // message_id: 1750767505381877,
  message_id: 1750938574846908,
  timestamp: '2025-06-24T12:18:25.883996',
  source: 'agent',
  type: 'chat_status_message',
  args: {
    text: '正在思考中...',
  },
};

export const loading_msg_2 = {
  id: 70,
  message_id: 1750767505381877,
  timestamp: '2025-06-24T12:18:25.883996',
  source: 'agent',
  type: 'chat_status_message',
  args: {
    text: '思考结束',
  },
};

export const loading_replace_msg = {
  id: 70,
  message_id: 1750767505381877,
  timestamp: '2025-06-24T12:18:25.883996',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '你好，有什么可以帮你的吗？我可以帮你实现任意功能，请使用 *生成+功能名称* 命令来生成代码',
        },
      },
    ],
  },
};

export const progress_msg_1 = {
  id: 952,
  message_id: 1750939829860014,
  timestamp: '2025-06-26T20:10:32.125189',
  source: 'agent',
  type: 'chat_progress_message',
  cause: 951,
  status: 'pending',
  args: {
    text: 'ShellAgent is generating...',
    progress: 22,
  },
};

export const progress_msg_2 = {
  id: 953,
  message_id: 1750939829860014,
  timestamp: '2025-06-26T20:10:32.127585',
  source: 'agent',
  type: 'chat_progress_message',
  cause: 952,
  status: 'pending',
  args: {
    text: 'ShellAgent is generating...',
    progress: 80,
  },
};

export const progress_msg_3 = {
  id: 954,
  message_id: 1750939829860014,
  timestamp: '2025-06-26T20:10:32.129372',
  source: 'agent',
  type: 'chat_progress_message',
  cause: 953,
  status: 'pending',
  args: {
    text: 'ShellAgent is generating...',
    progress: 100,
  },
};

const msg_01 = {
  type: 'chat_status_message',
  message_id: 1,
};

const msg_02 = {
  type: 'chat_message',
  message_id: 1,
  args: {
    content_blocks: [
      {
        type: 'think',
      },
    ],
  },
};

const msg_03 = {
  type: 'chat_message',
  message_id: 1,
  // append
  args: {
    content_blocks: [
      {
        type: 'think',
      },
    ],
  },
};

// progress 必须得不一样
const msg_04 = {
  type: 'chat_progress_message',
  message_id: 2,
  // append
  args: {
    progress: 10,
  },
};

// progress
const msg_05 = {
  type: 'chat_progress_message',
  message_id: 2,
  // append
  args: {
    progress: 100,
  },
};

// think
// 方案1
const msg_06 = {
  type: 'chat_message',
  message_id: 1,
  // append
  args: {
    content_blocks: [
      {
        type: 'think',
      },
    ],
  },
};

/**
 1. progress_message complete chat message list 移除
 2. 保证 message_id
 */

// 方案2
const msg_06_2 = {
  type: 'chat_message',
  message_id: 3,
  // append
  args: {
    content_blocks: [
      {
        type: 'think',
      },
    ],
  },
};

export const hi_msg = {
  id: -1,
  message_id: 1,
  source: 'server',
  type: 'chat_message',
  status: 'completed',
  timestamp: '2025-06-26T20:10:32.125189',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: "\nHello! 👋 \n\nI'm your Lead Product Architect at ShellAgent, and I'm here to help you transform your ideas into powerful AI applications. \n\nI specialize in:\n- **App Planning & Design** - Breaking down your requirements into actionable plans\n- **AI Application Development** - Creating complete ShellAgent apps with custom workflows\n- **Widget Creation** - Building custom components for specific functionalities\n- **User Experience Design** - Crafting intuitive user journeys and state flows\n\n**What would you like to build today?** \n\nSome examples of what we can create together:\n- AI assistants for specific tasks or domains\n- Data processing and analysis tools\n- Content generation applications\n- API integration workflows\n- Interactive chatbots with custom logic\n\nJust tell me about your idea - whether it's a simple concept or a detailed vision - and I'll guide you through the entire development process step by step!\n\nWhat's on your mind? 🚀\n            ",
        },
      },
    ],
  },
};

export const loading_msg_case_1 = {
  id: 1,
  message_id: 1750992899671229,
  timestamp: '2025-06-27T02:54:59.671220',
  source: 'server',
  type: 'chat_status_message',
  status: 'completed',
  args: { text: 'ShellAgent is generating...', status: 'loading' },
};
