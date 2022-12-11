import {useEffect, useState} from 'react'
import personService from './services/persons'
import Filter from "./Filter";
import Notification from "./Notification";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchString, setSearchString] = useState('')
    const [notification, setNotification] = useState(null)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        personService.getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])

    const displayNotification = (message, isErrorNotification) => {
        if (isErrorNotification) {
            setIsError(true)
        }
        setNotification(message)
        setTimeout(() => {
            setNotification(null)
            setIsError(false)}, 5000)
    }

    const clearForm = () => {
        setNewName('')
        setNewNumber('')
    }

    const updateNumber = () => {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
            const person = persons.find(p => p.name === newName)
            person.number = newNumber
            personService.update(person.id, person)
                .then(updated => {
                    setPersons(persons.map(p => p.id === person.id ? updated : p))
                    displayNotification(`${person.name}'s number was updated`)
                    clearForm()
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        displayNotification(`${person.name} has already been removed from the server`, true)
                        setPersons(persons.filter(p => p.id !== person.id))
                    } else {
                        displayNotification(`Something went wrong: ${error.response.statusText}`, true)
                    }
                })
        }
    }

    const createEntry = () => {
        const person = {
            name: newName,
            number: newNumber
        }
        personService.create(person).then(response => {
            setPersons(persons.concat(response))
            displayNotification(`${person.name} was added`)
            clearForm()
        })
    }

    const handleAddName = (event) => {
        event.preventDefault()

        if (persons.some(p => p.name === newName)) {
            updateNumber()
        } else {
            createEntry()
        }
    }

    const remove = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .remove(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    displayNotification(`${person.name} was deleted`)
                })
                .catch(error =>{
                    if (error.response.status === 404) {
                        displayNotification(`${person.name} has already been removed from the server`, true)
                        setPersons(persons.filter(p => p.id !== person.id))
                    }
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} isError={isError} />
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