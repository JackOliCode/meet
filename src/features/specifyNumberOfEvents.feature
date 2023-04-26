Feature: Specify Number Of events

Scenario:  When user hasn’t specified a number, 32 is the default number
Given the app is launched or opened
When the user can see a list of events
Then The default number of events is 32

Scenario: User can change the number of events they want to see via the Number Of Events component
Given the user can see a list of events
When The user specifies the number events that they want to see
Then The specified number of events is shown to the user
