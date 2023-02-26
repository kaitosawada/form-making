"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isField = void 0;
const isField = (schema) => {
    switch (schema.component) {
        case "textfield":
        case "autocomplete":
        case "select":
        case "birthday":
        case "radio":
        case "checkbox":
            return true;
        default:
            return false;
    }
};
exports.isField = isField;
