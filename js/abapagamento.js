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
            <button onclick="alterarQuantidadeCheckout('${
              item.id
            }', -1)">−</button>
            <span>${item.quantidade}</span>
            <button onclick="alterarQuantidadeCheckout('${
              item.id
            }', 1)">+</button>

            <button class="cart-remove" onclick="removerItemCheckout('${
              item.id
            }')">
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
      const total = parseFloat(totalEl.textContent.replace(",", "."));
      const maxParcelas = calcularParcelas(total);

      let opcoesParcelas = "";
      for (let i = 1; i <= maxParcelas; i++) {
        const valorParcela = (total / i).toFixed(2);
        opcoesParcelas += `<option value="${i}">${i}x de R$ ${valorParcela}</option>`;
      }

      area.innerHTML = `
        <div class="tipo-cartao">
          <label>
            <input type="radio" name="tipo-cartao" value="credito">
            Crédito
          </label>

          <label>
            <input type="radio" name="tipo-cartao" value="debito">
            Débito
          </label>
        </div>

        <input placeholder="Número do cartão">
        <input placeholder="Nome no cartão">

        <div class="grid-2">
          <input placeholder="Validade">
          <input placeholder="CVV">
        </div>

        <div id="parcelamento" style="display:none">
          <select>
            ${opcoesParcelas}
          </select>
        </div>
      `;

      document.querySelectorAll("input[name='tipo-cartao']").forEach((tipo) => {
        tipo.addEventListener("change", () => {
          document.getElementById("parcelamento").style.display =
            tipo.value === "credito" ? "block" : "none";
        });
      });
    }
  });
});

function calcularParcelas(total) {
  const valorMinParcela = 20;
  const maxParcelas = 12;

  let parcelasPossiveis = Math.floor(total / valorMinParcela);

  if (parcelasPossiveis > maxParcelas) parcelasPossiveis = maxParcelas;
  if (parcelasPossiveis < 1) parcelasPossiveis = 1;

  return parcelasPossiveis;
}
