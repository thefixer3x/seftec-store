export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string
          id: string
          order_date: string | null
          shipping_address: string | null
          status: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: string
          order_date?: string | null
          shipping_address?: string | null
          status?: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: string
          order_date?: string | null
          shipping_address?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_insights: {
        Row: {
          confidence_score: number
          created_at: string | null
          expires_at: string | null
          id: string
          market_trend: string | null
          max_viable_price: number | null
          min_viable_price: number | null
          price_elasticity: number | null
          product_id: string
          reasoning: string | null
          suggested_price: number
        }
        Insert: {
          confidence_score: number
          created_at?: string | null
          expires_at?: string | null
          id?: string
          market_trend?: string | null
          max_viable_price?: number | null
          min_viable_price?: number | null
          price_elasticity?: number | null
          product_id: string
          reasoning?: string | null
          suggested_price: number
        }
        Update: {
          confidence_score?: number
          created_at?: string | null
          expires_at?: string | null
          id?: string
          market_trend?: string | null
          max_viable_price?: number | null
          min_viable_price?: number | null
          price_elasticity?: number | null
          product_id?: string
          reasoning?: string | null
          suggested_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "pricing_insights_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_embeddings: {
        Row: {
          created_at: string | null
          embedding: string | null
          id: string
          product_id: string
          text_content: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          product_id: string
          text_content: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          embedding?: string | null
          id?: string
          product_id?: string
          text_content?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_embeddings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          stock_quantity: number
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          stock_quantity?: number
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          stock_quantity?: number
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          business_type: string | null
          company_name: string | null
          created_at: string | null
          first_name: string | null
          id: string
          is_vendor: boolean | null
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          business_type?: string | null
          company_name?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          is_vendor?: boolean | null
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          business_type?: string | null
          company_name?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          is_vendor?: boolean | null
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          clicked: boolean | null
          created_at: string | null
          id: string
          product_id: string
          reason: string | null
          recommendation_type: string
          relevance_score: number
          supplier_id: string
          updated_at: string | null
          user_id: string
          viewed: boolean | null
        }
        Insert: {
          clicked?: boolean | null
          created_at?: string | null
          id?: string
          product_id: string
          reason?: string | null
          recommendation_type: string
          relevance_score: number
          supplier_id: string
          updated_at?: string | null
          user_id: string
          viewed?: boolean | null
        }
        Update: {
          clicked?: boolean | null
          created_at?: string | null
          id?: string
          product_id?: string
          reason?: string | null
          recommendation_type?: string
          relevance_score?: number
          supplier_id?: string
          updated_at?: string | null
          user_id?: string
          viewed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      risk_analysis: {
        Row: {
          created_at: string | null
          id: string
          is_flagged: boolean | null
          order_id: string | null
          review_status: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          risk_factors: Json | null
          risk_score: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_flagged?: boolean | null
          order_id?: string | null
          review_status?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          risk_factors?: Json | null
          risk_score: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_flagged?: boolean | null
          order_id?: string | null
          review_status?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          risk_factors?: Json | null
          risk_score?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risk_analysis_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risk_analysis_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      search_history: {
        Row: {
          category: string | null
          created_at: string | null
          filters: Json | null
          id: string
          results_count: number | null
          search_query: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          filters?: Json | null
          id?: string
          results_count?: number | null
          search_query: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          filters?: Json | null
          id?: string
          results_count?: number | null
          search_query?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
