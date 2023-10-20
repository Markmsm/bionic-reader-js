import * as fs from 'fs'


const filesPathsFromParameters = []
const actionsParameters = []

process.argv.forEach(arg => {
    if (arg.length === 2) {
        actionsParameters.push(arg)
    } else if (arg.endsWith('.txt')) {
        filesPathsFromParameters.push(arg)
    }
})

console.log('filesPathsFromParameters = ', filesPathsFromParameters)
console.log('actionsParameters = ', actionsParameters)

const formatText = text => {
    if (actionsParameters.includes('-f')) {
        const percentage = actionsParameters[actionsParameters.indexOf('-f') + 1]
        if (!percentage) {
            process.stderr.write('Error: you should pass a percentage between 50 an 100 when pass "-f" parameter.\n')
        } else if (percentage >= 50 && percentage <= 100) {
            return text.split(' ')
            .map(word => {
                const wordLength = word.length
                const boldLength = (wordLength * percentage) / 100
                
                return `<b>${word.slice(0, boldLength)}</b>${word.slice(boldLength)}`
            })
            .join(' ') 
        }
    }
}

if (actionsParameters.includes('-o')) {
    if (filesPathsFromParameters.length === 2) {
        const fileContent = fs.readFileSync(filesPathsFromParameters[1], 'utf-8')
        fs.appendFileSync(filesPathsFromParameters[0], formatText(fileContent))
    } else if (filesPathsFromParameters.length === 1) {
        process.stdin.on('data', data => {
            fs.appendFileSync(filesPathsFromParameters[0], formatText(data.toString()))
        })
    } else {
        process.stderr.write('Error: you should pass a file".txt" to save when pass "-o" parameter.\n')
    }
} else {
    if (filesPathsFromParameters.length === 1) {
        const formattedText = formatText(fs.readFileSync(filesPathsFromParameters[0], 'utf-8'))
        process.stdout.write(`${formattedText}\n`)
    } else if (filesPathsFromParameters.length === 0) {
        process.stdin.on('data', data => {
            process.stdout.write(formatText(data.toString()))
        })
    } else {
        process.stderr.write('Error: you should pass just one file if no save in file parameter (-o).\n')
    }
}