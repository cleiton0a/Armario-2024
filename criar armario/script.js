const token = localStorage.getItem("token");
document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://www.armariosapi.somee.com/api/Armarios';

    function handleResponse(response) {
       
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
     
      var textoParaQRCode = response.headers.get('location');
      var numeroFinal = "";
      if(textoParaQRCode != null){
        const match = textoParaQRCode.match(/\d+$/);
        
        if (match) {
          numeroFinal = match[0];
          console.log("Número final usando expressão regular:", numeroFinal);
        
        }
      }else{
        numeroFinal = "22";
        confirm("qr de exemplo")
      }
      
      
      const options = {
        text: numeroFinal,
        width: 128,
        height: 128
      };

      const qrcode = new QRCode(document.getElementById('qrcode'), options);


      return textoParaQRCode;
    }

    function handleError(error) {
      console.error('Erro na requisição:', error.message);
    }

    function sendPostRequest(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }

    const btnCallApi = document.getElementById('btnCallApi');
    btnCallApi.addEventListener('click', function() {
    
      const descricaoInput = document.getElementById('descricaoInput');
      const descricao = descricaoInput.value;

      
      if (!descricao) {
        alert('Por favor, insira uma descrição antes de chamar a API.');
        return;
      }

      const postData = {
        descricao: descricao
      };

      sendPostRequest(apiUrl, postData)
        .then(handleResponse)
        .then(result => {
          confirm('Resposta:', result);
          
        })
        .catch(handleError);
    });
  });
  document.getElementById('btnback').addEventListener('click', function() {
    
    window.location.href = '../telalerqr/index.html';
  });