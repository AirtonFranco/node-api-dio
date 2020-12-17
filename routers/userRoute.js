//simulando uma rota de usuario

//importando um modulo nativo do NodeJS
const fs = require('fs') //o fs é para lhe dar com arquivos de sistemas
const {join} = require('path') //importando uma propiedade do fs, que é para lhe dar com pastas de arquivos

//simulando uma interação com BD
//simulação de consulta de BD
const filePath = join(__dirname, 'users.json')

//função para pegar info de um BD
//LENDO USUARIOS DE UM BD
const getUsers = () => {
    const data = fs.existsSync(filePath) //verificando se o arquivo filePath existe
    ? fs.readFileSync(filePath) //readFileSync - se existir retorne o filePath
    : [] //se não retornar um objeto vazio

    //tratando possiveis erro
    try {
        return JSON.parse(data) //se tiver tudo ok, retorna com os dados desse user
    } catch (error) {
        return [] //retornar vazio se tiver algum problema
    }
}

//SALVANDO UM USER
const saveUser = (users) =>
    //Aqui estou pegando e salvando do filePath
    //null = informando que não quero mais nenhum tipo de info
    // \t = informando que quero tabular os dados
    //JSON.stringify = transformando em JSON
    fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

//CRIANDO UMA ROTA /users
//Essa rota ira cuidadr de todas as requisições que tem /users 
const userRoute = (app) => {
    app.route('/users/:id?')
    //GET - solicita os dados dessa rota
    .get((req, res) => {
        const users = getUsers()

        res.send({users})
    })
    //POST - criando um usuario
    .post((req, res) => {
        const users = getUsers()
        users.push(req.body)

        saveUser(users)

        res.send(201).send('OK')
    })
    //PUT - atualizando o usuario
    .put((req, res) => {
        const users = getUsers()
        // map - mapeando usuario já existente
        saveUser(users.map(user => {
            if (user.id == req.params.id) {
                return {
                    ...user,
                    ...req.body
                }
            }
            return user
        }))
        res.status(200).send('OK')
    })
    //DELETE - deletando user
    .delete((req, res) => {
        const users = getUsers()
        //esse metodo ele exclui o user que iremos informar
        saveUser(users.filter(user => user.id !== req.params.id))
        
        res.status(200).send('OK')
    })
}

//exportando
module.exports = userRoute