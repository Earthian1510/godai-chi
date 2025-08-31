import { Godai } from "../main"
const api = import.meta.env.VITE_API_URL

const root = document.getElementById('app')

function headerActivityLog(){
    const header = document.createElement('header')
    const h1 = document.createElement('h1')
    // h1.innerText = '五大 - 地'
    h1.innerText = 'Godai - chi'
    h1.classList.add('fs-3')

    const div = document.createElement('div')
    const nav = document.createElement('a')

    nav.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`
    nav.addEventListener("click", (e) => {
        e.preventDefault()
        root.innerHTML = ""
            
        root.appendChild(Godai())
    })
    div.appendChild(nav)

    header.appendChild(h1)
    header.appendChild(div)


    return header
}

function displayLogs(){
    const section = document.createElement('section')
    section.classList.add('logs')

    const title = document.createElement('h2')
    title.innerText = 'Activity Logs'
    section.appendChild(title)

    const list = document.createElement("div");
    list.classList.add("logs-list");
    section.appendChild(list);

    fetch(`${api}/activity`)
    .then((res) => res.json())
    .then((data) => {
        
        if(data.length > 0){
            for(let i = 0; i < data.length; i++){
                const card = document.createElement('div')
                card.classList.add('log-card')
                card.innerHTML = `<p><strong>${data[i].category}</strong></p>
                    <p>${data[i].description || "(no description)"}</p>
                    <p>${data[i].start} → ${data[i].end}</p>
                    <p><small>${new Date(data[i].date).toLocaleString()}</small></p>
                `;

                list.appendChild(card)
            }
        }
    })
    .catch((error) => {
        console.error("Failed to fetch logs:", error)
    })

    return section
}

export function activityLog(){
    const container = document.createElement('div')
    container.appendChild(headerActivityLog())
    container.appendChild(displayLogs())
    return container
}

activityLog()