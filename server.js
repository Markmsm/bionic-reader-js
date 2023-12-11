import * as http from 'http'
import { execSync } from 'child_process'

http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.on('data', (data) => {
            const body = data.toString()
            
            console.log('body =', body)

            const boldedText = execSync(`echo "${body}" | node app`).toString()

            console.log('boldedText =', boldedText)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                data: {
                    message: 'Hello POST!',
                    body: boldedText
                }
            }))
        })
    } else if (req.method === 'GET') {
        res.writeHead(200, { 'content-Type': 'application/json' })
        res.end(JSON.stringify({ data: 'Hello World!' }))
    }
}).listen(8080)

console.log('Server is listening on port 8080\nAccess http://localhost:8080')