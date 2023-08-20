const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())


const port = 5000

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`vNotebook Backend listening on port http://localhost:${port}`)
})