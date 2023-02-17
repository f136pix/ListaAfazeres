exports.conseguirDia = (() => {

    //const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo']

    const hoje = new Date()
    const diaSemana = hoje.getDay()
    //const tipoDeDia = diasSemana[diaSemana]

    const opcoesData = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    return hoje.toLocaleDateString("pt-BR", opcoesData)

    
})

exports.conseguirDiaSemana = (() => {

    //const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo']

    const hoje = new Date()
    const diaSemana = hoje.getDay()
    //const tipoDeDia = diasSemana[diaSemana]

    const opcoesData = {
        weekday: 'long',
    }

    return hoje.toLocaleDateString("pt-BR", opcoesData)

    
})