import type { Produto, Tamanho } from "@/lib/types";

/** Gera uma grade PP–XG com incremento fixo por tamanho — placeholder até a ficha técnica real da fábrica entrar aqui. */
function gradePadrao(base: {
  largura: number;
  comprimento: number;
  manga?: number;
}): Tamanho[] {
  const siglas = ["PP", "P", "M", "G", "GG", "XG"];
  return siglas.map((sigla, i) => ({
    sigla,
    medidas: {
      largura: base.largura + i * 3,
      comprimento: base.comprimento + i * 2,
      ...(base.manga !== undefined ? { manga: base.manga + i * 1 } : {}),
    },
  }));
}

export const produtos: Produto[] = [
  {
    id: "1",
    slug: "camiseta-bamboo-essencial",
    referencia: "UC-1042",
    nome: "Camiseta Bamboo Essencial",
    categoria: "Camisetas",
    colecao: "Essenciais",
    genero: "Unissex",
    descricao:
      "Camiseta de corte reto em malha de fibra de bambu, com toque macio e caimento que não deforma na lavagem. Peça-base para compor looks do dia a dia.",
    composicao: "94% fibra de bambu, 6% elastano",
    cuidados: [
      "Lavar à mão ou em ciclo suave, água fria",
      "Não usar alvejante",
      "Secar à sombra, estendida",
      "Passar a ferro em temperatura baixa",
    ],
    cores: [
      { nome: "Preto", hex: "#1a1a1a", imagens: ["a", "b", "c"] },
      { nome: "Areia", hex: "#cbbfa8", imagens: ["a", "b"] },
      { nome: "Verde Musgo", hex: "#4b5842", imagens: ["a", "b"] },
    ],
    tamanhos: gradePadrao({ largura: 48, comprimento: 68, manga: 21 }),
    destaque: true,
  },
  {
    id: "2",
    slug: "moletom-canguru-urban",
    referencia: "UC-2210",
    nome: "Moletom Canguru Urban",
    categoria: "Moletons",
    colecao: "Inverno 2026",
    genero: "Unissex",
    descricao:
      "Moletom flanelado por dentro, bolso canguru e capuz forrado. Desenvolvido para dias frios sem abrir mão do caimento oversized.",
    composicao: "80% algodão, 20% poliéster",
    cuidados: [
      "Lavar do avesso, água fria",
      "Não usar secadora",
      "Não passar sobre estampas",
    ],
    cores: [
      { nome: "Grafite", hex: "#3a3a3a", imagens: ["a", "b", "c"] },
      { nome: "Bege", hex: "#d8cdb8", imagens: ["a", "b"] },
    ],
    tamanhos: gradePadrao({ largura: 58, comprimento: 72, manga: 60 }),
    destaque: true,
  },
  {
    id: "3",
    slug: "calca-cargo-utilitaria",
    referencia: "UC-3305",
    nome: "Calça Cargo Utilitária",
    categoria: "Calças",
    colecao: "Inverno 2026",
    genero: "Masculino",
    descricao:
      "Calça em sarja pesada com bolsos laterais utilitários e cadarço de ajuste na barra. Corte reto, cintura média.",
    composicao: "98% algodão, 2% elastano",
    cuidados: ["Lavar em água fria", "Virar do avesso antes de lavar", "Secar à sombra"],
    cores: [
      { nome: "Verde Militar", hex: "#5a6650", imagens: ["a", "b", "c"] },
      { nome: "Preto", hex: "#1a1a1a", imagens: ["a", "b"] },
    ],
    tamanhos: gradePadrao({ largura: 42, comprimento: 104 }),
  },
  {
    id: "4",
    slug: "jaqueta-corta-vento-city",
    referencia: "UC-4108",
    nome: "Jaqueta Corta-Vento City",
    categoria: "Jaquetas",
    colecao: "Inverno 2026",
    genero: "Unissex",
    descricao:
      "Jaqueta leve com tecido impermeável e capuz destacável. Recortes refletivos para uso urbano noturno.",
    composicao: "100% poliéster com tratamento impermeável",
    cuidados: ["Lavar à mão", "Não torcer", "Não usar ferro de passar"],
    cores: [
      { nome: "Preto", hex: "#1a1a1a", imagens: ["a", "b", "c"] },
      { nome: "Amarelo Safety", hex: "#e4b93a", imagens: ["a", "b"] },
    ],
    tamanhos: gradePadrao({ largura: 56, comprimento: 70, manga: 62 }),
    destaque: true,
  },
  {
    id: "5",
    slug: "vestido-midi-fluido",
    referencia: "UC-5021",
    nome: "Vestido Midi Fluido",
    categoria: "Vestidos",
    colecao: "Verão 2026",
    genero: "Feminino",
    descricao:
      "Vestido midi em viscose fluida, decote V e cinto de amarrar na cintura. Caimento leve para o calor.",
    composicao: "100% viscose",
    cuidados: ["Lavar à mão, água fria", "Secar à sombra", "Passar a ferro morno pelo avesso"],
    cores: [
      { nome: "Terracota", hex: "#b1603f", imagens: ["a", "b", "c"] },
      { nome: "Off-White", hex: "#efe9df", imagens: ["a", "b"] },
    ],
    tamanhos: gradePadrao({ largura: 44, comprimento: 112 }),
    destaque: true,
  },
  {
    id: "6",
    slug: "bermuda-sarja-relaxed",
    referencia: "UC-6117",
    nome: "Bermuda Sarja Relaxed",
    categoria: "Bermudas",
    colecao: "Verão 2026",
    genero: "Masculino",
    descricao:
      "Bermuda em sarja leve, corte relaxed na altura do joelho. Bolsos funcionais e cós com elástico parcial.",
    composicao: "100% algodão",
    cuidados: ["Lavar em água fria", "Secar à sombra"],
    cores: [
      { nome: "Bege", hex: "#d8cdb8", imagens: ["a", "b"] },
      { nome: "Azul Marinho", hex: "#2b3440", imagens: ["a", "b"] },
    ],
    tamanhos: gradePadrao({ largura: 42, comprimento: 52 }),
  },
  {
    id: "7",
    slug: "camiseta-listrada-marina",
    referencia: "UC-1108",
    nome: "Camiseta Listrada Marina",
    categoria: "Camisetas",
    colecao: "Verão 2026",
    genero: "Feminino",
    descricao:
      "Camiseta em algodão penteado com listras finas, gola careca e barra reta. Inspirada no clássico marinheiro.",
    composicao: "100% algodão penteado",
    cuidados: ["Lavar à máquina, ciclo suave", "Não usar alvejante"],
    cores: [
      { nome: "Azul e Branco", hex: "#26456e", imagens: ["a", "b"] },
      { nome: "Preto e Branco", hex: "#1a1a1a", imagens: ["a", "b"] },
    ],
    tamanhos: gradePadrao({ largura: 44, comprimento: 60, manga: 18 }),
  },
  {
    id: "8",
    slug: "moletom-oversized-cropped",
    referencia: "UC-2244",
    nome: "Moletom Oversized Cropped",
    categoria: "Moletons",
    colecao: "Inverno 2026",
    genero: "Feminino",
    descricao:
      "Moletom cropped de caimento oversized, gola careca reforçada e punhos canelados. Peça-chave da coleção de inverno.",
    composicao: "70% algodão, 30% poliéster",
    cuidados: ["Lavar do avesso", "Não usar secadora", "Não alvejar"],
    cores: [
      { nome: "Lilás", hex: "#a99bc0", imagens: ["a", "b"] },
      { nome: "Preto", hex: "#1a1a1a", imagens: ["a", "b", "c"] },
    ],
    tamanhos: gradePadrao({ largura: 52, comprimento: 48, manga: 56 }),
  },
  {
    id: "9",
    slug: "calca-alfaiataria-reta",
    referencia: "UC-3390",
    nome: "Calça Alfaiataria Reta",
    categoria: "Calças",
    colecao: "Essenciais",
    genero: "Feminino",
    descricao:
      "Calça de alfaiataria em tecido com leve elastano, corte reto e cintura alta. Do escritório à rua sem perder a formalidade.",
    composicao: "68% poliéster, 30% viscose, 2% elastano",
    cuidados: ["Lavar à mão", "Passar a ferro morno", "Lavagem a seco recomendada"],
    cores: [
      { nome: "Preto", hex: "#1a1a1a", imagens: ["a", "b"] },
      { nome: "Caramelo", hex: "#9c6b3e", imagens: ["a", "b"] },
    ],
    tamanhos: gradePadrao({ largura: 40, comprimento: 102 }),
  },
];

export function getProdutoPorSlug(slug: string): Produto | undefined {
  return produtos.find((p) => p.slug === slug);
}

export function getCategorias(): string[] {
  return Array.from(new Set(produtos.map((p) => p.categoria))).sort();
}

export function getColecoes(): string[] {
  return Array.from(new Set(produtos.map((p) => p.colecao))).sort();
}

export function getGeneros(): string[] {
  return Array.from(new Set(produtos.map((p) => p.genero))).sort();
}

export function getCores(): string[] {
  return Array.from(
    new Set(produtos.flatMap((p) => p.cores.map((c) => c.nome)))
  ).sort();
}
