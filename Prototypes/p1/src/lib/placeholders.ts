import raw from './placeholder-images.json';

type BaseItem = {
  id: string;
  description: string;
  imageHint?: string;
  folder?: string;
};

type FileItem = BaseItem & { file: string; imageUrl?: never };
type UrlItem  = BaseItem & { imageUrl: string; file?: never };

type ImagePlaceholder = FileItem | UrlItem;
type Data = { placeholderImages: ImagePlaceholder[] };

const data = raw as Data;

// Default to local /images unless overridden via env
// e.g. NEXT_PUBLIC_IMAGE_BASE=https://cdn.example.com/assets
const PUBLIC_IMAGE_BASE = (process.env.NEXT_PUBLIC_IMAGE_BASE || '/images').replace(/\/+$/, '');

function joinUrl(base: string, folder: string | undefined, file: string) {
  const parts = [base];
  if (folder) parts.push(folder.replace(/^\/+|\/+$/g, ''));
  parts.push(file.replace(/^\/+/, ''));
  return parts.join('/');
}

export type ResolvedImage = BaseItem & { imageUrl: string };

export const PlaceholderImages: ResolvedImage[] = (data.placeholderImages || []).map((p) => {
  if ('imageUrl' in p && p.imageUrl) return { ...p, imageUrl: p.imageUrl };
  if ('file' in p && p.file) return { ...p, imageUrl: joinUrl(PUBLIC_IMAGE_BASE, p.folder, p.file) };
  throw new Error(`Invalid placeholder entry for id "${p.id}": missing imageUrl or file`);
});

export function getPlaceholder(id: string): ResolvedImage | undefined {
  return PlaceholderImages.find((p) => p.id === id);
}
