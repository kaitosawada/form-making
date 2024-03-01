import { InputComponent, FormSchemaAutocomplete, FormSchemaBirthday, FormSchemaCheckbox, FormSchemaRadio, FormSchemaSelect, FormSchemaTextfield } from ".";
export type FormSchemaField = FormSchemaAutocomplete | FormSchemaBirthday | FormSchemaCheckbox | FormSchemaRadio | FormSchemaSelect | FormSchemaTextfield;
export declare const isField: (schema: InputComponent) => schema is FormSchemaField;
