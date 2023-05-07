import puppeteer from "puppeteer"; // had to roll back to 18.1 as was getting error
import { mockData } from "../mock-data";
import { extractLocations } from "../api";
// ---------------- Before you can run your tests, you have to deploy your app using npm run start in the terminal. --------//


describe('show/hide an event details', () => {
    let browser;
    let page;
    jest.setTimeout(30000);
    beforeAll(async () => {
      
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

describe('Filter events by city', () => {
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

    test('All events are shown by default', async () => {
        // Wait for the event list to load
        await page.waitForSelector('.event');
        // Get the total number of events
        const eventCount = await page.$$('.event');
        // Check that the number of events matches the default number of events displayed in the app
        expect(eventCount.length).toBe(mockData.length);
      });

      test('User should see a list of suggestions when they search by City', async () => {
        // Wait for the CitySearch input to load
        await page.waitForSelector('.city');
        // Type 'Berlin' into the CitySearch input
        await page.type('.city', 'Berlin');
        // Wait for the suggestions list to appear
        await page.waitForSelector('.suggestions li');
        // Get the first suggestion from the list
        const suggestion = await page.$('.suggestions li');
        // Get the text content of the suggestion
        const suggestionText = await suggestion.evaluate(el => el.textContent);
        // Click the suggestion
        await suggestion.click();
        // Check that the suggestion text matches the selected city
        expect(suggestionText).toBe('Berlin, Germany');
      });

      test('User should only see events from chosen city', async () => {
        // Wait for the CitySearch input to load
        await page.waitForSelector('.city');
        // Type 'Berlin' into the CitySearch input
        await page.type('.city', 'Berlin');
        // Wait for the suggestions list to appear
        await page.waitForSelector('.suggestions li');
        // Get the first suggestion from the list
        const suggestion = await page.$('.suggestions li');
        // Click the suggestion
        await suggestion.click();
        // Wait for the event list to update
        await page.waitForSelector('.event');
        // Get the location of the first event
        const eventLocation = await page.$eval('.event .location', el => el.textContent);
        // Check that the event location matches the selected city
        expect(eventLocation).toBe('Berlin, Germany');
      });
});