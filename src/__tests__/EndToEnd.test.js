import puppeteer from "puppeteer"; // had to roll back to 18.1 as was getting error

// ---------------- Before you can run your tests, you have to deploy your app using npm run start in the terminal. --------//


describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
      jest.setTimeout(30000);
      browser = await puppeteer.launch(); // launches browser via Puppeteer
      page = await browser.newPage();
      await page.goto('http://localhost:3000/'); //navigate to page
      await page.waitForSelector('.event'); //waits for .event element to appear
    });
  
    afterAll(() => {
      browser.close(); //close browser
    });
    
    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .expanded_event'); //returns no result as element is collapsed
        expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .event_details_btn');
    const eventDetails = await page.$('.event .expanded_event');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .event_details_btn');
    const eventDetails = await page.$('.event .expanded_event');
    expect(eventDetails).toBeNull();
  });
});