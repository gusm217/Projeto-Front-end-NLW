//Servidor  
const express = require('express')
const server = express()

const{
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')


//configurar o nunjucs pra fazer o TEMPLATE ENGINES
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,

})


server
//receber os dados do req.body
.use(express.urlencoded({ extended: true})
// configurar arquivos estáticos (css, scripts, imgs)
.use(express.static('public'))
//rotas da aplicação
.get('/', pageLanding)
.get('/study', pageStudy)
.get('/give-classes', pageGiveClasses)
.post("/save-class", saveClasses)
.listen(5500)