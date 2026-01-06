const CART_KEY = "formato_carrinho";

function getCarrinho() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

const lista = document.getElementById("lista-carrinho");
const totalEl = document.getElementById("total");

// Definir variáveis globais para os campos (evita erros de referência)
const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const cep = document.getElementById("cep");
const complemento = document.getElementById("complemento");

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
  // Verificar e pré-preencher dados do perfil
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (usuarioLogado) {
    // Pré-preencher campos com dados do perfil
    nome.value = usuarioLogado.nome || "";
    cpf.value = usuarioLogado.cpf || "";
    rua.value = usuarioLogado.rua || "";
    numero.value = usuarioLogado.numero || "";
    bairro.value = usuarioLogado.bairro || "";
    cidade.value = usuarioLogado.cidade || "";
    estado.value = usuarioLogado.estado || "";
    cep.value = usuarioLogado.cep || "";
    complemento.value = usuarioLogado.complemento || "";
  } else {
    // Opcional: Alerta se não estiver logado (remova se não quiser)
    console.log("Usuário não logado. Dados não serão salvos no perfil.");
  }

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

  async function validarCPFInput() {
    if (!cpfInput.value) {
      limparErro(cpfInput, erroCPF);
      return;
    }

    // Verificação básica de formato
    if (!validarCPF(cpfInput.value)) {
      mostrarErro(cpfInput, erroCPF, "CPF inválido");
      return;
    }

    // Simulação de verificação real (ex.: rejeita CPFs começando com 000 ou 111)
    // Para real, mova para backend e use API como ReceitaWS
    const cpfLimpo = cpfInput.value.replace(/\D/g, "");
    if (cpfLimpo.startsWith("000") || cpfLimpo.startsWith("111")) {
      mostrarErro(cpfInput, erroCPF, "CPF não encontrado ou inválido na base de dados");
      return;
    }

    // Simulação de consulta (delay para imitar API)
    try {
      // Placeholder: Em produção, faça fetch para backend/API
      // Ex.: await fetch(`/api/verificar-cpf?cpf=${cpfLimpo}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay
      limparErro(cpfInput, erroCPF);
    } catch {
      mostrarErro(cpfInput, erroCPF, "Erro ao verificar CPF");
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

function calcularParcelas(total) {
  const valorMinParcela = 20;
  const maxParcelas = 12;

  let parcelasPossiveis = Math.floor(total / valorMinParcela);

  if (parcelasPossiveis > maxParcelas) parcelasPossiveis = maxParcelas;
  if (parcelasPossiveis < 1) parcelasPossiveis = 1;

  return parcelasPossiveis;
}

const continuarBtn = document.getElementById("continuar");
const cardPagamento = document.getElementById("area-pagamento");
const conteudoPagamento = document.getElementById("conteudo-pagamento");

document.querySelectorAll("input[name='pagamento']").forEach((radio) => {
  radio.addEventListener("change", () => {
    // Limpar conteúdo anterior ao trocar método
    conteudoPagamento.innerHTML = "";
    conteudoPagamento.style.display = 'none'; // Reset para oculto

    if (radio.value === "pix") {
      mostrarPixPreview();
    }

    if (radio.value === "cartao") {
      mostrarFormularioCartao();
    }
  });
});

let etapaPagamento = false;

continuarBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Se ainda NÃO estiver na etapa de pagamento
  if (!etapaPagamento) {
    // 🔎 Validação básica
    const errosAtivos = document.querySelectorAll(".erro.ativo");
    if (errosAtivos.length > 0) {
      alert("Corrija os campos inválidos.");
      return;
    }

    const obrigatorios = document.querySelectorAll(
      "#nome, #cpf, #rua, #numero, #bairro, #cidade, #estado, #cep"
    );

    for (const campo of obrigatorios) {
      if (!campo.value) {
        campo.focus();
        alert("Preencha todos os campos obrigatórios.");
        return;
      }
    }

    if (getCarrinho().length === 0) {
      alert("Carrinho vazio.");
      return;
    }

    // ✅ Mostra pagamento
    cardPagamento.style.display = "block";
    continuarBtn.textContent = "Finalizar compra";
    etapaPagamento = true;

    return;
  }

  // 🚀 FINALIZAR COMPRA
  const metodoPagamento = document.querySelector(
    "input[name='pagamento']:checked"
  );

  if (!metodoPagamento) {
    alert("Escolha uma forma de pagamento.");
    return;
  }

  if (metodoPagamento.value === "pix") {
    abrirModalPix(); // Abre modal com Pix
    return; // Não finaliza ainda
  }

  if (metodoPagamento.value === "cartao") {
    validarCartaoEFinalizar();
  }
});

function finalizarPedido(metodo) {
  const carrinho = getCarrinho();

  const pedido = {
    id: "PED-" + Date.now(),
    cliente: {
      nome: nome.value,
      cpf: cpf.value,
    },
    endereco: {
      rua: rua.value,
      numero: numero.value,
      bairro: bairro.value,
      cidade: cidade.value,
      estado: estado.value,
      cep: cep.value,
      complemento: complemento.value,
    },
    produtos: carrinho,
    total: carrinho.reduce((s, p) => s + p.preco * p.quantidade, 0),
    pagamento: metodo,
    status: metodo === "pix" ? "Pago" : "Pago", // Agora Pix é validado automaticamente
    data: new Date().toLocaleDateString("pt-BR"),
  };

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(pedido);

  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  localStorage.removeItem(CART_KEY);

  // Salvar dados no perfil após compra (se logado)
  salvarDadosNoPerfil();

  alert("Pagamento realizado com sucesso! Seu pedido foi processado.");
  window.location.href = "index.html"; // Redireciona para home
}

