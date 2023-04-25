import puppeteer from "puppeteer";

// ---------------- Before you can run your tests, you have to deploy your app using npm run start in the terminal. --------//


describe('show/hide an event details', () => {
    test('An event element is collapsed by default', async () => {
        const browser = await puppeteer.launch(); // launches browser via Puppeteer

        const page = await browser.newPage();
        await page.goto('http://localhost:3000/'); //navigate to page
    
        await page.waitForSelector('.event'); //waits for .event element to appear

        const eventDetails = await page.$('.event .expanded_event'); //returns no result as element is collapsed
    expect(eventDetails).toBeNull();
    browser.close();
  });
});