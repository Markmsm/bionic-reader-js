import { spawn } from 'child_process'
import * as http from 'http'


// const server = spawn('node', ['server.js'])

const executeTest = testOptions => {
    const testName = testOptions.testName
    const postData = testOptions.postData
    const expectedBody = testOptions.expectedBody
    const expectedHttpStatusCode = testOptions.httpStatusCode

    const options = {
        hostname: 'localhost',
        port: 8080,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    const req = http.request(options, (res) => {
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
            const boldedText = JSON.parse(chunk).data.text

            if (expectedBody === boldedText && res.statusCode === expectedHttpStatusCode) {
                process.stderr.write(`\x1b[32m${testName} successful!\x1b[0m\n`)
            } else {
                process.stderr.write(`\x1b[31;1m${testName} failed!\x1b[0m\n`)
            }
        })
        res.on('end', () => {})
    })

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`)
    });

    // Write data to request body
    req.write(postData)
    req.end()
}

const testOptions = {
    testName: 'shouldReturnBadRequestWhenPercentageOfWordToBoldIsNegative',
    postData: JSON.stringify({
        text: 'texto qualquer',
        percentageOfWordToBold: -10,
        wordsToSkip: 2
    }),
    expectedBody: `percentageOfWordToBold can't be minor then 0`,
    httpStatusCode: 404
}

executeTest(testOptions)

testOptions.testName = 'shouldReturnBadRequestWhenWordsToSkipIsNegative'
testOptions.postData = JSON.stringify({
    text: 'texto qualquer',
    percentageOfWordToBold: 100,
    wordsToSkip: -2
})
testOptions.expectedBody = `wordsToSkip can't be minor then 0`
executeTest(testOptions)

//console.log(server.pid)
//server.kill()