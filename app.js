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

for (let i = 0; i < splittedText.length; i += (wordsToJump + 1)) {
    const word = splittedText[i]
    
    if (word.includes('\n')) {
        splittedText[i] = word.split('\n')
            .map(w => {
                const boldLength = Math.round((w.length * percentageToFormat) / 100)

                return w === '' ? '' : `<b>${w.slice(0, boldLength)}</b>${w.slice(boldLength)}`
            })
            .join('\n')
    } else {
        const boldLength = Math.round((word.length * percentageToFormat) / 100)
        
        splittedText[i] = word === '' ? '' : `<b>${word.slice(0, boldLength)}</b>${word.slice(boldLength)}`
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
    process.stdout.write(`\n${formattedText}\n`)
}





// const formattedText = text
//     .split(' ')
//     .map(word => {
//         const boldLength = Math.round((word.length * percentageToFormat) / 100)

//         return `<b>${word.slice(0, boldLength)}</b>${word.slice(boldLength)}`
//     })
//     .join(' ')














// process.argv.forEach(arg => {
//     if (arg.length === 2) {
//         actionsParameters.push(arg)
//     } else if (arg.endsWith('.txt')) {
//         filesPathsFromParameters.push(arg)
//     }
// })

// console.log('filesPathsFromParameters = ', filesPathsFromParameters)
// console.log('actionsParameters = ', actionsParameters)

// const formatText = text => {
//     if (actionsParameters.includes('-f')) {
//         const percentage = actionsParameters[actionsParameters.indexOf('-f') + 1]
//         if (!percentage || percentage < 50 || percentage > 100) {
//             process.stderr.write('Error: you should pass a percentage between 50 an 100 when pass "-f" parameter.\n')
//         } else if (percentage >= 50 && percentage <= 100) {
//             return text.split(' ')
//             .map(word => {
//                 const wordLength = word.length
//                 const boldLength = (wordLength * percentage) / 100
                
//                 return `<b>${word.slice(0, boldLength)}</b>${word.slice(boldLength)}`
//             })
//             .join(' ') 
//         }
//     }

//     if (actionsParameters.includes('-j')) {
//         console.log('number = ', actionsParameters[actionsParameters.indexOf('-j') + 1])
//         if (actionsParameters[actionsParameters.indexOf('-j') + 1] > 0) {
//             process.stderr.write('Acerto miserávi!!')
//         } else {
//             process.stderr.write('Errroooooooouu!!')
//         }
//     }
// }

// if (actionsParameters.includes('-o')) {
//     if (filesPathsFromParameters.length === 2) {
//         const fileContent = fs.readFileSync(filesPathsFromParameters[1], 'utf-8')
//         fs.appendFileSync(filesPathsFromParameters[0], formatText(fileContent))
//     } else if (filesPathsFromParameters.length === 1) {
//         process.stdin.on('data', data => {
//             fs.appendFileSync(filesPathsFromParameters[0], formatText(data.toString()))
//         })
//     } else {
//         process.stderr.write('Error: you should pass a file".txt" to save when pass "-o" parameter.\n')
//     }
// } else {
//     if (filesPathsFromParameters.length === 1) {
//         const formattedText = formatText(fs.readFileSync(filesPathsFromParameters[0], 'utf-8'))
//         process.stdout.write(`${formattedText}\n`)
//     } else if (filesPathsFromParameters.length === 0) {
//         process.stdin.on('data', data => {
//             const formattedText = formatText(data.toString())
//             if (formattedText) process.stdout.write(formattedText)
//         })
//     } else {
//         process.stderr.write('Error: you should pass just one file if no save in file parameter (-o).\n')
//     }
// }'