const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const port = process.env.PORT || 3000
const app = express()
const cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session',
  keys: ['pomeranian'],
  // Cookie Options
  // maxAge: 24 * 60 * 60 * 1000 // 24 hours
  maxAge: 24 * 60 * 60 * 1000,
}))

const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

app.use(express.json())
app.use('/account', accountRouter)
app.use('/api', apiRouter)

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://cindych:676123@cluster0.rdvfo.mongodb.net/cwdatabase?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get('/', (req, res) => {
  res.send('hello world')
})

// Start listening for requests
app.listen(port, () => {
  console.log('Listening on port ' + port)
})