export function linkWhatsapp(numero: string, mensagem?: string): string {
  const base = `https://wa.me/${numero}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export function linkInstagram(handle: string): string {
  return `https://instagram.com/${handle}`;
}

/** Hash simples e determinístico — usado só para variar o placeholder visual por string (cor, categoria...). */
export function hashHue(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}
