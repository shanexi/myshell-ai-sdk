export const msg1 = {
  id: 50,
  message_id: 1750767479197312,
  timestamp: '2025-06-24T12:18:03.279657',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'agent_log',
        content: {
          text: '\ud83d\udcdd ! Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-10.12.3.tgz',
        },
      },
    ],
  },
};

export const msg2 = {
  id: 51,
  message_id: 1750767479197312,
  timestamp: '2025-06-24T12:18:03.285941',
  source: 'agent',
  type: 'chat_message',
  status: 'pending',
  args: {
    content_blocks: [
      {
        type: 'agent_log',
        content: {
          text: '\ud83d\udcdd {"role":"user","content":[{"type":"input_text","text":"\\nCreate a new ShellAgent custom widget using the MCP (Model Context Protocol) architecture.\\n\\nWidget Details:\\n- Class Name: XinjiangAttractionRecommendationWidget\\n- Folder Name: xinjiang_attraction_recommendation\\n\\nExternal Library Usage:\\n\\n\\nUser Requirements:\\n\u521b\u5efa\u4e00\u4e2a\u65b0\u7586\u666f\u70b9\u63a8\u8350Widget\uff0c\u5177\u4f53\u529f\u80fd\u9700\u6c42\uff1a\\n\\n**\u529f\u80fd\u63cf\u8ff0\uff1a**\\n\u6839\u636e\u7528\u6237\u63d0\u4f9b\u7684\u65b0\u7586\u57ce\u5e02\u5217\u8868\u548c\u65c5\u884c\u65f6\u95f4\uff08\u6708\u4efd\uff09\uff0c\u667a\u80fd\u63a8\u8350\u6700\u9002\u5408\u7684\u81ea\u7136\u666f\u70b9\u3002\u8981\u8003\u8651\u4e0d\u540c\u5b63\u8282\u7684\u666f\u70b9\u7279\u8272\u3002\\n\\n**\u8f93\u5165\u53c2\u6570\uff1a**\\n- cities: List[str] - \u65b0\u7586\u57ce\u5e02\u5217\u8868\uff08\u5982\uff1a[\'\u4e4c\u9c81\u6728\u9f50\', \'\u5580\u4ec0\', \'\u4f0a\u7281\', \'\u8d3e\u767b\u5cea\']\uff09\\n- travel_month: int - \u65c5\u884c\u6708\u4efd\uff081-12\uff09\\n\\n**\u8f93\u51fa\u53c2\u6570\uff1a**\\n- recommendations: List[Dict] - \u63a8\u8350\u7684\u666f\u70b9\u5217\u8868\uff0c\u6bcf\u4e2a\u5143\u7d20\u5305\u62ec\uff1a\\n  - city: str - \u6240\u5c5e\u57ce\u5e02\\n  - attraction_name: str - \u666f\u70b9\u540d\u79f0\\n  - description: str - \u666f\u70b9\u63cf\u8ff0\\n  - best_season: str - \u6700\u4f73\u65c5\u6e38\u5b63\u8282\\n  - recommendation_reason: str - \u63a8\u8350\u7406\u7531\uff08\u4e3a\u4ec0\u4e48\u5728\u8be5\u6708\u4efd\u63a8\u8350\uff09\\n  - type: str - \u666f\u70b9\u7c7b\u578b\uff08\u81ea\u7136\u98ce\u5149\u3001\u6587\u5316\u666f\u89c2\u7b49\uff09\\n\\n**\u5177\u4f53\u8981\u6c42\uff1a**\\n1. \u5185\u7f6e\u65b0\u7586\u4e3b\u8981\u57ce\u5e02\u548c\u666f\u70b9\u7684\u6570\u636e\u5e93\\n2. \u6839\u636e\u4e0d\u540c\u6708\u4efd\u63a8\u8350\u6700\u9002\u5408\u7684\u666f\u70b9\uff1a\\n   - 3-5\u6708\uff1a\u674f\u82b1\u3001\u6843\u82b1\u3001\u90c1\u91d1\u9999\u7b49\u6625\u82b1\\n   - 6-8\u6708\uff1a\u8349\u539f\u98ce\u5149\u3001\u96ea\u5c71\u76db\u666f\\n   - 9-11\u6708\uff1a\u80e1\u6768\u6797\u3001\u79cb\u8272\u98ce\u666f\\n   - 12-2\u6708\uff1a\u51ac\u5b63\u96ea\u666f\u3001\u6ed1\u96ea\u573a\u6240\\n3. \u4f18\u5148\u63a8\u8350\u81ea\u7136\u98ce\u5149\u7c7b\u666f\u70b9\\n4. \u6bcf\u4e2a\u57ce\u5e02\u63a8\u8350 2-4 \u4e2a\u6700\u4f73\u666f\u70b9\\n5. \u8003\u8651\u81ea\u9a7e\u53ef\u8fbe\u6027\u548c\u8def\u7ebf\u5408\u7406\u6027\\n\\n**\u793a\u4f8b\u6570\u636e\uff1a**\\n\u5982\u4f20\u5165 cities=[\'\u4e4c\u9c81\u6728\u9f50\', \'\u5580\u4ec0\'], travel_month=4\uff0c\u5e94\u8fd4\u56de\u6625\u5b63\u76f8\u5173\u7684\u63a8\u8350\u3002\\n\\n\ud83d\udea8 CRITICAL CONSTRAINTS:\\n- ONLY work with files in the custom_widgets folder\\n- Use \'uv init custom_widgets/xinjiang_attraction_recommendation --no-workspace\' to initialize the working directory\\n- DO NOT attempt to list or view files outside custom_widgets directory\\n- DO NOT enumerate the entire project structure - focus exclusively on the widget being developed\\n\\nIMPORTANT GUIDELINES:\\n# ShellAgent Custom Widget Development Guide\\n\\n## Overview\\n\\nShellAgent Custom Widgets are extension components for the ShellAgent platform, allowing developers to create custom functionalities and seamlessly integrate them into ShellAgent workflows. The new version of Custom Widgets adopts the MCP (Model Context Protocol) service architecture, making components more modular, independent, and easier to develop. Each custom widget has its own independent uv Python environment.\\n\\n## \ud83d\udea8 CRITICAL: Folder Restrictions\\n\\n**IMPORTANT**: When generating or modifying custom widgets:\\n- **ONLY** work with files in the `custom_widgets` folder\\n- **ONLY** modify code in the corresponding widget\'s subfolder under `custom_widgets`\\n- **DO NOT** attempt to view or list contents of other folders\\n- **DO NOT** access or modify files outside the `custom_widgets` directory\\n- **FOCUS EXCLUSIVELY** on the custom widget being developed\\n\\n## Quick Start\\n\\n### 1. Initialize the project using uv\\n\\n```bash\\n# Create and initialize the project in one step\\nuv init custom_widgets/my_widget --no-workspace\\n\\n# Enter the project directory\\ncd custom_widgets/my_widget\\n\\n# Add basic dependencies, **please ensure that fastmcp version >= 2.3.4**\\nuv add fastmcp>=2.3.4 pydantic==2.9.2\\n\\n# For any dependencies required by the project, call\\nuv add xxx\\n```\\n\\n**Note**: The `uv init` command automatically creates these files:\\n- `pyproject.toml` - Project configuration\\n- `README.md` - Required for `uv sync` to work\\n- `.gitignore` - Git ignore rules\\n\\n### 2. Project Structure\\n\\nAfter initialization, create the following files:\\n\\n```\\ncustom_widgets/\\n\u251c\u2500\u2500 my_custom_widget/\\n\u2502   \u251c\u2500\u2500 __init__.py      # import shellagent widget class\\n\u2502   \u251c\u2500\u2500 main.py          # Test script\\n\u2502   \u251c\u2500\u2500 server.py        # MCP service definition\\n\u2502   \u251c\u2500\u2500 widget.py        # Widget class definition\\n\u2502   \u251c\u2500\u2500 pyproject.toml   # Project configuration (auto-created by uv init)\\n\u2502   \u2514\u2500\u2500 README.md        # Required for uv sync (auto-created by uv init)\\n```\\n\\n## Core Development Files\\n\\n### 1. Widget Class (`widget.py`)\\n\\n\u26a0\ufe0f **CRITICAL**: This file must NOT import any external dependencies! Only use standard library and ShellAgent internal modules.\\n\\n```python\\n# \u2705 ALLOWED IMPORTS ONLY - No external dependencies!\\nimport os\\nimport asyncio\\nfrom pydantic import Field\\nfrom typing import Any, Optional\\nfrom proconfig.widgets.base import WIDGETS, BaseWidget\\nfrom proconfig.widgets.custom_widgets import run_custom_widgets\\n\\n# \u274c NEVER ADD EXTERNAL IMPORTS HERE - They belong in server.py\\n\\n@WIDGETS.register_module()\\nclass MyCustomWidget(BaseWidget):\\n    # CATEGORY and NAME should be defined mandatory\\n    CATEGORY = \\"Custom Widgets/My Category\\"\\n    NAME = \\"My Custom Widget\\"\\n    \\n    class InputsSchema(BaseWidget.InputsSchema):\\n        # Define inputs using Pydantic types with Field\\n        input_param: str = Field(\\"Default Value\\", description=\\"Input parameter description\\")\\n        count: int = Field(10, description=\\"Number of items to process\\")\\n        enabled: bool = Field(True, description=\\"Whether to enable processing\\")\\n    \\n    class OutputsSchema(BaseWidget.OutputsSchema):\\n        # Define outputs - these will be populated from server.py return dict\\n        output_param: str\\n        result_count: int\\n        success: bool\\n        \\n    def execute(self, environ, config):\\n        # Call MCP service, format: folder_name/ComponentClassName\\n        output = asyncio.run(run_custom_widgets(\\n            \'my_widget/MyCustomWidget\',  # Note the naming convention here\\n            environ, \\n            config\\n        ))\\n        return output\\n```\\n\\n### 2. MCP Service (`server.py`)\\n\\n\u2705 **All external dependencies go here!** This file can import any packages installed via `uv add`.\\n\\n\u26a0\ufe0f **CRITICAL**: MCP tool function parameters must use Python basic types only (str, int, float, bool, list, dict), NOT Pydantic models!\\n\\n```python\\n# \u2705 External dependencies are allowed and encouraged here\\nimport argparse\\nfrom fastmcp import FastMCP\\n# Add any other external imports you need\\n\\n# REQUIRED: Parse command line arguments for MCP transport\\nparser = argparse.ArgumentParser(description=\'My Custom Widget MCP Server\')\\nparser.add_argument(\'--host\', default=\'127.0.0.1\', help=\'Host to bind the server to\')\\nparser.add_argument(\'--port\', type=int, default=8000, help=\'Port to run the server on\')\\nparser.add_argument(\'--transport\', default=\\"stdio\\", help=\'Transport protocol (stdio or streamable-http)\')\\nargs = parser.parse_args()\\n\\n# Initialize MCP service\\nmcp = FastMCP(\\"MyCustomWidget\\")\\n\\n@mcp.tool(name=\\"MyCustomWidget\\")\\ndef my_widget_tool(environ: dict, input_param: str, count: int, enabled: bool) -> dict:\\n    \\"\\"\\"\\n    MCP service tool implementation\\n    \\n    IMPORTANT: \\n    - Parameters must use basic Python types (str, int, bool, dict, list)\\n    - Return must be a dict that matches widget.py OutputsSchema fields\\n    - The returned dict will be automatically converted to OutputsSchema\\n    \\"\\"\\"\\n    # Implement your logic here with external libraries\\n    processed_data = process_with_external_lib(input_param)\\n    \\n    return {\\n        \\"output_param\\": f\\"Processed: {processed_data}\\",\\n        \\"result_count\\": count if enabled else 0,\\n        \\"success\\": enabled\\n    }\\n\\nif __name__ == \\"__main__\\":\\n    # REQUIRED: Use transport configuration\\n    if args.transport == \\"stdio\\":\\n        mcp.run()\\n    else:\\n        mcp.run(transport=\\"streamable-http\\", host=args.host, port=args.port)\\n```\\n\\n### 3. Test Script (`main.py`)\\n\\n**IMPORTANT**: After creating your widget, you MUST write test cases in `main.py` and verify they pass using `uv run main.py`.\\n\\nBasic test script template:\\n\\n```python\\nimport json\\nimport asyncio\\nfrom fastmcp import Client\\n\\nasync def main():\\n    \\"\\"\\"Test the custom widget with various test cases\\"\\"\\"\\n    async with Client(\\"server.py\\") as client:\\n        print(f\\"\u2713 Client connected: {client.is_connected()}\\")\\n\\n        # List available tools\\n        tools = await client.list_tools()\\n        print(f\\"\u2713 Available tools: {tools}\\")\\n\\n        # Test Case 1: Basic functionality\\n        print(\\"\\\\n--- Test Case 1: Basic Functionality ---\\")\\n        try:\\n            # Note: Parameters match server.py function signature (basic types)\\n            result = await client.call_tool(\\"MyCustomWidget\\", {\\n                \\"environ\\": {}, \\n                \\"input_param\\": \\"Test Data\\",\\n                \\"count\\": 5,\\n                \\"enabled\\": True\\n            })\\n            result_data = json.loads(result[0].text)\\n            print(f\\"\u2713 Basic test passed: {result_data}\\")\\n            \\n            # Verify returned dict has fields matching OutputsSchema\\n            assert result_data[\\"success\\"] == True\\n            assert result_data[\\"result_count\\"] == 5\\n            assert \\"output_param\\" in result_data\\n        except Exception as e:\\n            print(f\\"\u2717 Basic test failed: {e}\\")\\n            raise\\n\\n        # Test Case 2: Edge case - disabled processing\\n        print(\\"\\\\n--- Test Case 2: Disabled Processing ---\\")\\n        try:\\n            result = await client.call_tool(\\"MyCustomWidget\\", {\\n                \\"environ\\": {}, \\n                \\"input_param\\": \\"Test Data\\",\\n                \\"count\\": 10,\\n                \\"enabled\\": False\\n            })\\n            result_data = json.loads(result[0].text)\\n            print(f\\"\u2713 Disabled test passed: {result_data}\\")\\n            assert result_data[\\"success\\"] == False\\n            assert result_data[\\"result_count\\"] == 0\\n        except Exception as e:\\n            print(f\\"\u2717 Disabled test failed: {e}\\")\\n            raise\\n\\n        # Test Case 3: Error handling\\n        print(\\"\\\\n--- Test Case 3: Error Handling ---\\")\\n        try:\\n            # Test with invalid input to verify error handling\\n            result = await client.call_tool(\\"MyCustomWidget\\", {\\n                \\"environ\\": {},\\n                \\"input_param\\": \\"\\",  # Empty input\\n                \\"count\\": -1,  # Invalid count\\n                \\"enabled\\": True\\n            })\\n            result_data = json.loads(result[0].text)\\n            print(f\\"\u2713 Error handling test completed: {result_data}\\")\\n        except Exception as e:\\n            print(f\\"\u2713 Error correctly caught: {e}\\")\\n\\n        print(\\"\\\\n\u2705 All tests completed successfully!\\")\\n\\nif __name__ == \\"__main__\\":\\n    asyncio.run(main())\\n```\\n\\nFor image/media widgets, include CDN upload tests:\\n\\n```python\\n# Test Case 4: Media upload test (for widgets that return media)\\nprint(\\"\\\\n--- Test Case 4: Media Upload ---\\")\\ntry:\\n    result = await client.call_tool(\\"ImageWidget\\", {\\n        \\"environ\\": {},\\n        \\"prompt\\": \\"Generate a test image\\"\\n    })\\n    result_data = json.loads(result[0].text)\\n    \\n    # Verify CDN URL is returned, not base64\\n    assert \\"image_url\\" in result_data\\n    assert result_data[\\"image_url\\"].startswith(\\"http\\")\\n    assert \\"base64\\" not in result_data[\\"image_url\\"]\\n    print(f\\"\u2713 Media upload test passed: {result_data[\'image_url\']}\\")\\nexcept Exception as e:\\n    print(f\\"\u2717 Media upload test failed: {e}\\")\\n    raise\\n```\\n\\nSee `widgets/04_widget_examples.md` for more complete test examples.\\n\\n### 4. Init File (`__init__.py`)\\n\\n```python\\nfrom .widget import MyCustomWidget\\n```\\n\\n## Key Concepts\\n\\n### MCP Service Naming Convention\\n- Folder: `custom_widgets/my_widget`\\n- Component Class: `MyCustomWidget`\\n- Tool name in run_custom_widgets: `my_widget/MyCustomWidget`\\n- MCP Tool Name: `MyCustomWidget`\\n\\n### Type Requirements\\n\\n**\ud83d\udea8 CRITICAL SEPARATION:**\\n\\n**widget.py (ShellAgent Environment)**:\\n- \u2705 **USE Pydantic**: InputsSchema and OutputsSchema with Field definitions\\n- \u2705 **MUST HAVE** InputsSchema and OutputsSchema classes\\n\\n**server.py (MCP Environment)**:\\n- \u2705 **USE basic Python types**: `str`, `int`, `float`, `bool`, `list`, `dict`\\n- \u274c **NO Pydantic models** in tool function signatures\\n- \u274c **NO complex type hints** in MCP tool parameters\\n- \u2705 **RETURN dict** that matches OutputsSchema field names, but return the dict directly, no need to use pydantic validation\\n\\n**Connection**: \\n- widget.py calls server.py via `run_custom_widgets()`\\n- server.py returns dict \u2192 automatically converted to OutputsSchema\\n\\n### Media File Support\\nTo return images/audio/video, you must implement the upload functionality in your MCP server.py file, NOT in widget.py:\\n\\n\u26a0\ufe0f **CRITICAL**: \\n1. Custom widgets CANNOT import from ShellAgent\'s codebase! The upload functionality must be implemented in server.py.\\n2. **NEVER return base64 encoded media** - ShellAgent cannot recognize base64!\\n3. **ALWAYS upload images/audio/video to CDN and return URLs**\\n\\n**In server.py** (where external dependencies are allowed):\\n```python\\nimport argparse\\nimport requests\\nimport logging\\nimport time\\nfrom fastmcp import FastMCP\\n\\n# REQUIRED: Parse command line arguments\\nparser = argparse.ArgumentParser(description=\'My Custom Widget MCP Server\')\\nparser.add_argument(\'--host\', default=\'127.0.0.1\', help=\'Host to bind the server to\')\\nparser.add_argument(\'--port\', type=int, default=8000, help=\'Port to run the server on\')\\nparser.add_argument(\'--transport\', default=\\"stdio\\", help=\'Transport protocol (stdio or streamable-http)\')\\nargs = parser.parse_args()\\n\\nmcp = FastMCP(\\"MyCustomWidget\\")\\n\\n# Define supported file types\\next_to_type = {\\n    # image\\n    \'.png\': \'image/png\',\\n    \'.jpg\': \'image/jpeg\',\\n    \'.jpeg\': \'image/jpeg\',\\n    \'.gif\': \'image/gif\',\\n    \'.bmp\': \'image/bmp\',\\n    \'.webp\': \'image/webp\',\\n    # video\\n    \'.mp4\': \'video/mp4\',\\n    \'.mkv\': \'video/x-matroska\',\\n    \'.webm\': \'video/webm\',\\n    \'.avi\': \'video/x-msvideo\',\\n    \'.mov\': \'video/quicktime\',\\n    # audio\\n    \'.mp3\': \'audio/mpeg\',\\n    \'.wav\': \'audio/wav\',\\n    \'.m4a\': \'audio/mp4\',\\n    # json\\n    \'.json\': \'application/json\',\\n    # .zip\\n    \'.zip\': \'application/zip\',\\n}\\n\\ndef upload_file_to_myshell(local_file: str) -> str:\\n    \\"\\"\\"Upload a file to MyShell CDN and return the URL\\"\\"\\"\\n    server_url = \\"https://openapi.myshell.ai/public/v1/store\\"\\n    headers = {\\n        \'x-myshell-openapi-key\': \\"OPENSOURCE_FIXED\\"\\n    }\\n\\n    assert os.path.isfile(local_file)\\n    start_time = time.time()\\n    ext = os.path.splitext(local_file)[1]\\n    if ext.lower() in ext_to_type.keys():\\n        files = [\\n            (\'file\', (os.path.basename(local_file), open(local_file, \'rb\'), ext_to_type[ext.lower()])),\\n        ]\\n    else:\\n        error = {\\n            \'error_code\': \'SHELL-1109\',\\n            \'error_head\': \'HTTP Request Error\', \\n            \'msg\': f\\"Unsupported file type: {ext}\\",\\n        }\\n        raise Exception(**error)\\n    response = requests.request(\\"POST\\", server_url, headers=headers, files=files)\\n    if response.status_code == 200:\\n        end_time = time.time()\\n        logging.info(f\\"{local_file} uploaded, time elapsed: {end_time - start_time}\\")\\n        return response.json()[\'url\']\\n    else:\\n        error = {\\n            \'error_code\': \'SHELL-1109\',\\n            \'error_head\': \'HTTP Request Error\', \\n            \'msg\': f\\"[HTTP ERROR] {response.status_code} - {response.text} \\\\n\\",\\n        }\\n        raise Exception(**error)\\n\\n@mcp.tool(name=\\"MyCustomWidget\\")\\ndef my_widget_tool(environ: dict, input_param: str) -> dict:\\n    \\"\\"\\"MCP service tool implementation\\"\\"\\"\\n    # Process and generate an image\\n    output_path = \\"/tmp/generated_image.png\\"\\n    # ... your image generation logic ...\\n    \\n    # Upload to CDN\\n    cdn_url = upload_file_to_myshell(output_path)\\n    \\n    return {\\n        \\"image_url\\": cdn_url,\\n        \\"success\\": True\\n    }\\n\\nif __name__ == \\"__main__\\":\\n    # REQUIRED: Use transport configuration\\n    if args.transport == \\"stdio\\":\\n        mcp.run()\\n    else:\\n        mcp.run(transport=\\"streamable-http\\", host=args.host, port=args.port)\\n```\\n\\n**Environment Separation Reminder**:\\n- **widget.py** runs in the ShellAgent environment \u2192 NO external imports allowed\\n- **server.py** runs in the MCP environment \u2192 External imports and custom implementations are allowed\\n\\n**Media File Rules**:\\n- \u274c **NEVER** return base64 encoded images/audio/video - ShellAgent cannot recognize them!\\n- \u2705 **ALWAYS** upload media files to CDN using `upload_file_to_myshell` and return URLs\\n- \u2705 The upload function MUST be implemented in server.py, NOT imported\\n\\n## Testing\\n\\n### Running Tests\\n\\n**CRITICAL**: Always run and verify your tests before delivering the widget!\\n\\n#### 1. MCP Service Tests (Required)\\n\\n```bash\\n# Enter the component directory\\ncd custom_widgets/my_widget\\n\\n# Install the project in development mode\\nuv sync\\n\\n# Run the test script using uv\\nuv run python main.py\\n\\n# Expected output:\\n# \u2713 Client connected: True\\n# \u2713 Available tools: [...]\\n# --- Test Case 1: Basic Functionality ---\\n# \u2713 Basic test passed: {...}\\n# --- Test Case 2: Disabled Processing ---\\n# \u2713 Disabled test passed: {...}\\n# --- Test Case 3: Error Handling ---\\n# \u2713 Error correctly caught: ...\\n# \u2705 All tests completed successfully!\\n```\\n\\n#### 2. ShellAgent Environment Tests (Required)\\n\\n**CRITICAL**: After MCP tests pass, you MUST test the widget in the ShellAgent environment to ensure it can be properly imported and executed.\\n\\nCreate a test script in the **root directory** (ShellAgentInternal/) to test widget integration:\\n\\n```bash\\n# Create test script in root directory (where uv environment has ShellAgent dependencies)\\ncd /path/to/ShellAgentInternal\\n\\n# Create widget integration test script\\ncat > test_widget_my_custom.py << \'EOF\'\\nfrom proconfig.widgets.base import build_widgets\\n\\n# Test widget import and instantiation\\nprint(\\"Testing widget import...\\")\\ntry:\\n    module = build_widgets(\\"MyCustomWidget\\")\\n    print(\\"\u2713 Widget imported successfully\\")\\nexcept Exception as e:\\n    print(f\\"\u2717 Widget import failed: {e}\\")\\n    exit(1)\\n\\n# Test widget execution with sample data\\nprint(\\"\\\\nTesting widget execution...\\")\\ntry:\\n    # Prepare test inputs matching your InputsSchema\\n    inputs = {\\n        \\"input_param\\": \\"Test Data\\",\\n        \\"count\\": 5,\\n        \\"enabled\\": True\\n    }\\n    \\n    # Execute widget\\n    result = module({}, inputs)\\n    print(f\\"\u2713 Widget execution successful: {result}\\")\\n    \\n    # Validate output structure\\n    assert isinstance(result, dict), \\"Result must be a dictionary\\"\\n    print(\\"\u2713 Output validation passed\\")\\n    \\nexcept Exception as e:\\n    print(f\\"\u2717 Widget execution failed: {e}\\")\\n    exit(1)\\n\\nprint(\\"\\\\n\u2705 All ShellAgent environment tests passed!\\")\\nEOF\\n\\n# Run the test using uv in the root directory\\nuv run test_widget_my_custom.py\\n\\n# Expected output:\\n# Testing widget import...\\n# \u2713 Widget imported successfully\\n# \\n# Testing widget execution...\\n# \u2713 Widget execution successful: {...}\\n# \u2713 Output validation passed\\n# \\n# \u2705 All ShellAgent environment tests passed!\\n```\\n\\n**Why ShellAgent Environment Testing is Critical:**\\n- Verifies the widget can be imported by ShellAgent\'s build_widgets system\\n- Tests the actual execution path that will be used in production\\n- Catches issues with ShellAgent-specific dependencies\\n- Validates the widget works in the same uv environment as ShellAgent\\n\\n### Test Requirements\\n\\nYour testing must include both levels:\\n\\n#### MCP Service Tests (`main.py` in widget directory):\\n1. **Connection test** - Verify MCP server is reachable\\n2. **Basic functionality test** - Test normal operation with valid inputs\\n3. **Edge case tests** - Test boundary conditions and special cases\\n4. **Error handling test** - Verify graceful error handling\\n5. **Media upload test** (if applicable) - Verify CDN URLs are returned, not base64\\n\\n#### ShellAgent Environment Tests (script in root directory):\\n1. **Import test** - Verify widget can be imported via build_widgets\\n2. **Instantiation test** - Verify widget class can be created\\n3. **Execution test** - Verify widget.execute() works correctly\\n4. **Output validation** - Verify result matches expected schema\\n5. **Dependency test** - Verify all required dependencies are available\\n\\n### Test Validation\\n\\nBefore delivering, ensure:\\n- \u2705 All MCP test cases pass without errors\\n- \u2705 MCP server starts successfully\\n- \u2705 ShellAgent environment tests pass\\n- \u2705 Widget can be imported via build_widgets\\n- \u2705 Widget executes successfully in ShellAgent environment\\n- \u2705 Output matches expected schema\\n- \u2705 Media files return CDN URLs (not base64)\\n- \u2705 Error cases are handled gracefully\\n- \u2705 No import conflicts or dependency issues\\n\\n## Complete Documentation References\\n\\nFor detailed information, consult these modular documentation files:\\n\\n### Widget Development\\n- **Widget Lifecycle**: `widgets/01_widget_lifecycle.md`\\n- **MCP Integration**: `widgets/02_mcp_integration.md`\\n- **Input/Output Schemas**: `widgets/03_input_output_schemas.md`\\n- **Widget Examples**: `widgets/04_widget_examples.md`\\n- **Common Failures**: `widgets/05_common_failures.md`\\n- **Best Practices**: `widgets/06_best_practices.md`\\n- **External APIs**: `widgets/07_external_apis.md`\\n\\n## Critical Requirements\\n\\n1. **\ud83d\udea8 widget.py MUST NOT import external dependencies!** All external imports go in server.py.\\n2. **\ud83d\udea8 server.py MUST include argument parser** with `--host`, `--port`, and `--transport` arguments.\\n3. **\ud83d\udea8 server.py MUST use transport-aware startup** logic (stdio vs streamable-http).\\n4. Always use `uv` to manage dependencies - never edit pyproject.toml manually.\\n5. Use `uv init xxx --no-workspace` to generate the custom_widget folder (this creates README.md automatically).\\n6. Ensure fastmcp version >= 2.3.4\\n7. **Write comprehensive test cases in main.py** and verify with `uv run python main.py`\\n8. **Test thoroughly until ALL test cases pass without errors**\\n9. Include complete uv venv folder when delivering.\\n10. Please ensure the generated widget can be imported and loaded directly.\\n\\n## Common Issues\\n\\n| Issue | Solution |\\n|-------|----------|\\n| Import error in ShellAgent | Remove external imports from widget.py |\\n| MCP connection failed | Check server is running, verify transport settings |\\n| Parameter mismatch | Ensure MCP parameters match InputsSchema |\\n| Missing dependencies | Use `uv add` to install packages |\\n| Missing README.md | Run `uv init` first to create the project structure |\\n\\nFor complete troubleshooting, see `widgets/05_common_failures.md`.\\n\\n## External API Integration\\n\\n\u26a0\ufe0f **CRITICAL**: When user requirements involve ANY external API calls, you MUST first consult `widgets/07_external_apis.md` for approved implementations.\\n\\n### \ud83d\udea8 Web Scraping MUST Use Apify\\n\\n**IMPORTANT**: For ALL web scraping tasks (YouTube, Twitter, Instagram, TikTok, LinkedIn, etc.):\\n- \u2705 **ONLY use Apify** - It\'s the only commercially viable solution with guaranteed performance\\n- \u274c **NEVER use** other scraping libraries (BeautifulSoup, Scrapy, Selenium, etc.) - they are unreliable for production use\\n- \u274c **NEVER implement** custom scrapers - they will fail with anti-bot measures\\n\\n**Why Apify is mandatory:**\\n- **Commercial-grade reliability** - Battle-tested for production environments\\n- **Legal compliance** - Handles robots.txt and rate limiting properly\\n- **Anti-bot protection** - Built-in proxy rotation and browser fingerprinting\\n- **Maintained actors** - Regular updates to handle platform changes\\n\\n### Implementation Rules\\n\\n1. **ALWAYS check `widgets/07_external_apis.md` FIRST** before implementing any external API\\n2. **Use `environ` parameter for API keys** - NEVER use `os.environ`\\n3. **NEVER add unapproved external dependencies** without consulting the documentation\\n4. **All external API code MUST be in `server.py`**, never in `widget.py`\\n5. **Follow the exact patterns** shown in the external APIs documentation\\n\\nFor complete API integration documentation and approved implementations, see `widgets/07_external_apis.md`.\\n\\n"}],"type":"message"}',
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
