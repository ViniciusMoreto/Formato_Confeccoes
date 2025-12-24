const CART_KEY = "formato_carrinho";

function getCarrinho() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

const lista = document.getElementById("lista-carrinho");
const totalEl = document.getElementById("total");

function renderCheckoutCarrinho() {
  if (!lista) return;

  const carrinho = getCarrinho();
  lista.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    lista.innerHTML = "<p>Seu carrinho está vazio</p>";
    totalEl.textContent = "0,00";
    return;
  }

  carrinho.forEach((item) => {
    total += item.preco * item.quantidade;

    lista.innerHTML += `
      <div class="cart-item">
        <img src="${item.imagem}">
        <div>
          <h4>${item.nome}</h4>
          <p>Tamanho: ${item.tamanho}</p>

          <div class="cart-qty">
            <button onclick="alterarQuantidadeCheckout('${item.id}', -1)">−</button>
            <span>${item.quantidade}</span>
            <button onclick="alterarQuantidadeCheckout('${item.id}', 1)">+</button>

            <button class="cart-remove" onclick="removerItemCheckout('${item.id}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>

          <p>R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
        </div>
      </div>
    `;
  });

  totalEl.textContent = total.toFixed(2);
}

function alterarQuantidadeCheckout(id, delta) {
  const carrinho = getCarrinho();
  const item = carrinho.find((i) => i.id === id);

  if (!item) return;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    removerItemCheckout(id);
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(carrinho));
  renderCheckoutCarrinho();
}

function removerItemCheckout(id) {
  const carrinho = getCarrinho().filter((i) => i.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(carrinho));
  renderCheckoutCarrinho();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutCarrinho();
});

/* PAGAMENTO */
const area = document.getElementById("area-pagamento");
document.querySelectorAll("input[name='pagamento']").forEach((r) => {
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
