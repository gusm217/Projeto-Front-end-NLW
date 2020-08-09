// Dados
const proffys = [
    { name: "Diego Fernandes" ,
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4" ,
    whatsapp: "923394858",
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões." ,
    subjetc: "Química",
    cost: "20",
    weekday: [
        0
    ]  , 
    time_from: [720], 
    time_to: [1220]
    }
    { name: "Daniele Evangelista" ,
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4" ,
    whatsapp: "923394858",
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões." ,
    subjetc: "Química",
    cost: "20",
    weekday: [
        1
    ]  , 
    time_from: [720], 
    time_to: [1220]
    }
]

const Database = require('./database/db')

const {subjects, weekdays, getSubject} = require ('./utils/format')
const { catch } = require('./database/db')

function pageLanding(req, res){
    return res.render("index.html")
}

function pageStudy(req,res){
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})
    }  
    
    //converter horas em minutos

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query =`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${fiters.subject}'
        `    
    
        // caso haja erro na hora da consulta no banco de dados
        try {
            const db = await Database
            const proffys = await db.all(query)

            proffys.map((proffy) => {
                proffy.subject = getSubject(proffy.subject)
            })

            return res.render('study.html', { proffys, subjects, filters, weekdays })

        } catch (err) {
            console.log(err)

        }
    
}

function pageGiveClasses(req,res){
    return res.render("give-classes.html", {weekdays})
}

async function saveClasses(req,res) {
    const createProffy = require('./database/createProffy')  
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject : req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {

        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from),
            time_to: convertHoursToMinutes(req.body.time_to)
        }
    })

    try{

        const db = awai Database
        await createProffy (db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "weekday=" + req.body.weekday[0]
        queryString += "time=" + req.body.time_from[0]
        return res.redirect('/study' + queryString)
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses
    saveClasses
}