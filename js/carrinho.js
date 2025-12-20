const CART_KEY = "formato_carrinho";

// STORAGE
function getCarrinho() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem(CART_KEY, JSON.stringify(carrinho));
  renderCarrinho();
  atualizarBadgeCarrinho();
}

// AÇÕES
function adicionarAoCarrinho(produto) {
  const carrinho = getCarrinho();
  const existente = carrinho.find((item) => item.id === produto.id);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  salvarCarrinho(carrinho);
  abrirCarrinho();
}

function removerDoCarrinho(id) {
  const carrinho = getCarrinho().filter((item) => item.id !== id);
  salvarCarrinho(carrinho);
}

// RENDER
function renderCarrinho() {
  const itens = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  if (!itens) return;

  const carrinho = getCarrinho();
  itens.innerHTML = "";
  let total = 0;

  carrinho.forEach((item) => {
    total += item.preco * item.quantidade;

    itens.innerHTML += `
  <div class="cart-item">
    <img src="${item.imagem}">
    <div>
      <h4>${item.nome}</h4>
      <p>Tamanho: ${item.tamanho}</p>

      <div class="cart-qty">
        <button onclick="alterarQuantidade('${item.id}', -1)">−</button>
        <span>${item.quantidade}</span>
        <button onclick="alterarQuantidade('${item.id}', 1)">+</button>

        <button class="cart-remove" onclick="removerDoCarrinho('${item.id}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>

      <p>R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
    </div>
  </div>
`;
  });

  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Quantidade

function alterarQuantidade(id, delta) {
  const carrinho = getCarrinho();
  const item = carrinho.find((i) => i.id === id);

  if (!item) return;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    removerDoCarrinho(id);
    return;
  }

  salvarCarrinho(carrinho);
}

// ABRIR / FECHAR
function abrirCarrinho() {
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
}

function fecharCarrinho() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}

// BADGE
function atualizarBadgeCarrinho() {
  const badge = document.querySelector(".cart-count");
  if (!badge) return;

  const total = getCarrinho().reduce((s, i) => s + i.quantidade, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? "flex" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCarrinho();
  atualizarBadgeCarrinho();

  document
    .getElementById("closeCart")
    ?.addEventListener("click", fecharCarrinho);
  document
    .getElementById("cartOverlay")
    ?.addEventListener("click", fecharCarrinho);

  document.getElementById("openCart")?.addEventListener("click", (e) => {
    e.preventDefault();

    const drawer = document.getElementById("cartDrawer");

    if (drawer.classList.contains("active")) {
      fecharCarrinho();
    } else {
      abrirCarrinho();
    }
  });
});
