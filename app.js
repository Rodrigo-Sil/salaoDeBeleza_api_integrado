const express = require('express')
const loginRoutes = require('./src/routes/loginRoutes')
const app = express()
const port = 3000

const cors = require("cors")
const db = require("./db")
const servicoRoutes = require("./src/routes/servicoRoutes");


app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/v1/auth', loginRoutes);

app.use("/api/v1/servicos", servicoRoutes);

app.listen(port, () => {
  console.log(`Sistema rodando na porta ${port}`)
})

module.exports = app;

