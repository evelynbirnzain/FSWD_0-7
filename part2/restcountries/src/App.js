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

const Countries = (props) => {
    const countries = props.countries
        .filter(c => c.name?.common.toLowerCase()
            .includes(props.searchString.toLowerCase()))

    if (countries.length === 0) {
        return <div>No matches found.</div>
    }

    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (countries.length > 1) {
        const countryNames = countries.map(c => c.name.common)
        countryNames.sort()
        return <>
            {countryNames.map(c => <div>
                {c}
                <button onClick={() => props.setSearchString(c)}>show</button>
            </div>)}
        </>
    }

    const country = countries[0]
    const languages = Object.values(country.languages)

    return <div>
        <h1>{country.name.common}</h1>
        <div> capital {country.capital[0]}</div>
        <div> area {country.area}</div>

        <h2>languages:</h2>
        <ul>
            {languages.map(l => <li> {l} </li>)}
        </ul>
        <img src={country.flags.png}></img>
    </div>
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all').then(response => {
            setCountries(response.data)
        })
    }, [])

    return (
        <>
            <Filter searchString={searchString} setSearchString={setSearchString}></Filter>
            <Countries countries={countries} searchString={searchString} setSearchString={setSearchString}></Countries>
        </>
    )
}

export default App