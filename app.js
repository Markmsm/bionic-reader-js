import * as fs from 'fs'


const acceptedParameters = ['-o', '-f', '-j']
const actionsParameters = new Map()
const logError = (message, err) => {
    process.stderr.write(`${message}${err ? `: ${err}` : ''}\n`)
    process.exit(1)
}

// Read parameters
const parameters = process.argv

for (let i = 2; i < parameters.length; i++) {
    const parameter = parameters[i]

    if (parameter === '--help') {
        process.stdout.write(
            'Usage: app [OPTION]... [VALUE]... [FILE]...\n' +
            'Format part of text in bold.\n\n' +
            'With no FILE, input is stdin.\n\n' +
            '  -f\t\t\t   VALUE is percentage to bold each word (default is 50)\n' +
            '  -j\t\t\t   VALUE is words to jump (default is 0)\n' +
            '  -o\t\t\t   VALUE is file to create or write (default is log in terminal)\n' +
            '      --help\t display this help and exit\n'
            )
        process.exit(0)
    }

    if (!acceptedParameters.includes(parameter) && !parameter.endsWith('.txt')) {
        logError("Error reading parameters.\nTry 'node app --help' for more information.")
    }
    
    if (acceptedParameters.includes(parameter)) {
        actionsParameters.set(parameter, parameters[i + 1])
        i++
    } else if (parameter.endsWith('.txt')) {
        actionsParameters.set('file to read', parameter)
    }
}

// Read text
let text
if (actionsParameters.has('file to read')) {
    try {
        text = fs.readFileSync(actionsParameters.get('file to read'), 'utf-8')
    } catch (err) {
        logError('Error reading file', err)
    }
} else {
    try {
        text = fs.readFileSync(0, 'utf-8')
    } catch (err) {
        logError('Error reading stdin', err)
    }
}

// Format text
const percentageToFormat = actionsParameters.get('-f') || 50
const wordsToJump = Number(actionsParameters.get('-j') || 0)
const splittedText = text.split(' ')

const formatText = word => {
    const boldLength = Math.round((word.length * percentageToFormat) / 100)

    return `<b>${word.slice(0, boldLength)}</b>${word.slice(boldLength)}`
}

for (let i = 0; i < splittedText.length; i += (wordsToJump + 1)) {
    const word = splittedText[i]
    
    if (word.includes('\n')) {
        splittedText[i] = word
            .split('\n')
            .map(w => w === '' ? w : formatText(w))
            .join('\n')
    } else {
        splittedText[i] = word === '' ? word : formatText(word)
    }
}

const formattedText = splittedText.join(' ')

// Write text
if (actionsParameters.has('-o')) {
    try {
        fs.appendFileSync(actionsParameters.get('-o'), formattedText)
    } catch (err) {
        logError('Error writing in file', err)
    }
} else {
    process.stdout.write(`\n${formattedText}\n\n`)
}