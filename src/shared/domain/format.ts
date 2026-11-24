import type { Foto, Tag } from './types';

export function formatPreco(value: number) {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

export function formatCep(value?: string | null) {
  const digits = (value ?? '').replace(/\D/g, '');
  if (digits.length !== 8) return value ?? '';
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return digits;
}

export function whatsappLink(number: string, nome: string) {
  const digits = number.replace(/\D/g, '');
  const full = digits.length <= 11 ? `55${digits}` : digits;
  const text = `Olá! Vi a ${nome} no rAPP São Carlos e gostaria de saber sobre vagas.`;
  return `https://wa.me/${full}?text=${encodeURIComponent(text)}`;
}

export function instagramLink(handle: string) {
  return `https://instagram.com/${handle.replace(/^@/, '')}`;
}

export function genderOf(tags: Tag[]) {
  return tags.find((tag) => tag.categoria === 'genero') ?? null;
}

export function featureTags(tags: Tag[]) {
  return tags.filter((tag) => tag.categoria !== 'genero');
}

export function capaOf(fotos: Foto[]) {
  return [...fotos].sort((a, b) => Number(b.ePrincipal) - Number(a.ePrincipal) || a.ordem - b.ordem)[0] ?? null;
}

export function formatDistancia(metros?: number | null) {
  if (metros == null) return '';
  if (metros < 1000) return `${metros} m`;
  return `${(metros / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km`;
}

export function mapaLink(latitude: number, longitude: number) {
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;
}
