require('dotenv').config()
const express = require('express')
const cors = require('cors')
var moment = require('moment') // For easier time/date management
var morgan = require('morgan')

const Number = require('./models/number')

const app = express()

//  ------------- MIDDLEWARE ------------------------------

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const morganConf = morgan((tokens, req, res) => {
  let baseConf = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]

  // Don't know whether it would be better practise to create a morgan token for
  // this, but I feel like this is a compact and neat solution so I am keeping it
  if(baseConf[0] === 'POST') {
    baseConf.push(JSON.stringify(req.body))
  }

  return baseConf.join(' ')
})

app.use(morganConf)

//  ------------- ROUTES ------------------------------

// GET all numbers
app.get('/api/persons', (request, response) => {
  Number.find({})
    .then(res => response.json(res))
})

// GET specific phonebook entry
app.get('/api/persons/:id', (request, response) => {
  Number.findById(request.params.id).then(res => {
    if(res) {
      response.json(res)
    } else {
      response.status(404).send({ status:404, error:" Not found" })
    }
  })
})

// GET Phonebook info
app.get('/info', (request, response) => {
  Number.countDocuments({})
  .then(res => {
    response.send(`<b>Phonebook has info for ${res} people</b>
                </br></br>
                ${moment().format('ddd MMM D YYYY HH:mm:ss zZZ')}`)
  })
})

// POST add new people to phonebook
app.post('/api/persons', (request, response) => {
  const body = request.body
  const validation = validateBody(body)

  if(validation[0]) {
    const number = new Number({
      name: body.name,
      number: body.number
    })
    number.save()
    .then(res => response.json(res))

  } else {
    response.status(validation[1]).send({ status: validation[1], error:validation[2] })
  }
})

// Validate POST body input
const validateBody = body => {
  if(!body.name) {
    return [false, 409, "Name is missing!"]

  } else if (!body.number) {
    return [false, 409, "Number is missing!"]

  } else {
    return [true]
  }
}

// DELETE people from phonebook
app.delete('/api/persons/:id', (request, response) => {
  Number.findByIdAndDelete(request.params.id)
  .then(res => {
    if(!res) {
      response.status(404).send({ status:404, error:" Not found" })
    } else {
      response.status(204).end()
    }
  })
})

//  ------------- MISC SETUP & START ------------------------------
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
