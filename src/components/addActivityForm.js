
const api = import.meta.env.VITE_API_URL

function activityInput(){

    const div = document.createElement('div')
    const label = document.createElement('label')
    label.innerHTML = `Activity Description<br/>`
    const input = document.createElement('textarea')
    input.cols = '40'
    input.rows = '3'
    div.appendChild(label)
    div.appendChild(input)

    return div
}

function activityTime(){

    const div = document.createElement('div')
   
    const label1 = document.createElement('label')
    label1.innerHTML = `<br/>Time <span class='fs-italic'>from</span>`
    const input1 = document.createElement('input')
    input1.classList.add('time-input')
    input1.placeholder = '00:00'

    const label2 = document.createElement('label')
    label2.innerHTML = `<span class='fs-italic'>to</span>`
    const input2 = document.createElement('input')
    input2.classList.add('time-input')
    input2.placeholder = '00:00'

    div.appendChild(label1)
    div.appendChild(input1)
    div.appendChild(label2)
    div.appendChild(input2)

    return div
}

function activityCategory(){
    const categoryList = ['Reading', 'Coding', 'MTP', 'Health', 'Plantation', 'PoNR', 'Screen Time', 'Sleep', 'CE-4-17', 'Relationship', 'Other']
    const div = document.createElement('div')
    const label = document.createElement('label')
    label.innerHTML = `<br/>Category: `
    const select = document.createElement('select')

    for(let i = 0; i < categoryList.length; i++){
        const option = document.createElement('option')
        option.value = categoryList[i]
        option.innerText = categoryList[i]
        select.appendChild(option)
    }


    div.appendChild(label)
    div.appendChild(select)

    return div
}

export function addActivityForm(){
    const form = document.createElement('form')
    const h2 = document.createElement('h2')
    h2.innerHTML = 'Time Logs'

    const div = document.createElement('div')

    div.appendChild(activityInput())
    div.appendChild(activityTime())
    div.appendChild(activityCategory())
    
    const btnDiv = document.createElement('div')
    btnDiv.classList.add('btnDiv')
    const button = document.createElement('button')
    button.innerText = 'Add'
    button.type = 'submit'
    btnDiv.appendChild(button)

    const noteDiv = document.createElement('div')
    const p = document.createElement('p')
    p.classList.add('fs-sm')
    p.innerHTML = `<b>Note:</b> Every night at 23:45 write timelogs of that day.`
    noteDiv.appendChild(p)

    form.appendChild(h2)
    form.appendChild(div)
    form.appendChild(btnDiv)
    form.appendChild(noteDiv)

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const description = form.querySelector('textarea').value 
        const timeInputs = form.querySelectorAll('.time-input')
        const start = timeInputs[0].value
        const end = timeInputs[1].value
        const category = form.querySelector("select").value

        const response = await fetch(`${api}/activity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description, start, end, category
            })
        })

        const data = await response.json()
        console.log('saved:', data)

        form.reset();
    })

    return form

}