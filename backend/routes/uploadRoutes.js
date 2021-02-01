import express from 'express'
import path from 'path'
import formidable from 'formidable'
const __dirname = path.resolve()

const router = express.Router()

router.post('/', (req, res, next) => {
  const form = formidable({ multiples: true, uploadDir: path.join(__dirname, '/uploads'), keepExtensions: true })

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    res.json({ files })
  })
})

export default router
