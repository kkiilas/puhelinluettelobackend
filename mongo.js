require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  Person
    .find({})
    .then(people => {
      console.log('phonebook:')
      people.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
}

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person
    .save()
    .then(response => {
      console.log(`added ${response.name} number ${response.number} to phonebook`)
      mongoose.connection.close()
    })
}