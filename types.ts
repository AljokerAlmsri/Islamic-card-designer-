
export type CardTheme = 
  | 'grad-emerald' | 'grad-navy' | 'grad-maroon' 
  | 'grad-gold' | 'grad-onyx' | 'grad-royal' 
  | 'grad-lavender' | 'grad-forest' | 'grad-sepia' 
  | 'grad-slate' | 'grad-ruby' | 'grad-ocean';

export type AspectRatio = '1:1' | '9:16' | '16:9' | '4:5';

export type ContentMode = 'quran' | 'hadith' | 'dua' | 'zikr' | 'other';

export type TextAlign = 'center' | 'right' | 'left';

export type FontFamily = 'font-amiri' | 'font-naskh' | 'font-zain';

export interface CardConfig {
  text: string;
  explanation: string; // الحقل الجديد
  source: string;
  instagram: string;
  theme: CardTheme;
  fontFamily: FontFamily;
  fontSize: number;
  lineHeight: number;
  textAlign: TextAlign;
  textColor: string;
  aspectRatio: AspectRatio;
  contentMode: ContentMode;
  overlayOpacity: number;
  borderWidth: number;
  patternOpacity: number;
  shadowStrength: number;
}
