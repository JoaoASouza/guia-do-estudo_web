function fillSubjectCard(data) {
    var card = document.getElementById('subjectCard')
    var cardTitle = card.children[0]
    var cardElements = card.children[1].children
    
    cardTitle.innerHTML = data.name
    cardElements[0].innerHTML = data.period + 'º período'
    cardElements[1].children[0].innerHTML = 'Professor: ' + data.professor
    cardElements[1].children[1].innerHTML = 'Créditos: ' + data.credits
    cardElements[1].children[2].innerHTML = 'Carga horária: ' + data.workload
    cardElements[2].href = data.url

    card.style.display = 'flex';
}

function searchSubject() {
    var selectedSubject = document.getElementById('subjectsNames').value
    fetch(`${prot}://${url}/subjectinfo/${selectedSubject}`)
        .then(response => response.json())
        .then(data => {
            fillSubjectCard(data)
        })
}

function getSubjects() {
    fetch(`${prot}://${url}/subsnames`)
        .then(response => response.json())
        .then(data => {
            var subjectsSection = document.getElementById('subjectsNames')
            for (subject of data) {
                var option = document.createElement('OPTION')
                option.innerHTML = subject
                subjectsSection.appendChild(option)
            }
        })
}

if (document.location.protocol === 'file:') {
    var url = 'localhost:5000'
    var prot = 'http'
    console.log('Development mode')
    console.log(`Fetching data from ${url}`)
} else {
    var url = 'guia-estudo.herokuapp.com'
    var prot = 'https'
}

getSubjects()