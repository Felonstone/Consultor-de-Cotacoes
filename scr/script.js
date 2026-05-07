const moedaPrincipal = document.getElementById("moeda");

const buy = document.getElementById("buy");
const sell = document.getElementById("sell");
const statusText = document.getElementById("status");

const localMoeda = "BRL";

const dolar = "USD";
const euro = "EUR";

let moedaSelecionada = dolar + "-" + localMoeda;

async function obterMoedas() {

    const servidor = "https://economia.awesomeapi.com.br/last/";
    
    statusText.innerHTML = "Buscando cotação...";

    try {

        const response = await fetch(servidor + moedaSelecionada);

        if (!response.ok) {
            throw new Error("Erro ao buscar API");
        }

        const json = await response.json();

        console.log(json);

        // Remove o hífen: USD-BRL -> USDBRL
        const chave = moedaSelecionada.replace("-", "");

        const dados = json[chave];

        buy.innerHTML = `R$ ${parseFloat(dados.high).toFixed(2)}`;
        sell.innerHTML = `R$ ${parseFloat(dados.low).toFixed(2)}`;

        moedaPrincipal.innerHTML = dados.name;

        statusText.innerHTML = "Cotação atualizada com sucesso ✔";

    } catch (error) {

        console.error(error);

        statusText.innerHTML = "Erro ao carregar cotação ❌";
    }
}
