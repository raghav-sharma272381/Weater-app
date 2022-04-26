console.log('Client side javascript file is loaded!')



const weatehrForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')




weatehrForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const locaiton = search.value
    msg2.textContent ='Loading...'
    msg1.textContent = ''

    fetch('http://localhost:3000/weather?address=' + locaiton).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg2.textContent =''
                return msg1.textContent = data.error

            }
             msg1.textContent =data.location
             msg2.textContent =data.forecast


        })
    })
})