const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(event)=>{
    //prevent the browser to refresh the page after submission
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading'

    messageOne.textContent = ''
    
    fetch('/weather?address=' + location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            
            messageOne.textContent = data.error

        }else{

            messageOne.textContent = data.location

            messageTwo.textContent = data.forecast

        }
    })
})



})