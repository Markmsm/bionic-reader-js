import { execSync } from 'child_process'


const failedTests = []
const successfulTests = []
const logFailedTest = testName => failedTests.push(testName)
const logSuccessfulTest = testName => successfulTests.push(testName)

const shouldBoldHalfWord = () => {
    // Given:
    const testName = shouldBoldHalfWord.name
    const textToBold = `boldWord`
    const expectedResult = `<b>bold</b>Word\n`

    // When:
    const appResult = execSync(`echo "${textToBold}" | node ../app`).toString()

    // Then:
    if (expectedResult === appResult.toString()) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldBoldTextDisregardingEllipsesAtInitOfPhrase = () => {
    // Given:
    const testName = shouldBoldTextDisregardingEllipsesAtInitOfPhrase.name
    const textToBold = `...boldWord teste`
    const expectedResult = `...<b>bold</b>Word <b>tes</b>te\n`

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
    const expectedResult = `<b>bold</b>Word <b>tes</b>te...\n`

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
    const expectedResult = `...(...<b>reticê</b>ncias <b>den</b>tro <b>e</b> <b>fo</b>ra <b>do</b>s <b>parên</b>teses...)...\n`

    // When:
    const appResult = execSync(`echo "${textToBold}" | node ../app`).toString()

    // Then:
    if (expectedResult === appResult.toString()) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

const shouldBoldHalfEveryWordOfTextFile = () => {
    // Given:
    const testName = shouldBoldHalfEveryWordOfTextFile.name
    const fileToReadContent = 'file_to_read_test.txt'
    const expectedResult = `<b>tex</b>to <b>pa</b>ra <b>tes</b>tar <b>tex</b>to
<b>que</b>bra <b>d</b>e <b>lin</b>ha <b>pa</b>ra <b>tes</b>tar
<b>tex</b>to       <b>co</b>m        <b>vár</b>ios      <b>espa</b>ços
<b>tex</b>to <b>co</b>m   <b>ta</b>b (<b>ta</b>b <b>ant</b>es <b>d</b>a <b>pala</b>vra <b>ta</b>b)



<b>tex</b>to. <b>co</b>m? <b>pon</b>tos!

<b>pala</b>vra...      <b>co</b>m...
<b>reticê</b>ncias...  <b>do</b>is...

...<b>reticê</b>ncias ...<b>n</b>o ...<b>iní</b>cio
<b>reticê</b>ncias ... <b>sol</b>ta

(...<b>reticê</b>ncias <b>den</b>tro ...<b>do</b>s... <b>parên</b>teses...)
...(<b>reticê</b>ncias <b>fo</b>ra <b>do</b>s <b>parên</b>teses)...
...(...<b>reticê</b>ncias <b>den</b>tro <b>e</b> <b>fo</b>ra <b>do</b>s <b>parên</b>teses...)...

<b>test</b>ando <b>e-m</b>ail <b>testes@teste</b>eera.com.br

(<b>tex</b>to (<b>co</b>m) <b>wrap</b>pers) (<b>um</b>a <b>fra</b>se <b>co</b>m <b>wrap</b>per)

(<b>1</b>) [<b>1</b>2] {<b>12</b>3} (<b>12</b>34) [<b>12345</b>67890]`

    // When:
    const appResult = execSync(`node ../app ${fileToReadContent}`)

    // Then:
    if (expectedResult === appResult.toString()) {
        logSuccessfulTest(testName)
    } else {
        logFailedTest(testName)
    }
}

shouldBoldHalfWord()
shouldBoldTextDisregardingEllipsesAtInitOfPhrase()
shouldBoldTextDisregardingEllipsesAtEndOfPhrase()
shouldBoldHalfWordDisregardingEllipsesWithWrappers()
shouldBoldHalfEveryWordOfTextFile()

if(successfulTests) {
    for (const testName of successfulTests) {
        process.stderr.write(`${testName} successful!\n`)
    }
}

if (failedTests) {
    for (const testName of failedTests) {
        process.stderr.write(`${testName} failed!\n`)
    }
}