// Nova função: Salva dados do checkout no perfil
function salvarDadosNoPerfil() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) return; // Não salva se não estiver logado

  // Atualizar dados do usuário com os do checkout
  usuarioLogado.nome = nome.value.trim();
  usuarioLogado.cpf = cpf.value.trim();
  usuarioLogado.rua = rua.value.trim();
  usuarioLogado.numero = numero.value.trim();
  usuarioLogado.bairro = bairro.value.trim();
  usuarioLogado.cidade = cidade.value.trim();
  usuarioLogado.estado = estado.value.trim();
  usuarioLogado.cep = cep.value.trim();
  usuarioLogado.complemento = complemento.value.trim();

  // Salvar no localStorage (mesma lógica do perfil)
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const index = usuarios.findIndex((u) => u.email === usuarioLogado.email);
  if (index !== -1) {
    usuarios[index] = usuarioLogado;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
}

function abrirModalPix() {
  const total = totalEl.textContent;
  // Simulação de código Pix (em produção, gere via API do banco/gateway)
  const codigoPix = `00020126360014BR.GOV.BCB.PIX0114+5511999999999520400005303986540${total.replace(
    ".",
    ""
  )}5802BR5920Formato Confecções6009SAO PAULO62070503***6304ABCD`;

  const modalContent = document.getElementById("modal-pix-content");
  modalContent.innerHTML = `
    <div class="pix-box">
      <h4>Pague com Pix</h4>

      <img 
        src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
          codigoPix
        )}"
        alt="QR Code Pix"
      />

      <p class="pix-valor">
        Valor: <strong>R$ ${total}</strong>
      </p>

      <div class="pix-codigo-container">
        <textarea readonly class="pix-codigo">${codigoPix}</textarea>
        <button class="btn-copiar" onclick="copiarPix()">Copiar</button>
      </div>

      <p id="timer-pix" class="pix-timer">Tempo restante: 05:00</p>

      <p class="pix-info">
        Escaneie o QR Code ou copie o código para pagar. O pagamento será validado automaticamente.
      </p>
    </div>
  `;

  // Mostrar modal
  document.getElementById("modal-pix").style.display = "flex";

  // Iniciar timer de 5 minutos e simulação de validação automática
  iniciarTimerPix();
}

function fecharModalPix() {
  document.getElementById("modal-pix").style.display = "none";
}

function iniciarTimerPix() {
  let tempoRestante = 300; // 5 minutos em segundos
  const timerEl = document.getElementById("timer-pix");

  const intervalo = setInterval(() => {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    timerEl.textContent = `Tempo restante: ${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    tempoRestante--;

    // Simulação: Após 10 segundos, "valida" o pagamento automaticamente (em produção, use webhook do gateway)
    if (tempoRestante === 290) { // 10 segundos após abrir
      clearInterval(intervalo);
      finalizarPedido("pix");
      fecharModalPix();
    }

    if (tempoRestante < 0) {
      clearInterval(intervalo);
      timerEl.textContent = "Tempo expirado. Tente novamente.";
      fecharModalPix();
    }
  }, 1000);
}

function mostrarPixPreview() {
  conteudoPagamento.innerHTML = `
    <div class="pix-preview">
      <p>Você escolheu <strong>Pix</strong>.</p>
      <p>O QR Code será gerado ao finalizar a compra.</p>
    </div>
  `;

  conteudoPagamento.style.display = 'block';
}

function mostrarFormularioCartao() {
  conteudoPagamento.innerHTML = `
    <div class="cartao-box">
      <h4>Pagamento com Cartão</h4>

      <div class="tipo-cartao">
        <label>
          <input type="radio" name="tipoCartao" value="credito" checked>
          Crédito
        </label>
        <label>
          <input type="radio" name="tipoCartao" value="debito">
          Débito
        </label>
      </div>

      <input id="cartao-nome" placeholder="Nome no cartão">
      <input id="cartao-numero" placeholder="Número do cartão" maxlength="19">

      <div class="linha">
        <input id="cartao-validade" placeholder="MM/AA">
        <input id="cartao-cvv" placeholder="CVV" maxlength="4">
      </div>

      <input id="cartao-cpf" placeholder="CPF do titular">
    </div>
  `;

  conteudoPagamento.style.display = 'block';
}

function validarCartaoEFinalizar() {
  const nomeCartao = document.getElementById("cartao-nome");
  const numeroCartao = document.getElementById("cartao-numero");
  const validadeCartao = document.getElementById("cartao-validade");
  const cvvCartao = document.getElementById("cartao-cvv");

  if (!nomeCartao.value || !numeroCartao.value || !validadeCartao.value || !cvvCartao.value) {
    alert("Preencha todos os dados do cartão.");
    return;
  }

  alert("Pagamento com cartão aprovado (simulação)");
  finalizarPedido("cartao");
}

function copiarPix() {
  const codigo = document.querySelector(".pix-codigo");
  if (!codigo) return;

  codigo.select();
  document.execCommand("copy");

  // Feedback visual (opcional: animação ou mudança de texto)
  const btnCopiar = document.querySelector(".btn-copiar");
  if (btnCopiar) {
    btnCopiar.textContent = "Copiado!";
    setTimeout(() => btnCopiar.textContent = "Copiar", 2000);
  }

  alert("Código Pix copiado!");
}

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