import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  headless: "new",
});
const page = await browser.newPage();

await page.goto(process.argv[2] ?? "https://outages.hydroottawa.com/");
await page.setViewport({ width: 1080, height: 1024 });

const selector = await page.waitForSelector("#summary-label", {
  visible: true,
});

const result = await selector?.evaluate((el) => el.textContent);

await browser.close();

console.log(result === "There are currently no power outages." ? "⚡" : result);
