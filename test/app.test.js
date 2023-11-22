import { execSync } from 'child_process'

const fakeFileToRead = 'file_to_read_test.txt'
const appResult = execSync(`node ../app ${fakeFileToRead}`)

const expectedResult = `<b>tex</b>to <b>pa</b>ra <b>tes</b>tar <b>tex</b>to
<b>que</b>bra <b>d</b>e <b>lin</b>ha <b>pa</b>ra <b>tes</b>tar
<b>tex</b>to       <b>co</b>m        <b>vár</b>ios      <b>espa</b>ços
<b>tex</b>to <b>co</b>m   <b>ta</b>b (<b>ta</b>b <b>ant</b>es <b>d</b>a <b>pala</b>vra <b>ta</b>b)



<b>tex</b>to. <b>co</b>m? <b>pon</b>tos!

<b>pala</b>vra...      <b>co</b>m...
<b>reticê</b>ncias...  <b>do</b>is...

...<b>reticê</b>ncias ...<b>n</b>o ...<b>iní</b>cio
<b>reticê</b>ncias ... <b>sol</b>ta

<b>test</b>ando <b>e-m</b>ail <b>testes@teste</b>eera.com.br

(<b>tex</b>to (<b>co</b>m) <b>wrap</b>pers) (<b>um</b>a <b>fra</b>se <b>co</b>m <b>wrap</b>per)

(<b>1</b>) [<b>1</b>2] {<b>12</b>3} (<b>12</b>34) [<b>12345</b>67890]`


if (expectedResult !== appResult.toString()) {
    throw new Error('Test failed')
} else {
    process.stdout.write('Teste successful\n')
}