const process = require('process')
const mongoose = require('mongoose')
var validator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection succesful!'))
  .catch(() => console.log('Error: could not connect to MongoDB'))

const numberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

numberSchema.plugin(validator)

numberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Number', numberSchema)
