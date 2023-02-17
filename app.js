const express = require('express')
const bodyParser = require('body-parser')
const { conseguirDiaSemana } = require('./date')
const { conseguirDia} = require('./date')
//Importando a função que descobre a data


const app = express()

app.use(bodyParser.urlencoded({extended: true}))

//Necessario para o uso de CSS
app.use(express.static('public'))

//Mandando o APP usar EJS
app.set('view engine', 'ejs')

let afazeres = []
let afazeresTrabalho = []

app.get('/', ((req,res)=> {

    let dia = conseguirDiaSemana()
    //responses por Ejs devem ser feitas desta maneira :
    //res.render('nome_do_arquivo', {param1.ejs : param1.js, param2.ejs : param2.js})
    res.render('lista', {
        tituloLista : dia,
        novosAfazeres : afazeres
    })
}))

app.post('/',((req, res) => {

    let afazer = req.body.novoAfazer
    
    //Verificando se estou na Route Trabahlo ou na comum, caso esteja na trabalhos, estou me redirecionando para a mesma com o res.redirect()
    if(req.body.list === 'Lista'){
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

