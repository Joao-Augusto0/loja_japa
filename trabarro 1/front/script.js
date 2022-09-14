var fetchUrl = `http://localhost:3000/produtos`
const linhaModelo = document.querySelector(".linhamodelo")
const listaProdutos = document.querySelector("#lista-produtos")

const linhaModeloD = document.querySelector(".linhamodeloD")
const listaProdutosD = document.querySelector("#lista-produtosD")

const saldo = document.querySelector(".saldo")
const saldin = document.querySelector(".saldin")

const modal = document.querySelector(".modal")

var soma = 0
var sub = 0

function carregarTabela() {
    fetch(fetchUrl)
        .then(res => { return res.json() })
        .then(produtos => {
            produtos.forEach(produto => {
                if (produto.tipo == 'C') {

                    let linha = linhaModelo.cloneNode(true);
                    linha.classList.remove("model");

                    let colunas = linha.querySelectorAll("td");

                    colunas[0].innerHTML = produto.n_lancamento
                    colunas[1].innerHTML = produto.data_lancamento.split("T")[0]
                    colunas[2].innerHTML = produto.descricao
                    colunas[3].innerHTML = "R$ " + produto.valor
                    colunas[4].innerHTML = produto.tipo;
                    listaProdutos.appendChild(linha);

                    soma = soma += parseFloat(produto.valor)

                }
                if (produto.tipo == 'D') {

                    let linha2 = linhaModeloD.cloneNode(true)

                    linha2.classList.remove("model")

                    linha2.querySelector("#lancamentoD").innerHTML = produto.n_lancamento
                    linha2.querySelector("#dataD").innerHTML = produto.data_lancamento.split("T")[0]
                    linha2.querySelector("#descricaoD").innerHTML = produto.descricao
                    linha2.querySelector("#valorD").innerHTML = "R$ " + produto.valor
                    linha2.querySelector("#tipoD").innerHTML = produto.tipo;
                    listaProdutosD.appendChild(linha2);

                    sub = sub += parseFloat(produto.valor)
                }
            })
            let linha3 = saldo.cloneNode(true)
            linha3.classList.remove("model")

            result = soma - sub

            linha3.querySelector("#soma").innerHTML = result
            saldin.appendChild(linha3)
        })
}

function cadastrar() {
    let desc = document.querySelector("#desc").value
    let tipo = document.querySelector("#sel").value
    let val = document.querySelector("#val").value

    let dados = {
        "descricao": desc,
        "valor": val,
        "tipo": tipo
    }

    fetch(fetchUrl, {
        "method": "Post",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(dados)
    })
        .then(res => { return res.json() })
        .then(resp => {
            if (resp.descricao !== undefined) {
                alert("Produto Cadastrado com Sucesso !")
                window.location.reload()
            } else {
                alert("Não foi possivél cadastrar o produto")
            }
        })
}

function showMoadal() {
    modal.style.display = "block"
}

function fecharModal() {
    modal.style.display = "none"
}

function filtrarDatas(e) {
    let modelo = document.querySelector(".linhamodelo")
    let tab1 = document.querySelector("#lista-produtos")
    let tab2 = document.querySelector("#lista-produtosD")

    tab1.innerHTML = ""
    tab2.innerHTML = ""

    tab1.appendChild(modelo)

    fetch(fetchUrl)
        .then(res => { return res.json() })
        .then(lancamentos => {
            lancamentos.forEach(Lancamento => {

                if (e == Lancamento.data_lancamento.split("T")[0]) {
                    let linha = modelo.cloneNode(true)
                    linha.classList.remove("model")

                    let colunas = linha.querySelectorAll("td")
                    colunas[0].innerHTML = Lancamento.n_lancamento
                    colunas[1].innerHTML = Lancamento.data_lancamento.split("T")[0]
                    colunas[2].innerHTML = Lancamento.descricao
                    colunas[3].innerHTML = "R$ " + Lancamento.valor

                    if (Lancamento.tipo === "C") {
                        colunas[4].innerHTML = "C"
                        document.querySelector("#lista-produtos").appendChild(linha)
                    } else {
                        colunas[4].innerHTML = "D"
                        document.querySelector("#lista-produtosD").appendChild(linha)
                    }
                } else if (e == "todos") {
                    tab1.innerHTML = ""
                    tab2.innerHTML = ""

                    tab1.appendChild(modelo)
                    carregarTabela()
                }
            })
        })
}