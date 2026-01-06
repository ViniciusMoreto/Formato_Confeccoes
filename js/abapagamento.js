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
  /* CPF */
  const cpfInput = document.getElementById("cpf");
  const erroCPF = document.getElementById("erro-cpf");

  cpfInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    v = v.replace(/^(\d{3})(\d)/, "$1.$2");
    v = v.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    e.target.value = v;

    validarCPFInput();
  });

  cpfInput.addEventListener("blur", validarCPFInput);

  function validarCPFInput() {
    if (!cpfInput.value) {
      limparErro(cpfInput, erroCPF);
      return;
    }

    if (!validarCPF(cpfInput.value)) {
      mostrarErro(cpfInput, erroCPF, "CPF inválido");
    } else {
      limparErro(cpfInput, erroCPF);
    }
  }

  /* CEP */
  const cepInput = document.getElementById("cep");
  const erroCEP = document.getElementById("erro-cep");

  cepInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 8);
    if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    e.target.value = v;

    limparErro(cepInput, erroCEP);
  });

  cepInput.addEventListener("blur", buscarCEP);

  async function buscarCEP() {
    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8 || cep === "00000000") {
      mostrarErro(cepInput, erroCEP, "CEP inválido");
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        mostrarErro(cepInput, erroCEP, "CEP não encontrado");
        return;
      }

      document.getElementById("rua").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("estado").value = data.uf || "";

      limparErro(cepInput, erroCEP);
    } catch {
      mostrarErro(cepInput, erroCEP, "Erro ao validar CEP");
    }
  }
});

renderCheckoutCarrinho();

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
            <input type="radio" name="tipo-cartao" value="credito" required>
            Crédito
          </label>

          <label>
            <input type="radio" name="tipo-cartao" value="debito" required>
            Débito
          </label>
        </div>

        <input placeholder="Número do cartão" required>
        <input placeholder="Nome no cartão" required>

        <div class="grid-2">
          <input placeholder="Validade" required>
          <input placeholder="CVV">
        </div>

        <div id="parcelamento" style="display:none" required>
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


const continuarBtn = document.getElementById("continuar");
const finalizarBtn = document.createElement("button");
finalizarBtn.textContent = "Finalizar Pagamento";
finalizarBtn.classList.add("btn");
finalizarBtn.style.display = "none";
continuarBtn.insertAdjacentElement("afterend", finalizarBtn); // coloca abaixo do continuar

continuarBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  // 1️⃣ Erros ativos
  const errosAtivos = document.querySelectorAll(".erro.ativo");
  if (errosAtivos.length > 0) {
    alert("Corrija os campos inválidos antes de continuar.");
    return;
  }

  // 2️⃣ Campos obrigatórios
  const obrigatorios = document.querySelectorAll(
    "#nome, #cpf, #rua, #numero, #bairro, #cidade, #estado, #cep"
  );
  for (const campo of obrigatorios) {
    if (!campo.value) {
      campo.focus();
      alert("Preencha todos os campos obrigatórios antes de continuar.");
      return;
    }
  }

  // 3️⃣ Carrinho vazio
  const carrinho = getCarrinho();
  if (carrinho.length === 0) {
    alert("Carrinho vazio");
    return;
  }

  // 4️⃣ Mostra métodos de pagamento
  area.style.display = "block";
  finalizarBtn.style.display = "block";
  continuarBtn.disabled = true;

  area.innerHTML = `
    <label class="opcao">
      <input type="radio" name="pagamento" value="pix" required />
      <span>Pix</span>
    </label>

    <label class="opcao">
      <input type="radio" name="pagamento" value="cartao" required />
      <span>Cartão</span>
    </label>

    <div id="detalhes-cartao" style="display:none; margin-top:10px;">
      <input placeholder="Número do cartão" required />
      <input placeholder="Nome no cartão" required />
      <div class="grid-2">
        <input placeholder="Validade" required />
        <input placeholder="CVV" required />
      </div>
      <div id="parcelamento" style="display:none;">
        <select></select>
      </div>
    </div>
  `;

  // Mostra detalhes do cartão quando selecionar cartão
  document.querySelectorAll("input[name='pagamento']").forEach((tipo) => {
    tipo.addEventListener("change", () => {
      const detalhesCartao = document.getElementById("detalhes-cartao");
      detalhesCartao.style.display = tipo.value === "cartao" ? "block" : "none";
    });
  });
});

finalizarBtn.addEventListener("click", () => {
  const metodoPagamento = document.querySelector("input[name='pagamento']:checked");
  if (!metodoPagamento) {
    alert("Escolha um método de pagamento antes de finalizar.");
    return;
  }

  const carrinho = getCarrinho();
  const pedido = {
    id: "PED-" + Date.now(),
    cliente: {
      nome: document.getElementById("nome").value.trim(),
      cpf: document.getElementById("cpf").value,
    },
    endereco: {
      rua: document.getElementById("rua").value.trim(),
      numero: document.getElementById("numero").value.trim(),
      bairro: document.getElementById("bairro").value.trim(),
      cidade: document.getElementById("cidade").value.trim(),
      estado: document.getElementById("estado").value.trim(),
      cep: document.getElementById("cep").value,
      complemento: document.getElementById("complemento").value.trim(),
    },
    produtos: carrinho,
    total: carrinho.reduce((soma, p) => soma + p.preco * p.quantidade, 0),
    pagamento: metodoPagamento.value,
    status: "Pago",
    data: new Date().toLocaleDateString("pt-BR"),
  };

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  localStorage.removeItem(CART_KEY);

  alert("Pagamento concluído com sucesso!");
  window.location.href = "index.html";
});

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += cpf[i] * (10 - i);
  let dig1 = (soma * 10) % 11;
  if (dig1 === 10) dig1 = 0;
  if (dig1 != cpf[9]) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += cpf[i] * (11 - i);
  let dig2 = (soma * 10) % 11;
  if (dig2 === 10) dig2 = 0;

  return dig2 == cpf[10];
}

document.getElementById("cpf").addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").slice(0, 11);

  v = v.replace(/^(\d{3})(\d)/, "$1.$2");
  v = v.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  e.target.value = v;
});

document.getElementById("cep").addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").slice(0, 8);

  if (v.length > 5) {
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
  }

  e.target.value = v;
});

function mostrarErro(input, span, msg) {
  span.textContent = msg;
  span.classList.add("ativo");
  input.classList.add("invalido");
}

function limparErro(input, span) {
  span.textContent = "";
  span.classList.remove("ativo");
  input.classList.remove("invalido");
}
