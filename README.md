# Grafos1_Vitor_Paulo
## Como rodar
Para executar o programa, inicialmente deve-se fazer um clone do repositório.
```
git clone https://github.com/projeto-de-algoritmos/Grafos1_Vitor_Paulo.git
```
Após fazer o clone do repositório, basta entrar na pasta onde ele se encontra e rodar o servidor localmente na porta de preferência (foi utilizada a 8000).
```
cd Grafos1_Vitor_Paulo/

python3 -m http.server 8000
```
Se por algum acaso, suas alterações não estiverem surtindo efeito, será necessário atualizar o horário da aplicação. Para isso basta abrir o projeto em uma página web, pressionar F12, procurar pela aba "Console", e digitar:
```
Date.now()
```
Esse comando vai gerar um número que deve ser copiado e substituido no arquivo index.html nesses respectivos lugares:
```
<script src="sketch.js?t=1567349803648"></script>
<script src="node.js?t=1567349803648"></script>
<script src="graph.js?t=1567349803648"></script>
```
Após isso tudo deve estar rodando perfeitamente.
