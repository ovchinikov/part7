import React, { useState, useEffect } from 'react'
import { getOne } from './services/services'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      getOne(name)
        .then((country) => {
          setCountry({
            country,
            found: true,
          })
        })
        .catch(() => {
          setCountry({ found: false })
        })
    }
  }, [name])

  console.log(country)
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.country.name.common}</h3>
      <div>capital {country.country.capital} </div>
      <div>population {country.country.population}</div>
      <img
        src={country.country.flags.png}
        height='100'
        alt={`flag of ${country.country.flags.alt}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const reset = () => {
    nameInput.reset()
  }
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    reset()
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
