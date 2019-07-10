import test from "ava";
import Mailchimp from "../src";

const apiKey = "48d0224f095378b64cc925610bce1298-us3";

const mailchimp = new Mailchimp(apiKey);

test("Test can throw invalid api key", async (t) => {
  const error = t.throws(() => {
    // @ts-ignore
    const mailchimp2 = new Mailchimp("withoutdash");
  }, Error);
  t.is(error.message, "Missing or invalid API key");
});

test("Test can GET", async (t) => {
  const {data} = await mailchimp.request("GET", "/lists");
  t.true(Array.isArray(data.lists));
  t.true(data.lists.length >= 0);
});

test("Test can POST", async (t) => {
  const randomString = Math.random();
  const emailAddress = `baorv_${randomString}@mageplaza.com`;
  const status = "subscribed";
  const {data} = await mailchimp.request("POST", "/lists/3270bf09bc/members", {}, {
    email_address: emailAddress,
    status
  });
  t.is(data.email_address, emailAddress);
  t.is(data.status, status);
});
