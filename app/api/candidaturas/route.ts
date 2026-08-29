import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

function campoObrigatorio(valor: unknown): string | null {
  return typeof valor === "string" && valor.trim() ? valor.trim().slice(0, 200) : null;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const nome = campoObrigatorio(body.nome);
  const email = campoObrigatorio(body.email);
  const whatsapp = campoObrigatorio(body.whatsapp);
  const cidade = campoObrigatorio(body.cidade);
  const estado = campoObrigatorio(body.estado);
  const mensagem = campoObrigatorio(body.mensagem);

  if (!nome || !email || !whatsapp || !cidade || !estado) {
    return NextResponse.json(
      { error: "Preencha nome, email, WhatsApp, cidade e estado." },
      { status: 400 }
    );
  }
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  try {
    const db = await getDb();
    await db.execute({
      sql: `INSERT INTO candidaturas_representante (nome, email, whatsapp, cidade, estado, mensagem)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [nome, email, whatsapp, cidade, estado, mensagem],
    });
  } catch (err) {
    console.error("Falha ao salvar candidatura:", err);
    return NextResponse.json(
      { error: "Não foi possível salvar. Tente novamente." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
