const token = localStorage.getItem("token");
const getarmariosString = localStorage.getItem('dadosArmarios');

document.addEventListener("DOMContentLoaded", function () {
    createArmarioDetails(JSON.parse(getarmariosString));
});

function createArmarioDetails(getarmarios) {
    const armarioDetailsContainer = document.getElementById('armarioDetails');

    function handleInvalidDataError(data) {
    
        console.error('Dados inválidos:', data);
    
        alert('Erro: Dados inválidos');
    }

    if (!getarmarios) {
        handleInvalidDataError(getarmarios);
        return;
    }

    if (Array.isArray(getarmarios)) {
        getarmarios.forEach(armario => createArmarioElements(armario, armarioDetailsContainer));
    } else {
        createArmarioElements(getarmarios, armarioDetailsContainer, true);
    }
}

function createArmarioElements(armario, container) {
    const idParagraph = createParagraph('Armario numero:', armario.id);
    const descricaoInput = createTextInput('Descrição:', armario.descricao);
    const atualizarDescricaoBtn = createButton('Atualizar Descrição', () => {
        const newDescription = descricaoInput.querySelector('textarea').value;
        updateDescription(armario.id, newDescription);
    });
    const voltarArmarioBtn = createButton('Voltar Armario', () => confirmAndRemoveArmario(armario.id));

    appendChildren(container, [idParagraph, descricaoInput, atualizarDescricaoBtn, voltarArmarioBtn, createElement('br')]);
}

function createParagraph(label, textContent) {
    const paragraph = createElement('p', '');
    paragraph.textContent = `${label} ${textContent}`;
    return paragraph;
}

function createElement(tag, textContent) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
}

function createTextInput(label, value) {
    const container = createElement('div', '');
    const labelElement = createElement('label', label);
    const textareaElement = createElement('textarea', '');

    textareaElement.value = value;
    textareaElement.dataset.armarioId = value;

    container.classList.add('input-container');

    appendChildren(container, [labelElement, document.createElement('br'), textareaElement]);

    return container;
}

function createButton(textContent, clickHandler) {
    const button = createElement('button', textContent);
    button.addEventListener('click', clickHandler);
    return button;
}

function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
}

function confirmAndRemoveArmario(armarioId) {
    const confirmRemoval = confirm('Tem certeza de que deseja voltar este armario?');
    if (confirmRemoval) {
        window.location.href = "../telalerqr/index.html";
    }
}

function updateDescription(armarioId, description) {
    const confirmUpdate = confirm('Tem certeza de que deseja atualizar a descrição deste armario?');

    if (!confirmUpdate) {
        return;
    }

    const apiUrl = `http://www.armariosapi.somee.com/api/Armarios/${armarioId}`;

    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: armarioId,
            descricao: description,
            qrCodeBase64: 'string',
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        if (data) {
            displayModal('Armario updated successfully: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error updating armario:', error);
        displayModal('Error updating armario: ' + error.message);
    });
}

function displayModal(message) {
    var modal = document.getElementById('myModal');
    var modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;

    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
