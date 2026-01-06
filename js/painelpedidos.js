let filtroAtual = "todos";
let filtroStatus = "todos";

function pedidoDentroDoStatus(statusPedido) {
  if (filtroStatus === "todos") return true;
  return statusPedido === filtroStatus;
}

function pedidoDentroDoFiltro(dataPedido) {
  const hoje = new Date();
  const [dia, mes, ano] = dataPedido.split("/").map(Number);
  const data = new Date(ano, mes - 1, dia, 12); // evita bug de fuso horário

  if (filtroAtual === "hoje") {
    return data.toDateString() === hoje.toDateString();
  }

  if (filtroAtual === "semana") {
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
    inicioSemana.setHours(0, 0, 0, 0);
    return data >= inicioSemana;
  }

  if (filtroAtual === "mes") {
    return (
      data.getMonth() === hoje.getMonth() &&
      data.getFullYear() === hoje.getFullYear()
    );
  }

  if (filtroAtual === "ano") {
    return data.getFullYear() === hoje.getFullYear();
  }

  return true; // todos
}

let listaPedidos;
let qtdPendentes;

document.addEventListener("DOMContentLoaded", () => {
  listaPedidos = document.getElementById("listaPedidos");
  qtdPendentes = document.getElementById("qtdPendentes");

  // 🔄 sincroniza estado inicial a partir do HTML
  const filtroDataAtivo = document.querySelector(".filtros button.ativo");
  if (filtroDataAtivo) {
    filtroAtual = filtroDataAtivo.dataset.filtro;
  }

  const filtroStatusAtivo = document.querySelector(
    ".filtros-status button.ativo"
  );
  if (filtroStatusAtivo) {
    filtroStatus = filtroStatusAtivo.dataset.status;
  }

  renderPedidos();
});

function getPedidos() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  // remove pedidos inválidos automaticamente
  const pedidosValidos = pedidos.filter(
    (p) =>
      p &&
      p.data &&
      p.cliente &&
      Array.isArray(p.produtos) &&
      p.produtos.length > 0
  );

  if (pedidosValidos.length !== pedidos.length) {
    salvarPedidos(pedidosValidos);
  }

  return pedidosValidos;
}

