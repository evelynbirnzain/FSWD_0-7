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

export default PersonForm