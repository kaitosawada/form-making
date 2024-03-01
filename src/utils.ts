import {
  InputComponent,
  FormSchemaAutocomplete,
  FormSchemaBirthday,
  FormSchemaCheckbox,
  FormSchemaRadio,
  FormSchemaSelect,
  FormSchemaTextfield,
} from ".";

export type FormSchemaField =
  | FormSchemaAutocomplete
  | FormSchemaBirthday
  | FormSchemaCheckbox
  | FormSchemaRadio
  | FormSchemaSelect
  | FormSchemaTextfield;

export const isField = (schema: InputComponent): schema is FormSchemaField => {
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
