const express = require('express')
const app = express()
const port = 3000

const axios = require('axios')
const authKeys = require('./keys.js')
console.log(authKeys)
axios({
  method: 'GET',
  url: 'https://api.rtt.io/api/v1/json/search/BMH',
  auth: {
    username: authKeys.username,
    password: authKeys.password
  }
}).then((res) => console.log(res.data))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
