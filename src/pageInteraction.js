const promise = require("promise");
const puppeteer = require("puppeteer");

const secrets = require("./secrets.json");
const requestDescription = require("./requestDescription");
const selectors = require("./selectors.json");

const url = "https://my.iretapartments.com/my";
let page;

async function submitMaintenaceRequest(
  isHeadless,
  shouldSubmit,
  maintenanceTypes,
  previousRequest
) {
  const browser = await puppeteer.launch({ headless: isHeadless });
  page = await getPage(browser);
  await login();
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await maintenanceRequest();
  await sleep(3000);
  await describeRequest(maintenanceTypes);
  await scheduleVisit(previousRequest);

  await takeScreenshot("request");

  if (shouldSubmit) {
    await submitRequest();
  }

  await takeScreenshot("finished");

  browser.close();
}

async function getPage(browser) {
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2"
  });
  return page;
}

async function login() {
  await page.click(selectors.username);
  await page.keyboard.type(secrets.username);
  await page.click(selectors.password);
  await page.keyboard.type(secrets.password);
  await page.click(selectors.login);
}

async function maintenanceRequest() {
  await page.click(selectors.maintenanceRequest);
}

async function describeRequest(maintenanceTypes) {
  for (const maintenanceType of maintenanceTypes) {
    await page.click(maintenanceType);
  }
  await page.click(selectors.description);
  await page.keyboard.type(requestDescription.text);
}

async function scheduleVisit(previousRequest) {
  if (previousRequest) {
    await page.click(selectors.previousRequestTrue);
  } else {
    await page.click(selectors.previousRequestFalse);
  }

  await page.click(selectors.mayWeComeIn);
  await page.click(selectors.havePet);
  await page.click(selectors.phoneNumber);
  await clearPhoneNumber();
  await page.keyboard.type(secrets.phoneNumber);
}

async function clearPhoneNumber() {
  await page.click(selectors.phoneNumber, { clickCount: 3 });
  await page.keyboard.press("Backspace");
}

async function submitRequest() {
  await page.click(selectors.submitRequest);
}

function sleep(ms) {
  return new promise(resolve => setTimeout(resolve, ms));
}

async function takeScreenshot(name) {
  const time = new Date().getTime();

  await page.screenshot({
    path: "screenshots/" + name + "-" + time + ".png",
    fullPage: true
  });
}

module.exports = { submitMaintenaceRequest };
