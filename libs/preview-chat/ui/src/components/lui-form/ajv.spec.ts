import { demo_jsonschema } from './__storybook__/demo_form';
import Ajv, { JSONSchemaType } from 'ajv';
it('ajv', () => {
  const ajv = new Ajv();
  const validate = ajv.compile(demo_jsonschema);
  const valid = validate({
    name: 'John Doe',
    age: 30,
    email: '',
  });
  console.log(valid);
});
