Prático:
Escolhe uma linguagem pra fazer o projeto. Não pode ser java nem c#
Tu vai construir uma aplicação simples de início, pra que a gente possa entender como tu tá. Seguem os requisitos:
Criar uma aplicação X que recebe um texto e retorna esse texto com partes das palavras em negrito (marcar negrito com caracteres de markdown). Isso se chama bionic reading.

A aplicação deve:
V - Ter um nome decente (criativo)
- Estar hospedada no github
V - Ler a partir do stdin.
    Exemplo: echo "meu texto aqui" | app
- Ler a partir de um arquivo
    Exemplo: app meu_arquivo.txt
V - Deixar em negrito os primeiros 50% de cada palavra (no mínimo 50%)
V- Retornar texto no stdout
- Ter um parâmetro para especificar um arquivo de saída
    Exemplo: app -o novo_arquivo.txt meu_texto.txt
- Ter um parâmetro para especificar a fixação (% mínimo de negrito por palavra)
    Exemplo: app -f 70 meu_texto.txt
- Ter um parâmetro para especificar os pulos (a cada quantas palavras tem um negrito)
    Exemplo: app -j 2 meu_texto.txt