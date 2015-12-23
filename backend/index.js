import path from 'path'
import express from 'express'
import db from './db'
const app = express()

app.use(express.static(path.join(__dirname, '..', 'frontend')))

async function getMessages (user, room) {
  const messages = await fetch(`https://api.gitter.im/v1/rooms/${ room.id }/chatMessages`)
  return messages
}

app.get('/update', async function (req, res) {
  for (const room of await getRooms()) {
    const messages = await getMessages(req.user, room)
    const urls = [].concat(...(messages
      .filter(message => message.urls && message.urls.length > 0)
      .map(message => message.urls)
    ))
    console.log('URL list updated', urls)
  }
})

async function getChats (user) {
  const response = await fetch(`https://api.gitter.im/v1/rooms`, {
    headers: {
      authentication: 'Bearer ' + user.id_token
    }
  })
  if (!response.ok) throw Error(res)
  return await response.json()
}

async function getRooms () {
  const database = await db()
  const collection = await database.collection('rooms')
  return await collection.find().toArray()
}

app.get('/rooms', async function (req, res) {
  const [chats, spies] = await* [
    getChats(req.user),
    getRooms()
  ]
  res.json(
    rooms.filter(room => chats.some(chat => chat.id === room.id))
  )
})

export default app
