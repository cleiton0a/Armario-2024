document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('button');
    button.addEventListener('click', async function (event) {
      event.preventDefault();
      const nome = document.getElementById('nome').value;
      const nomeUsuario = document.getElementById('nomeUsuario').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      // Validate mandatory fields
      if (!nome || !nomeUsuario || !email || !senha) {
        showModal('Todos os campos são obrigatórios.');
        return;
      }

      try {
        const isNomeUsuarioExists = await checkIfNomeUsuarioExists(nomeUsuario, email);
        if (isNomeUsuarioExists) {
          // Show modal with error message
          showModal('Este nome de usuário já está em uso. Escolha outro.');
        } else {
          await postData(nome, nomeUsuario, email, senha);
          // Show modal with success message
          showModal('Usuário registrado com sucesso!');
          window.location.href = "../telaleqr/index.html";
        }
      } catch (error) {
        console.error('Erro durante o processo:', error);
        // Show modal with error message
        showModal('Erro durante o processo. Consulte o console para mais informações.');
      }
    });

    const goBackButton = document.getElementById('goBackButton');
    goBackButton.addEventListener('click', function () {
      window.history.back();
    });

    // Modal close button event listener
    const modalCloseButton = document.querySelector('.close');
    modalCloseButton.addEventListener('click', function () {
      hideModal();
    });
  });

  function showModal(message) {
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modalMessage');

    modalMessage.textContent = message;
    modal.style.display = 'block';
  }

  function hideModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }

  async function checkIfNomeUsuarioExists(nomeUsuario) {
    // ... (unchanged)
  }

  async function postData(nome, nomeUsuario, email, senha) {
    // ... (unchanged)
  }