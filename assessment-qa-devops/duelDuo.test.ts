
import { Components } from "rollbar"
import { Builder, Capabilities, By } from "selenium-webdriver"
import { titleContains } from "selenium-webdriver/lib/until"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

describe('Button Tests', () => {
    test('Draw button displays choice', async () => {
         const draw = await driver.findElement(By.id("draw"))
         const choices = await draw.isDisplayed()
         expect(choices).toBe(true)
     
     })

     test('See All Bots displays', async () => {
         const seeAll = await driver.findElement(By.id("see-all"))
         const display = await seeAll.isDisplayed()
         expect(display).toBe(true)
         driver.sleep
     })

  });