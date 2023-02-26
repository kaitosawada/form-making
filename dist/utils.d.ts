import { FormSchema0, FormSchemaAutocomplete, FormSchemaBirthday, FormSchemaCheckbox, FormSchemaRadio, FormSchemaSelect, FormSchemaTextfield } from ".";
export type FormSchemaField = FormSchemaAutocomplete | FormSchemaBirthday | FormSchemaCheckbox | FormSchemaRadio | FormSchemaSelect | FormSchemaTextfield;
export declare const isField: (schema: FormSchema0) => schema is FormSchemaField;
