
const path = require('path')
const express = require('express')
const { json: jsonBodyParser } = require('body-parser')
const cors = require('cors')
const basicAuth = require('express-basic-auth')

const { getConfig } = require('./lib/config')
const { getLogger } = require('./lib/logger')
const tokenHandler = require('./lib/token')
const token = require('./lib/token')

const createpwd = () => ((Date.now() * Math.random()).toString(36) + Math.random().toString(36)).replace(/[^a-zA-Z0-9]/g, '')

const init = async () => {

   const config = await getConfig()
   const app = express()
   // logger
   const logger = getLogger(config)

   const tokenHandler = await token(config)

   if (process.env.WITH_AUTH) {
      logger.info("Basic auth enabled")
      const passwd = process.env.AUTH_PASSWORD || createpwd()
      if (!process.env.AUTH_PASSWORD) {
         logger.info(`Basic auth access refi:${passwd}`)
      }
      app.use(basicAuth({
         users: {
            refi: passwd
         },
         challenge: true,
         realm: createpwd(),
      }))
   }

   app.use((req, res, next) => {
      logger.info(`${req.method} ${req.url}`)
      next()
   })
   app.use(cors())
   app.use(jsonBodyParser())

   app.use('/images', express.static(path.resolve(__dirname, 'images')))
   app.use('/api/images', express.static(path.resolve(__dirname, 'images')))

   if (process.env.STATIC_FRONTEND_PATH) {
      logger.info(`Serving frontend from ${process.env.STATIC_FRONTEND_PATH}`)
      app.use('/', express.static(process.env.STATIC_FRONTEND_PATH))
   }

   const wrapError = async (res, cb) => {
      try {
         cb()
      } catch (e) {
         e.code = e.code || 500
         logger.error(`Request error: ${e.message}`)
         logger.error(e)
         const code = e.code || 500
         const message = e.code && e.message ? e.message : 'Internal server error'
         res.sendStatus(code).json({ code, message })
      }
   }

   app.get('/api/:tokenId', async (req, res) => {
      await wrapError(res, async () => {
         logger.info(`Get tokenId=${req.params.tokenId}`)
         const token = await tokenHandler.get(req.params.tokenId)
         res.json(token)
      })

   })

   app.get('/api/', async (req, res) => {
      await wrapError(res, async () => {
         logger.info(`List tokens`)
         const tokens = await tokenHandler.list()
         res.json(tokens)
      })

   })

   app.post('/api/:tokenId', async (req, res) => {
      await wrapError(res, async () => {
         logger.info(`Create tokenId=${req.params.tokenId}`)
         const token = await tokenHandler.save(req.params.tokenId, req.body)
         res.json(token)
      })
   })

   app.put('/api/:tokenId', async (req, res) => {
      await wrapError(res, async () => {
         logger.info(`Edit tokenId=${req.params.tokenId}`)
         const token = await tokenHandler.edit(req.params.tokenId, req.body.ownerAddress, req.body.receiverAddress)
         res.json(token)
      })
   })

   app.delete('/api/:tokenId', async (req, res) => {
      await wrapError(res, async () => {
         logger.info(`Delete tokenId=${req.params.tokenId}`)
         const token = await tokenHandler.delete(req.params.tokenId)
         res.json(token)
      })
   })

   if (process.env.STATIC_FRONTEND_PATH) {
      const paths = [
         "assets",
         "mint",
         "fraction",
         "swap",
         "lending",
      ]
      paths.forEach(pathname =>
         app.get(`/${pathname}`, (req, res) => {
            res.sendFile(path.join(process.env.STATIC_FRONTEND_PATH, `${pathname}.html`))
         }))
   }

   const PORT = config.HTTP_PORT || 5000
   app.listen(PORT, () => {
      logger.info(`App listening at http://localhost:${PORT}`)
   })
}


init().catch(e => console.error(e))