const express = require('express')
var moment = require('moment') // For easier time/date management
const app = express()

app.use(express.json())

let people = [
    { name: 'Edsger Dijkstra', number: '040-123456', id:1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id:2 },
    { name: 'Dan Abramov', number: '12-43-234345', id:3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id:4 }
  ]

// GET all numbers
app.get('/api/persons', (request, response) => {
  response.json(people)
})

// GET specific phonebook entry
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(x => x.id === id)

  if(person) {
    response.json(person)
  } else {
    response.status(404).send({error:"404 Not found"})
  }
})

// GET Phonebook info
app.get('/info', (request, response) => {

  let info = `<b>Phonebook has info for ${people.length} people</b>
              </br></br>
              ${moment().format('ddd MMM D YYYY HH:mm:ss [GMT]ZZ [(Eastern European Standard Time)]')}`

  response.send(info)
})

// POST add new people to phonebook
app.post('/api/persons', (request, response) => {
  const body = request.body
  const maxRange = 500
  const validation = validateBody(body)

  if(validation[0]) {
    const newPerson = {
      name: body.name,
      number: body.number,
      id: Math.round(Math.random()*maxRange)
    }

    people.push(newPerson)
    response.redirect('/api/persons')
  } else {
    response.status(validation[1]).send({ error:validation[2] })
  }
})

// Validate POST body input
const validateBody = body => {
  if(!body.name) {
    return [false, 409, "Name is missing!"]

  } else if (!body.number) {
    return [false, 409, "Number is missing!"]

  } else if (people.find(pers => pers.name === body.name)) {
    return [false, 409, "This name already exists in the phonebook!"]

  } else {
    return [true]
  }
}

// DELETE people from phonebook
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const amountBefore = people.length
  people = people.filter(pers => pers.id !== id)
  const notInList = !people.find(pers => pers.id == id);

  (notInList && amountBefore > people.length) ? response.status(204).end()
  : response.status(404).send({error:"404 Not found"})
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
