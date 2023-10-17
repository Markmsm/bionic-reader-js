import * as fs from 'fs';


const turnHalfInitWordBold = word => {
    const wordLength = word.length
    const untilBold = (wordLength % 2 === 0) ? (wordLength / 2) : ((wordLength / 2) + 1)
    const boldLetters = word.slice(0, untilBold)
    const normalLetters = word.slice(untilBold)

    return `<b>${boldLetters}</b>${normalLetters}`
}

const formatTextWordsToHalfBold = text => {
    return text.split(' ')
        .map(w => {
            return turnHalfInitWordBold(w)
        })
        .join(' ')
}

const getTextFromFile = filePath => {
    try {
        return fs.readFileSync(filePath, 'utf-8')
    } catch (err) {
        throw new Error(`Error while reading file ${filePath}: `, err)
    }
}

const shouldSaveInFile = commandLineArgument => {
    return commandLineArgument === '-s'
}

const main = () => {
    try {
        console.log(process.argv)

        if (!process.argv[2]) throw new Error('You need to specify a text or a file to format.')

        let text

        if (shouldSaveInFile(process.argv[2])) {
            text = (process.argv[4].endsWith('.txt')) ?
            getTextFromFile(process.argv[4]) :
            process.argv[4]
        } else {
            text = (process.argv[2].endsWith('.txt')) ?
            getTextFromFile(process.argv[2]) :
            process.argv[2]
        }

        const formattedText = formatTextWordsToHalfBold(text)

        fs.appendFileSync(process.argv[3], `${formattedText}`)
        console.log('The "data to append" was appended to file!')
    } catch (err) {
        console.log('Error while formating text: ', err)
    }


    // try {
    //     console.log(fs.readFileSync('test.txt', 'utf-8'))
    // } catch (err) {
    //     console.log('Deu ruim!!!', err)
    // }
}

main()

export { turnHalfInitWordBold, formatTextWordsToHalfBold }