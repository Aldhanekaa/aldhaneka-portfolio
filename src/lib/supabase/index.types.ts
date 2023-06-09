export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      certificates: {
        Row: {
          desc: string
          id: number
          img_src: string
          received_at: string
          title: string
        }
        Insert: {
          desc: string
          id?: number
          img_src: string
          received_at: string
          title: string
        }
        Update: {
          desc?: string
          id?: number
          img_src?: string
          received_at?: string
          title?: string
        }
      }
      journal_categories: {
        Row: {
          category_name: string
          id: number
        }
        Insert: {
          category_name: string
          id?: number
        }
        Update: {
          category_name?: string
          id?: number
        }
      }
      journal_posts: {
        Row: {
          category: string
          content: Json
          created_at: string
          desc: string
          home_pin: boolean
          id: string
          related_projects: Json[] | null
          tags: string[] | null
          thumbnail: string
          title: string
        }
        Insert: {
          category: string
          content: Json
          created_at?: string
          desc: string
          home_pin?: boolean
          id: string
          related_projects?: Json[] | null
          tags?: string[] | null
          thumbnail: string
          title: string
        }
        Update: {
          category?: string
          content?: Json
          created_at?: string
          desc?: string
          home_pin?: boolean
          id?: string
          related_projects?: Json[] | null
          tags?: string[] | null
          thumbnail?: string
          title?: string
        }
      }
      journal_tags: {
        Row: {
          id: number
          tag_name: string
        }
        Insert: {
          id?: number
          tag_name: string
        }
        Update: {
          id?: number
          tag_name?: string
        }
      }
      project_categories: {
        Row: {
          category_name: string
          id: number
        }
        Insert: {
          category_name: string
          id?: number
        }
        Update: {
          category_name?: string
          id?: number
        }
      }
      project_tags: {
        Row: {
          desc: string | null
          id: number
          tag_name: string
        }
        Insert: {
          desc?: string | null
          id?: number
          tag_name: string
        }
        Update: {
          desc?: string | null
          id?: number
          tag_name?: string
        }
      }
      projects: {
        Row: {
          category: string
          completed_at: string
          desc: string
          id: string
          links: Json | null
          medias: Json | null
          started_at: string | null
          tags: string[]
          thumbnail: string | null
          title: string
        }
        Insert: {
          category?: string
          completed_at: string
          desc: string
          id: string
          links?: Json | null
          medias?: Json | null
          started_at?: string | null
          tags: string[]
          thumbnail?: string | null
          title: string
        }
        Update: {
          category?: string
          completed_at?: string
          desc?: string
          id?: string
          links?: Json | null
          medias?: Json | null
          started_at?: string | null
          tags?: string[]
          thumbnail?: string | null
          title?: string
        }
      }
      projects_relations: {
        Row: {
          category: string | null
          desc: string | null
          parent: string | null
          relation_name: string
          tag: string | null
          tags: string[]
        }
        Insert: {
          category?: string | null
          desc?: string | null
          parent?: string | null
          relation_name: string
          tag?: string | null
          tags: string[]
        }
        Update: {
          category?: string | null
          desc?: string | null
          parent?: string | null
          relation_name?: string
          tag?: string | null
          tags?: string[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
