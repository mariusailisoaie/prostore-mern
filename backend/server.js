import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import path from 'path'
const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)))
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
  })
}

app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${ process.env.NODE_ENV } on port ${ PORT }`.yellow.bold))
