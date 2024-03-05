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
// const streetAddressArb = fakerToArb(faker.location.streetAddress);
(0, node_test_1.default)("validateValue", (t) => __awaiter(void 0, void 0, void 0, function* () {
    yield t.test("name", () => {
        const validate = (0, _1.validateValue)({
            component: "textfield",
            label: "名前",
            name: "name",
            validate: {
                required: "名前を入力してください",
                items: [
                    {
                        expr: "self.length > 1",
                        message: "名前の形式が正しくありません",
                    },
                ],
            },
        }, []);
        fast_check_1.default.assert(fast_check_1.default.property(fakerToArb(faker_1.fakerJA.person.fullName), num => {
            node_assert_1.default.strictEqual(validate(num), undefined);
        }));
        node_assert_1.default.strictEqual(validate("名前"), undefined);
        node_assert_1.default.strictEqual(validate(""), "名前を入力してください");
        node_assert_1.default.strictEqual(validate(null), "名前を入力してください");
        node_assert_1.default.strictEqual(validate(undefined), "名前を入力してください");
    });
    yield t.test("phone number", () => {
        const validate = (0, _1.validateValue)({
            component: "textfield",
            label: "電話番号",
            type: _1.HtmlInputTypeAttribute.Tel,
            name: "tel",
            validate: {
                required: "電話番号を入力してください",
                items: [
                    {
                        expr: "isTel(self)",
                        message: "電話番号の形式が正しくありません",
                    },
                ],
            },
        }, []);
        // ハイフンあり
        fast_check_1.default.assert(fast_check_1.default.property(fakerToArb(faker_1.fakerJA.phone.number), num => {
            node_assert_1.default.strictEqual(validate(num), undefined);
        }));
        // ハイフンなし
        fast_check_1.default.assert(fast_check_1.default.property(fakerToArb(faker_1.fakerJA.phone.number), num => {
            node_assert_1.default.strictEqual(validate(num.split("-").join("")), undefined);
        }));
        fast_check_1.default.assert(fast_check_1.default.property(fakerToArb(faker_1.fakerJA.person.firstName), num => {
            node_assert_1.default.strictEqual(validate(num), "電話番号の形式が正しくありません");
        }));
        node_assert_1.default.strictEqual(validate(""), "電話番号を入力してください");
        node_assert_1.default.strictEqual(validate(null), "電話番号を入力してください");
        node_assert_1.default.strictEqual(validate(undefined), "電話番号を入力してください");
    });
    yield t.test("email address", () => {
        const validate = (0, _1.validateValue)({
            component: "textfield",
            label: "メールアドレス",
            type: _1.HtmlInputTypeAttribute.Email,
            name: "email",
            validate: {
                required: "メールアドレスを入力してください",
                items: [
                    {
                        expr: "isEmail(self)",
                        message: "メールアドレスの形式が正しくありません",
                    },
                ],
            },
        }, []);
        fast_check_1.default.assert(fast_check_1.default.property(fakerToArb(faker_1.fakerJA.internet.email), num => {
            node_assert_1.default.strictEqual(validate(num), undefined);
        }));
        fast_check_1.default.assert(fast_check_1.default.property(fakerToArb(faker_1.fakerJA.person.firstName), num => {
            node_assert_1.default.strictEqual(validate(num), "メールアドレスの形式が正しくありません");
        }));
        node_assert_1.default.strictEqual(validate(""), "メールアドレスを入力してください");
        node_assert_1.default.strictEqual(validate(null), "メールアドレスを入力してください");
        node_assert_1.default.strictEqual(validate(undefined), "メールアドレスを入力してください");
    });
    yield t.test("postal code", () => {
        const validate = (0, _1.validateValue)({
            component: "textfield",
            label: "郵便番号",
            name: "postcode",
            validate: {
                required: "郵便番号を入力してください",
                items: [
                    {
                        expr: "isPostcode(self)",
                        message: "郵便番号の形式が正しくありません",
                    },
                ],
            },
        }, []);
        fast_check_1.default.assert(fast_check_1.default.property(fakerToArb(faker_1.fakerJA.location.zipCode), num => {
            node_assert_1.default.strictEqual(validate(num), undefined);
        }));
        fast_check_1.default.assert(fast_check_1.default.property(fakerToArb(faker_1.fakerJA.person.firstName), num => {
            node_assert_1.default.strictEqual(validate(num), "郵便番号の形式が正しくありません");
        }));
        node_assert_1.default.strictEqual(validate(""), "郵便番号を入力してください");
        node_assert_1.default.strictEqual(validate(null), "郵便番号を入力してください");
        node_assert_1.default.strictEqual(validate(undefined), "郵便番号を入力してください");
    });
}));
