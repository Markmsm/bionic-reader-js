### Para criar uma imagem docker da api:
    $ docker build -t IMAGE_NAME .

Onde:
- **-t** para especificar o nome da imagem a ser criada.
- **IMAGE_NAME** é o nome da imagem a ser criada.
- "**.**" ao final do comando para dizer ao docker que deve procurar o arquivo "**Dockerfile**" no diretório raíz.

**Ex**:
> [!TIP]
> $ docker build -t bionic-reader-js .

### Para rodar o container com a imagem da api:
    $ docker run -dp LOCALHOST:LOCAL_PORT:CONTAINER_PORT IMAGE_NAME

Onde:
- **-d** para rodar em modo detach (rodar em background).
- **-p** para criar um mapeamento de portas entre o host e o container.
- **LOCALHOST** é o ip local.
- **LOCAL_PORT** é a porta local que o container será exposto.
- **CONTAINER_PORT** é a porta do container.
- **IMAGE_NAME** é o nome da imagem criada com o comando docker build.

> [!TIP]
> $ docker run -dp 127.0.0.1:8080:8080 bionic-reader-js

### Para parar o container:
    $ docker kill CONTAINER_NAME

Onde:
- **CONTAINER_NAME** é o nome do container.

### Para rodar os testes do server.js:
Rodar o container com a imagem docker criada conforme explicado acima

ou

    $ node server.js
depois:

    $ node test/server.test.js

<span style="color:orange">**Obs:**</span> Após rodar os testes apenas encerrar o server.js ("**CTRL**" + "**C**") no terminal que está rodando caso não tenha rodado via container.

### Para rodar os testes do app.js:
    $ npm t
ou
    $ cd test/ && node app.test.js

### Para instalar o app.js:
- Abrir terminal;
- Navegar até a pasta raiz do projeto;
- Executar:
    
        $ chmod +x app.sh
        $ ./app.sh

### Para rodar o app instalado:
    $ bionicrd --help
    
### Para desinstalar o app.js:
- Abrir um terminal e executar:
        
        $ rm -r $HOME/bionic-reader-js/
        
- remover a linha do arquivo .bashrc de conteúdo = <span style="color:orange">**alias bionicrd="node $HOME/bionic-reader-js/app.js"**</span>




Prático:

Escolhe uma linguagem pra fazer o projeto. Não pode ser java nem c#
Tu vai construir uma aplicação simples de início, pra que a gente possa entender como tu tá. Seguem os requisitos:
Criar uma aplicação X que recebe um texto e retorna esse texto com partes das palavras em negrito (marcar negrito com caracteres de markdown). Isso se chama bionic reading.

A aplicação deve:

- [ ] Ter um nome decente (criativo)
- [x] Estar hospedada no github
- [x] Ler a partir do stdin.
    Exemplo: echo "meu texto aqui" | app
- [x] Ler a partir de um arquivo
    Exemplo: app meu_arquivo.txt
- [x] Deixar em negrito os primeiros 50% de cada palavra (no mínimo 50%)
- [x] Retornar texto no stdout
- [x] Ter um parâmetro para especificar um arquivo de saída
    Exemplo: app -o novo_arquivo.txt meu_texto.txt
- [x] Ter um parâmetro para especificar a fixação (% mínimo de negrito por palavra)
    Exemplo: app -f 70 meu_texto.txt
- [x] Ter um parâmetro para especiicar os pulos (a cada quantas palavras tem um negrito)
    Exemplo: app -j 2 meu_texto.txt
- [x] Não contar pontuação (email deve contar como palavra inteira, mas ponto não)
- [x] Validar se passar opção que não existe (Não importa se tiver opções válidas, passou uma inválida, quebra)
- [x] Não considerar wrappers das palavras
- [x] Se não passar nada no file descriptor, utilizar stdin
- [x] Adicionar --help
- [x] lógica para reticências (pode estar dentro ou fora dos parênteses)
    - [x] considerar somente se palavra termina com reticências (considerei o começo tbm)
    - [x] fazer com recursividade
- [x] testes (como rodar um processo em node através do javascript)
- [x] fazer função recursiva ser otimizada (não ter chance de stack overflow)
- [x] começar a fazer api http usando http.createServer
- [x] essa api vai ter um endpoint [POST] / que recebe o texto pelo body e usa o bionic-reader pra converter
- [x] Deve receber o tipo de arquivo de saída para formatação
- [x] Deve receber o percentil da palavra a ser formatada
- [x] Deve receber a quantidade de palavras a pular a cada palavra formatada
- [x] Separar core do restante
- [x] Fazer com que todas as requisições sejam logadas
- [x] Dockerizar api
- [ ] Usar testes do node