import jsonLogic from "json-logic-js";
import parse from "js-to-json-logic";
import { FormSchema0, isField } from ".";
import Ajv from "ajv/dist/jtd";
import schema from "./schema/form-schema.jtd.json";

const ajv = new Ajv();
ajv.addKeyword("description");

const isEmail = (value: string) => {
  console.log(value);
  return /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
    value
  );
};
const isTel = (value: string) => {
  return /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(
    value
  );
};
const isPostcode = (value: string) => {
  return /^[0-9]{3}-?[0-9]{4}$/.test(value);
};

jsonLogic.add_operation("isEmail", isEmail);
jsonLogic.add_operation("isTel", isTel);
jsonLogic.add_operation("isPostcode", isPostcode);

export const validateValue =
  (input: FormSchema0, watchAllFields: any) =>
  (self: any): string | undefined => {
    if (isField(input) && input.validate) {
      if (input.validate.required && (!self || self === "")) {
        return input.validate.required;
      }
      if (input.validate.items) {
        for (const validate of input.validate.items) {
          const expr = parse(validate.expr);
          const result = jsonLogic.apply(expr, {
            ...watchAllFields,
            self: self,
          }); // TODO: error handling
          if (!result) {
            return validate.message;
          }
        }
      }
    }
    return;
  };

export const isShow = (input: FormSchema0, watchAllFields: any) => {
  if (!input.show) return true;
  const expr = parse(input.show);
  let data: any = {
    ...watchAllFields,
    self: isField(input) ? watchAllFields[input.name] : undefined,
  };
  const result = jsonLogic.apply(expr, data); // TODO: error handling
  return typeof result === "boolean" && result;
};

export const validateSchema = (data: unknown): string | undefined => {
  const valid = ajv.validate(schema, data);
  if (valid) return;
  const errors = ajv.errors;
  const message = errors
    ?.map(
      (error) => `location: ${error.instancePath}, message: ${error.message}
`
    )
    .join();
  return message;
};
