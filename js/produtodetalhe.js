const produtos = {
  /* 1 */
  "camisa-infantil-curta": {
    nome: "Camisa Educação Infantil e Fundamental Anos Iniciais",
    categoria: "Unissex · Infantil",
    descricao:
      "Camisa escolar confeccionada em tecido misto de poliéster e viscose, oferecendo excelente respirabilidade, toque macio e alta durabilidade. Ideal para a rotina escolar, mantém o conforto ao longo do dia e facilita a lavagem.",
    seo: "Camisa escolar infantil confortável e resistente para educação infantil e fundamental.",
    beneficios: [
      "Tecido respirável e confortável",
      "Alta durabilidade para uso diário",
      "Toque macio na pele",
      "Fácil manutenção e secagem rápida",
      "Padronização ideal para ambiente escolar",
    ],
    fichaTecnica: {
      Material: "65% Poliéster · 35% Viscose",
      Gênero: "Unissex",
      Indicação: "Educação Infantil e Fundamental",
      Modelagem: "Regular",
      Uso: "Escolar diário",
    },
    imagens: ["./img/Colegio_Elite/Camisa_Educação_Infantil_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 48 },
      { tamanho: "10, 12, 14", preco: 55 },
      { tamanho: "16, P, M, G, GG", preco: 65 },
    ],
  },

  /* 2 */
  "camisa-educacao-fisica": {
    nome: "Camisa Educação Física Fundamental e Médio",
    categoria: "Unissex · Juvenil",
    descricao:
      "Camisa desenvolvida para aulas de educação física, garantindo conforto térmico, leveza e resistência ao uso intenso.",
    seo: "Camisa escolar de educação física confortável e resistente para atividades esportivas.",
    beneficios: [
      "Leve e confortável",
      "Auxilia na absorção do suor",
      "Liberdade total de movimentos",
      "Alta resistência ao uso frequente",
    ],
    fichaTecnica: {
      Material: "65% Poliéster · 35% Viscose",
      Gênero: "Unissex",
      Indicação: "Educação Física",
      Uso: "Atividades esportivas",
    },
    imagens: [
      "./img/Colegio_Elite/Camisa_Educacao_Fisica_E_Fundamental_Anos_Finais_E_Ensino_Medio_Elite.png",
    ],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 48 },
      { tamanho: "10, 12, 14", preco: 55 },
      { tamanho: "16, P, M, G, GG", preco: 65 },
    ],
  },

  /* 3 */
  "bermuda-escolar": {
    nome: "Bermuda Escolar",
    categoria: "Masculino · Infantil e Juvenil",
    descricao:
      "Bermuda escolar resistente e confortável, ideal para uso diário e práticas esportivas.",
    seo: "Bermuda escolar masculina resistente e confortável para uso diário.",
    beneficios: [
      "Alta durabilidade",
      "Secagem rápida",
      "Conforto durante todo o dia",
      "Ideal para atividades físicas",
    ],
    fichaTecnica: {
      Material: "Poliéster ou Poliamida",
      Gênero: "Masculino",
      Uso: "Escolar e esportivo",
    },
    imagens: ["./img/Colegio_Elite/Bermuda_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 62 },
      { tamanho: "10, 12, 14, 16", preco: 70 },
      { tamanho: "P, M, G, GG", preco: 80 },
    ],
  },

  /* 4 */
  "short-feminino": {
    nome: "Short Escolar Feminino",
    categoria: "Feminino · Infantil e Juvenil",
    descricao:
      "Short feminino com excelente ajuste ao corpo, elasticidade e conforto térmico.",
    seo: "Short escolar feminino confortável com alta elasticidade.",
    beneficios: [
      "Elasticidade ideal",
      "Ajuste anatômico",
      "Conforto térmico",
      "Liberdade de movimentos",
    ],
    fichaTecnica: {
      Material: "88% Poliamida · 12% Elastano",
      Gênero: "Feminino",
      Uso: "Escolar",
    },
    imagens: ["./img/Colegio_Elite/Short_Feminino_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 62 },
      { tamanho: "10, 12, 14, 16", preco: 70 },
      { tamanho: "P, M, G, GG", preco: 80 },
    ],
  },

  /* 5 */
  "short-saia": {
    nome: "Short-Saia Escolar",
    categoria: "Feminino · Infantil",
    descricao:
      "Short-saia escolar com modelagem funcional que garante segurança e conforto.",
    seo: "Short-saia escolar infantil confortável e funcional.",
    beneficios: [
      "Segurança nos movimentos",
      "Conforto diário",
      "Tecido resistente",
      "Modelagem prática",
    ],
    fichaTecnica: {
      Material: "Poliéster ou Poliamida",
      Gênero: "Feminino",
      Uso: "Escolar",
    },
    imagens: ["./img/Colegio_Elite/Short-Saia_Infantil_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 60 },
      { tamanho: "10, 12, 14, 16", preco: 70 },
      { tamanho: "P, M, G, GG", preco: 80 },
    ],
  },

  /* 6 */
  "calca-escolar": {
    nome: "Calça Escolar",
    categoria: "Unissex · Infantil e Juvenil",
    descricao:
      "Calça escolar confortável e resistente, ideal para o uso diário.",
    seo: "Calça escolar unissex resistente e confortável.",
    beneficios: [
      "Ótimo caimento",
      "Alta resistência",
      "Conforto prolongado",
      "Fácil manutenção",
    ],
    fichaTecnica: {
      Material: "Poliéster ou Poliamida",
      Gênero: "Unissex",
      Uso: "Escolar",
    },
    imagens: ["./img/Colegio_Elite/Calça_Unissex_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 70 },
      { tamanho: "10, 12, 14, 16", preco: 80 },
      { tamanho: "P, M, G, GG", preco: 90 },
    ],
  },

  /* 7 */
  "camisa-ml-infantil": {
    nome: "Camisa Manga Longa Infantil",
    categoria: "Unissex · Infantil",
    descricao:
      "Camisa manga longa ideal para dias frios, mantendo conforto e aquecimento.",
    seo: "Camisa manga longa infantil confortável para dias frios.",
    beneficios: [
      "Conforto térmico",
      "Toque macio",
      "Boa respirabilidade",
      "Alta durabilidade",
    ],
    fichaTecnica: {
      Material: "65% Poliéster · 35% Viscose",
      Uso: "Escolar",
    },
    imagens: ["./img/Colegio_Elite/Camisa_ML_Educacao_Infantil_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 68 },
      { tamanho: "10, 12, 14", preco: 78 },
      { tamanho: "16, P, M, G", preco: 84 },
      { tamanho: "GG", preco: 95 },
    ],
  },

  /* 8 */
  "camisa-ml-medio": {
    nome: "Camisa Manga Longa Fundamental e Médio",
    categoria: "Unissex · Juvenil",
    descricao:
      "Camisa manga longa desenvolvida para alunos do ensino fundamental e médio, confeccionada em tecido misto de poliéster e viscose. Oferece conforto térmico, toque macio e excelente durabilidade, sendo ideal para dias mais frios sem comprometer a mobilidade.",
    seo: "Camisa manga longa escolar para ensino fundamental e médio com conforto térmico.",
    beneficios: [
      "Conforto térmico para dias frios",
      "Toque macio e agradável",
      "Alta durabilidade",
      "Excelente caimento",
      "Ideal para uso escolar diário",
    ],
    fichaTecnica: {
      Material: "65% Poliéster · 35% Viscose",
      Gênero: "Unissex",
      Indicação: "Fundamental e Médio",
      Modelagem: "Regular",
      Uso: "Escolar",
    },
    imagens: [
      "./img/Colegio_Elite/Camisa_Ensino_Fundamental_Anos_Finais_E_Ensino_Medio_Elite.png",
    ],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 68 },
      { tamanho: "10, 12, 14", preco: 78 },
      { tamanho: "16, P, M, G", preco: 84 },
      { tamanho: "GG", preco: 95 },
    ],
  },

  /* 9 */
  "legging-escolar": {
    nome: "Calça Legging Escolar",
    categoria: "Feminino · Infantil e Juvenil",
    descricao:
      "Calça legging escolar confeccionada em tecido resistente com excelente elasticidade, proporcionando conforto, mobilidade e ajuste perfeito ao corpo. Ideal para atividades escolares e uso diário.",
    seo: "Calça legging escolar feminina confortável e resistente.",
    beneficios: [
      "Alta elasticidade",
      "Excelente ajuste ao corpo",
      "Conforto térmico",
      "Liberdade total de movimentos",
    ],
    fichaTecnica: {
      Material: "65% Poliéster · 35% Viscose",
      Gênero: "Feminino",
      Uso: "Escolar",
    },
    imagens: ["./img/Colegio_Elite/Calça_Legging_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 78 },
      { tamanho: "10, 12, 14, 16", preco: 88 },
      { tamanho: "P, M, G, GG", preco: 95 },
    ],
  },

  /* 10 */
  "vestido-escolar": {
    nome: "Vestido Polo Escolar",
    categoria: "Feminino · Infantil",
    descricao:
      "Vestido polo escolar confeccionado em poliéster com algodão, garantindo conforto, respirabilidade e toque macio. Possui modelagem elegante e confortável, ideal para o uso diário mantendo a padronização escolar.",
    seo: "Vestido polo escolar infantil confortável e elegante.",
    beneficios: [
      "Conforto ao longo do dia",
      "Tecido respirável",
      "Modelagem elegante",
      "Fácil manutenção",
    ],
    fichaTecnica: {
      Material: "50% Poliéster · 50% Algodão",
      Gênero: "Feminino",
      Indicação: "Infantil",
      Uso: "Escolar",
    },
    imagens: ["./img/Colegio_Elite/Vestido_Polo_Infantil_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 85 },
      { tamanho: "10, 12, 14, 16", preco: 95 },
      { tamanho: "P, M, G, GG", preco: 80 },
    ],
  },

  /* 11 */
  "jaqueta-matelassada": {
    nome: "Jaqueta College Matelassada",
    categoria: "Unissex · Infantil e Juvenil",
    descricao:
      "Jaqueta college matelassada produzida em tecido Camberra, com acabamento em ribana de poliéster. Proporciona excelente isolamento térmico, conforto e resistência, sendo ideal para períodos de baixas temperaturas.",
    seo: "Jaqueta escolar matelassada com isolamento térmico para inverno.",
    beneficios: [
      "Excelente isolamento térmico",
      "Alta resistência",
      "Conforto em dias frios",
      "Acabamento premium",
    ],
    fichaTecnica: {
      Material: "Tecido Camberra · Ribana Poliéster",
      Gênero: "Unissex",
      Uso: "Escolar e inverno",
    },
    imagens: ["./img/Colegio_Elite/Jaqueta_College_Matelassada_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 115 },
      { tamanho: "10, 12, 14, 16", preco: 135 },
      { tamanho: "P, M, G", preco: 145 },
      { tamanho: "GG", preco: 155 },
    ],
  },

  /* 12 */
  "jaqueta-moletom": {
    nome: "Jaqueta College Moletom",
    categoria: "Unissex · Infantil e Juvenil",
    descricao:
      "Jaqueta college em moletom, confeccionada em poliéster com algodão, oferecendo conforto térmico, maciez e excelente durabilidade. Ideal para uso escolar em dias frios.",
    seo: "Jaqueta escolar em moletom confortável e resistente.",
    beneficios: [
      "Conforto térmico",
      "Tecido macio",
      "Ótimo caimento",
      "Alta durabilidade",
    ],
    fichaTecnica: {
      Material: "50% Poliéster · 50% Algodão",
      Gênero: "Unissex",
      Uso: "Escolar",
    },
    imagens: ["./img/Colegio_Elite/Jaqueta_College_Moleton_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 85 },
      { tamanho: "10, 12, 14, 16", preco: 110 },
      { tamanho: "P, M, G", preco: 135 },
      { tamanho: "GG", preco: 150 },
    ],
  },

  /* 13 */
  "casaco-moletom": {
    nome: "Casaco Moletom",
    categoria: "Unissex · Infantil e Juvenil",
    descricao:
      "Casaco moletom escolar confeccionado em poliéster e algodão, garantindo aquecimento, conforto e resistência. Modelo sem capuz, ideal para uso diário.",
    seo: "Casaco moletom escolar confortável e resistente.",
    beneficios: [
      "Aquecimento eficiente",
      "Conforto diário",
      "Modelo versátil",
      "Alta durabilidade",
    ],
    fichaTecnica: {
      Material: "50% Poliéster · 50% Algodão",
      Gênero: "Unissex",
      Uso: "Escolar",
    },
    imagens: ["./img/Colegio_Elite/Casaco_Moleton_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 75 },
      { tamanho: "10, 12, 14, 16", preco: 85 },
      { tamanho: "P, M, G", preco: 110 },
      { tamanho: "GG", preco: 140 },
    ],
  },

  /* 14 */
  "casaco-canguru": {
    nome: "Casaco Moletom Canguru",
    categoria: "Unissex · Infantil e Juvenil",
    descricao:
      "Casaco moletom canguru com capuz e bolso frontal, confeccionado em poliéster com algodão. Ideal para dias frios, oferecendo conforto térmico e praticidade.",
    seo: "Casaco moletom canguru escolar com capuz.",
    beneficios: [
      "Capuz protetor",
      "Bolso frontal funcional",
      "Conforto térmico",
      "Tecido macio",
    ],
    fichaTecnica: {
      Material: "50% Poliéster · 50% Algodão",
      Gênero: "Unissex",
      Uso: "Escolar e inverno",
    },
    imagens: ["./img/Colegio_Elite/Casaco_Moletom_Canguru_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 85 },
      { tamanho: "10, 12, 14, 16", preco: 110 },
      { tamanho: "P, M, G", preco: 135 },
      { tamanho: "GG", preco: 150 },
    ],
  },

  /* 15 */
  "corta-vento": {
    nome: "Casaco Corta Vento",
    categoria: "Unissex · Infantil e Juvenil",
    descricao:
      "Casaco corta vento confeccionado em poliéster leve e resistente, ideal para proteção contra vento e mudanças climáticas. Indicado para uso escolar e atividades ao ar livre.",
    seo: "Casaco corta vento escolar leve e resistente.",
    beneficios: [
      "Proteção contra vento",
      "Tecido leve",
      "Alta resistência",
      "Ideal para meia-estação",
    ],
    fichaTecnica: {
      Material: "100% Poliéster",
      Gênero: "Unissex",
      Uso: "Escolar e externo",
    },
    imagens: ["./img/Colegio_Elite/Casaco_Corta_Vento_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 80 },
      { tamanho: "10, 12, 14, 16", preco: 100 },
      { tamanho: "P, M, G", preco: 110 },
      { tamanho: "GG", preco: 120 },
    ],
  },

  /* 16 */
  "jaqueta-ed-fisica": {
    nome: "Jaqueta Educação Física",
    categoria: "Unissex · Juvenil",
    descricao:
      "Jaqueta esportiva desenvolvida para aulas de educação física, confeccionada em poliéster, oferecendo leveza, conforto térmico e resistência.",
    seo: "Jaqueta escolar de educação física confortável e resistente.",
    beneficios: [
      "Leve e confortável",
      "Ideal para atividades esportivas",
      "Alta durabilidade",
      "Liberdade de movimentos",
    ],
    fichaTecnica: {
      Material: "100% Poliéster",
      Gênero: "Unissex",
      Uso: "Educação Física",
    },
    imagens: [
      "./img/Colegio_Elite/Camisa_Educacao_Fisica_E_Fundamental_Anos_Finais_E_Ensino_Medio_Elite.png",
    ],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 115 },
      { tamanho: "10, 12, 14, 16", preco: 135 },
      { tamanho: "P, M, G", preco: 145 },
      { tamanho: "GG", preco: 155 },
    ],
  },

  /* 17 */
  "calca-ed-fisica": {
    nome: "Calça Educação Física",
    categoria: "Unissex · Infantil e Juvenil",
    descricao:
      "Calça para educação física confeccionada em poliéster com viscose, garantindo conforto, resistência e excelente mobilidade para atividades esportivas.",
    seo: "Calça escolar de educação física confortável e resistente.",
    beneficios: [
      "Conforto durante atividades físicas",
      "Alta resistência",
      "Excelente mobilidade",
      "Uso diário escolar",
    ],
    fichaTecnica: {
      Material: "65% Poliéster · 35% Viscose",
      Gênero: "Unissex",
      Uso: "Educação Física",
    },
    imagens: ["./img/Colegio_Elite/Calça_Legging_Elite.png"],
    tamanhos: [
      { tamanho: "2, 4, 6, 8", preco: 78 },
      { tamanho: "10, 12, 14, 16", preco: 88 },
      { tamanho: "P, M, G, GG", preco: 95 },
    ],
  },
};

