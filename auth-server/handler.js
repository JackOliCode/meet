const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]; // Scope sets access levels. This is read-only

// stored in credentials variable are requested values to generate authentication URL to access API
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID, // all values with process.env are stored in config.json
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://JackOliCode.github.io/meet"],
  javascript_origins: ["https://JackOliCode.github.io", "http://localhost:3000"],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials; // credentials destructured 

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  // generate URL so users can log in with google
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES, // Scopes array passed to the `scope` option.
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );  
 // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => { //Exchange authorization code for access token with a “callback” after the exchange,
    oAuth2Client.getToken(code, (err, token) => { //The callback in this case is an arrow function with the results as parameters: “err” and “token.
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
      .then((token) => {
          // Respond with OAuth token
          return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(token),
          };
        })
        .catch((err) => {
          // Handle error
          console.error(err);
          return {
            statusCode: 500,
            body: JSON.stringify(err),
          };
        });
    };

    module.exports.getCalendarEvents = event => {

      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );  
     // Decode authorization code extracted from the URL query
      const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
      oAuth2Client.setCredentials({ access_token }); //destructioning access_token and referencing variable created above

      return new Promise( (resolve, reject) => {

        calendar.events.list(  //calendar variable declared at top of file
          { // object argument
            calendarId: calendar_id,
            auth: oAuth2Client,
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: "startTime",
          },
          (error, response) => { // callback function argument
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          }
        );

      })
      .then( results => { //this is the response from above. The data from calendar app
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ events: results.data.items })
        };
      })
      .catch((err) => {
        // Handle error
        console.error(err);
        return {
          statusCode: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(err),
        };
      });


    }