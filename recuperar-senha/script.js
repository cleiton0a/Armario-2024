document.addEventListener('DOMContentLoaded', function () {
  createResetButton();
  createVoltarButton();
});

function createResetButton() {
  const buttonContainer = document.getElementById('buttonContainer');
  const resetButton = document.createElement('button');
  resetButton.textContent = 'ENVIAR NOVA SENHA';

  resetButton.addEventListener('click', handleReset);

  buttonContainer.appendChild(resetButton);

  function handleReset() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');

    const username = usernameInput ? usernameInput.value : '';
    const email = emailInput ? emailInput.value : '';

    if (!username || !email) {
      displayModal('Nome de usuário e e-mail são campos obrigatórios.');
      return;
    }

    const resetUrl = 'your_reset_url';
    const resetData = {
      username: username,
      email: email
    };

    fetch(resetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resetData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonResponse => {
        console.log('Password Reset Response:', jsonResponse);
        displayModal('Password reset successful.');
      })
      .catch(error => {
        console.error('Error:', error);
        displayModal(`Password reset failed. Error: ${error.message}`);
      });
  }

  function displayModal(message) {
    const modal = document.querySelector('#myModal');
    const modalMessage = document.querySelector('#modalMessage');
    const closeBtn = document.querySelector('.close');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    closeBtn.onclick = function () {
      modal.style.display = 'none';
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }
}

function createVoltarButton() {
  const buttonContainer = document.getElementById('buttonContainer');
  const voltarButton = document.createElement('button');
  voltarButton.textContent = 'VOLTAR';

  voltarButton.addEventListener('click', handleVoltar);

  buttonContainer.appendChild(voltarButton);

  function handleVoltar() {
    window.location.href = "../telalerqr/index.html";
   
  }
}
