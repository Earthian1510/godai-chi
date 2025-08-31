import './style.css'
import { addActivityForm } from './components/addActivityForm'
import { activityLog } from './components/activityLog'

const root = document.getElementById('app')

function header(){
    const header = document.createElement('header')
    const h1 = document.createElement('h1')
    // h1.innerText = '五大 - 地'
    h1.innerText = 'Godai - chi'
    h1.classList.add('fs-3')

    const div = document.createElement('div')
    const nav = document.createElement('a')

    nav.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i>`
    div.appendChild(nav)

    nav.addEventListener("click", (e) => {
        e.preventDefault()
        root.innerHTML = ""
        
        root.appendChild(activityLog())
    })

    header.appendChild(h1)
    header.appendChild(div)

    return header
}

function heroImage(){
    const img = document.createElement('img')
    img.src = '/asset/images/kensei.png'
    return img
}

function main(){
    const mainDiv = document.createElement('main')
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')

    div1.classList.add('left')
    div2.classList.add('right')

    div1.appendChild(heroImage())
    div2.appendChild(addActivityForm())

    mainDiv.appendChild(div1)
    mainDiv.appendChild(div2)

    return mainDiv
}


export const Godai = () => {
   const container = document.createElement('div')
   container.appendChild(header())
   container.appendChild(main())

   return container
}


root.appendChild(Godai())