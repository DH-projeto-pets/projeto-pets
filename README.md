<p align="center">
<img src="/public/images/petAqui-capa.jpg" width="600" align="center">
</p>

# PetAqui :dog::cat:

PetAqui é uma plataforma que foi desenvolvida como Projeto Integrador durante o curso de Desenvolvimento Web Full Stack na Digital House, onde todos os integrantes que trabalharam no projeto são bolsistas do 1º Programa Santander Coders.

O foco principal do projeto são <i><b>pets perdidos, encontrados</b></i> e para <i><b>adoção.</b></i>

#### Pets perdidos: 

Pessoas que perderam o seu bichinho de estimação, podem se cadastrar na plataforma e divulgar o seu desaparecimento. Tudo de forma simples, fácil e rápida!

#### Pets encontrados: 

Encontrou um animalzinho perdido na rua? 
Cadastre-o na plataforma para que encontre rapidamente o seu tutor!

#### Pets para adoção: 

Busque um pet para te fazer companhia, temos uma área somente para adoção.

## Desenvolvedores :computer: :muscle:

|  [<img src="https://avatars2.githubusercontent.com/u/60617310?s=400&u=befe7b900d72c84be55da6120cc6537d3ad51b23&v=4" width=115><br><sub>Bianca Pugliesi</sub>](https://github.com/bipugliesi)    | [<img src="https://avatars3.githubusercontent.com/u/42839553?s=400&u=bde1b686f7c49e5d2894530b61b9e46476992767&v=4" width=115><br><sub>Marco Menezes</sub>](https://github.com/marcoaureliomenezes)   | [<img src="https://avatars3.githubusercontent.com/u/21142413?s=400&u=0d4859aaa96f9bf50c8362605fb17f3e365f5ef1&v=4" width=115><br><sub>Matheus Macedo</sub>](https://github.com/matheuscmacedo0)  |  [<img src="https://avatars1.githubusercontent.com/u/29684161?s=400&u=3767b182b677b08d33d408764925cda1c83d8b9e&v=4" width=115><br><sub>Paula Wyrla</sub>](https://github.com/paulanelo)  | [<img src="https://avatars2.githubusercontent.com/u/56303576?s=400&u=46b282f5a5a9968c5f4ff86a60966ab2116759d5&v=4" width=115><br><sub>Rosemeire Oyakawa</sub>](https://github.com/ahakawa)  |
|:-:|---|---|---|---|

## Como rodar o projeto localmente :arrow_forward:

## Pré-requisitos :warning:

[Node](https://nodejs.org/en/download/)

--------------------------------------------------------------------------------------------------------------------

Clone o projeto via terminal:

```
git clone https://github.com/DH-projeto-pets/projeto-pets.git
```

Entre na pasta do projeto:  

```
 cd projeto-pets/
```

Instale as dependências:

```
npm install
```

Na raiz do projeto, adicione um arquivo .env com as informações do exemplo abaixo, conforme arquivo modelo .env.example que já está no projeto.

```
DB_USER=XXXX
DB_PASS=XXXX
DB_NAME=XXXX
DB_HOST=XXXX
DB_PORT=XXXX
API_KEY=XXXX
```

```
Onde:
DB_USER é o usuário do banco de dados
DB_PASS é a senha do banco de dados
DB_NAME é o nome que você vai dar ao seu banco de dados
DB_HOST é o endereço local, por exemplo, localhost ou 127.0.0.1
DB_PORT é o número da porta do banco de dados, por exemplo, a porta padrão do mysql é a 3306
API_KEY é a chave do google geocoding
```

Execute o projeto através do comando:

```
npm start
```

Abra o navegador e visualize o projeto:

```
http://localhost:3000
```
