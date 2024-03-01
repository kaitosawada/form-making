"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = exports.isShow = exports.validateValue = void 0;
const json_logic_js_1 = __importDefault(require("json-logic-js"));
const js_to_json_logic_1 = __importDefault(require("js-to-json-logic"));
const _1 = require(".");
const jtd_1 = __importDefault(require("ajv/dist/jtd"));
const form_schema_jtd_json_1 = __importDefault(require("./schema/form-schema.jtd.json"));
const ajv = new jtd_1.default();
ajv.addKeyword("description");
const isEmail = (value) => {
    console.log(value);
    return /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(value);
};
const isTel = (value) => {
    return /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(value);
};
const isPostcode = (value) => {
    return /^[0-9]{3}-?[0-9]{4}$/.test(value);
};
json_logic_js_1.default.add_operation("isEmail", isEmail);
json_logic_js_1.default.add_operation("isTel", isTel);
json_logic_js_1.default.add_operation("isPostcode", isPostcode);
const validateValue = (input, watchAllFields) => (self) => {
    if ((0, _1.isField)(input) && input.validate) {
        if (input.validate.required && (!self || self === "")) {
            return input.validate.required;
        }
        if (input.validate.items) {
            for (const validate of input.validate.items) {
                const expr = (0, js_to_json_logic_1.default)(validate.expr);
                const result = json_logic_js_1.default.apply(expr, Object.assign(Object.assign({}, watchAllFields), { self: self })); // TODO: error handling
                if (!result) {
                    return validate.message;
                }
            }
        }
    }
    return;
};
exports.validateValue = validateValue;
const isShow = (input, watchAllFields) => {
    if (input.component === "identifier" || !input.show)
        return true;
    const expr = (0, js_to_json_logic_1.default)(input.show);
    let data = Object.assign(Object.assign({}, watchAllFields), { self: (0, _1.isField)(input) ? watchAllFields[input.name] : undefined });
    const result = json_logic_js_1.default.apply(expr, data); // TODO: error handling
    return typeof result === "boolean" && result;
};
exports.isShow = isShow;
const validateSchema = (data) => {
    const valid = ajv.validate(form_schema_jtd_json_1.default, data);
    if (valid)
        return;
    const errors = ajv.errors;
    const message = errors === null || errors === void 0 ? void 0 : errors.map((error) => `location: ${error.instancePath}, message: ${error.message}
`).join();
    return message;
};
exports.validateSchema = validateSchema;
