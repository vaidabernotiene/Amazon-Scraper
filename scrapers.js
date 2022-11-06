const puppeteer = require("puppeteer");
const url = "https://www.amazon.com/eufy-Security-Wireless-Compatibility-Weatherproof/dp/B07Z35RM2Q/ref=sr_1_10?keywords=eufy+security+camera&qid=1667745810&refinements=p_89%3Aeufy+security&rnid=2528832011&s=electronics&sprefix=eu%2Caps%2C238&sr=1-10"

async function scrapeProduct(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    /*-------HTTP-------*/
    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty("src");
    const imgUrl = await src.jsonValue();
    /*-------TITLE-------*/
    const [elTitle] = await page.$x('//*[@id="productTitle"]');
    const txtTitle = await elTitle.getProperty("textContent");
    const title = await txtTitle.jsonValue();
    /*-------PRICE-------*/
    const [elPriceSbl] = await page.$x(
      '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[2]/span[2]/span[1]'
    );
    const [elPrice] = await page.$x(
      '//*[@id="corePrice_feature_div"]/div/span/span[2]/span[2]'
    );
    const [elPriceFr] = await page.$x(
      '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[2]/span[2]/span[3]'
    );

    const txtPriceSymb = await elPriceSbl.getProperty("textContent");
    const txtPrice = await elPrice.getProperty("textContent");
    const txtPriceFr = await elPriceFr.getProperty("textContent");

    const priceSymb = await txtPriceSymb.jsonValue();
    const price = await txtPrice.jsonValue();
    const priceFr = await txtPriceFr.jsonValue();

    console.log(
      "URL: " + imgUrl,
      "\n",
      "Title: " + title,
      "\n",
      "Price: " + priceSymb,
      price,
      priceFr
    );
  } catch (error) {
    console.log("error: ", error);
    browser.close();
  }
}

scrapeProduct(url);