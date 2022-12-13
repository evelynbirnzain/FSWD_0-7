const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Usage: node mongo.js <password> [<name>] [<phone_number>]')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://test:${password}@cluster0.bha4moz.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  printPhonebook()
} else if (process.argv.length === 5) {
  savePerson()
}

function savePerson() {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })
      return person.save()
    })
    .then((person) => {
      console.log(`Added ${person.name} (number ${person.number}) to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

function printPhonebook() {
  mongoose
    .connect(url)
    .then(() => {
      console.log('phonebook:')
      return Person.find({})
    })
    .then(result => {
      result.forEach(p => {
        console.log(p.name, p.number)
      })
      mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

