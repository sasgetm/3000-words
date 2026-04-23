export type Word = {
  id: number
  word_en: string
  word_ru: string
  created_at: string | null
  updated_at: string | null
  pivot?: {
    category_id: number
    word_id: number
  }
}
