const express = require('express')
const app = express()
const port = 3000
const authKeys = require('./keys.js')

app.get('/getDepartures/:stnCode', async (req, res) => {
  res.send(await fetch(`https://api.rtt.io/api/v1/json/search/` +req.params.stnCode , {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${btoa(authKeys.username + ":" + authKeys.password)}`,
    },
}).then((result) => result.json().then((resJson) => {return resJson}).catch(() => {return 'error getting station'})))
})
app.get('/getService/:Uid/:year/:month/:day', async (req, res) => {
  console.log(`https://api.rtt.io/api/v1/json/search/` + req.params.Uid + '/' + req.params.year + '/' + req.params.month + '/' + req.params.day)
  res.send(await fetch(`https://api.rtt.io/api/v1/json/service/` + req.params.Uid + '/' + req.params.year + '/' + req.params.month + '/' + req.params.day , {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${btoa(authKeys.username + ":" + authKeys.password)}`,
    },
}).then((result) => result.json().then((resJson) => {return resJson}).catch(() => {return 'error getting service'})))
})
//TODO: better error handling



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
