import type { Representante } from "@/lib/types";

export const representantes: Representante[] = [
  {
    id: "1",
    nome: "Fernanda Ribeiro",
    regiao: "Sudeste",
    estado: "SP",
    cidade: "São Paulo",
    whatsapp: "5511987654321",
    instagram: "fernanda.uc",
  },
  {
    id: "2",
    nome: "Marcos Andrade",
    regiao: "Sudeste",
    estado: "RJ",
    cidade: "Rio de Janeiro",
    whatsapp: "5521987654321",
    instagram: "marcos.uc",
  },
  {
    id: "3",
    nome: "Juliana Prado",
    regiao: "Sul",
    estado: "RS",
    cidade: "Porto Alegre",
    whatsapp: "5551987654321",
    instagram: "juliana.uc",
  },
  {
    id: "4",
    nome: "Rafael Souza",
    regiao: "Sul",
    estado: "PR",
    cidade: "Curitiba",
    whatsapp: "5541987654321",
    instagram: "rafael.uc",
  },
  {
    id: "5",
    nome: "Camila Duarte",
    regiao: "Nordeste",
    estado: "BA",
    cidade: "Salvador",
    whatsapp: "5571987654321",
    instagram: "camila.uc",
  },
  {
    id: "6",
    nome: "Diego Nascimento",
    regiao: "Nordeste",
    estado: "PE",
    cidade: "Recife",
    whatsapp: "5581987654321",
    instagram: "diego.uc",
  },
  {
    id: "7",
    nome: "Patrícia Lima",
    regiao: "Centro-Oeste",
    estado: "GO",
    cidade: "Goiânia",
    whatsapp: "5562987654321",
    instagram: "patricia.uc",
  },
  {
    id: "8",
    nome: "Bruno Castro",
    regiao: "Norte",
    estado: "PA",
    cidade: "Belém",
    whatsapp: "5591987654321",
    instagram: "bruno.uc",
  },
  {
    id: "9",
    nome: "Larissa Moreira",
    regiao: "Sudeste",
    estado: "MG",
    cidade: "Belo Horizonte",
    whatsapp: "5531987654321",
    instagram: "larissa.uc",
  },
];

export function getRegioes(): string[] {
  return Array.from(new Set(representantes.map((r) => r.regiao))).sort();
}

export function getEstados(): string[] {
  return Array.from(new Set(representantes.map((r) => r.estado))).sort();
}
