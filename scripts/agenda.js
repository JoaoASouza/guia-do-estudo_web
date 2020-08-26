function clearList(eventList) {
    var numOfchildren = eventList.children.length
    for (var i = 0; i < numOfchildren; ++i) {
        eventList.removeChild(eventList.children[0])
    }
}

function fillEventList(data) {
    var eventList = document.getElementById('eventList')
    clearList(eventList)
    
    for (event of data) {
        var link = document.createElement('A')
        
        link.classList.add('list-group-item')
        link.classList.add('list-group-item-action')
        link.innerText = event.date + ' - ' + event.name
        link.id = event.id
        link.onclick = (link) => {
            if (link.target.classList.contains('active')) {
                link.target.classList.remove('active')
                selectedEvents = selectedEvents.filter(item => item !== link.target.innerText)
            } else {
                link.target.classList.add('active')
                selectedEvents.push(link.target.innerText)
            }
            
            if (selectedEvents.length == 0) {
                document.getElementById('removeButton').style.display = 'none'
            } else {
                document.getElementById('removeButton').style.display = 'block'
            }
            
        }
        
        eventList.appendChild(link)
    }
}

function getEvents() {
    fetch(`${prot}://${url}/events`)
        .then(response => response.json())
        .then(data => {
            fillEventList(data)
        })
}

function addEvent() {
    var date = document.getElementById('event-date').value
    var name = document.getElementById('event-name').value
    
    if (!date || !name) {
        alert('insira os valores para prosseguir')
    } else {
        var event = {
            name,
            date
        }
        
        fetch(`${prot}://${url}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        })
            .then(response => response.json())
            .then(data => {
                getEvents()
            })
    }
}

function removeEvent() {
    const eventsNames = selectedEvents.map(e => e.split('-').pop().slice(1))
    selectedEvents = []
    document.getElementById('removeButton').style.display = 'none'
    console.log(eventsNames)

    fetch(`${prot}://${url}/events`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventsNames)
    })
        .then(response => response.json())
        .then(data => {
            getEvents()
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

getEvents()
var selectedEvents = []