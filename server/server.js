const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const port = 8081
const {sequelize} = require('./models')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./src/passport/passport')

require('./src/routes')(app)

sequelize.sync({force: false})
  .then(() => {
    app.listen(port, () => {
      console.log('You are on port ' + port)
    })
  })