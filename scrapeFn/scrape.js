const puppeteer = require("puppeteer");
const fs = require("fs");
const data = {
  list: []
};

async function main(category) {
  //launches chromium
  const browser = await puppeteer.launch({ headless: false });
  //open new tab
  const page = await browser.newPage();
  // 
  // 
  await page.goto(`http://books.toscrape.com/catalogue/category/books/${category}/index.html`, {
    timeout: 0,
    waitUntil: 'networkidle0',
  });

  const bookData = await page.evaluate(async (data) => {
    const items = document.querySelectorAll('article.product_prod');
    console.log(items);
    items.forEach((item, index) => {
      const title = item.querySelector('h3>a')?.title;
      const imgLink = item.querySelector('div.image_container>a>img')?.src;
      let price = item.querySelector(
        'div.product_price > p.price_color'
      )?.innerText;

      if (price === null) {
        price = "FREE";
      }
      console.log(
        "Hello From BookData"
      )
      console.log(title, imgLink, price);
      data.list.push({
        title,
        imgLink,
        price
      });
    });
    return data;
  }, data);

  let json = JSON.stringify(bookData, null, 2);
  fs.writeFile('book.json', json, 'utf-8', () => {
    console.log('written in book.json');
  })
  await bookData;
  browser.close();
  return data;
};

module.exports = main;
