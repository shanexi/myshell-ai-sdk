import { Chat } from '../chat';
import { Chat as PreviewChat } from '@myshell-run/preview-chat-ui';
import { cn, escapeForAttribute } from '@myshell-run/common-ui';
import { ShellAgentChatModel } from './shellagent-chat.model';
import { useInjection } from 'inversify-react';

// eslint-disable-next-line no-useless-escape
const error = `trace_id 656e9a8e-5d9a-11f0-a615-0242ac110003 runtime_error {"errorType":"RUNNING_ERROR_TYPE_ENGINE_ERROR","errorDetail":"Expression Evaluation Error\nTraceback (most recent call last):\n  File \"/app/proconfig/utils/expressions.py\", line 368, in evaluate_expression_python\n    evaluated_expression = safe_eval(expression, combined_ctx)\n  File \"/app/proconfig/utils/expressions.py\", line 357, in safe_eval\n    raise e\n  File \"/app/proconfig/utils/expressions.py\", line 348, in safe_eval\n    raise exception[0]\n  File \"/app/proconfig/utils/expressions.py\", line 329, in evaluation_target\n    result[0] = eval(compiled_code, restricted_globals)\n  File \"<string>\", line 1, in <module>\n  File \"/app/proconfig/utils/expressions.py\", line 22, in loads\n    return edict(json_repair.loads(s, *args, **kwargs))\n  File \"/app/.venv/lib/python3.10/site-packages/easydict/__init__.py\", line 137, in __init__\n    d = dict(d)\nValueError: dictionary update sequence element #0 has length 6; 2 is required\n\nDuring handling of the above exception, another exception occurred:\n\nTraceback (most recent call last):\n  File \"/app/app/api/services/app_service.py\", line 1395, in execute_automata\n    sess_state, render, _ = runner.run_automata(automata, sess_state, payload)\n  File \"/app/proconfig/runners/runner.py\", line 632, in run_automata\n    context, render, local_vars, output_vars = self.run_state(current_state, context, environ, payload)\n  File \"/app/proconfig/runners/runner.py\", line 571, in run_state\n    self.run_tasks_sequential(state, environ, local_vars)\n  File \"/app/proconfig/runners/runner.py\", line 377, in run_tasks_sequential\n    self.run_task(container, task, environ, local_vars)\n  File \"/app/proconfig/runners/runner.py\", line 291, in run_task\n    return self.run_widget_task(container, task, environ, local_vars)\n  File \"/app/proconfig/runners/runner.py\", line 217, in run_widget_task\n    run()\n  File \"/app/proconfig/runners/runner.py\", line 193, in run\n    raise e\n  File \"/app/proconfig/runners/runner.py\", line 132, in run\n    module_config = tree_map(lambda x: calc_expression(x, local_vars), task_inputs)\n  File \"/app/proconfig/utils/pytree.py\", line 745, in tree_map\n    return treespec.unflatten(map(func, *flat_args))\n  File \"/app/proconfig/utils/pytree.py\", line 606, in unflatten\n    leaves = list(leaves)\n  File \"/app/proconfig/runners/runner.py\", line 132, in <lambda>\n    module_config = tree_map(lambda x: calc_expression(x, local_vars), task_inputs)\n  File \"/app/proconfig/utils/expressions.py\", line 473, in calc_expression\n    raise e\n  File \"/app/proconfig/utils/expressions.py\", line 467, in calc_expression\n    return evaluate_expressions_with_context(expression, ctx.copy(), language=language, **kwargs)\n  File \"/app/proconfig/utils/expressions.py\", line 446, in evaluate_expressions_with_context\n    return evaluate_expression(expression, context, language=language, **kwargs)\n  File \"/app/proconfig/utils/expressions.py\", line 431, in evaluate_expression\n    return evaluate_expression_python(expression, context, **kwargs)\n  File \"/app/proconfig/utils/expressions.py\", line 380, in evaluate_expression_python\n    raise ShellException(**error)\nproconfig.core.exception.ShellException: Error evaluating expression 'json.loads(context.daily_kline_data)'. context keys: [dict_keys(['intro', 'fetch_daily', 'fetch_4h', 'fetch_15m', 'context'])]\n","error_code":"SHELL-1107","error_head":"Expression Evaluation Error","msg":"Error evaluating expression 'json.loads(context.daily_kline_data)'. context keys: [dict_keys(['intro', 'fetch_daily', 'fetch_4h', 'fetch_15m', 'context'])]","traceback":"Traceback (most recent call last):\n  File \"/app/proconfig/utils/expressions.py\", line 368, in evaluate_expression_python\n    evaluated_expression = safe_eval(expression, combined_ctx)\n  File \"/app/proconfig/utils/expressions.py\", line 357, in safe_eval\n    raise e\n  File \"/app/proconfig/utils/expressions.py\", line 348, in safe_eval\n    raise exception[0]\n  File \"/app/proconfig/utils/expressions.py\", line 329, in evaluation_target\n    result[0] = eval(compiled_code, restricted_globals)\n  File \"<string>\", line 1, in <module>\n  File \"/app/proconfig/utils/expressions.py\", line 22, in loads\n    return edict(json_repair.loads(s, *args, **kwargs))\n  File \"/app/.venv/lib/python3.10/site-packages/easydict/__init__.py\", line 137, in __init__\n    d = dict(d)\nValueError: dictionary update sequence element #0 has length 6; 2 is required\n\nDuring handling of the above exception, another exception occurred:\n\nTraceback (most recent call last):\n  File \"/app/app/api/services/app_service.py\", line 1395, in execute_automata\n    sess_state, render, _ = runner.run_automata(automata, sess_state, payload)\n  File \"/app/proconfig/runners/runner.py\", line 632, in run_automata\n    context, render, local_vars, output_vars = self.run_state(current_state, context, environ, payload)\n  File \"/app/proconfig/runners/runner.py\", line 571, in run_state\n    self.run_tasks_sequential(state, environ, local_vars)\n  File \"/app/proconfig/runners/runner.py\", line 377, in run_tasks_sequential\n    self.run_task(container, task, environ, local_vars)\n  File \"/app/proconfig/runners/runner.py\", line 291, in run_task\n    return self.run_widget_task(container, task, environ, local_vars)\n  File \"/app/proconfig/runners/runner.py\", line 217, in run_widget_task\n    run()\n  File \"/app/proconfig/runners/runner.py\", line 193, in run\n    raise e\n  File \"/app/proconfig/runners/runner.py\", line 132, in run\n    module_config = tree_map(lambda x: calc_expression(x, local_vars), task_inputs)\n  File \"/app/proconfig/utils/pytree.py\", line 745, in tree_map\n    return treespec.unflatten(map(func, *flat_args))\n  File \"/app/proconfig/utils/pytree.py\", line 606, in unflatten\n    leaves = list(leaves)\n  File \"/app/proconfig/runners/runner.py\", line 132, in <lambda>\n    module_config = tree_map(lambda x: calc_expression(x, local_vars), task_inputs)\n  File \"/app/proconfig/utils/expressions.py\", line 473, in calc_expression\n    raise e\n  File \"/app/proconfig/utils/expressions.py\", line 467, in calc_expression\n    return evaluate_expressions_with_context(expression, ctx.copy(), language=language, **kwargs)\n  File \"/app/proconfig/utils/expressions.py\", line 446, in evaluate_expressions_with_context\n    return evaluate_expression(expression, context, language=language, **kwargs)\n  File \"/app/proconfig/utils/expressions.py\", line 431, in evaluate_expression\n    return evaluate_expression_python(expression, context, **kwargs)\n  File \"/app/proconfig/utils/expressions.py\", line 380, in evaluate_expression_python\n    raise ShellException(**error)\nproconfig.core.exception.ShellException: Error evaluating expression 'json.loads(context.daily_kline_data)'. context keys: [dict_keys(['intro', 'fetch_daily', 'fetch_4h', 'fetch_15m', 'context'])]\n","link":"","trace_id":"656e9a8e-5d9a-11f0-a615-0242ac110003"}`;

export const ShellAgentChat = () => {
  const model = useInjection(ShellAgentChatModel);

  return (
    <div
      className={cn('flex h-full w-full', 'bg-Cr-Bg-normal-primary-default-v2')}
    >
      <div className={cn('flex-1 border-r border-gray-200')}>
        <Chat />
      </div>
      <div className={cn('flex-1')}>
        {/* <PreviewChat /> */}
        <button
          className="btn"
          onClick={() => {
            model.addToContext({
              type: 'canvas',
              content: {
                name: 'This is canvas',
                a: 'b',
              },
            });
          }}
        >
          Add to Chat
        </button>

        <button
          className="btn"
          onClick={() => {
            model.sendTextVariant(escapeForAttribute(error));
          }}
        >
          Fix with ShellAgent
        </button>
      </div>
    </div>
  );
};
