const express = require('express')
const router = express.Router()
const User = require('./models/User')

//rota de leitura dos documentos do banco de dados
    router.get('/read', async(req, res) => {

        var users = await User.find().exec()

        res.json(users)

    })

//rota de atualização dos dados
    router.post('/insert', async(req, res) => {

        var { nome, sobrenome, idade, foto } = req.body

        try{
            const newUser = await User.create({
                nome,
                sobrenome,
                idade,
                foto
            })
    
            if(newUser){
                return res.status(200).json(newUser)
            }
        }catch(err){
            return res.status(401).json({err})
        }


        return res.status(400).json('erro')
    })

//rota de atualização de dados
    router.post('/update/:id', async(req, res) => {
        
        var err = []
        const { id } = req.params
        const { nome, sobrenome, idade, foto } = req.body

        if(!nome || typeof nome == undefined || nome == null){
            err.push({erro: "nome inválido"})
        }
        if(!sobrenome || typeof sobrenome == undefined || sobrenome == null){
            err.push({erro: "sobrenome inválido"})
        }
        if(err.lenght > 0){
            return res.json(err)
        }else{
            try{
                var userDoc = await User.findOne({_id: id}).exec()
        
                if(userDoc){
                    userDoc.nome = nome
                    userDoc.sobrenome = sobrenome
                    if(foto){
                        userDoc.foto = foto
                    }
                    if(idade){
                        userDoc.idade = idade
                    }      
                    
                    await userDoc.save()

                    return res.status(200)
                }
    
            }catch(err){
                console.log("erro na atualização do use: "+err)
            }
        }


    })

    router.delete('/delete/:id', async(req, res) => {

        const { id } = req.params

        try{

            var userDelete = await User.findOneAndDelete({_id: id}).exec()

            if(userDelete){
                return res.status(200)
            }

            return res.status(400)
        }catch(err){
            console.log(err)
            res.json({err: 'erro'})
        }

    })


module.exports = router