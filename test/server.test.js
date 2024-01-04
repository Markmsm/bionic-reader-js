import { spawn } from 'child_process'
import * as http from 'http'


// const server = spawn('node', ['server.js'])

const executeTest = testOptions => {
    const testName = testOptions.testName
    const postData = testOptions.postData
    const expectedBody = testOptions.expectedBody

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

            if (expectedBody === boldedText) {
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
    testName: 'shouldReturnBoldedTextProperly',
    postData: JSON.stringify({ text: 'texto qualquer para teste' }),
    expectedBody: '\x1b[1mtex\x1b[0mto \x1b[1mqual\x1b[0mquer \x1b[1mpa\x1b[0mra \x1b[1mtes\x1b[0mte'
}
executeTest(testOptions)

testOptions.testName = 'shouldBoldHalfWord'
testOptions.postData = JSON.stringify({ text: 'boldWord' })
testOptions.expectedBody = '\x1b[1mbold\x1b[0mWord'
executeTest(testOptions)

testOptions.testName = 'shouldBoldRegardingEmailAsWord'
testOptions.postData = JSON.stringify({ text: 'email.teste@emailteste.com' })
testOptions.expectedBody = '\x1b[1memail.teste@e\x1b[0mmailteste.com'
executeTest(testOptions)

testOptions.testName = 'shouldBoldPenultimatePunctuationWhenHasTwoFinalPonctuaction'
testOptions.postData = JSON.stringify({ text: 'boldWord.:' })
testOptions.expectedBody = '\x1b[1mboldW\x1b[0mord.:'
executeTest(testOptions)

testOptions.testName = 'shouldBoldTextDisregardingEllipsesAtInitOfPhrase'
testOptions.postData = JSON.stringify({ text: '...boldWord teste' })
testOptions.expectedBody = '...\x1b[1mbold\x1b[0mWord \x1b[1mtes\x1b[0mte'
executeTest(testOptions)

testOptions.testName = 'shouldBoldTextDisregardingEllipsesAtEndOfPhrase'
testOptions.postData = JSON.stringify({ text: 'boldWord teste...' })
testOptions.expectedBody = '\x1b[1mbold\x1b[0mWord \x1b[1mtes\x1b[0mte...'
executeTest(testOptions)

testOptions.testName = 'shouldBoldTextDisregardingEllipsesAtInitAndEndOfWord'
testOptions.postData = JSON.stringify({ text: '...dos...' })
testOptions.expectedBody = '...\x1b[1mdo\x1b[0ms...'
executeTest(testOptions)

testOptions.testName = 'shouldBoldHalfWordDisregardingEllipsesWithWrappers'
testOptions.postData = JSON.stringify({ text: '...(...reticências dentro e fora dos parênteses...)...' })
testOptions.expectedBody = '...(...\x1b[1mreticê\x1b[0mncias \x1b[1mden\x1b[0mtro \x1b[1me\x1b[0m \x1b[1mfo\x1b[0mra \x1b[1mdo\x1b[0ms \x1b[1mparên\x1b[0mteses...)...'
executeTest(testOptions)

testOptions.testName = 'shouldBoldDisregardingWrappers'
testOptions.postData = JSON.stringify({ text: '(1) [12] {123} (1234) [1234567890]' })
testOptions.expectedBody = '(\x1b[1m1\x1b[0m) [\x1b[1m1\x1b[0m2] {\x1b[1m12\x1b[0m3} (\x1b[1m12\x1b[0m34) [\x1b[1m12345\x1b[0m67890]'
executeTest(testOptions)

testOptions.testName = 'shouldBoldForTxtFile'
testOptions.postData = JSON.stringify({
    text: '(1) [12] {123} (1234) [1234567890]',
    fileType: 'txt'
})
testOptions.expectedBody = '(<b>1</b>) [<b>1</b>2] {<b>12</b>3} (<b>12</b>34) [<b>12345</b>67890]'
executeTest(testOptions)

// testOptions.testName = 'shouldBoldDisregardingWrappers'
// testOptions.postData = JSON.stringify({ text: '(1) [12] {123} (1234) [1234567890]' })
// testOptions.expectedBody = '(\x1b[1m1\x1b[0m) [\x1b[1m1\x1b[0m2] {\x1b[1m12\x1b[0m3} (\x1b[1m12\x1b[0m34) [\x1b[1m12345\x1b[0m67890]'

// executeTest(testOptions)
//console.log(server.pid)
//server.kill()