import express, { json } from 'express'

import { CloudAdapter, loadAuthConfigFromEnv, authorizeJWT } from '@microsoft/agents-hosting'
import pjson from '@microsoft/agents-hosting/package.json'

import { skillAgent } from './agent.js'

// Load authentication config from environment variables
const config = loadAuthConfigFromEnv()
const adapter = new CloudAdapter(config)

const server = express()
server.use(express.static('public'))
server.use(authorizeJWT(config)) // Enable authentication

server.use(json())
server.post('/api/messages',
  async (req, res) => {
    await adapter.process(req, res, (context) => skillAgent.run(context))
  }
)

const port = process.env.PORT || 3978

server.listen(port, () => {
  console.log(`\n agent skill, running on sdk version ${pjson.version} listening on ${port} for clientId ${process.env.clientId}`)
}).on('error', (err) => {
  console.error(err)
  process.exit(1)
})
