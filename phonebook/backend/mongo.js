const mongoose = require('mongoose')

if((process.argv.length === 3) || (process.argv.length === 5)) {

  const password = process.argv[2]

  const url = `mongodb+srv://fullstack:${password}@cluster0.isc2t.mongodb.net/person-app?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personSchema)

  if(process.argv.length === 3) {
    Person
      .find({})
      .then(result => {
        result.forEach(note => {
          console.log(note)
        }
        )
        mongoose.connection.close()
      })

  } else if(process.argv.length === 5) {

    const person_name = process.argv[3]
    const phone_number = process.argv[4]

    const person = new Person({
      name: person_name,
      number: phone_number
    })

    person.save().then(result => {
      console.log(`added ${person_name} number ${phone_number} to phonebook`)
      mongoose.connection.close()
    })

  }
} else {

  console.log('Invalid number of arguments')
  process.exit(1)

}

