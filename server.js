import * as http from 'http'

http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.on('data', (data) => {
            const body = data.toString()
            console.log('body = ', body)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                data: `Hello POST!`,
                body: body
            }))
        })
    } else if (req.method === 'GET') {
        res.writeHead(200, { 'content-Type': 'application/json' })
        res.end(JSON.stringify({ data: 'Hello World!' }))
    }
}).listen(8080)

console.log('Server is listening on port 8080\nAccess http://localhost:8080')