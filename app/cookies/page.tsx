import type { Metadata } from "next";
import { Container } from "@/app/components/ui/container";
import { DraftNotice } from "@/app/components/ui/draft-notice";

export const metadata: Metadata = {
  title: "Aviso de cookies",
  description: "Quais cookies o site da Urban City usa e como gerenciá-los.",
};

const cookies = [
  {
    nome: "urbancity-cookie-consent",
    finalidade: "Guarda sua escolha sobre este aviso de cookies.",
    duracao: "Persistente (até você limpar os dados do navegador)",
    tipo: "Essencial",
  },
  {
    nome: "(exemplo) _ga",
    finalidade: "Métricas de uso agregadas, quando a análise for ativada.",
    duracao: "13 meses",
    tipo: "Analítico",
  },
];

export default function CookiesPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <DraftNotice />
        <h1 className="font-display text-3xl sm:text-4xl">Aviso de cookies</h1>
        <p className="mt-4 text-muted">
          Cookies são pequenos arquivos guardados pelo seu navegador para
          lembrar preferências e entender como o site é usado. Ao continuar
          navegando após aceitar o aviso exibido no site, você concorda com o
          uso descrito abaixo.
        </p>

        <h2 className="mt-10 font-display text-xl">Tipos de cookies</h2>
        <ul className="mt-3 flex flex-col gap-2 text-muted">
          <li>
            <strong className="text-foreground">Essenciais</strong> — necessários
            para o funcionamento básico do site, como lembrar sua escolha
            sobre cookies.
          </li>
          <li>
            <strong className="text-foreground">Analíticos</strong> — ajudam a
            entender quais páginas e produtos têm mais interesse, de forma
            agregada.
          </li>
        </ul>

        <h2 className="mt-10 font-display text-xl">Cookies utilizados</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Finalidade</th>
                <th className="px-4 py-3">Duração</th>
                <th className="px-4 py-3">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {cookies.map((c) => (
                <tr key={c.nome} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{c.nome}</td>
                  <td className="px-4 py-3">{c.finalidade}</td>
                  <td className="px-4 py-3">{c.duracao}</td>
                  <td className="px-4 py-3">{c.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 font-display text-xl">Como gerenciar</h2>
        <p className="mt-3 text-muted">
          Você pode limpar sua escolha a qualquer momento apagando os dados de
          navegação deste site no seu navegador, o que faz o aviso de cookies
          aparecer novamente. A maioria dos navegadores também permite bloquear
          cookies por padrão nas configurações de privacidade.
        </p>
      </Container>
    </section>
  );
}
