export type JwtPayloadData = {
  payload: {
    exp: number;
    id: number;
  };
  protectedHeader: {
    alg: string;
    typ?: string;
  };
};

export type AvailableTranslation = {
  name: string;
  language: string;
  full_name: string;
  seo_name: string;
  regional_name: string;
  ot_name: string;
  nt_name: string;
  year: string;
  license: string;
  description: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  name: string;
  photo_url: string;
  is_activated: boolean;
  bio: string;
  created_at: string;
  updated_at: string;
  preference: {
    id: number;
    user_id: number;
    dark_mode: boolean;
    theme: string | null;
    preferred_translation: string | null;
    font_size: number;
    font_family: number;
    margin_size: number;
    use_abrbeviations_for_nav: boolean;
  };
};

export enum Testament {
  Old = 'OldTestament',
  New = 'NewTestament',
}

export type BibleBook = {
  book_id: number;
  book: string;
  book_name: string;
  abbreviation: string;
  testament: Testament;
  testament_name: string;
};

export type BibleBookConstant = {
  book: string;
  abbreviation: string;
  chapters: number;
  verses: number;
};

export type Verse = {
  translation: string;
  book: string;
  abbreviation: string;
  book_name: string;
  chapter: number;
  verse_number: number;
  verse: string;
};

export type BibleReference = {
  book: string;
  chapter: number | null;
  verse: number | null;
};

export type ParallelTranslationResponse = {
  source_translation: string;
  parallel_translations: string[];
};

export type TranslationInfo = {
  name: string;
  language: string;
  full_name: string;
  seo_name: string;
  regional_name: string;
  ot_name: string;
  nt_name: string;
  year: string;
  license: string;
  description: string;
};
