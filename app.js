const PORT = 3000;
const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server is running...")
})

let inMemoryData = {
    contacts: []
}

// CRUD
// create a contact
app.post('/api/contact', (req, res) => {
    let body = req.body

    if (!body.firstname) {
        res.status(400).send(`firstname.da kalla qo'ydin`);
        return
    }

    if (!body.lastname) {
        res.status(400).send(`lastname.da kalla qo'ydin`);
        return
    }

    if (!body.phone) {
        res.status(400).send(`phone.da kalla qo'ydin`);
        return
    }

    for (let i = 0; i < inMemoryData.contacts.length; i++) {
        const element = inMemoryData.contacts[i];
        if (element.id == body.id) {
            res.status(400).send(`id:${body.id} contact uje bor!`);
            return
        }
    }

    body.createAt = new Date()
    inMemoryData.contacts.push(body)

    res.status(201).send("successfully created")
})

// read contact(s)
app.get('/api/contact', (req, res) => {
    if (inMemoryData.contacts.length == 0) {
        res.status(404).send("contact resource not found!")
        return
    }
    res.json(inMemoryData.contacts)
})

// get a contact
app.get('/api/contact/:id', (req, res) => {
    let id = req.params.id

    let contact = inMemoryData.contacts.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} contact yoq!`);
        return
    }

    res.status(200).json(contact)
})


// update a contact
app.put('/api/contact', (req, res) => {
    let body = req.body

    console.log(body)
    let contact = inMemoryData.contacts.find(e => e.id == body.id)

    if (!contact) {
        res.status(400).send(`id:${body.id} contact yoq!`);
        return
    }

    for (let i = 0; i < inMemoryData.contacts.length; i++) {
        const element = inMemoryData.contacts[i];
        if (element.id == body.id) {
            body.createAt = inMemoryData.contacts[i].createAt
            body.updateAt = new Date()
            inMemoryData.contacts[i] = body
            break;
        }
    }

    res.status(200).send("successfully updated")
})

// delete a contact
app.delete('/api/contact/:id', (req, res) => {
    let id = req.params.id

    let contact = inMemoryData.contacts.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} contact yoq!`);
        return
    }

    inMemoryData.contacts = inMemoryData.contacts.filter(e => e.id != id)

    res.status(200).send("successfully deleted")
})

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})