import { spawn } from 'child_process'


const server = spawn('node', ['server.js'])
console.log(server.pid)
server.kill()