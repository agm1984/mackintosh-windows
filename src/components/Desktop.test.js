import puppeteer from 'puppeteer'

let page
let browser
const width = 1920
const height = 1080
const APP = 'http://localhost:3000'

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  })
  page = await browser.newPage()
  await page.setViewport({ width, height })
})

test('Portfolio loads', async () => {
  await page.goto(APP)
}, 16000)

test('Portfolio has correct Page Title', async () => {
  const title = await page.title()
  expect(title).toBe('Adam Mackintosh Portfolio')
})

test('Start Menu is displayed', async () => {
  const startMenu = await page.$eval('#Taskbar', el => (el ? true : false))
  expect(startMenu).toBe(true)
})

afterAll(() => {
  browser.close()
})
