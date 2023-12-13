import { spawn } from 'child_process'


const server = spawn('node', ['server.js'])
console.log(server.pid)
process.exit(0)