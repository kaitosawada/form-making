export type InputComponent = FormSchemaAutocomplete | FormSchemaBirthday | FormSchemaCard | FormSchemaCheckbox | FormSchemaIdentifier | FormSchemaMarkdown | FormSchemaRadio | FormSchemaSelect | FormSchemaTextfield | FormSchemaWarning;
/**
 * 複数選択不可 / selectの強化版
 */
export interface FormSchemaAutocomplete {
    component: "autocomplete";
    label: string;
    name: string;
    options: string[];
    /**
     * describe: Unimplemented <未実装>
     */
    describe?: string;
    show?: string;
    validate?: FormSchemaValidation;
}
/**
 * Unimplemented <未実装>
 */
export interface FormSchemaBirthday {
    component: "birthday";
    label: string;
    name: string;
    /**
     * describe: Unimplemented <未実装>
     */
    describe?: string;
    show?: string;
    validate?: FormSchemaValidation;
}
/**
 * Deprecated <削除予定>
 * markdownで代用可能
 */
export interface FormSchemaCard {
    component: "card";
    show?: string;
}
export interface FormSchemaCheckboxExport {
    separate?: boolean;
}
/**
 * 複数選択可
 */
export interface FormSchemaCheckbox {
    component: "checkbox";
    label: string;
    name: string;
    options: string[];
    /**
     * describe: Unimplemented <未実装>
     */
    describe?: string;
    export?: FormSchemaCheckboxExport;
    show?: string;
    validate?: FormSchemaValidation;
}
/**
 * サーバーサイドで生成される識別子
 * 例: UUID, nanoid, シーケンシャル
 */
export interface FormSchemaIdentifier {
    component: "identifier";
    label: string;
    name: string;
    type: IdentifierGenerateType;
}
export interface FormSchemaMarkdown {
    component: "markdown";
    contents: string;
    show?: string;
}
/**
 * 複数選択不可
 */
export interface FormSchemaRadio {
    component: "radio";
    label: string;
    name: string;
    options: string[];
    /**
     * describe: Unimplemented <未実装>
     */
    describe?: string;
    show?: string;
    validate?: FormSchemaValidation;
}
/**
 * 複数選択不可
 */
export interface FormSchemaSelect {
    component: "select";
    label: string;
    name: string;
    options: string[];
    /**
     * describe: Unimplemented <未実装>
     */
    describe?: string;
    show?: string;
    validate?: FormSchemaValidation;
}
export interface FormSchemaTextfield {
    component: "textfield";
    label: string;
    name: string;
    /**
     * describe: Unimplemented <未実装>
     */
    describe?: string;
    format?: FormatType;
    show?: string;
    type?: HtmlInputTypeAttribute;
    validate?: FormSchemaValidation;
}
/**
 * Deprecated <削除予定>
 * markdownで代用可能
 */
export interface FormSchemaWarning {
    component: "warning";
    contents: string[];
    show?: string;
}
export type FormSchema = InputComponent[];
export interface FormSchemaValidationItem {
    /**
     * booleanになる式をjavascriptで記述します。
     * 利用できる関数や演算子は限られています。
     * json-logic-jsのものを利用します。
     * https://www.npmjs.com/package/json-logic-js
     *
     * ex: self === '09012345678'
     * ex: self.length > 1
     * ex: self.length !== undefined
     *
     * 正規表現は対応していませんが、カスタム関数があります。
     *
     * ex: isTel(self)
     * ex: isEmail(self)
     * ex: isPostcode(self)
     *
     * self以外のフィールドについても取得できます。
     * 他コンポーネントの変数名はnameフィールドで指定します。
     *
     * ex: self === passwordConfirm
     */
    expr: string;
    /**
     * exprがfalseの場合のメッセージ
     * ex: "電話番号の形式が間違っています"
     */
    message: string;
}
export interface FormSchemaValidation {
    items?: FormSchemaValidationItem[];
    /**
     * 必須項目ならメッセージを入れる
     * ex: "電話番号は必須項目です"
     */
    required?: string;
}
export declare enum FormatTypeFunction {
    Hankaku = "hankaku",
    OmitHyphen = "omitHyphen",
    Postcode = "postcode",
    Tel = "tel"
}
export interface FormatType0 {
    expr?: string;
    function?: FormatTypeFunction;
}
/**
 * submit時にデータの形式を変換する指定
 */
export type FormatType = FormatType0[];
export declare enum HtmlInputTypeAttribute {
    Button = "button",
    Checkbox = "checkbox",
    Color = "color",
    Date = "date",
    DatetimeLocal = "datetime-local",
    Email = "email",
    File = "file",
    Hidden = "hidden",
    Image = "image",
    Month = "month",
    Number = "number",
    Password = "password",
    Radio = "radio",
    Range = "range",
    Reset = "reset",
    Search = "search",
    Submit = "submit",
    Tel = "tel",
    Text = "text",
    Time = "time",
    Url = "url",
    Week = "week"
}
export declare enum IdentifierGenerateType {
    NanoidCustom = "nanoid_custom_8",
    Sequential = "sequential",
    Uuidv4 = "uuidv4"
}
