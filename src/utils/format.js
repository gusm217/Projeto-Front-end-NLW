const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// Funcionalidades
function getSubject(subjectNumber){
    const position = +subjectNumber -1
    return subjects[position]
}

function convertHoursToMinutes(hours) {
    const [hour, minutes] = time.split(":")
    return Number ((hour *60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject
}