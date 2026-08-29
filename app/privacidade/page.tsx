import type { Metadata } from "next";
import { Container } from "@/app/components/ui/container";
import { DraftNotice } from "@/app/components/ui/draft-notice";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a Urban City coleta, usa e protege dados pessoais.",
};

const secoes = [
  {
    titulo: "1. Quem somos",
    texto:
      "Esta política explica como a Urban City coleta, usa, armazena e protege dados pessoais de visitantes, consumidores e lojistas que utilizam este site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
  },
  {
    titulo: "2. Quais dados coletamos",
    texto:
      "Dados de navegação (páginas visitadas, sequência de páginas dentro da mesma visita, origem do acesso — Google, Instagram, direto), localização aproximada (país/estado/cidade, calculada a partir do endereço IP — não coletamos localização precisa de GPS nem pedimos permissão de localização do navegador), e dados fornecidos voluntariamente em formulários, como nome, email e telefone.",
  },
  {
    titulo: "3. Para que usamos os dados",
    texto:
      "Para responder contatos e solicitações, conectar visitantes a representantes da região, entender quais produtos e regiões geram mais interesse, melhorar o site e cumprir obrigações legais. Esses dados de navegação só são coletados depois que você aceita o aviso de cookies exibido no site.",
  },
  {
    titulo: "4. Compartilhamento",
    texto:
      "Dados de contato podem ser repassados ao representante comercial da região do usuário para viabilizar o atendimento. Não vendemos dados pessoais a terceiros.",
  },
  {
    titulo: "5. Cookies",
    texto:
      "Utilizamos cookies essenciais e analíticos, detalhados no nosso aviso de cookies.",
  },
  {
    titulo: "6. Direitos do titular",
    texto:
      "Você pode solicitar confirmação, acesso, correção, anonimização ou eliminação dos seus dados a qualquer momento, pelos canais listados na página de Contato.",
  },
  {
    titulo: "7. Segurança",
    texto:
      "Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados coletados contra acesso não autorizado, perda ou alteração.",
  },
  {
    titulo: "8. Atualizações desta política",
    texto:
      "Esta política pode ser atualizada periodicamente. A data da última revisão será sempre indicada nesta página.",
  },
];

export default function PrivacidadePage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <DraftNotice />
        <h1 className="font-display text-3xl sm:text-4xl">
          Política de privacidade
        </h1>
        <p className="mt-2 text-sm text-muted">
          Última revisão: modelo inicial — sem data de publicação.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {secoes.map((secao) => (
            <div key={secao.titulo}>
              <h2 className="font-display text-xl">{secao.titulo}</h2>
              <p className="mt-2 text-muted">{secao.texto}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
