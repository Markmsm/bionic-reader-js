import * as http from 'http'

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-Type': 'application/json' })
    res.end(JSON.stringify({ data: 'Hello World!' }))
}).listen(8080)

console.log('Server is listening on port 8080\nAccess http://localhost:8080')