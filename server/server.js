const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send({
    origin: "London Kings Cross",
    destination: "Edinburgh",
    stops: ["Stevenage, Peterborough, York"],
    departureTime: 1200
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
