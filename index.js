const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 3000

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Скадин Артем - Создание глоссария терминов ВКР и размещение в репозитории')
})

app.get('/mindmap', (req, res) => {
    res.send('<img src="map.png" alt="My_mindmap">')
})

app.get('/dictionary', (req, res) => {
    const data = fs.readFileSync('dictionary.json')
    const dictionary = JSON.parse(data)
    res.send(dictionary)
})

app.get('/:key', (req, res) => {
    try {
        const data = fs.readFileSync('dictionary.json')
        const dictionary = JSON.parse(data)
        let key = req.params.key

        if (key in dictionary) {
            res.send(`<strong>${key}</strong> – ${dictionary[key]}`)
        } else {
            res.send('Такое понятие отсутствует ')
        }
    } catch(e) {
        console.error(e)
    }
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})