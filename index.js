objTextArea = document.getElementById('txtTextArea');
const UUID = 'de2d2054-17ef-45bf-9b53-a54c046f063a'

const init = () => {
    loadComments()
}

const isEmpty = objTextArea => objTextArea.trim() === ''

const onFormSubmit = (event) => {
    event.preventDefault()
    if (objTextArea.value.length != 0 && !isEmpty(objTextArea.value)) {
        createLine(objTextArea.value)
        saveText(objTextArea.value)
        objTextArea.value = ''
        objTextArea.focus()
    } else {
        alert('Escreva um comentário!!!')
    }
}

const createLine = (text) => {
    let list = document.getElementById('list')
    let li = document.createElement('li')
    li.textContent = text
    list.appendChild(li)
}

const saveText = (text) => {
    const body = JSON.stringify({ post: text })
    fetch(`https://news-api-node.herokuapp.com/api/v1/news/${UUID}`, {
        method: 'POST', body, headers: {
            'Content-Type': 'application/json'
        }
    })
}

const loadComments = () => {
    fetch(`https://news-api-node.herokuapp.com/api/v1/news/${UUID}`)
        .then(response => response.json())
        .then(data => {
            data.map(item => {            
                return item.post
            }).forEach(createLine)
        })
        
}

init()
