const express = require('express')
const app = express()
const puppeteer = require('puppeteer')

app.get('/api/kabum/apple', async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    'https://www.kabum.com.br/promocao/MENU_ELETRONICOS?page_number=1&page_size=20&facet_filters=eyJtYW51ZmFjdHVyZXIiOlsiQXBwbGUiXX0=&sort=most_searched'
  )

  const productsKabum = await page.evaluate(() => {
    const products = Array.from(document.querySelectorAll('.productCard'))
    const images_url = Array.from(document.querySelectorAll('.imageCard'))
    const name = Array.from(document.querySelectorAll('.nameCard'))
    const oldPrice = Array.from(document.querySelectorAll('.oldPriceCard'))
    const price = Array.from(document.querySelectorAll('.priceCard'))
    // const quantity = Array.from(document.querySelectorAll('.remainingTagCard'))
    // const discount = Array.from(document.querySelectorAll('.discountTagCard'))
    // const rating = Array.from(document.querySelectorAll('.ratingCard'))

    return products.map((_, index) => {
      return {
        id: new Date().getTime() + index,
        images_url: images_url[index].src,
        name: name[index].innerText,
        oldPrice: oldPrice[index].innerText,
        price: price[index].innerText,
        // discount: discount[index].innerText,
        // quantity: quantity[index].innerText,
      }
    })
  })

  await browser.close()

  res.send({
    productsKabum,
  })
})

app.listen(3000)
