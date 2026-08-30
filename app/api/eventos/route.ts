import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import { registrarEvento, TIPOS_EVENTO, type TipoEvento } from "@/lib/metrics/events";

function textoOuIndefinido(valor: unknown, max = 200): string | undefined {
  return typeof valor === "string" && valor.trim() ? valor.trim().slice(0, max) : undefined;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const tipo = body.tipo;
  if (typeof tipo !== "string" || !TIPOS_EVENTO.includes(tipo as TipoEvento)) {
    return NextResponse.json({ error: "tipo de evento inválido" }, { status: 400 });
  }

  // Fora da Vercel (dev local, outro host) isso volta tudo `undefined` —
  // não quebra, só fica sem o dado de região.
  const { city, country, countryRegion, postalCode, latitude, longitude } =
    geolocation(request);

  try {
    await registrarEvento({
      tipo: tipo as TipoEvento,
      pagina: textoOuIndefinido(body.pagina),
      produtoSlug: textoOuIndefinido(body.produtoSlug),
      produtoNome: textoOuIndefinido(body.produtoNome),
      representanteId: textoOuIndefinido(body.representanteId),
      representanteNome: textoOuIndefinido(body.representanteNome),
      detalhe: textoOuIndefinido(body.detalhe, 300),
      origem: textoOuIndefinido(body.origem),
      sessaoId: textoOuIndefinido(body.sessaoId, 64),
      geoPais: country,
      geoEstado: countryRegion,
      geoCidade: city,
      geoCep: postalCode,
      geoLat: latitude,
      geoLon: longitude,
    });
  } catch (err) {
    console.error("Falha ao registrar evento de métrica:", err);
    return NextResponse.json({ error: "falha ao registrar" }, { status: 500 });
  }

  // 204: o beacon não precisa de corpo de resposta, e nunca deve travar a UI.
  return new NextResponse(null, { status: 204 });
}
