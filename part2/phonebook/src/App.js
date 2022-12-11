import {useEffect, useState} from 'react'
import personService from './services/persons'

const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.searchString}
                                     onChange={(event) => props.setSearchString(event.target.value)}/>
        </div>
    )
}

const Persons = (props) => {
    return (
        props.persons
            .filter(p => p.name.toLowerCase().startsWith(props.searchString.toLowerCase()))
            .map(p =>
                <div key={p.name}>{p.name} {p.number}
                    <button onClick={() => props.remove(p)}>delete</button>
                </div>)
    )
}

const PersonForm = (props) => {
    const [newName, setNewName] = [props.newName, props.setNewName]
    const [newNumber, setNewNumber] = [props.newNumber, props.setNewNumber]
    return (
        <form onSubmit={props.handleAddName}>
            <div>
                name: <input value={newName}
                             onChange={(event) => setNewName(event.target.value)}/>
            </div>
            <div>
                number: <input value={newNumber}
                               onChange={(event) => setNewNumber(event.target.value)}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        personService.getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])

    const handleAddName = (event) => {
        event.preventDefault()

        if (persons.some(p => p.name === newName)) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const person = persons.find(p => p.name === newName)
                person.number = newNumber
                personService.update(person.id, person).then(updated => setPersons(persons.map(p => p.id === person.id ? updated : p)))
            }
            return
        }

        const person = {
            name: newName,
            number: newNumber
        }

        personService.create(person).then(response => {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
        })
    }

    const remove = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService.remove(person.id).then(() => setPersons(persons.filter(p => p.id !== person.id)))
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchString={searchString} setSearchString={setSearchString}></Filter>

            <h3>Add a new</h3>
            <PersonForm newName={newName} setNewName={setNewName}
                        newNumber={newNumber} setNewNumber={setNewNumber}
                        handleAddName={handleAddName}>
            </PersonForm>
            <h3>Numbers</h3>
            <Persons persons={persons} searchString={searchString} remove={remove}></Persons>
        </div>
    )
}

export default App