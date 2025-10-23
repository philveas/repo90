// lib/placeholders.ts
import raw from "./placeholder-images.json";

type BaseItem = {
  id: string;
  description: string;
  imageHint?: string; // optional
  folder?: string;    // optional
};

// Original single-image shapes (still supported)
type FileItem = BaseItem & { file: string; imageUrl?: never; desktop?: never; mobile?: never };
type UrlItem  = BaseItem & { imageUrl: string; file?: never; desktop?: never; mobile?: never };

// New variant shape
type Variant = { file?: string; imageUrl?: string; width?: number; height?: number };
type VariantItem = BaseItem & { desktop?: Variant; mobile?: Variant; file?: never; imageUrl?: never };

type ImagePlaceholder = FileItem | UrlItem | VariantItem;
type Data = { placeholderImages: ImagePlaceholder[] };

const data = raw as Data;

// Default to local /images unless overridden via env
const PUBLIC_IMAGE_BASE = (process.env.NEXT_PUBLIC_IMAGE_BASE || "/images").replace(/\/+$/, "");

function joinUrl(base: string, folder: string | undefined, file: string) {
  const parts = [base];
  if (folder) parts.push(folder.replace(/^\/+|\/+$/g, ""));
  parts.push(file.replace(/^\/+/, ""));
  return parts.join("/");
}

export type ResolvedVariant = {
  src: string;
  width?: number;
  height?: number;
};

export type ResolvedImage = BaseItem & {
  // Fallback single URL (for legacy callers)
  imageUrl: string;
  // Optional responsive variants
  desktop?: ResolvedVariant;
  mobile?: ResolvedVariant;
};

function resolveVariant(folder: string | undefined, v?: Variant): ResolvedVariant | undefined {
  if (!v) return undefined;

  const src =
    v.imageUrl ??
    (v.file ? joinUrl(PUBLIC_IMAGE_BASE, folder, v.file) : undefined);

  if (!src) return undefined;

  // With exactOptionalPropertyTypes, omit keys when undefined
  return {
    src,
    ...(v.width !== undefined ? { width: v.width } : {}),
    ...(v.height !== undefined ? { height: v.height } : {}),
  };
}

export const PlaceholderImages: ResolvedImage[] = (data.placeholderImages || []).map((p) => {
  // Common base WITHOUT undefineds
  const base: Pick<ResolvedImage, "id" | "description"> &
    Partial<Pick<ResolvedImage, "imageHint" | "folder">> = {
    id: p.id,
    description: p.description,
    ...(p.imageHint !== undefined ? { imageHint: p.imageHint } : {}),
    ...(p.folder !== undefined ? { folder: p.folder } : {}),
  };

  // New: variant-aware entries
  if ("desktop" in p || "mobile" in p) {
    const desktop = resolveVariant(p.folder, (p as VariantItem).desktop);
    const mobile  = resolveVariant(p.folder, (p as VariantItem).mobile);
    const imageUrl = desktop?.src || mobile?.src;

    if (!imageUrl) {
      throw new Error(`Invalid placeholder entry for id "${p.id}": missing desktop/mobile src`);
    }

    return {
      ...base,
      imageUrl, // fallback for callers not using variants
      ...(desktop ? { desktop } : {}),
      ...(mobile ? { mobile } : {}),
    };
  }

  // Legacy: single file or imageUrl
  if ("imageUrl" in p && (p as UrlItem).imageUrl) {
    return {
      ...base,
      imageUrl: (p as UrlItem).imageUrl,
    };
  }

  if ("file" in p && (p as FileItem).file) {
    return {
      ...base,
      imageUrl: joinUrl(PUBLIC_IMAGE_BASE, p.folder, (p as FileItem).file),
    };
  }

  throw new Error(`Invalid placeholder entry for id "${p.id}": missing imageUrl or file`);
});

// ✅ Named export used across your app
export function getPlaceholder(id: string): ResolvedImage | undefined {
  return PlaceholderImages.find((p) => p.id === id);
}
