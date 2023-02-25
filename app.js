const express = require('express')
const bodyParser = require('body-parser')
//Importando a função que descobre a data
const { conseguirDiaSemana } = require('./date')
const { conseguirDia} = require('./date')
//Importando Mongoose
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

//Necessario para o uso de CSS, 'public' é a pasta em que ele está, o arquivo exato é definido em lista.ejs 
app.use(express.static('public'))

//Mandando o APP usar EJS
app.set('view engine', 'ejs')

//Conectando ao DB
mongoose.connect('mongodb://localhost:27017/listaAfazeresDB', {useNewUrlParser: true})

//Criando o SCHEMA que será ultilizado
const afazeresSchema = {
    name: String,
}

//Criando a COLLECTION Item/Itens
const Item =  mongoose.model('Item', afazeresSchema)

const tarefa1 = new Item ({
    name: "Lista de Afazeres"
})
const tarefa2 = new Item ({
    name: "Botão + para adicionar um afazer"
})
const tarefa3 = new Item ({
    name: '<-- para concluir'
})

const itemsPadrão = [tarefa1,tarefa2,tarefa3]
 

app.get('/', ((req,res)=> {

    let dia = conseguirDiaSemana()

    //Usando o Find para ler os documentos que estão no DB
    Item.find({} ,((err,itensEncontrados) => {
        itensEncontrados.forEach((a) => {
        console.log(a)})

    //Verificando se a Arr está vazia, para seber se é necessario acresentar os itens Default
    if(itensEncontrados.length === 0){

        //Usando inserMany para fazer Update na DB
        Item.insertMany(itemsPadrão, ((err) => {
            if(err){
                console.log(err)
            }
            else{
                console.log('Sucesso')
            }
        }))  
    }

    //responses por Ejs devem ser feitas desta maneira :
    //res.render('nome_do_arquivo', {param1.ejs : param1.js, param2.ejs : param2.js})
    res.render('lista', {
        tituloLista : dia,
        novosAfazeres : itensEncontrados
        })
}))
  
}))

app.post('/',((req, res) => {

    let afazer = req.body.novoAfazer
    
    //Verificando se estou na Route Trabahlo ou na comum, caso esteja na trabalhos, estou me redirecionando para a mesma com o res.redirect()
    if(req.body.list === 'Lista'){  	                   //O elemento BUTTON.VALUE em lista.ejs está ligao ao header. 
        afazeresTrabalho.push(afazer)
        res.redirect('/trabalho');
    }
    else{
    afazeres.push(afazer)
    res.redirect('/')
    }
}))

app.get('/trabalho', ((req,res) => {
    res.render('lista',{tituloLista: "Lista do trabalho",
                       novosAfazeres : afazeresTrabalho})
}))

app.listen(3000, (()=> {
    console.log('Online')
}))