function salvarPedidos(pedidos) {
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

function atualizarPendentes(pedidos) {
  const pendentes = pedidos.filter(
    (p) => p.status === "Pago" && pedidoDentroDoFiltro(p.data)
  ).length;

  qtdPendentes.textContent = pendentes;
}

function renderPedidos() {
  const pedidos = getPedidos();
  listaPedidos.innerHTML = "";

  atualizarPendentes(pedidos);

  if (pedidos.length === 0) {
    listaPedidos.innerHTML =
      "<p style='padding:3rem'>Nenhum pedido encontrado.</p>";
    return;
  }

  pedidos.forEach((pedido) => {
    // 🔒 valida estrutura mínima do pedido
    if (
      !pedido ||
      !pedido.data ||
      !pedido.cliente ||
      !Array.isArray(pedido.produtos) ||
      pedido.produtos.length === 0
    ) {
      return;
    }

    if (!pedidoDentroDoFiltro(pedido.data)) return;
    if (!pedidoDentroDoStatus(pedido.status)) return;

    const statusInfo = getStatusInfo(pedido.status);

    const section = document.createElement("section");
    section.classList.add("produtos");

    section.innerHTML = `
      <div class="topo-pedido">
        <h1 class="nome_cliente">Cliente: ${pedido.cliente.nome}</h1>
        <span class="status ${statusInfo.classe}">
          ${statusInfo.texto}
        </span>
      </div>

      <p class="data_pedido">
        Pedido realizado em: <strong>${pedido.data}</strong>
      </p>

     <p class="Endereco">
      ${pedido.endereco.rua}, ${pedido.endereco.numero} – ${
          pedido.endereco.bairro
        }<br>
      ${pedido.endereco.cidade}/${pedido.endereco.estado} – CEP: ${
          pedido.endereco.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
        }
    </p>


      <p class="Endereco">Complemento: ${pedido.endereco.complemento}</p>

      <div class="container_card">
        ${pedido.produtos
          .map(
            (produto) => `
            <div class="card">
              <img src="${produto.imagem}">
              <h1>${produto.nome}</h1>
              <p>Tamanho: ${produto.tamanho}</p>
              <p>Unidades: ${produto.quantidade}</p>

              <div class="precos">
                <span>Preço unitário: R$ ${produto.preco.toFixed(2)}</span>
                <span>Subtotal: R$ ${(
                  produto.preco * produto.quantidade
                ).toFixed(2)}</span>
              </div>
            </div>
          `
          )
          .join("")}
      </div>

      <div class="total">
        <span class="preco_total">
          Total da compra: R$ ${pedido.total.toFixed(2)}
        </span>

        <div class="footer_pedido">
          ${
            pedido.status === "Pago"
              ? `<button onclick="prepararPedido('${pedido.id}')" class="aprovar">
                  Preparar pedido
                </button>`
              : ""
          }

          ${
            pedido.status === "Preparando"
              ? `<button onclick="pedidoPronto('${pedido.id}')" class="aprovar">
                  Pedido pronto
                </button>`
              : ""
          }

          ${
            pedido.status !== "Cancelado" && pedido.status !== "Pronto"
              ? `<button onclick="cancelarPedido('${pedido.id}')" class="cancelar">
                  Cancelar pedido
                </button>`
              : ""
          }

          <button onclick="excluirPedido('${
            pedido.id
          }')" class="lixeira">🗑</button>
        </div>
      </div>
    `;

    listaPedidos.appendChild(section);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".filtros button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filtros button")
        .forEach((b) => b.classList.remove("ativo"));

      btn.classList.add("ativo");
      filtroAtual = btn.dataset.filtro;
      renderPedidos();
    });
  });

  document.querySelectorAll(".filtros-status button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filtros-status button")
        .forEach((b) => b.classList.remove("ativo"));

      btn.classList.add("ativo");
      filtroStatus = btn.dataset.status;
      renderPedidos();
    });
  });
});

function prepararPedido(id) {
  const pedidos = getPedidos();
  const pedido = pedidos.find((p) => p.id === id);
  if (!pedido) return;

  pedido.status = "Preparando";
  salvarPedidos(pedidos);
  renderPedidos();
}

function pedidoPronto(id) {
  const pedidos = getPedidos();
  const pedido = pedidos.find((p) => p.id === id);
  if (!pedido) return;

  pedido.status = "Pronto";
  salvarPedidos(pedidos);
  enviarEmailPedidoPronto(pedido);
  renderPedidos();
}

function cancelarPedido(id) {
  const pedidos = getPedidos();
  const pedido = pedidos.find((p) => p.id === id);
  if (!pedido) return;

  pedido.status = "Cancelado";
  salvarPedidos(pedidos);
  renderPedidos();
}

function excluirPedido(id) {
  if (!confirm("Deseja excluir este pedido definitivamente?")) return;

  const pedidos = getPedidos().filter((p) => p.id !== id);
  salvarPedidos(pedidos);
  renderPedidos();
}

function getStatusInfo(status) {
  switch (status) {
    case "Pago":
      return { texto: "Pendente", classe: "status-pendente" };
    case "Preparando":
      return { texto: "Em preparo", classe: "status-preparo" };
    case "Pronto":
      return { texto: "Pedido pronto", classe: "status-pronto" };
    case "Cancelado":
      return { texto: "Cancelado", classe: "status-cancelado" };
    default:
      return { texto: status, classe: "" };
  }
}

function aprovarPedido(index) {
  const pedidos = getPedidos();
  pedidos[index].status = "Finalizado";
  salvarPedidos(pedidos);
  renderPedidos();
}

renderPedidos();
