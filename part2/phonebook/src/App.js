import {useEffect, useState} from 'react'
import axios from "axios";

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
            .map(p => <div key={p.name}>{p.name} {p.number}</div>)
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
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data)
        })
    }, [])

    const handleAddName = (event) => {
        event.preventDefault()

        if (persons.some(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        const person = {
            name: newName,
            number: newNumber
        }

        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
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
            <Persons persons={persons} searchString={searchString}></Persons>
        </div>
    )
}

export default App