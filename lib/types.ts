/**
 * Modelo de dados da Fase 1.
 *
 * O produto é cadastrado como item comercial real (referência, cor, tamanho,
 * grade, ficha técnica) e não como "conteúdo de site". `precoSugerido` e
 * `estoque` já existem no tipo — hoje não são exibidos em lugar nenhum — para
 * que ligar preço/estoque/carrinho no futuro seja adicionar UI, não remodelar
 * dados.
 */

export type Genero = "Feminino" | "Masculino" | "Unissex";

export type Medidas = {
  /** Largura do peito, cm, medida em linha reta de axila a axila. */
  largura: number;
  /** Comprimento total, cm, do ombro à barra. */
  comprimento: number;
  /** Comprimento de manga, cm — omitido em peças sem manga. */
  manga?: number;
};

export type Tamanho = {
  sigla: string; // "PP" | "P" | "M" | "G" | "GG" | "XG"
  medidas: Medidas;
};

export type CorVariante = {
  nome: string;
  hex: string;
  /** Seed usado para gerar o placeholder visual — troque por fotos reais. */
  imagens: string[];
};

export type Produto = {
  id: string;
  slug: string;
  referencia: string;
  nome: string;
  categoria: string;
  colecao: string;
  genero: Genero;
  descricao: string;
  composicao: string;
  cuidados: string[];
  cores: CorVariante[];
  tamanhos: Tamanho[];
  destaque?: boolean;
  /** Pronto para a Fase 2 (e-commerce); não exibido na Fase 1. */
  precoSugerido?: number;
  estoque?: number;
};

export type Representante = {
  id: string;
  nome: string;
  regiao: "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";
  estado: string;
  cidade: string;
  whatsapp: string; // dígitos com DDI, ex: "5511999999999"
  instagram: string; // handle sem @
};
