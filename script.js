console.log("Script Carregou");
let dados = {};

async function carregarDados() {
  const resposta = await fetch("dados.json");
  dados = await resposta.json();
  console.log(dados);

  // carregarTabela();
  gerarTabelaFiltrada();
  carregarMarca();

  // _________________________________________________________________________
  const tbody = document.querySelector("#tabela-celulares tbody");

  tbody.addEventListener("click", function (e) {
    console.log("clicou");

    const linha = e.target.closest("tr");
    if (!linha) return;

    const marca = linha.dataset.marca;
    const modelo = linha.dataset.modelo;

    const info = dados[marca][modelo];

    tituloDialog.textContent = modelo;

    telaOriginal.textContent = "R$" + info.tela.Original;
    telaPLinha.textContent = "R$" + info.tela.PrimeiraLinha;
    telaParalela.textContent = "R$" + info.tela.Paralela;

    BateriaOriginal.textContent = "R$" + info.bateria;

    dialog.showModal();

    console.log(marca);
    console.log(modelo);
    console.log(info);
  });
}

// _________________________________________________________________________
function gerarTabelaFiltrada() {
  const marcaEscolhida = document.getElementById("filtroMarca").value;
  // const modeloEscolhido = document.getElementById("filtroModelo").value;
  const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

  const tbody = document.querySelector("#tabela-celulares tbody");

  let html = "";

  for (const [marca, modelos] of Object.entries(dados)) {
    if (marcaEscolhida && marca !== marcaEscolhida) continue;

    for (const [modelo, info] of Object.entries(modelos)) {
      // if (modeloEscolhido && modelo !== modeloEscolhido) continue;

      const textoBusca = (marca + " " + modelo).toLowerCase();

      if (pesquisa && !textoBusca.includes(pesquisa)) continue;

      html += `
        <tr data-marca="${marca}" data-modelo="${modelo}">
            <td>${marca}</td>
            <td>${modelo}</td>
            <td><h6>Ver Detalhes...</h6></td>
        </tr>
      `;
      // html += `
      //   <tr>
      //       <td>${marca}</td>
      //       <td>${modelo}</td>
      //       <td>${info.tela || "-"}</td>
      //       <td>${info.bateria || "-"}</td>
      //   </tr>
      // `;
    }
  }
  tbody.innerHTML = html;
}
// _________________________________________________________________________

function carregarMarca() {
  const selectMarca = document.getElementById("filtroMarca");
  selectMarca.innerHTML = '<option value="">Todas as Marcas</option>';

  for (let marca in dados) {
    const option = document.createElement("option");
    option.value = marca;
    option.textContent = marca;

    selectMarca.appendChild(option);
  }
}

// _________________________________________________________________________
// function carregarModelo() {
//   const marcaEscolhida = document.getElementById("filtroMarca").value;

//   const selectModelo = document.getElementById("filtroModelo");
//   selectModelo.innerHTML = '<option value="">Todos os Modelos</option>';

//   if (marcaEscolhida === "") return;

//   for (let modelo in dados[marcaEscolhida]) {
//     const option = document.createElement("option");
//     option.value = modelo;
//     option.textContent = modelo;

//     selectModelo.appendChild(option);
//   }
// }

// _________________________________________________________________________

const tituloDialog = document.getElementById("tituloDialog");

const telaOriginal = document.getElementById("telaOriginal");
const telaPLinha = document.getElementById("telaPLinha");
const telaParalela = document.getElementById("telaParalela");

const BateriaOriginal = document.getElementById("BateriaOriginal");
const BateriaPlinha = document.getElementById("BateriaPlinha");

// _________________________________________________________________________
carregarDados();

// _________________________________________________________________________

document.getElementById("filtroMarca").addEventListener("change", () => {
  // document.getElementById("filtroModelo").value = "";

  // carregarModelo();
  gerarTabelaFiltrada();
});

// document
//   .getElementById("filtroModelo")
//   .addEventListener("change", gerarTabelaFiltrada);

document
  .getElementById("pesquisa")
  .addEventListener("input", gerarTabelaFiltrada);

// _________________________________________________________________________
const dialog = document.getElementById("dialog");

const closeModal = document.getElementById("closeModal");

closeModal.addEventListener("click", function () {
  dialog.close();
});
// _________________________________________________________________________