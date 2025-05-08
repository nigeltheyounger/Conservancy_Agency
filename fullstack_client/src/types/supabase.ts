export interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string
            created_at?: string
            updated_at?: string
            email?: string
            full_name?: string
            avatar_url?: string
          }
          Insert: {
            id: string
            created_at?: string
            updated_at?: string
            email?: string
            full_name?: string
            avatar_url?: string
          }
          Update: {
            id?: string
            created_at?: string
            updated_at?: string
            email?: string
            full_name?: string
            avatar_url?: string
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
    }
  }
  