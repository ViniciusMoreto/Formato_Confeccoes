let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [
  {
    id: 1,
    nome: "Camisa Escolar",
    tamanho: "M",
    preco: 59.9,
    qtd: 2,
    imagem: "https://via.placeholder.com/100"
  }
];

const lista = document.getElementById("lista-carrinho");
const totalEl = document.getElementById("total");

function renderCarrinho() {
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((p, i) => {
    total += p.preco * p.qtd;

    lista.innerHTML += `
      <div class="item">
        <img src="${p.imagem}">
        <div class="item-info">
          <strong>${p.nome}</strong>
          <span>Tam: ${p.tamanho}</span>
          <div class="qtd">
            <button onclick="alterarQtd(${i}, -1)">-</button>
            <span>${p.qtd}</span>
            <button onclick="alterarQtd(${i}, 1)">+</button>
          </div>
          <div class="remover" onclick="removerItem(${i})">Remover</div>
        </div>
        <strong>R$ ${(p.preco * p.qtd).toFixed(2)}</strong>
      </div>
    `;
  });

  totalEl.textContent = total.toFixed(2);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function alterarQtd(index, delta) {
  carrinho[index].qtd += delta;
  if (carrinho[index].qtd < 1) carrinho[index].qtd = 1;
  renderCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  renderCarrinho();
}

renderCarrinho();

/* PAGAMENTO */
const area = document.getElementById("area-pagamento");
document.querySelectorAll("input[name='pagamento']").forEach(r => {
  r.addEventListener("change", () => {
    if (r.value === "pix") {
      area.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PIX_SIMULADO">`;
    } else {
      area.innerHTML = `
        <input placeholder="Número do cartão">
        <input placeholder="Nome no cartão">
        <div class="grid-2">
          <input placeholder="Validade">
          <input placeholder="CVV">
        </div>
      `;
    }
  });
});