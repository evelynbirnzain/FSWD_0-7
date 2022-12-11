const Notification = ({message, isError}) => {
    if (message === null) {
        return null
    }

    return (
        <div className='error' style={{'color': isError ? 'red' : 'green'}}>
            {message}
        </div>
    )
}

export default Notification