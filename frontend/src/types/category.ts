export type Category = {
  id: number
  name: string
  slug: string
  parent_id: number | null
  created_at: string | null
  updated_at: string | null
  children?: Category[]
}
