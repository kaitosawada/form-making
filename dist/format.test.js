"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const node_assert_1 = __importDefault(require("node:assert"));
const fast_check_1 = __importDefault(require("fast-check"));
const faker_1 = require("@faker-js/faker");
const _1 = require(".");
const fakerToArb = (fakerGen) => {
    return fast_check_1.default
        .integer()
        .noBias() // same probability to generate each of the allowed integers
        .noShrink() // shrink on a seed makes no sense
        .map((seed) => {
        faker_1.fakerJA.seed(seed); // seed the generator
        return fakerGen(); // call it
    });
};
(0, node_test_1.default)("createFormatter", (t) => __awaiter(void 0, void 0, void 0, function* () {
    yield t.test("tel", () => {
        const format = (0, _1.createFormatter)({
            component: "textfield",
            label: "電話番号",
            type: _1.HtmlInputTypeAttribute.Tel,
            name: "tel",
            format: [
                {
                    function: _1.FormatTypeFunction.Tel,
                },
            ],
        });
        fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.constantFrom(...dammyFixedPhoneNumbers), num => {
            const omitHyphen = num.replace(/[^\d]/g, "");
            node_assert_1.default.strictEqual(format(omitHyphen), num);
        }));
    });
    yield t.test("postcode", () => {
        const format = (0, _1.createFormatter)({
            component: "textfield",
            label: "郵便番号",
            name: "postcode",
            format: [
                {
                    function: _1.FormatTypeFunction.Postcode,
                },
            ],
        });
        fast_check_1.default.assert(fast_check_1.default.property(fakerToArb(faker_1.fakerJA.location.zipCode), num => {
            const omitHyphen = num.replace(/[^\d]/g, "");
            node_assert_1.default.strictEqual(format(omitHyphen), num);
        }));
    });
}));
const dammyFixedPhoneNumbers = [
    "03-0778-3201",
    "03-6969-0744",
    "0436-96-6387",
    "03-2129-2897",
    "0796-13-9246",
    "03-3074-7747",
    "0587-40-3085",
    "0467-71-4626",
    "044-069-7835",
    "03-3370-8694",
    "03-6311-9780",
    "03-4027-3911",
    "03-4302-0324",
    "03-9021-3613",
    "0174-28-4211",
    "06-5347-0207",
    "0467-09-5643",
    "093-100-6293",
    "03-6304-7353",
    "046-909-3214",
    "0463-86-8807",
    "03-9968-2900",
    "0288-62-9795",
    "0463-11-7410",
    "0892-38-6565",
    "03-4926-8351",
    "03-3798-9926",
    "06-2032-2630",
    "06-4092-6962",
    "0940-44-8307",
    "0567-18-4356",
    "0123-69-8409",
    "03-2399-4082",
    "09802-0-6047",
    "03-1333-0606",
    "0790-89-6070",
    "06-2932-7529",
    "06-5658-8502",
    "03-0117-7306",
    "0467-31-5679",
    "03-1402-4974",
    "03-5548-0425",
    "042-913-8817",
    "045-412-5093",
    "0480-88-9261",
    "0465-49-0196",
    "0795-69-0786",
    "03-8174-3553",
    "06-9173-7449",
    "03-4826-0415",
    "06-5015-0139",
    "0152-61-4600",
    "06-6024-6348",
    "03-5959-2807",
    "0893-88-4547",
    "0980-51-3085",
    "0460-32-4283",
    "0460-42-4900",
    "0746-57-2905",
    "03-1796-2603",
    "0946-18-8807",
    "03-2512-3053",
    "06-1284-0477",
    "0845-18-0910",
    "03-9077-9346",
    "0795-16-3073",
    "03-8186-0511",
    "0460-72-5412",
    "03-1996-4901",
    "093-399-0049",
    "0930-69-5145",
    "03-7252-5731",
    "01586-0-5040",
    "0144-29-0402",
    "06-4957-3558",
    "03-1765-2482",
    "0573-13-4234",
];