/* BUSCA DO PRODUTO */
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const produto = produtos[id];

let tamanhoSelecionado = null;
let precoSelecionado = null;

if (!produto) {
  document.body.innerHTML = "<h1>Produto não encontrado</h1>";
  throw new Error("Produto inválido");
}

/* ELEMENTOS */
const nomeEl = document.getElementById("produtoNome");
const categoriaEl = document.getElementById("produtoCategoria");
const descricaoEl = document.getElementById("produtoDescricao");
const precoEl = document.getElementById("produtoPreco");
const imagemPrincipal = document.getElementById("imagemPrincipal");
const miniaturas = document.getElementById("miniaturas");
const tamanhosContainer = document.getElementById("tamanhos");
const detalhesEl = document.getElementById("produtoDetalhes");

/* DADOS */
nomeEl.textContent = produto.nome;
categoriaEl.textContent = produto.categoria;
descricaoEl.textContent = produto.descricao;
precoEl.textContent = "Selecione um tamanho";

/* SEO */
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription && produto.seo) {
  metaDescription.setAttribute("content", produto.seo);
}

/* GALERIA */
imagemPrincipal.src = produto.imagens[0];
produto.imagens.forEach((img) => {
  const image = document.createElement("img");
  image.src = img;
  image.addEventListener("click", () => (imagemPrincipal.src = img));
  miniaturas.appendChild(image);
});

/* TAMANHOS */
produto.tamanhos.forEach((grupo) => {
  grupo.tamanho.split(",").forEach((tam) => {
    const btn = document.createElement("button");
    btn.textContent = tam.trim();
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tamanhos button")
        .forEach((b) => b.classList.remove("ativo"));

      btn.classList.add("ativo");

      tamanhoSelecionado = tam.trim();
      precoSelecionado = grupo.preco;

      precoEl.textContent = `R$ ${grupo.preco.toFixed(2).replace(".", ",")}`;
    });

    tamanhosContainer.appendChild(btn);
  });
});

/* BENEFÍCIOS + FICHA */
produto.beneficios.forEach((b) => {
  const li = document.createElement("li");
  li.textContent = "" + b;
  detalhesEl.appendChild(li);
});

const fichaContainer = document.getElementById("fichaTecnica");

const fichaTitulo = document.createElement("h3");
fichaTitulo.textContent = "Ficha técnica";
fichaContainer.appendChild(fichaTitulo);

Object.entries(produto.fichaTecnica).forEach(([k, v]) => {
  const item = document.createElement("div");
  item.classList.add("ficha-item");

  item.innerHTML = `<strong>${k}</strong><span>${v}</span>`;
  fichaContainer.appendChild(item);
});
