import * as http from 'http'

http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.on('data', (data) => {
            const body = JSON.parse(data)
            const textToBold = body.text
            const fileType = body.fileType
            const percentageToBold = body.percentageToBold || 50
            const wordsToSkip = Number(body.wordsToSkip || 0)
            const splittedText = textToBold.split(' ')

            if (wordsToSkip < 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    data: {
                        message: 'Error!',
                        text: 'wordsToSkip can not be minor then 0'
                    }
                }))
                
                return
            }

            console.log('textToBold =', textToBold)

            const boldWord = (word, prefix = '', suffix = '') => {
                const regexForPunctuationAtEnd = /[^\w]$/

                if (word.startsWith('...')) {
                    prefix += '...'
                    return boldWord(word.slice(3), prefix)
                }
                if (word.startsWith('(') || word.startsWith('[') || word.startsWith('{')) {
                    prefix += word.slice(0, 1)
                    return boldWord(word.slice(1), prefix)
                }
                if (word.endsWith('...')) {
                    suffix = `...${suffix}`
                    return boldWord(word.slice(0, word.length - 3), prefix, suffix)
                }
                if (word.endsWith(')') || word.endsWith(']') || word.endsWith('}')) {
                    suffix = `${word.slice(word.length - 1)}${suffix}`
                    return boldWord(word.slice(0, word.length - 1), prefix, suffix)
                }
                if (regexForPunctuationAtEnd.test(word)) {
                    suffix = `${word.slice(word.length - 1)}${suffix}`
                    word = word.slice(0, word.length - 1)
                }

                const boldLength = Math.round((word.length * percentageToBold) / 100)
                const partOfWordToBold = word.slice(0, boldLength)
                const partOfWordToNotBold = word.slice(boldLength)

                switch (fileType) {
                    case 'txt':
                        return `${prefix}<b>${partOfWordToBold}</b>${partOfWordToNotBold}${suffix}`
                    default:
                        return `${prefix}\x1b[1m${partOfWordToBold}\x1b[0m${partOfWordToNotBold}${suffix}`
                }
            }

            for (let i = 0; i < splittedText.length; i += (wordsToSkip + 1)) {
                const word = splittedText[i]

                if (word.includes('\n')) {
                    splittedText[i] = word
                        .split('\n')
                        .map(w => (w === '' || w === '...') ? w : boldWord(w))
                        .join('\n')
                } else {
                    splittedText[i] = (word === '' || word === '...') ? word : boldWord(word)
                }
            }

            const boldedText = splittedText.join(' ')

            console.log('boldedText =', boldedText)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                data: {
                    message: 'Bolded text successfully!',
                    text: boldedText
                }
            }))
        })
    } else if (req.method === 'GET') {
        res.writeHead(200, { 'content-Type': 'application/json' })
        res.end(JSON.stringify({ data: 'Hello World!' }))
    }
}).listen(8080)

console.log('Server is listening on port 8080\nAccess http://localhost:8080')