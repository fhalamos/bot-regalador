import * as functions from "firebase-functions";
import * as express from 'express'


const app = express()

app.get('/', (req, res) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  res.status(200).send('Hello world!')
})

app.get('/health', (req, res) => {
  functions.logger.info('Helth Check', { structuredData: true })
  res.status(200).send('Health Check  OK!')
})
exports.app = functions.https.onRequest(app)
