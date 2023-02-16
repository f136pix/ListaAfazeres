const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

//Necessario para o uso de CSS
app.use(express.static('public'))

//Mandando o APP usar EJS
app.set('view engine', 'ejs')

let afazeres = []

app.get('/', ((req,res)=> {


    const diasSemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabádo']

    
    
    let hoje = new Date()
    let diaSemana = hoje.getDay()
    let tipoDeDia = diasSemana[diaSemana]

    let opcoesData = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    let dia = hoje.toLocaleDateString("pt-BR", opcoesData)

    //responses por Ejs devem ser feitas desta maneira :
    //res.render('nome_do_arquivo', {param1.ejs : param1.js, param2.ejs : param2.js})
    res.render('lista', {
        tipoDeDia : dia,
        novosAfazeres : afazeres
    })
}))

app.post('/',((req, res) => {
    
    let afazer = req.body.novoAfazer

    afazeres.push(afazer)
    res.redirect('/')
}))

app.listen(3000, (()=> {
    console.log('Online')
}))

