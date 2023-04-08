# meet

Meet app
- Frontend: Written with JavaScript/React; hosted on GitHub Pages.
- Backend (Server Logic): Written with Node/Express as Lambda functions (FaaS); hosted on AWS (requests come from frontend to Lambda function to data).
- Backend (Database): Google Calendar API.


How will I use serverless functions within my app? 

I will use servless functions in order to authorise users for my app. Specifically, I will use AWS for this and users will send information to AWS and receive a token
back, which will be used to access the app. 
