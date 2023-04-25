Feature: Show/Hide an Event's Details

Scenario:  An event element is collapsed by default
Given the app is launched or opened
When the user can see a list of events
Then the user cannot see the details of the event

Scenario: User can expand an event to see its details
Given the user can see a list of events
When the User can click ‘show details’ to expand event
Then the event details are visible in expanded window

Scenario: User can collapse an event to hide its details
Given the user has clicked 'details' to expand event
And the event details are visible in expanded window
When The user clicks ‘hide details’ to close expanded event
Then the expanded event is closed and the user can see a list of visible events