import bluebird from 'bluebird'
import mongodb from 'mongodb'

const MongoClient = bluebird.promisifyAll(mongodb).MongoClient

let db

export default async function db () {
  if (!db) {
    console.log('Connecting to database')
    const client = new mongodb.MongoClient()
    db = await client.connect(dbUrl, { promiseLibrary: bluebird })
  }
  return db
}
