import moongose from 'mongoose'
import config from './index.js'

const connection = async () => {
  await moongose.connect(config.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

process.on('uncaughtException', (error) => {
  console.error(error)
  mongoose.disconnect()
})

export { connection, moongose }
