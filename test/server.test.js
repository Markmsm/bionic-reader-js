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
    testName: 'shouldReturnBoldedTextProperly',
    postData: JSON.stringify({ text: 'texto qualquer para teste' }),
    expectedBody: '\x1b[1mtex\x1b[0mto \x1b[1mqual\x1b[0mquer \x1b[1mpa\x1b[0mra \x1b[1mtes\x1b[0mte',
    httpStatusCode: 200
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

testOptions.testName = 'shouldBoldOneHundredPercentageOfEachWord'
testOptions.postData = JSON.stringify({
    text: 'texto qualquer para teste',
    percentageToBold: 100
})
testOptions.expectedBody = '\x1b[1mtexto\x1b[0m \x1b[1mqualquer\x1b[0m \x1b[1mpara\x1b[0m \x1b[1mteste\x1b[0m'
executeTest(testOptions)

testOptions.testName = 'shouldBoldEightyPercentageOfEachWord'
testOptions.postData = JSON.stringify({
    text: 'texto qualquer para teste',
    percentageToBold: 80
})
testOptions.expectedBody = '\x1b[1mtext\x1b[0mo \x1b[1mqualqu\x1b[0mer \x1b[1mpar\x1b[0ma \x1b[1mtest\x1b[0me'
executeTest(testOptions)

testOptions.testName = 'shouldBoldSkippingTwoWords'
testOptions.postData = JSON.stringify({
    text: 'texto qualquer para teste que deve formatar uma palavra a cada 2 palavras',
    percentageToBold: 100,
    wordsToSkip: 2
})
testOptions.expectedBody = '\x1b[1mtexto\x1b[0m qualquer para \x1b[1mteste\x1b[0m que deve \x1b[1mformatar\x1b[0m uma palavra \x1b[1ma\x1b[0m cada 2 \x1b[1mpalavras\x1b[0m'
executeTest(testOptions)

testOptions.testName = 'shouldBoldSkippingFourWords'
testOptions.postData = JSON.stringify({
    text: 'texto qualquer para teste que deve formatar uma palavra a cada 4 palavras',
    percentageToBold: 100,
    wordsToSkip: 4
})
testOptions.expectedBody = '\x1b[1mtexto\x1b[0m qualquer para teste que \x1b[1mdeve\x1b[0m formatar uma palavra a \x1b[1mcada\x1b[0m 4 palavras'
executeTest(testOptions)

testOptions.testName = 'shouldReturnBadRequestWhenWordsToSkipIsNegative'
testOptions.postData = JSON.stringify({
    text: 'texto qualquer',
    percentageToBold: 100,
    wordsToSkip: -2
})

testOptions.expectedBody = 'wordsToSkip can not be minor then 0'
testOptions.httpStatusCode = 404
executeTest(testOptions)

//console.log(server.pid)
//server.kill()