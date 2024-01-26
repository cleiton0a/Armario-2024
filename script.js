async function authenticate() {
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const usuario = {
      usuario: username,
      senha: password
    };

    const headers = {
      "Content-Type": "application/json",
      "accept": "application/json"
    };

    
    let response;

    try {
      response = await fetch("https://www.armariosapi.somee.com/api/Usuarios/Login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(usuario)
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        showModal(`Usuário ou senha incorreta`);
        return;
      }

      const responsejson = await response.json();
      console.log(responsejson);
          
      if (responsejson.token) {
        localStorage.setItem('token', responsejson.token);
        localStorage.setItem('id', responsejson.id);
        localStorage.setItem('nomeUsuario', responsejson.nomeUsuario);
        localStorage.setItem('email', responsejson.email);
        localStorage.setItem('nome', responsejson.nome);
        window.location.href = "/telalerqr";
      }

    } catch (error) {
      console.error('Error during authentication:', error);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

function showModal(message) {
  const modal = document.getElementById("myModal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;

  modal.style.display = "block";


  const closeButton = document.querySelector(".close");
  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  authenticate();
});
