const token = localStorage.getItem("token");
const id = localStorage.getItem("id");
console.log(id)
if(id!=15){
  const btn =document.getElementById("cadastro")
  btn.setAttribute("style","display:none;")
}
function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    let resultContainer = document.getElementById('qr-reader-results');
    let lastResult, countResults = 0;

    async function obterArmarios(urlapi) {
        try {
            console.log('Buscando dados de:', urlapi);

            const response = await fetch(urlapi, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Resposta da rede não foi bem-sucedida: ' + response.status);
            }

            const dadosArmarios = await response.json();
            console.log('Dados recebidos:', dadosArmarios);
            localStorage.setItem('dadosArmarios', JSON.stringify(dadosArmarios));

            window.location.href = '../armario/index.html'; 
        } catch (error) {
            console.error('Erro:', error.message);
        }
    }

    function noSucessoLeitura(decodedText, decodedResult) {
        const url = "https://www.armariosapi.somee.com/api/Armarios/";
        const urlapi = url + decodedText;
        console.log(urlapi);

        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;

            console.log(decodedText);
            obterArmarios(urlapi);
        }
    }

    var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(noSucessoLeitura);
});
