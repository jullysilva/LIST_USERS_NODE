## APP em NODE JS

O app devera exibir uma pagina com a listagem de usuários obtido por API da random-data-api

[Random-Data-API](https://random-data-api.com/documentation)

Após a listagem exibir uma opção para gravar os dados em um banco interno gerenciado por você que sera um arquivo CSV ( separado por virgula ou ponto e virgula);

Apos a gravação exibir uma opção para editar ou excluir o registro gravado pelo consumo da API...

A tela de consumo de API deve ser uma opção do menu disponível a todo momento para preencher mais dados ao arquivo CSV.

- O Arquivo CSV deve ser um arquivo UNICO onde se tiver 1000 linhas e editar ou remover a linha 50 toda integridade do arquivo devera ser mantida.

- Você esta livre para utilizar o framework que lhe for mais conveniente dentro da linguagem NODE JS.

- Incluir também uma tela de pesquisa de pelo menos 2 campos do arquivo.

## Como rodar o sistema

O sistema foi desenvolvido com a liguagem **NodeJS** com **Express** e **Nodemon**

Acesse o diretório do projeto e no terminal execute:
`npm run dev`

Se o servidor estiver funcionando aparecerá a seguinte mensagem:

`Servidor rodando na porta 3000`

Neste momento, no navegador, acesse a url `localhost:3000`

## Resultado

Aparecerá a tela principal, com uma lista de usuários, buscados na API. A lista contém paginação.

Ao clicar em "Baixar CSV", os dados trazidos pela API será salvo em um arquivo _users.csv_, e será redirecionado para a página com informações mais detalhadas do usuários.

No canto superior direito é possível a execução de pesquisa pelo **ID** ou **Primeiro nome** do usuário.

A tabela possibilita a edição e exclusão do usuário.
