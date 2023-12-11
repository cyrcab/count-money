import express from 'express'
import bodyParser from 'body-parser'
import { Request, Response, NextFunction } from 'express'
import authRouter from './routes/auth.route'
import userRouter from './routes/user.route'
import rssRouter from './routes/rss.route'
import cryptoRouter from './routes/crypto.route'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Cors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content, Accept, Content-type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  next()
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


// Faire une requête pour obtenir le flux RSS
app.use('/api/rss', rssRouter)
app.use('/api/crypto', cryptoRouter)

// Route Hello World
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app
