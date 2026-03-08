let dados = {};

async function carregarDados() {
  const resposta = await fetch("dados.json");
  dados = await resposta.json();

  window.onload = function () {
    carregarTabela();
    carregarMarca();
  };
}
// _________________________________________________________________________
async function carregarTabela() {
  const tbody = document.querySelector("#tabela-celulares tbody");

  tbody.innerHTML = "";

  for (let marca in dados) {
    for (let modelo in dados[marca]) {
      const info = dados[marca][modelo];

      const tr = document.createElement("tr");

      tr.innerHTML = `
            <td>${marca}</td>
            <td>${modelo}</td>
            <td>${info.tela || "-"}</td>
            <td>${info.bateria || "-"}</td>
            `;

      tbody.appendChild(tr);
    }
  }
}
// _________________________________________________________________________
function filtrarTabela() {
  const marcaEscolhida = document.getElementById("filtroMarca").value;
  const modeloEscolhido = document.getElementById("filtroModelo").value;
  const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

  const linhas = document.querySelectorAll("#tabela-celulares tbody tr");

  linhas.forEach((linha) => {
    const marca = linha.children[0].textContent;
    const modelo = linha.children[1].textContent;

    const marcaOk = marcaEscolhida === "" || marca === marcaEscolhida;

    const modeloOk = modeloEscolhido === "" || modelo === modeloEscolhido;

    const pesquisaOk =
      marca.toLowerCase().includes(pesquisa) ||
      modelo.toLowerCase().includes(pesquisa);

    if (marcaOk && modeloOk && pesquisaOk) {
      linha.style.display = "";
    } else {
      linha.style.display = "none";
    }
  });
}
// _________________________________________________________________________

// _________________________________________________________________________

async function carregarMarca() {
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
async function carregarModelo() {
  const marcaEscolhida = document.getElementById("filtroMarca").value;

  const selectModelo = document.getElementById("filtroModelo");
  selectModelo.innerHTML = '<option value="">Todos os Modelos</option>';

  if (marcaEscolhida === "") return;

  for (let modelo in dados[marcaEscolhida]) {
    const option = document.createElement("option");
    option.value = modelo;
    option.textContent = modelo;

    selectModelo.appendChild(option);
  }
}

// _________________________________________________________________________
carregarDados();

document.getElementById("filtroMarca").addEventListener("change", () => {
  document.getElementById("filtroModelo").value = "";

  carregarModelo();
  filtrarTabela();
});

document
  .getElementById("filtroModelo")
  .addEventListener("change", filtrarTabela);

document.getElementById("pesquisa").addEventListener("input", filtrarTabela);
