import test from "node:test";
import assert from "node:assert";
import fc from "fast-check";
import { fakerJA as faker } from "@faker-js/faker";
import { HtmlInputTypeAttribute, validateValue } from ".";

const fakerToArb = (fakerGen: () => string) => {
  return fc
    .integer()
    .noBias() // same probability to generate each of the allowed integers
    .noShrink() // shrink on a seed makes no sense
    .map((seed) => {
      faker.seed(seed); // seed the generator
      return fakerGen(); // call it
    });
};

// const streetAddressArb = fakerToArb(faker.location.streetAddress);

test("validateValue", async (t) => {
  await t.test("name", () => {
    const validate = validateValue({
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
    fc.assert(
      fc.property(
        fakerToArb(faker.person.fullName),
        num => {
          assert.strictEqual(validate(num), undefined);
        }
      )
    )
    assert.strictEqual(validate("名前"), undefined);
    assert.strictEqual(validate(""), "名前を入力してください");
    assert.strictEqual(validate(null), "名前を入力してください");
    assert.strictEqual(validate(undefined), "名前を入力してください");
  });
  await t.test("phone number", () => {
    const validate = validateValue({
      component: "textfield",
      label: "電話番号",
      type: HtmlInputTypeAttribute.Tel,
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
    fc.assert(
      fc.property(
        fakerToArb(faker.phone.number),
        num => {
          assert.strictEqual(validate(num), undefined);
        }
      )
    )
    // ハイフンなし
    fc.assert(
      fc.property(
        fakerToArb(faker.phone.number),
        num => {
          assert.strictEqual(validate(num.split("-").join("")), undefined);
        }
      )
    )
    fc.assert(
      fc.property(
        fakerToArb(faker.person.firstName),
        num => {
          assert.strictEqual(validate(num), "電話番号の形式が正しくありません");
        }
      )
    )
    assert.strictEqual(validate(""), "電話番号を入力してください");
    assert.strictEqual(validate(null), "電話番号を入力してください");
    assert.strictEqual(validate(undefined), "電話番号を入力してください");
  });
  await t.test("email address", () => {
    const validate = validateValue({
      component: "textfield",
      label: "メールアドレス",
      type: HtmlInputTypeAttribute.Email,
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
    fc.assert(
      fc.property(
        fakerToArb(faker.internet.email),
        num => {
          assert.strictEqual(validate(num), undefined);
        }
      )
    )
    fc.assert(
      fc.property(
        fakerToArb(faker.person.firstName),
        num => {
          assert.strictEqual(validate(num), "メールアドレスの形式が正しくありません");
        }
      )
    )
    assert.strictEqual(validate(""), "メールアドレスを入力してください");
    assert.strictEqual(validate(null), "メールアドレスを入力してください");
    assert.strictEqual(validate(undefined), "メールアドレスを入力してください");
  });
  await t.test("postal code", () => {
    const validate = validateValue({
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
    fc.assert(
      fc.property(
        fakerToArb(faker.location.zipCode),
        num => {
          assert.strictEqual(validate(num), undefined);
        }
      )
    )
    fc.assert(
      fc.property(
        fakerToArb(faker.person.firstName),
        num => {
          assert.strictEqual(validate(num), "郵便番号の形式が正しくありません");
        }
      )
    )
    assert.strictEqual(validate(""), "郵便番号を入力してください");
    assert.strictEqual(validate(null), "郵便番号を入力してください");
    assert.strictEqual(validate(undefined), "郵便番号を入力してください");
  });
});