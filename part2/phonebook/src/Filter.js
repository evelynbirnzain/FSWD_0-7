const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.searchString}
                                     onChange={(event) => props.setSearchString(event.target.value)}/>
        </div>
    )
}

export default Filter