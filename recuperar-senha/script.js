function createResetButton() {
  const buttonContainer = document.getElementById('buttonContainer');

  // ... (existing code)

  resetButton.addEventListener('click', function () {
    // ... (existing code)

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
        displayModal('Password reset failed. Please try again.');
      });
  });

  buttonContainer.appendChild(resetButton);

  function displayModal(message) {
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeBtn = document.getElementsByClassName('close')[0];

    modalMessage.textContent = message;
    modal.style.display = 'block';

    closeBtn.onclick = function () {
      modal.style.display = 'none';
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  }
}

createResetButton();