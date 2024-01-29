import * as http from 'http'
import processText from './core.js'


http.createServer((req, res) => {
    const httpMethod = req.method

    if (httpMethod === 'POST') {
        req.on('data', (data) => {
            const body = JSON.parse(data)
            const textToProcess = body.text
            const fileType = body.fileType
            const percentageOfWordToBold = body.percentageOfWordToBold || 50
            const wordsToSkip = Number(body.wordsToSkip || 0)
            const url = `${req.headers.host}${req.url}`
            const logRequest = options => {
                const url = options?.url
                const httpMethod = options?.httpMethod
                const statusCode = options?.statusCode
                const error = options?.error
                const reqBody = options?.reqBody
        
                console.log(`
                HTTP ${httpMethod} ${url}
                statusCode = ${statusCode}
                ${error ? `error = ${JSON.stringify(error)}
                reqBody = ${JSON.stringify(reqBody)}` : ''}
                `)
            }

            if (wordsToSkip < 0) {
                const statusCode = 404
                const errorBody = {
                    message: 'Error!',
                    text: 'wordsToSkip can not be minor then 0'
                }
                
                res.writeHead(statusCode, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ data: errorBody }))

                logRequest({
                    url,
                    httpMethod,
                    statusCode,
                    error: errorBody,
                    reqBody: body
                })

                return
            }

            const processOptions = {
                textToProcess,
                percentageOfWordToBold,
                wordsToSkip,
                fileType,
            }
            const boldedText = processText(processOptions)
            const responseBody = {
                message: 'Bolded text successfully!',
                text: boldedText
            }
            const statusCode = 200
            
            logRequest({
                url,
                httpMethod,
                statusCode,
                reqBody: body
            })

            res.writeHead(statusCode, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ data: responseBody }))
        })
    } else if (req.method === 'GET') {
        res.writeHead(200, { 'content-Type': 'application/json' })
        res.end(JSON.stringify({ data: 'Hello World!' }))
    }
}).listen(8080)

console.log('Server is listening on port 8080\nAccess http://localhost:8080')