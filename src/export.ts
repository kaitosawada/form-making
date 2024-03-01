import { FormSchema } from "./schema";
import { isField } from "./utils";
import { stringify } from "csv-stringify/sync";

export type FormData = {
  body: { [key: string]: string | string[] | number };
  createdAt: string;
  isCanceled: "キャンセル済み" | "";
};

export const convertDataToCsv = (schema: FormSchema, data: FormData[]) => {
  let dataObject = [] as { [key: string]: string | string[] }[];
  data.forEach((formData) => {
    let row: { [Key: string]: string } = {
      createdAt: formData.createdAt,
      isCanceled: formData.isCanceled,
    };
    schema.forEach((s) => {
      if (isField(s) || s.component === "identifier") {
        const item = formData.body[s.name];
        if (!item) {
          row[s.name] = "";
        } else if (typeof item === "string") {
          row[s.name] = item;
        } else if (typeof item === "number") {
          row[s.name] = String(item);
        } else {
          if (s.component === "checkbox" && s.export?.separate) {
            s.options.forEach((o, i) => {
              row[s.name + "__" + i] = item.includes(o) ? "〇" : "×";
            });
          } else {
            row[s.name] = item.join(" ");
          }
        }
      }
    });
    dataObject.push(row);
  });
  let columns: { [Key: string]: string } = {
    createdAt: "予約日時",
    isCanceled: "キャンセル",
  };
  schema.forEach((s) => {
    if (isField(s) || s.component === "identifier") {
      if (s.component === "checkbox" && s.export?.separate) {
        s.options.forEach((o, i) => {
          columns[s.name + "__" + i] = s.label + "：" + o;
        });
      } else {
        columns[s.name] = s.label;
      }
    }
  });
  const csvString = stringify(dataObject, {
    header: true,
    bom: true,
    columns,
    quoted: true,
  });
  return csvString;
}