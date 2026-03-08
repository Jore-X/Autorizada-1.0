async function carregarTabela() {
    const resposta = await fetch("dados.json")

    const dados = await resposta.json()

    console.log(dados)

    const tbody = document.querySelector("#tabela-celulares tbody")

    tbody.innerHTML = ""

    for (let marca in dados) {
        for (let modelo in dados[marca]) {
            const info = dados[marca][modelo]

            const tr = document.createElement("tr")

            tr.innerHTML = `
            <td>${marca}</td>
            <td>${modelo}</td>
            <td>${info.tela || "-"}</td>
            <td>${info.bateria  || "-"}</td>
            `

            tbody.appendChild(tr)
        }
    }
}
carregarTabela()