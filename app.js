import * as fs from 'fs'


const acceptedParameters = ['-o', '-f', '-j']
const actionsParameters = new Map()

// Read parameters
const parameters = process.argv

for (let i = 2; i < parameters.length; i++) {
    const parameter = parameters[i]

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
        process.stderr.write(`Error reading file: ${err}\n`)
    }
} else {
    try {
        text = fs.readFileSync(0, 'utf-8')
    } catch (err) {
        process.stderr.write(`Error reading stdin: ${err}\n`)
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
        process.stderr.write(`Error writing in file: ${err}\n`)
    }
} else {
    process.stdout.write(`\n${formattedText}\n\n`)
}