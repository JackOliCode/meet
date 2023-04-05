# meet
This app will be built using React and is designed to show a list of events in a range of cities. The events can be expanded
for further details. The user can also adjust the number of events seen at one time through the app and filter their results by city.
The user may also use the app offline, and the app will use cached data that is re-loaded when offline.



FUNCTION ONE: FILTER EVENTS BY CITY

SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
GIVEN: user hasn’t searched for any city
WHEN: the user opens the app
THEN: the user should see a list of all upcoming events
SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
GIVEN: the main page is open
WHEN: user starts typing in the city textbox
THEN: the user should see a list of cities (suggestions) that match what they’ve typed
SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
GIVEN the user was typing “Berlin” in the city textbox, and the list of suggested cities is showing
WHEN: the user selects a city (e.g., “Berlin, Germany”) from the list
THEN: their city should be changed to that city (i.e., “Berlin, Germany and the user should receive a list of upcoming events in that city

FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

USER STORY: As a User, I should be able to see the details of an event by clicking on the event, so that I can better understand the details of said event.
SCENARIO 1: An event element is collapsed by default
GIVEN: The app is launched or opened
WHEN: The user can see a list of events
THEN: The user cannot see the details of the event.
SCENARIO 2: User can expand an event to see its details
GIVEN: The user can see a list of events
WHEN: The User can click ‘show details’ to expand event
THEN: The event details are visible in expanded window
SCENARIO 3: User can collapse an event to hide its details
GIVEN:The expanded event is visible
WHEN: The user clicks ‘hide details’ to close expanded event
THEN: The expanded event is closed and the user is returned to a list of visible events


FEATURE 3: SPECIFY NUMBER OF EVENTS:

USER STORY: As a User, I should be able to modify the number of events that I can see at one time, so that I can either narrow or expand my focus.
SCENARIO 1:  When user hasn’t specified a number, 32 is the default number
GIVEN: The app is launched or opened
WHEN: The user can see a list of events and no action has been taken to expand event details
THEN: The user can see 32 events
SCENARIO 2: User can change the number of events they want to see
GIVEN: The user can see a list of events and no action has been taken to expand event details
WHEN: The user changes the filter for the number events that they want to see
THEN: The specified number of events is shown to the user

FEATURE 4: USE THE APP WHEN OFFLINE:

USER STORY: As a User, I should be able to use the information stored on the app when offline, so that I do not need an active connection to check events.
SCENARIO 1: Show cached data when there’s no internet connection
GIVEN: The app is not connected to the internet.
WHEN: The cached data is accessed
THEN: The accessed data is then shown and user can browse previously cached events
SCENARIO 2: Show error when user changes the settings (city, time range)
GIVEN:The app is not connected to the internet.
WHEN: The user attempts to change their settings, including city, time, range.
THEN:The app returns an error as it is not connected to the internet.

FEATURE 5: DATA VISUALIZATION

USER STORY: As a User, I should be able to view the data for upcoming events in a particular city, so that I can quickly and easily understand which city is busier.
SCENARIO ONE:  Show a chart with the number of upcoming events in each city
GIVEN: The user can see a list of events and no action has been taken to expand event details
WHEN: The user clicks to see chart of upcoming events in a city
THEN: A chart is displayed, detailing the number of upcoming events in city

