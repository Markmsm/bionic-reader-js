import { execSync } from 'child_process'
import * as fs from 'fs'


const failedTests = []
const successfulTests = []
const logFailedTest = testName => failedTests.push(testName)
const logSuccessfulTest = testName => successfulTests.push(testName)

const shouldBoldHalfWord = () => {
    // Given:
    const testName = shouldBoldHalfWord.name
    const textToBold = `boldWord`
    const expectedResult = `\x1b[1mbold\x1b[0mWord\n`

    // When:
    const appResult = execSync(`echo "${textToBold}" | node ../app`).toString()

    // Then:
    if (expectedResult === appResult.toString()) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldBoldRegardingEmailAsWord = () => {
    // Given:
    const testName = shouldBoldRegardingEmailAsWord.name
    const textToBold = 'email.teste@emailteste.com'
    const expectedResult = '\x1b[1memail.teste@e\x1b[0mmailteste.com\n'

    // When:
    const appResult = execSync(`echo "${textToBold}" | node ../app`).toString()

    // Then:
    if (expectedResult === appResult) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldBoldPenultimatePunctuationWhenHasTwoFinalPonctuaction = () => {
    // Given:
    const testName = shouldBoldPenultimatePunctuationWhenHasTwoFinalPonctuaction.name
    const wordToBold = 'boldWord.:'
    const expectedResult = `\x1b[1mboldW\x1b[0mord.:\n`

    // When:
    const appResult = execSync(`echo "${wordToBold}" | node ../app`).toString()
    
    // Then:
    if (expectedResult === appResult) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldBoldTextDisregardingEllipsesAtInitOfPhrase = () => {
    // Given:
    const testName = shouldBoldTextDisregardingEllipsesAtInitOfPhrase.name
    const textToBold = `...boldWord teste`
    const expectedResult = `...\x1b[1mbold\x1b[0mWord \x1b[1mtes\x1b[0mte\n`

    // When:
    const appResult = execSync(`echo "${textToBold}" | node ../app`).toString()

    // Then:
    if (expectedResult === appResult.toString()) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldBoldTextDisregardingEllipsesAtEndOfPhrase = () => {
    // Given:
    const testName = shouldBoldTextDisregardingEllipsesAtEndOfPhrase.name
    const textToBold = `boldWord teste...`
    const expectedResult = `\x1b[1mbold\x1b[0mWord \x1b[1mtes\x1b[0mte...\n`

    // When:
    const appResult = execSync(`echo "${textToBold}" | node ../app`).toString()

    // Then:
    if (expectedResult === appResult.toString()) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldBoldTextDisregardingEllipsesAtInitAndEndOfWord = () => {
    // Given:
    const testName = shouldBoldTextDisregardingEllipsesAtInitAndEndOfWord.name
    const textToBold = `...dos...`
    const expectedResult = `...\x1b[1mdo\x1b[0ms...\n`

    // When:
    const appResult = execSync(`echo "${textToBold}" | node ../app`).toString()

    // Then:
    if (expectedResult === appResult.toString()) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldBoldHalfWordDisregardingEllipsesWithWrappers = () => {
    // Given:
    const testName = shouldBoldHalfWordDisregardingEllipsesWithWrappers.name
    const textToBold = `...(...reticências dentro e fora dos parênteses...)...`
    const expectedResult = `...(...\x1b[1mreticê\x1b[0mncias \x1b[1mden\x1b[0mtro \x1b[1me\x1b[0m \x1b[1mfo\x1b[0mra \x1b[1mdo\x1b[0ms \x1b[1mparên\x1b[0mteses...)...\n`

    // When:
    const appResult = execSync(`echo "${textToBold}" | node ../app`).toString()

    // Then:
    if (expectedResult === appResult.toString()) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldBoldDisregardingWrappers = () => {
    // Given:
    const testName = shouldBoldDisregardingWrappers.name
    const textToBold = '(1) [12] {123} (1234) [1234567890]'
    const expectedResult = '(\x1b[1m1\x1b[0m) [\x1b[1m1\x1b[0m2] {\x1b[1m12\x1b[0m3} (\x1b[1m12\x1b[0m34) [\x1b[1m12345\x1b[0m67890]\n'

    // When:
    const appResult = execSync(`echo "${textToBold}" | node ../app`).toString()

    // Then:
    if (expectedResult === appResult) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldBoldHalfEveryWordOfTextFile = () => {
    // Given:
    const testName = shouldBoldHalfEveryWordOfTextFile.name
    const fileToReadContent = 'file_to_read_test.txt'
    const expectedResult = `\x1b[1mtex\x1b[0mto \x1b[1mpa\x1b[0mra \x1b[1mtes\x1b[0mtar \x1b[1mtex\x1b[0mto
\x1b[1mque\x1b[0mbra \x1b[1md\x1b[0me \x1b[1mlin\x1b[0mha \x1b[1mpa\x1b[0mra \x1b[1mtes\x1b[0mtar
\x1b[1mtex\x1b[0mto       \x1b[1mco\x1b[0mm        \x1b[1mvár\x1b[0mios      \x1b[1mespa\x1b[0mços
\x1b[1mtex\x1b[0mto \x1b[1mco\x1b[0mm   \x1b[1mta\x1b[0mb (\x1b[1mta\x1b[0mb \x1b[1mant\x1b[0mes \x1b[1md\x1b[0ma \x1b[1mpala\x1b[0mvra \x1b[1mta\x1b[0mb)


\x1b[1mdoisPonto\x1b[0msNoFinal.:

\x1b[1mtex\x1b[0mto. \x1b[1mco\x1b[0mm? \x1b[1mpon\x1b[0mtos!

\x1b[1mpala\x1b[0mvra...      \x1b[1mco\x1b[0mm...
\x1b[1mreticê\x1b[0mncias...  \x1b[1mdo\x1b[0mis...

...\x1b[1mreticê\x1b[0mncias ...\x1b[1mn\x1b[0mo ...\x1b[1miní\x1b[0mcio
\x1b[1mreticê\x1b[0mncias ... \x1b[1msol\x1b[0mta

(...\x1b[1mreticê\x1b[0mncias \x1b[1mden\x1b[0mtro ...\x1b[1mdo\x1b[0ms... \x1b[1mparên\x1b[0mteses...)
...(\x1b[1mreticê\x1b[0mncias \x1b[1mfo\x1b[0mra \x1b[1mdo\x1b[0ms \x1b[1mparên\x1b[0mteses)...
...(...\x1b[1mreticê\x1b[0mncias \x1b[1mden\x1b[0mtro \x1b[1me\x1b[0m \x1b[1mfo\x1b[0mra \x1b[1mdo\x1b[0ms \x1b[1mparên\x1b[0mteses...)...

\x1b[1mtest\x1b[0mando \x1b[1me-m\x1b[0mail \x1b[1mtestes@teste\x1b[0meera.com.br

(\x1b[1mtex\x1b[0mto (\x1b[1mco\x1b[0mm) \x1b[1mwrap\x1b[0mpers) (\x1b[1mum\x1b[0ma \x1b[1mfra\x1b[0mse \x1b[1mco\x1b[0mm \x1b[1mwrap\x1b[0mper)

(\x1b[1m1\x1b[0m) [\x1b[1m1\x1b[0m2] {\x1b[1m12\x1b[0m3} (\x1b[1m12\x1b[0m34) [\x1b[1m12345\x1b[0m67890]`

    // When:
    const appResult = execSync(`node ../app ${fileToReadContent}`).toString()

    // Then:
    if (expectedResult === appResult.toString()) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldSaveInFileIfSaveInFileParameter = () => {
    // Given:
    const testName = shouldSaveInFileIfSaveInFileParameter.name
    const textToBold = `boldWord`
    const expectedResult = `<b>bold</b>Word\n`
    const newFileName = 'new_file.txt'

    // When:
    execSync(`echo "${textToBold}" | node ../app -o ${newFileName}`)

    // Then:
    const newFileContent = fs.readFileSync(newFileName, 'utf-8')
    
    if (expectedResult === newFileContent) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }

    execSync(`rm ${newFileName}`)
}

shouldBoldHalfWord()
shouldBoldRegardingEmailAsWord()
shouldBoldPenultimatePunctuationWhenHasTwoFinalPonctuaction()
shouldBoldTextDisregardingEllipsesAtInitOfPhrase()
shouldBoldTextDisregardingEllipsesAtEndOfPhrase()
shouldBoldTextDisregardingEllipsesAtInitAndEndOfWord()
shouldBoldHalfWordDisregardingEllipsesWithWrappers()
shouldBoldDisregardingWrappers()
shouldBoldHalfEveryWordOfTextFile()
shouldSaveInFileIfSaveInFileParameter()

if (successfulTests) {
    for (const testName of successfulTests) {
        process.stderr.write(`\x1b[32m${testName} successful!\x1b[0m\n`)
    }
}

if (failedTests) {
    for (const testName of failedTests) {
        process.stderr.write(`\x1b[31;1m${testName} failed!\x1b[0m\n`)
    }
}