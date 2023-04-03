import { FormSchema } from "./schema";
export type FormData = {
    body: {
        [key: string]: string | string[] | number;
    };
    createdAt: string;
    isCanceled: "キャンセル済み" | "";
};
export declare const convertDataToCsv: (schema: FormSchema, data: FormData[]) => string;
