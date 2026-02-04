const express = require('express')
const app = express()
const port = 3000

//Standard departures endpoint
app.get('/getDepartures/:stnCode', async (req, res) => {
  res.send(await fetch(`https://api.rtt.io/api/v1/json/search/` +req.params.stnCode , {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${btoa(process.env.AUTH_ID + ":" + process.env.AUTH_PASSWORD)}`,
    },
}).then((result) => result.json().then((resJson) => {return resJson}).catch(() => {return 'error getting station'})))
})

//departures via a specific station endpoint
app.get('/getDepartures/:stnCode/to/:viaCode', async (req, res) => {
  res.send(await fetch(`https://api.rtt.io/api/v1/json/search/` +req.params.stnCode + '/to/' + req.params.viaCode, {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${btoa(process.env.AUTH_ID + ":" + process.env.AUTH_PASSWORD)}`,
    },
}).then((result) => result.json().then((resJson) => {return resJson}).catch(() => {return 'error getting station information'})))
})

//standard train service lookup endpoint
app.get('/getService/:Uid/:year/:month/:day', async (req, res) => {
    res.send(await fetch(`https://api.rtt.io/api/v1/json/service/` + req.params.Uid + '/' + req.params.year + '/' + req.params.month + '/' + req.params.day , {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${btoa(process.env.AUTH_ID + ":" + process.env.AUTH_PASSWORD)}`,
    },
}).then((result) => result.json().then((resJson) => {return resJson}).catch(() => {return 'error getting service'})))
})

//TODO: better error handling

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
