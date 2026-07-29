import type { Lang } from "../data/types";
import type { Copy } from "./en";
import en from "./en";
import ar from "./ar";

export const dictionaries: Record<Lang, Copy> = { en, ar };

export function getCopy(lang: Lang): Copy {
  return dictionaries[lang];
}
