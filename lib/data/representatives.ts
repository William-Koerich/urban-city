import type { Representante } from "@/lib/types";

export const representantes: Representante[] = [
  {
    id: "1",
    nome: "Fernanda Ribeiro",
    regiao: "Sudeste",
    estado: "SP",
    cidade: "São Paulo",
    whatsapp: "5547996348990",
    instagram: "fernanda.uc",
  },
  {
    id: "2",
    nome: "Marcos Andrade",
    regiao: "Sudeste",
    estado: "RJ",
    cidade: "Rio de Janeiro",
    whatsapp: "5547996348990",
    instagram: "marcos.uc",
  },
  {
    id: "3",
    nome: "Juliana Prado",
    regiao: "Sul",
    estado: "RS",
    cidade: "Porto Alegre",
    whatsapp: "5547996348990",
    instagram: "juliana.uc",
  },
  {
    id: "4",
    nome: "Rafael Souza",
    regiao: "Sul",
    estado: "PR",
    cidade: "Curitiba",
    whatsapp: "5547996348990",
    instagram: "rafael.uc",
  },
  {
    id: "5",
    nome: "Camila Duarte",
    regiao: "Nordeste",
    estado: "BA",
    cidade: "Salvador",
    whatsapp: "5547996348990",
    instagram: "camila.uc",
  },
  {
    id: "6",
    nome: "Diego Nascimento",
    regiao: "Nordeste",
    estado: "PE",
    cidade: "Recife",
    whatsapp: "5547996348990",
    instagram: "diego.uc",
  },
  {
    id: "7",
    nome: "Patrícia Lima",
    regiao: "Centro-Oeste",
    estado: "GO",
    cidade: "Goiânia",
    whatsapp: "5547996348990",
    instagram: "patricia.uc",
  },
  {
    id: "8",
    nome: "Bruno Castro",
    regiao: "Norte",
    estado: "PA",
    cidade: "Belém",
    whatsapp: "5547996348990",
    instagram: "bruno.uc",
  },
  {
    id: "9",
    nome: "Larissa Moreira",
    regiao: "Sudeste",
    estado: "MG",
    cidade: "Belo Horizonte",
    whatsapp: "5547996348990",
    instagram: "larissa.uc",
  },
];

export function getRegioes(): string[] {
  return Array.from(new Set(representantes.map((r) => r.regiao))).sort();
}

export function getEstados(): string[] {
  return Array.from(new Set(representantes.map((r) => r.estado))).sort();
}
