# Live UK rail times 

This application displays live departures from specified UK National Rail stations, as well as specific service information.

##Installation
- Requires Node.js 22.17.0

cd into /server/ and run `npm install`, then `npm run dev`
In a second terminal run the same commands in /client/

##API information
This is powered by the [RealTimeTrains API](https://api.rtt.io/), this requires a developer account to run the project and auth information to be pasted in a keys.js file in /server/
'export const username = "YOUR_USERNAME";
export const password ="YOUR_PASSWORD"'