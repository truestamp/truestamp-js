// Truestamp library Node.js usage demo with async/await

// Usage:
//   npm install
//   node ./index.js

// Utility lib for generating hashes
const Hashes = require("jshashes")

// Remote lib via npm
const Truestamp = require("@truestamp/truestamp-js")

// Local lib
// const Truestamp = require("../../dist/truestamp.js")

// Create the 'examples/config.json' file, with this structure, to get started.
//
// {
//   "accessToken": "..."
// }
const config = require("../config.json")

// Instantiate and configure a client object 't'
const t = new Truestamp({
  accessToken: config.accessToken,
})

async function asyncCall() {
  try {
    console.log(`GET /v1/heartbeat`)
    const hb = await t.getHeartbeat()
    console.log(hb)
  } catch (error) {
    console.error(error)
  }

  let newDoc
  try {
    console.log(`POST /v1/documents`)
    let now = new Date()
    let nowHash = new Hashes.SHA256().hex(now.toISOString())
    console.log(now.toISOString())
    console.log(nowHash)

    newDoc = await t.createDocument({
      hash: nowHash,
      type: "sha2-256",
    })
    console.log(newDoc)
  } catch (error) {
    console.error(error)
  }

  try {
    console.log(`GET /v1/documents/${newDoc.id}`)
    const d = await t.getDocument(newDoc.id)
    console.log(d)
  } catch (error) {
    console.error(error)
  }

  let updatedDoc
  try {
    console.log(`PUT /v1/documents/${newDoc.id}`)
    let now = new Date()
    let nowHash = new Hashes.SHA256().hex(now.toISOString())
    console.log(now.toISOString())
    console.log(nowHash)

    updatedDoc = await t.updateDocument(newDoc.id, {
      hash: nowHash,
      type: "sha2-256",
    })
    console.log(updatedDoc)
  } catch (error) {
    console.error(error)
  }

  try {
    console.log(
      `GET /v1/documents/${updatedDoc.id}?revision=${updatedDoc.revision}`
    )
    const dr = await t.getDocument(updatedDoc.id, updatedDoc.revision)
    console.log(dr)
  } catch (error) {
    console.error(error)
  }

  try {
    console.log(`DELETE /v1/documents/${updatedDoc.id}`)
    let d = await t.deleteDocument(updatedDoc.id)
    console.log(d)
  } catch (error) {
    console.error(error)
  }
}

asyncCall()
