import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
import express from 'express'
import bodyParser from 'body-parser'

const port = new SerialPort({ path: '/dev/tty.usbmodem101', baudRate: 9600 })
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

port.on('open', () => {
  console.log('[INFO] Serial port open.')
})

parser.on('data', data => {
  console.log('[RECEIVE] ', data)
})

app.get('/', async (req, res) => {
  const { q = 'PEACE' } = req.query
  port.write(`Hello from node, ${q}\n`, (err) => {
    if (err) {
      return console.log('[ERROR] ', err.message)
    }
    console.log('[SEND] ', q)
  })
  res.status(200).send('Hello World\n')
})

app.listen(8848, () => console.log('http://localhost:8848/'))
