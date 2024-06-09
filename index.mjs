import process from "node:process";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  headless: "new",
});
const page = await browser.newPage();

await page.setViewport({ width: 1080, height: 1024 });
await page.goto(process.argv[2] ?? "https://outages.hydroottawa.com/");

const selector = await page.waitForSelector(
  "p[data-cy='summary-field-0-value']"
);

const result = await selector?.evaluate((el) => el.textContent);

await browser.close();

console.log(result === "0" ? "No outrages 👍⚡" : `${result} outrages ❗⚡`);
