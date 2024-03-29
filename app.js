import * as fs from 'fs'
import boldText from './core.js'


const acceptedParameters = ['-o', '-f', '-j']
const actionParameters = new Map()
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
            'Bold part of text in bold.\n\n' +
            'With no FILE, input is stdin.\n\n' +
            '  -f\t\t\t   VALUE is percentage to bold each word (default is 50)\n' +
            '  -j\t\t\t   VALUE is words to jump (default is 0)\n' +
            '  -o\t\t\t   VALUE is file path to write or create (default is log in terminal)\n' +
            '\t\t\t   FILE is file path to read (default is stdin)\n' +
            '      --help\t display this help and exit\n\n' +
            'Examples:\n' +
            'node app -o new_file.txt\tRead from stdin, then save formated text in new_file.txt.\n' +
            'node app -f 65\t\t\tRead from stdin, then bold 65% of each word of text, then log in terminal.\n' +
            'node app -j 3 file_to_read.txt\tRead from file_to_read.txt, then bold text skipping 3 words, then log in terminal.\n'
        )
        process.exit(0)
    }

    if (!acceptedParameters.includes(parameter) && !parameter.endsWith('.txt')) {
        logError("Error reading parameters.\nTry 'node app --help' for more information.")
    }

    if (acceptedParameters.includes(parameter)) {
        actionParameters.set(parameter, parameters[i + 1])
        i++
    } else if (parameter.endsWith('.txt')) {
        actionParameters.set('file to read', parameter)
    }
}

// Format then write text
const processText = text => {
    // Format text
    const percentageOfWordToBold = actionParameters.get('-f') || 50
    const wordsToSkip = Number(actionParameters.get('-j') || 0)
    const fileToSave = actionParameters.get('-o') && actionParameters.get('-o')
    const fileType = fileToSave && fileToSave.split('.').pop()

    const processOptions = {
        textToProcess: text,
        percentageOfWordToBold,
        wordsToSkip,
        fileType
    }
    const boldedText = boldText(processOptions)

    // Write text
    if (actionParameters.has('-o')) {
        try {
            fs.appendFileSync(fileToSave, boldedText)
        } catch (err) {
            logError('Error writing in file', err)
        }
    } else {
        process.stdout.write(`${boldedText}`)
    }
}

// Read text
if (actionParameters.has('file to read')) {
    try {
        const fileContent = fs.readFileSync(actionParameters.get('file to read'), 'utf-8')
        processText(fileContent)
    } catch (err) {
        logError('Error reading file', err)
    }
} else {
    try {
        process.stdin.on('data', (data) => {
            processText(data.toString())
        })
    } catch (err) {
        logError('Error reading stdin', err)
    }
}