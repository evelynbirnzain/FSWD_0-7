const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let entries = [{"id": 1, "name": "Arto Hellas", "number": "040-123456"},
    {"id": 2, "name": "Ada Lovelace", "number": "39-44-5323523"},
    {"id": 3, "name": "Dan Abramov", "number": "12-43-234345"},
    {"id": 4, "name": "Mary Poppendieck", "number": "39-23-6423122"}]

app.get('/api/persons', (request, response) => {
    response.json(entries)
})

app.get('/api/info', (request, response) => {
    const template = `
    <div>Phonebook has info for ${entries.length} people</div>
    <div>${new Date()}</div>
`
    response.send(template)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = entries.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    entries = entries.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (entries.map(p => p.name).includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const entry = {
        name: body.name, number: body.number, id: generateId(),
    }

    entries = entries.concat(entry)

    response.json(entry)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})