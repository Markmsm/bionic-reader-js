import * as http from 'http'
import processText from './core.js'


http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.on('data', (data) => {
            const body = JSON.parse(data)
            const textToProcess = body.text
            const fileType = body.fileType
            const percentageOfWordToBold = body.percentageOfWordToBold || 50
            const wordsToSkip = Number(body.wordsToSkip || 0)
            

            if (wordsToSkip < 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    data: {
                        message: 'Error!',
                        text: 'wordsToSkip can not be minor then 0'
                    }
                }))
                
                return
            }

            console.log('textToBold =', textToProcess)

            const processOptions = {
                textToProcess,
                percentageOfWordToBold,
                wordsToSkip,
                fileType,
            }
            const boldedText = processText(processOptions)

            console.log('boldedText =', boldedText)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                data: {
                    message: 'Bolded text successfully!',
                    text: boldedText
                }
            }))
        })
    } else if (req.method === 'GET') {
        res.writeHead(200, { 'content-Type': 'application/json' })
        res.end(JSON.stringify({ data: 'Hello World!' }))
    }
}).listen(8080)

console.log('Server is listening on port 8080\nAccess http://localhost:8080')