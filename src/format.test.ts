import test from "node:test";
import assert from "node:assert";
import fc from "fast-check";
import { fakerJA as faker } from "@faker-js/faker";
import { FormatTypeFunction, HtmlInputTypeAttribute, createFormatter } from ".";

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

test("createFormatter", async (t) => {
  await t.test("tel", () => {
    const format = createFormatter({
      component: "textfield",
      label: "電話番号",
      type: HtmlInputTypeAttribute.Tel,
      name: "tel",
      format: [
        {
          function: FormatTypeFunction.Tel,
        },
      ],
    });
    fc.assert(
      fc.property(
        fc.constantFrom(...dammyFixedPhoneNumbers),
        num => {
          const omitHyphen = num.replace(/[^\d]/g, "");
          assert.strictEqual(format(omitHyphen), num);
        }
      )
    )
  });
  await t.test("postcode", () => {
    const format = createFormatter({
      component: "textfield",
      label: "郵便番号",
      name: "postcode",
      format: [
        {
          function: FormatTypeFunction.Postcode,
        },
      ],
    });
    fc.assert(
      fc.property(
        fakerToArb(faker.location.zipCode),
        num => {
          const omitHyphen = num.replace(/[^\d]/g, "");
          assert.strictEqual(format(omitHyphen), num);
        }
      )
    )
  });
});

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
]