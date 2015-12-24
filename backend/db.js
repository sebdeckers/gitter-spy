import bluebird from 'bluebird'
import mongodb from 'mongodb'

const MongoClient = bluebird.promisifyAll(mongodb).MongoClient

let db

export default async function () {
  if (!db) {
    console.log('Connecting to database')
    const client = new mongodb.MongoClient()
    db = await client.connect(dbUrl, { promiseLibrary: bluebird })
    console.log('Connected to database')
  }
  return db
}
