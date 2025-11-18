export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ai_chat_sessions: {
        Row: {
          ai_model: string
          created_at: string
          id: string
          messages: Json
          session_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_model?: string
          created_at?: string
          id?: string
          messages?: Json
          session_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_model?: string
          created_at?: string
          id?: string
          messages?: Json
          session_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_recommendations: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          product_id: string | null
          reason: string | null
          recommendation_type: string | null
          score: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          product_id?: string | null
          reason?: string | null
          recommendation_type?: string | null
          score?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          product_id?: string | null
          reason?: string | null
          recommendation_type?: string | null
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_recommendations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_response_cache: {
        Row: {
          created_at: string
          expires_at: string | null
          hit_count: number | null
          id: string
          model_used: string
          prompt: string
          prompt_hash: string
          response: string
          tokens_used: number | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          hit_count?: number | null
          id?: string
          model_used: string
          prompt: string
          prompt_hash: string
          response: string
          tokens_used?: number | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          hit_count?: number | null
          id?: string
          model_used?: string
          prompt?: string
          prompt_hash?: string
          response?: string
          tokens_used?: number | null
        }
        Relationships: []
      }
      ai_usage_logs: {
        Row: {
          created_at: string
          estimated_cost: number | null
          feedback_text: string | null
          id: string
          model_used: string
          prompt: string
          query_complexity: string
          response_time_ms: number | null
          tokens_used: number | null
          user_feedback: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          estimated_cost?: number | null
          feedback_text?: string | null
          id?: string
          model_used: string
          prompt: string
          query_complexity: string
          response_time_ms?: number | null
          tokens_used?: number | null
          user_feedback?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          estimated_cost?: number | null
          feedback_text?: string | null
          id?: string
          model_used?: string
          prompt?: string
          query_complexity?: string
          response_time_ms?: number | null
          tokens_used?: number | null
          user_feedback?: number | null
          user_id?: string
        }
        Relationships: []
      }
      beneficiaries: {
        Row: {
          account_number: string
          bank_code: string
          category: string | null
          created_at: string
          id: string
          is_archived: boolean | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_number: string
          bank_code: string
          category?: string | null
          created_at?: string
          id?: string
          is_archived?: boolean | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_number?: string
          bank_code?: string
          category?: string | null
          created_at?: string
          id?: string
          is_archived?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bulk_payments: {
        Row: {
          created_at: string
          currency_code: string
          id: string
          last_error: string | null
          modified_by: string | null
          processed_at: string | null
          scheduled_date: string | null
          status: Database["public"]["Enums"]["payment_status"]
          title: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency_code?: string
          id?: string
          last_error?: string | null
          modified_by?: string | null
          processed_at?: string | null
          scheduled_date?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          title: string
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency_code?: string
          id?: string
          last_error?: string | null
          modified_by?: string | null
          processed_at?: string | null
          scheduled_date?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          title?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      business_financial_insights: {
        Row: {
          acknowledged_at: string | null
          action_items: Json | null
          completed_at: string | null
          consent_id: string | null
          created_at: string | null
          description: string
          due_date: string | null
          id: string
          impact_score: number | null
          insight_type: string
          potential_savings: number | null
          priority_level: string | null
          recommendation: string | null
          status: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          action_items?: Json | null
          completed_at?: string | null
          consent_id?: string | null
          created_at?: string | null
          description: string
          due_date?: string | null
          id?: string
          impact_score?: number | null
          insight_type: string
          potential_savings?: number | null
          priority_level?: string | null
          recommendation?: string | null
          status?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          action_items?: Json | null
          completed_at?: string | null
          consent_id?: string | null
          created_at?: string | null
          description?: string
          due_date?: string | null
          id?: string
          impact_score?: number | null
          insight_type?: string
          potential_savings?: number | null
          priority_level?: string | null
          recommendation?: string | null
          status?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_financial_insights_consent_id_fkey"
            columns: ["consent_id"]
            isOneToOne: false
            referencedRelation: "edoc_consents"
            referencedColumns: ["id"]
          },
        ]
      }
      business_profiles: {
        Row: {
          address: Json | null
          business_name: string | null
          business_type: string | null
          contact_info: Json | null
          created_at: string | null
          edoc_markup_pct: number | null
          id: string
          registration_number: string | null
          tax_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: Json | null
          business_name?: string | null
          business_type?: string | null
          contact_info?: Json | null
          created_at?: string | null
          edoc_markup_pct?: number | null
          id?: string
          registration_number?: string | null
          tax_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: Json | null
          business_name?: string | null
          business_type?: string | null
          contact_info?: Json | null
          created_at?: string | null
          edoc_markup_pct?: number | null
          id?: string
          registration_number?: string | null
          tax_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      edoc_consents: {
        Row: {
          account_name: string | null
          account_number_masked: string | null
          bank_code: string | null
          bank_name: string
          business_profile_id: string | null
          consent_status: string
          consent_url: string | null
          created_at: string | null
          edoc_consent_id: string | null
          error_message: string | null
          expires_at: string | null
          id: string
          import_complete: boolean | null
          last_sync_at: string | null
          raw_response: Json | null
          redirect_url: string | null
          sync_frequency: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_name?: string | null
          account_number_masked?: string | null
          bank_code?: string | null
          bank_name: string
          business_profile_id?: string | null
          consent_status?: string
          consent_url?: string | null
          created_at?: string | null
          edoc_consent_id?: string | null
          error_message?: string | null
          expires_at?: string | null
          id?: string
          import_complete?: boolean | null
          last_sync_at?: string | null
          raw_response?: Json | null
          redirect_url?: string | null
          sync_frequency?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_name?: string | null
          account_number_masked?: string | null
          bank_code?: string | null
          bank_name?: string
          business_profile_id?: string | null
          consent_status?: string
          consent_url?: string | null
          created_at?: string | null
          edoc_consent_id?: string | null
          error_message?: string | null
          expires_at?: string | null
          id?: string
          import_complete?: boolean | null
          last_sync_at?: string | null
          raw_response?: Json | null
          redirect_url?: string | null
          sync_frequency?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "edoc_consents_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      edoc_financial_analysis: {
        Row: {
          analysis_data: Json
          analysis_period_end: string
          analysis_period_start: string
          analysis_type: string
          confidence_score: number | null
          consent_id: string | null
          created_at: string | null
          id: string
          insights: Json | null
          recommendations: Json | null
        }
        Insert: {
          analysis_data: Json
          analysis_period_end: string
          analysis_period_start: string
          analysis_type: string
          confidence_score?: number | null
          consent_id?: string | null
          created_at?: string | null
          id?: string
          insights?: Json | null
          recommendations?: Json | null
        }
        Update: {
          analysis_data?: Json
          analysis_period_end?: string
          analysis_period_start?: string
          analysis_type?: string
          confidence_score?: number | null
          consent_id?: string | null
          created_at?: string | null
          id?: string
          insights?: Json | null
          recommendations?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "edoc_financial_analysis_consent_id_fkey"
            columns: ["consent_id"]
            isOneToOne: false
            referencedRelation: "edoc_consents"
            referencedColumns: ["id"]
          },
        ]
      }
      edoc_transactions: {
        Row: {
          amount: number
          category: string | null
          confidence_score: number | null
          consent_id: string | null
          created_at: string | null
          edoc_transaction_id: string | null
          id: string
          is_credit: boolean
          merchant_name: string | null
          narration: string | null
          raw_data: Json | null
          reference_number: string | null
          running_balance: number | null
          subcategory: string | null
          tags: string[] | null
          transaction_date: string
          transaction_type: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          confidence_score?: number | null
          consent_id?: string | null
          created_at?: string | null
          edoc_transaction_id?: string | null
          id?: string
          is_credit: boolean
          merchant_name?: string | null
          narration?: string | null
          raw_data?: Json | null
          reference_number?: string | null
          running_balance?: number | null
          subcategory?: string | null
          tags?: string[] | null
          transaction_date: string
          transaction_type?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          confidence_score?: number | null
          consent_id?: string | null
          created_at?: string | null
          edoc_transaction_id?: string | null
          id?: string
          is_credit?: boolean
          merchant_name?: string | null
          narration?: string | null
          raw_data?: Json | null
          reference_number?: string | null
          running_balance?: number | null
          subcategory?: string | null
          tags?: string[] | null
          transaction_date?: string
          transaction_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "edoc_transactions_consent_id_fkey"
            columns: ["consent_id"]
            isOneToOne: false
            referencedRelation: "edoc_consents"
            referencedColumns: ["id"]
          },
        ]
      }
      edoc_usage_logs: {
        Row: {
          api_calls_count: number | null
          consent_id: string | null
          cost_usd: number | null
          created_at: string | null
          id: string
          markup_applied: number | null
          operation_type: string
          total_cost_usd: number | null
          usage_date: string
          user_id: string | null
        }
        Insert: {
          api_calls_count?: number | null
          consent_id?: string | null
          cost_usd?: number | null
          created_at?: string | null
          id?: string
          markup_applied?: number | null
          operation_type: string
          total_cost_usd?: number | null
          usage_date?: string
          user_id?: string | null
        }
        Update: {
          api_calls_count?: number | null
          consent_id?: string | null
          cost_usd?: number | null
          created_at?: string | null
          id?: string
          markup_applied?: number | null
          operation_type?: string
          total_cost_usd?: number | null
          usage_date?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "edoc_usage_logs_consent_id_fkey"
            columns: ["consent_id"]
            isOneToOne: false
            referencedRelation: "edoc_consents"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_flags: {
        Row: {
          created_at: string | null
          description: string | null
          enabled: boolean | null
          name: string
          rollout_pct: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          name: string
          rollout_pct?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          name?: string
          rollout_pct?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      marketplace_bids: {
        Row: {
          amount: number
          bidder_id: string
          created_at: string
          expires_at: string | null
          id: string
          message: string | null
          product_id: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          bidder_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          message?: string | null
          product_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          bidder_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          message?: string | null
          product_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_bids_bidder_id_fkey"
            columns: ["bidder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_bids_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_transactions: {
        Row: {
          amount: number
          buyer_id: string | null
          created_at: string
          id: string
          order_id: string | null
          platform_fee: number
          seller_amount: number
          seller_id: string | null
          status: string
          stripe_charge_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          buyer_id?: string | null
          created_at?: string
          id?: string
          order_id?: string | null
          platform_fee: number
          seller_amount: number
          seller_id?: string | null
          status?: string
          stripe_charge_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          buyer_id?: string | null
          created_at?: string
          id?: string
          order_id?: string | null
          platform_fee?: number
          seller_amount?: number
          seller_id?: string | null
          status?: string
          stripe_charge_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          created_at: string
          error_enabled: boolean
          id: string
          info_enabled: boolean
          success_enabled: boolean
          updated_at: string
          user_id: string
          warning_enabled: boolean
        }
        Insert: {
          created_at?: string
          error_enabled?: boolean
          id?: string
          info_enabled?: boolean
          success_enabled?: boolean
          updated_at?: string
          user_id: string
          warning_enabled?: boolean
        }
        Update: {
          created_at?: string
          error_enabled?: boolean
          id?: string
          info_enabled?: boolean
          success_enabled?: boolean
          updated_at?: string
          user_id?: string
          warning_enabled?: boolean
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_read: boolean
          message: string
          notification_group: string | null
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message: string
          notification_group?: string | null
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message?: string
          notification_group?: string | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
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
      payment_audit: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string
          new_status: Database["public"]["Enums"]["payment_status"] | null
          old_status: Database["public"]["Enums"]["payment_status"] | null
          payment_id: string
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["payment_status"] | null
          old_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_id: string
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["payment_status"] | null
          old_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_id?: string
        }
        Relationships: []
      }
      payment_items: {
        Row: {
          amount: number
          beneficiary_id: string
          bulk_payment_id: string
          created_at: string
          currency_code: string
          description: string | null
          error_message: string | null
          id: string
          processed_at: string | null
          retry_count: number | null
          status: Database["public"]["Enums"]["payment_status"]
        }
        Insert: {
          amount: number
          beneficiary_id: string
          bulk_payment_id: string
          created_at?: string
          currency_code?: string
          description?: string | null
          error_message?: string | null
          id?: string
          processed_at?: string | null
          retry_count?: number | null
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Update: {
          amount?: number
          beneficiary_id?: string
          bulk_payment_id?: string
          created_at?: string
          currency_code?: string
          description?: string | null
          error_message?: string | null
          id?: string
          processed_at?: string | null
          retry_count?: number | null
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "payment_items_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_items_bulk_payment_id_fkey"
            columns: ["bulk_payment_id"]
            isOneToOne: false
            referencedRelation: "bulk_payments"
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
      product_reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          order_id: string | null
          product_id: string
          rating: number
          title: string | null
          updated_at: string
          user_id: string
          verified_purchase: boolean | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          order_id?: string | null
          product_id: string
          rating: number
          title?: string | null
          updated_at?: string
          user_id: string
          verified_purchase?: boolean | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          order_id?: string | null
          product_id?: string
          rating?: number
          title?: string | null
          updated_at?: string
          user_id?: string
          verified_purchase?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_product_id_fkey"
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
          email: string | null
          first_name: string | null
          full_name: string | null
          id: string
          is_vendor: boolean | null
          last_name: string | null
          stripe_customer_id: string | null
          subscription_tier: string | null
          updated_at: string | null
        }
        Insert: {
          business_type?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          is_vendor?: boolean | null
          last_name?: string | null
          stripe_customer_id?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          business_type?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          is_vendor?: boolean | null
          last_name?: string | null
          stripe_customer_id?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      query_classifications: {
        Row: {
          actual_complexity: string | null
          classified_complexity: string
          created_at: string
          feedback_score: number | null
          id: string
          prompt: string
          tokens_used: number | null
          was_escalated: boolean | null
        }
        Insert: {
          actual_complexity?: string | null
          classified_complexity: string
          created_at?: string
          feedback_score?: number | null
          id?: string
          prompt: string
          tokens_used?: number | null
          was_escalated?: boolean | null
        }
        Update: {
          actual_complexity?: string | null
          classified_complexity?: string
          created_at?: string
          feedback_score?: number | null
          id?: string
          prompt?: string
          tokens_used?: number | null
          was_escalated?: boolean | null
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
      stripe_connect_accounts: {
        Row: {
          created_at: string
          id: string
          onboarding_complete: boolean
          stripe_account_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          onboarding_complete?: boolean
          stripe_account_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          onboarding_complete?: boolean
          stripe_account_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_name: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      system_error_logs: {
        Row: {
          created_at: string | null
          error_context: Json | null
          error_message: string
          id: string
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          source: string | null
        }
        Insert: {
          created_at?: string | null
          error_context?: Json | null
          error_message: string
          id?: string
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string | null
          error_context?: Json | null
          error_message?: string
          id?: string
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          source?: string | null
        }
        Relationships: []
      }
      user_activity_logs: {
        Row: {
          action_data: Json | null
          action_type: string
          ai_processed: boolean | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action_data?: Json | null
          action_type: string
          ai_processed?: boolean | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action_data?: Json | null
          action_type?: string
          ai_processed?: boolean | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_consents: {
        Row: {
          consent_type: string
          created_at: string | null
          granted: boolean | null
          granted_at: string | null
          id: string
          ip_address: unknown
          revoked_at: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          consent_type: string
          created_at?: string | null
          granted?: boolean | null
          granted_at?: string | null
          id?: string
          ip_address?: unknown
          revoked_at?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          consent_type?: string
          created_at?: string | null
          granted?: boolean | null
          granted_at?: string | null
          id?: string
          ip_address?: unknown
          revoked_at?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          business_size: string | null
          created_at: string
          id: string
          industry_focus: string[] | null
          payment_methods: string[] | null
          preferred_currencies: string[] | null
          regions_of_interest: string[] | null
          risk_tolerance: string | null
          trade_frequency: string | null
          trade_volume: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          business_size?: string | null
          created_at?: string
          id?: string
          industry_focus?: string[] | null
          payment_methods?: string[] | null
          preferred_currencies?: string[] | null
          regions_of_interest?: string[] | null
          risk_tolerance?: string | null
          trade_frequency?: string | null
          trade_volume?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          business_size?: string | null
          created_at?: string
          id?: string
          industry_focus?: string[] | null
          payment_methods?: string[] | null
          preferred_currencies?: string[] | null
          regions_of_interest?: string[] | null
          risk_tolerance?: string | null
          trade_frequency?: string | null
          trade_volume?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_product_interactions: {
        Row: {
          created_at: string | null
          id: string
          interaction_data: Json | null
          interaction_type: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_data?: Json | null
          interaction_type: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_data?: Json | null
          interaction_type?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_product_interactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          device_info: Json | null
          id: string
          ip_address: string | null
          last_active: string
          user_id: string
        }
        Insert: {
          created_at?: string
          device_info?: Json | null
          id?: string
          ip_address?: string | null
          last_active?: string
          user_id: string
        }
        Update: {
          created_at?: string
          device_info?: Json | null
          id?: string
          ip_address?: string | null
          last_active?: string
          user_id?: string
        }
        Relationships: []
      }
      user_tiers: {
        Row: {
          can_use_advanced_models: boolean
          created_at: string
          expires_at: string | null
          id: string
          max_queries_per_day: number
          tier_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          can_use_advanced_models?: boolean
          created_at?: string
          expires_at?: string | null
          id?: string
          max_queries_per_day?: number
          tier_name?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          can_use_advanced_models?: boolean
          created_at?: string
          expires_at?: string | null
          id?: string
          max_queries_per_day?: number
          tier_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vendor_billing_records: {
        Row: {
          base_cost: number | null
          billing_period_end: string
          billing_period_start: string
          created_at: string | null
          currency: string | null
          discount_amount: number | null
          id: string
          invoice_number: string | null
          invoice_url: string | null
          overage_cost: number | null
          paid_at: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: string | null
          tax_amount: number | null
          total_amount: number | null
          total_compute_hours: number | null
          total_requests: number | null
          total_tokens: number | null
          updated_at: string | null
          usage_cost: number | null
          vendor_org_id: string
        }
        Insert: {
          base_cost?: number | null
          billing_period_end: string
          billing_period_start: string
          created_at?: string | null
          currency?: string | null
          discount_amount?: number | null
          id?: string
          invoice_number?: string | null
          invoice_url?: string | null
          overage_cost?: number | null
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          tax_amount?: number | null
          total_amount?: number | null
          total_compute_hours?: number | null
          total_requests?: number | null
          total_tokens?: number | null
          updated_at?: string | null
          usage_cost?: number | null
          vendor_org_id: string
        }
        Update: {
          base_cost?: number | null
          billing_period_end?: string
          billing_period_start?: string
          created_at?: string | null
          currency?: string | null
          discount_amount?: number | null
          id?: string
          invoice_number?: string | null
          invoice_url?: string | null
          overage_cost?: number | null
          paid_at?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          tax_amount?: number | null
          total_amount?: number | null
          total_compute_hours?: number | null
          total_requests?: number | null
          total_tokens?: number | null
          updated_at?: string | null
          usage_cost?: number | null
          vendor_org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_billing_records_vendor_org_id_fkey"
            columns: ["vendor_org_id"]
            isOneToOne: false
            referencedRelation: "vendor_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_organizations: {
        Row: {
          billing_address: Json | null
          billing_model: string | null
          billing_tier: string | null
          business_registration: string | null
          compliance_requirements: Json | null
          contact_email: string
          contact_name: string | null
          created_at: string | null
          created_by: string | null
          credit_balance: number | null
          currency: string | null
          data_retention_days: number | null
          id: string
          monthly_limit: number | null
          monthly_spend_limit: number | null
          organization_name: string
          organization_type: string
          platform_access: Json | null
          privacy_level: string | null
          rate_limit_per_minute: number | null
          service_permissions: Json | null
          status: string | null
          tax_id: string | null
          trial_ends_at: string | null
          updated_at: string | null
          vendor_code: string
          website_url: string | null
        }
        Insert: {
          billing_address?: Json | null
          billing_model?: string | null
          billing_tier?: string | null
          business_registration?: string | null
          compliance_requirements?: Json | null
          contact_email: string
          contact_name?: string | null
          created_at?: string | null
          created_by?: string | null
          credit_balance?: number | null
          currency?: string | null
          data_retention_days?: number | null
          id?: string
          monthly_limit?: number | null
          monthly_spend_limit?: number | null
          organization_name: string
          organization_type: string
          platform_access?: Json | null
          privacy_level?: string | null
          rate_limit_per_minute?: number | null
          service_permissions?: Json | null
          status?: string | null
          tax_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          vendor_code: string
          website_url?: string | null
        }
        Update: {
          billing_address?: Json | null
          billing_model?: string | null
          billing_tier?: string | null
          business_registration?: string | null
          compliance_requirements?: Json | null
          contact_email?: string
          contact_name?: string | null
          created_at?: string | null
          created_by?: string | null
          credit_balance?: number | null
          currency?: string | null
          data_retention_days?: number | null
          id?: string
          monthly_limit?: number | null
          monthly_spend_limit?: number | null
          organization_name?: string
          organization_type?: string
          platform_access?: Json | null
          privacy_level?: string | null
          rate_limit_per_minute?: number | null
          service_permissions?: Json | null
          status?: string | null
          tax_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          vendor_code?: string
          website_url?: string | null
        }
        Relationships: []
      }
      vendor_platform_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          ip_address: unknown
          is_active: boolean | null
          last_activity_at: string | null
          mfa_verified_at: string | null
          platform: string
          requires_mfa: boolean | null
          session_metadata: Json | null
          session_token: string
          user_agent: string | null
          user_id: string | null
          vendor_org_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown
          is_active?: boolean | null
          last_activity_at?: string | null
          mfa_verified_at?: string | null
          platform: string
          requires_mfa?: boolean | null
          session_metadata?: Json | null
          session_token: string
          user_agent?: string | null
          user_id?: string | null
          vendor_org_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown
          is_active?: boolean | null
          last_activity_at?: string | null
          mfa_verified_at?: string | null
          platform?: string
          requires_mfa?: boolean | null
          session_metadata?: Json | null
          session_token?: string
          user_agent?: string | null
          user_id?: string | null
          vendor_org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_platform_sessions_vendor_org_id_fkey"
            columns: ["vendor_org_id"]
            isOneToOne: false
            referencedRelation: "vendor_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_usage_logs: {
        Row: {
          api_key_id: string | null
          billing_tier: string | null
          compute_units: number | null
          cost_amount: number | null
          cost_currency: string | null
          endpoint: string | null
          error_message: string | null
          id: string
          ip_address: unknown
          method: string | null
          platform: string
          processed_at: string | null
          processing_time_ms: number | null
          request_id: string
          request_metadata: Json | null
          request_size_bytes: number | null
          request_timestamp: string | null
          response_metadata: Json | null
          response_size_bytes: number | null
          service: string
          status_code: number | null
          success: boolean | null
          tokens_consumed: number | null
          user_agent: string | null
          vendor_org_id: string
        }
        Insert: {
          api_key_id?: string | null
          billing_tier?: string | null
          compute_units?: number | null
          cost_amount?: number | null
          cost_currency?: string | null
          endpoint?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown
          method?: string | null
          platform: string
          processed_at?: string | null
          processing_time_ms?: number | null
          request_id: string
          request_metadata?: Json | null
          request_size_bytes?: number | null
          request_timestamp?: string | null
          response_metadata?: Json | null
          response_size_bytes?: number | null
          service: string
          status_code?: number | null
          success?: boolean | null
          tokens_consumed?: number | null
          user_agent?: string | null
          vendor_org_id: string
        }
        Update: {
          api_key_id?: string | null
          billing_tier?: string | null
          compute_units?: number | null
          cost_amount?: number | null
          cost_currency?: string | null
          endpoint?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown
          method?: string | null
          platform?: string
          processed_at?: string | null
          processing_time_ms?: number | null
          request_id?: string
          request_metadata?: Json | null
          request_size_bytes?: number | null
          request_timestamp?: string | null
          response_metadata?: Json | null
          response_size_bytes?: number | null
          service?: string
          status_code?: number | null
          success?: boolean | null
          tokens_consumed?: number | null
          user_agent?: string | null
          vendor_org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_usage_logs_vendor_org_id_fkey"
            columns: ["vendor_org_id"]
            isOneToOne: false
            referencedRelation: "vendor_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      virtual_cards: {
        Row: {
          card_id: string | null
          cardholder_id: string | null
          created_at: string
          id: string
          is_locked: boolean
          last4: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          card_id?: string | null
          cardholder_id?: string | null
          created_at?: string
          id?: string
          is_locked?: boolean
          last4?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          card_id?: string | null
          cardholder_id?: string | null
          created_at?: string
          id?: string
          is_locked?: boolean
          last4?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      vortex_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          description: string | null
          id: string
          metadata: Json | null
          reference: string | null
          status: string
          type: string
          updated_at: string
          user_id: string
          wallet_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          reference?: string | null
          status?: string
          type: string
          updated_at?: string
          user_id: string
          wallet_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          reference?: string | null
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vortex_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "vortex_wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      vortex_wallets: {
        Row: {
          balance: number
          created_at: string
          currency: string
          id: string
          is_active: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      categorize_transaction: {
        Args: { p_amount: number; p_is_credit: boolean; p_narration: string }
        Returns: {
          category: string
          confidence: number
          subcategory: string
        }[]
      }
      cleanup_expired_recommendations: { Args: never; Returns: undefined }
      generate_vendor_api_key: {
        Args: {
          p_environment?: string
          p_key_name?: string
          p_key_type?: string
          p_vendor_org_id: string
        }
        Returns: {
          api_key_record_id: string
          key_id: string
          key_secret: string
        }[]
      }
      get_cash_flow_summary: {
        Args: { p_consent_id: string; p_days_back?: number }
        Returns: {
          avg_daily_balance: number
          net_flow: number
          period_end: string
          period_start: string
          total_inflow: number
          total_outflow: number
          transaction_count: number
        }[]
      }
      get_product_image_url: { Args: { image_path: string }; Returns: string }
      get_vendor_usage_summary: {
        Args: {
          p_end_date?: string
          p_start_date?: string
          p_vendor_org_id: string
        }
        Returns: {
          platform_breakdown: Json
          service_breakdown: Json
          successful_requests: number
          total_cost: number
          total_requests: number
          total_tokens: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hybrid_search_memories: {
        Args: {
          keyword_weight?: number
          match_count?: number
          min_similarity?: number
          p_memory_types?: string[]
          p_organization_id?: string
          p_tags?: string[]
          p_user_id?: string
          query_embedding: string
          query_text: string
          semantic_weight?: number
        }
        Returns: {
          access_count: number
          combined_score: number
          content: string
          created_at: string
          id: string
          keyword_rank: number
          metadata: Json
          organization_id: string
          semantic_similarity: number
          summary: string
          tags: string[]
          title: string
          topic_id: string
          type: string
          user_id: string
        }[]
      }
      is_admin: { Args: never; Returns: boolean }
      is_owner: { Args: { bulk_id: string }; Returns: boolean }
      keyword_search_memories: {
        Args: {
          match_count?: number
          p_memory_types?: string[]
          p_organization_id?: string
          p_tags?: string[]
          p_topic_id?: string
          p_user_id?: string
          query_text: string
        }
        Returns: {
          access_count: number
          content: string
          created_at: string
          headline: string
          id: string
          metadata: Json
          organization_id: string
          rank: number
          summary: string
          tags: string[]
          title: string
          topic_id: string
          type: string
          user_id: string
        }[]
      }
      log_search_analytics: {
        Args: {
          p_avg_similarity?: number
          p_distance_metric: string
          p_execution_time_ms: number
          p_filters: Json
          p_organization_id: string
          p_query_text: string
          p_results_count: number
          p_search_type: string
          p_top_similarity?: number
          p_user_id: string
        }
        Returns: string
      }
      log_vendor_usage: {
        Args: {
          p_api_key_id: string
          p_platform: string
          p_processing_time_ms?: number
          p_request_id: string
          p_service: string
          p_status_code?: number
          p_success?: boolean
          p_tokens_consumed?: number
          p_vendor_org_id: string
        }
        Returns: string
      }
      match_memories: {
        Args: {
          match_count?: number
          match_threshold?: number
          p_organization_id?: string
          p_user_id?: string
          query_embedding: string
        }
        Returns: {
          content: string
          created_at: string
          id: string
          similarity: number
          tags: string[]
          title: string
          type: string
        }[]
      }
      match_memories_advanced: {
        Args: {
          distance_metric?: string
          include_archived?: boolean
          match_count?: number
          match_threshold?: number
          p_memory_types?: string[]
          p_organization_id?: string
          p_tags?: string[]
          p_topic_id?: string
          p_user_id?: string
          query_embedding: string
        }
        Returns: {
          access_count: number
          content: string
          created_at: string
          distance: number
          id: string
          metadata: Json
          organization_id: string
          similarity: number
          summary: string
          tags: string[]
          title: string
          topic_id: string
          type: string
          updated_at: string
          user_id: string
        }[]
      }
      register_user_with_org: {
        Args: {
          p_email: string
          p_organization_id: string
          p_organization_name: string
          p_password_hash: string
          p_plan?: string
          p_role?: string
          p_timestamp?: string
          p_user_id: string
        }
        Returns: {
          organization_id: string
          user_id: string
        }[]
      }
      request_password_reset: { Args: { email: string }; Returns: boolean }
      update_memory_access: { Args: { memory_id: string }; Returns: undefined }
      validate_vendor_api_key: {
        Args: { p_key_id: string; p_key_secret: string }
        Returns: {
          allowed_platforms: Json
          allowed_services: Json
          is_valid: boolean
          rate_limit: number
          vendor_code: string
          vendor_org_id: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      payment_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "canceled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      payment_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "canceled",
      ],
    },
  },
} as const
