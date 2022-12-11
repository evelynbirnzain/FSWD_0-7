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

export default Persons