const moedaPrincipal = document.getElementById("moeda");

const buy = document.getElementById("buy");
const sell = document.getElementById("sell");

const statusText = document.getElementById("status");

const selectMoeda = document.getElementById("selectMoeda");

async function obterMoedas() {
    console.log("Atualizado!")
    const moedaSelecionada = selectMoeda.value;

    const servidor = "https://economia.awesomeapi.com.br/last/";

    statusText.innerHTML = "🔄 Atualizando cotação...";

    try {

        const response = await fetch(servidor + moedaSelecionada);

        if (!response.ok) {
            throw new Error("Erro API");
        }

        const json = await response.json();

        const chave = moedaSelecionada.replace("-", "");

        const dados = json[chave];

        sell.innerHTML = parseFloat(dados.ask).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
        });

        buy.innerHTML = parseFloat(dados.bid).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
            });

        // sell.innerHTML =
        //     Number(dados.ask).toLocaleString("pt-BR", {
        //         style: "currency",
        //         currency: "BRL"
        //     });

        moedaPrincipal.innerHTML = `💱 ${dados.name}`;

        statusText.innerHTML =
            `✔ Atualizado às ${new Date().toLocaleTimeString()}`;

    } catch (error) {

        console.error(error);

        statusText.innerHTML = "❌ Erro ao buscar cotação";
    }
}

/* Atualização automática */
setInterval(obterMoedas, 5000);

/* Primeira execução */
obterMoedas();