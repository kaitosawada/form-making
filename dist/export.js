"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDataToCsv = void 0;
const utils_1 = require("./utils");
const sync_1 = require("csv-stringify/sync");
const convertDataToCsv = (schema, data) => {
    let dataObject = [];
    data.forEach((formData) => {
        let row = {
            createdAt: formData.createdAt,
            isCanceled: formData.isCanceled,
        };
        schema.forEach((s) => {
            var _a;
            if ((0, utils_1.isField)(s) || s.component === "identifier") {
                const item = formData.body[s.name];
                if (!item) {
                    row[s.name] = "";
                }
                else if (typeof item === "string") {
                    row[s.name] = item;
                }
                else if (typeof item === "number") {
                    row[s.name] = String(item);
                }
                else {
                    if (s.component === "checkbox" && ((_a = s.export) === null || _a === void 0 ? void 0 : _a.separate)) {
                        s.options.forEach((o, i) => {
                            row[s.name + "__" + i] = item.includes(o) ? "〇" : "×";
                        });
                    }
                    else {
                        row[s.name] = item.join(" ");
                    }
                }
            }
        });
        dataObject.push(row);
    });
    let columns = {
        createdAt: "予約日時",
        isCanceled: "キャンセル",
    };
    schema.forEach((s) => {
        var _a;
        if ((0, utils_1.isField)(s) || s.component === "identifier") {
            if (s.component === "checkbox" && ((_a = s.export) === null || _a === void 0 ? void 0 : _a.separate)) {
                s.options.forEach((o, i) => {
                    columns[s.name + "__" + i] = s.label + "：" + o;
                });
            }
            else {
                columns[s.name] = s.label;
            }
        }
    });
    const csvString = (0, sync_1.stringify)(dataObject, {
        header: true,
        bom: true,
        columns,
        quoted: true,
    });
    return csvString;
};
exports.convertDataToCsv = convertDataToCsv;
