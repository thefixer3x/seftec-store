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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      capability_tiers: {
        Row: {
          cards_enabled: boolean | null
          created_at: string | null
          daily_transfer_limit: number | null
          display_name: string
          id: string
          kyc_enabled: boolean | null
          monthly_fee: number | null
          monthly_volume_limit: number | null
          payments_enabled: boolean | null
          per_transfer_limit: number | null
          requests_per_hour: number | null
          requests_per_minute: number | null
          tier_name: string
          transaction_fee_cap: number | null
          transaction_fee_percent: number | null
          transfers_enabled: boolean | null
          wallet_enabled: boolean | null
        }
        Insert: {
          cards_enabled?: boolean | null
          created_at?: string | null
          daily_transfer_limit?: number | null
          display_name: string
          id?: string
          kyc_enabled?: boolean | null
          monthly_fee?: number | null
          monthly_volume_limit?: number | null
          payments_enabled?: boolean | null
          per_transfer_limit?: number | null
          requests_per_hour?: number | null
          requests_per_minute?: number | null
          tier_name: string
          transaction_fee_cap?: number | null
          transaction_fee_percent?: number | null
          transfers_enabled?: boolean | null
          wallet_enabled?: boolean | null
        }
        Update: {
          cards_enabled?: boolean | null
          created_at?: string | null
          daily_transfer_limit?: number | null
          display_name?: string
          id?: string
          kyc_enabled?: boolean | null
          monthly_fee?: number | null
          monthly_volume_limit?: number | null
          payments_enabled?: boolean | null
          per_transfer_limit?: number | null
          requests_per_hour?: number | null
          requests_per_minute?: number | null
          tier_name?: string
          transaction_fee_cap?: number | null
          transaction_fee_percent?: number | null
          transfers_enabled?: boolean | null
          wallet_enabled?: boolean | null
        }
        Relationships: []
      }
      project_capabilities: {
        Row: {
          allowed_currencies: string[] | null
          cards_enabled: boolean | null
          created_at: string | null
          daily_payment_limit: number | null
          daily_transfer_limit: number | null
          id: string
          kyc_enabled: boolean | null
          kyc_types: string[] | null
          monthly_volume_limit: number | null
          payments_enabled: boolean | null
          per_payment_limit: number | null
          per_transfer_limit: number | null
          project_id: string
          requests_per_hour: number | null
          requests_per_minute: number | null
          tier: string | null
          transfers_enabled: boolean | null
          updated_at: string | null
          wallet_enabled: boolean | null
          webhooks_enabled: boolean | null
        }
        Insert: {
          allowed_currencies?: string[] | null
          cards_enabled?: boolean | null
          created_at?: string | null
          daily_payment_limit?: number | null
          daily_transfer_limit?: number | null
          id?: string
          kyc_enabled?: boolean | null
          kyc_types?: string[] | null
          monthly_volume_limit?: number | null
          payments_enabled?: boolean | null
          per_payment_limit?: number | null
          per_transfer_limit?: number | null
          project_id: string
          requests_per_hour?: number | null
          requests_per_minute?: number | null
          tier?: string | null
          transfers_enabled?: boolean | null
          updated_at?: string | null
          wallet_enabled?: boolean | null
          webhooks_enabled?: boolean | null
        }
        Update: {
          allowed_currencies?: string[] | null
          cards_enabled?: boolean | null
          created_at?: string | null
          daily_payment_limit?: number | null
          daily_transfer_limit?: number | null
          id?: string
          kyc_enabled?: boolean | null
          kyc_types?: string[] | null
          monthly_volume_limit?: number | null
          payments_enabled?: boolean | null
          per_payment_limit?: number | null
          per_transfer_limit?: number | null
          project_id?: string
          requests_per_hour?: number | null
          requests_per_minute?: number | null
          tier?: string | null
          transfers_enabled?: boolean | null
          updated_at?: string | null
          wallet_enabled?: boolean | null
          webhooks_enabled?: boolean | null
        }
        Relationships: []
      }
      provider_accounts: {
        Row: {
          base_url: string | null
          config: Json
          created_at: string | null
          created_by: string | null
          daily_limit_amount: number | null
          environment: Database["public"]["Enums"]["environment_type"]
          health_check_url: string | null
          id: string
          last_health_check_at: string | null
          last_health_status: string | null
          per_transaction_limit: number | null
          priority: number | null
          project_id: string
          provider_name: string
          provider_type: Database["public"]["Enums"]["provider_type"]
          status: Database["public"]["Enums"]["provider_status"]
          supported_countries: string[] | null
          supported_currencies: string[] | null
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          base_url?: string | null
          config?: Json
          created_at?: string | null
          created_by?: string | null
          daily_limit_amount?: number | null
          environment?: Database["public"]["Enums"]["environment_type"]
          health_check_url?: string | null
          id?: string
          last_health_check_at?: string | null
          last_health_status?: string | null
          per_transaction_limit?: number | null
          priority?: number | null
          project_id: string
          provider_name: string
          provider_type: Database["public"]["Enums"]["provider_type"]
          status?: Database["public"]["Enums"]["provider_status"]
          supported_countries?: string[] | null
          supported_currencies?: string[] | null
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          base_url?: string | null
          config?: Json
          created_at?: string | null
          created_by?: string | null
          daily_limit_amount?: number | null
          environment?: Database["public"]["Enums"]["environment_type"]
          health_check_url?: string | null
          id?: string
          last_health_check_at?: string | null
          last_health_status?: string | null
          per_transaction_limit?: number | null
          priority?: number | null
          project_id?: string
          provider_name?: string
          provider_type?: Database["public"]["Enums"]["provider_type"]
          status?: Database["public"]["Enums"]["provider_status"]
          supported_countries?: string[] | null
          supported_currencies?: string[] | null
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      provider_references: {
        Row: {
          created_at: string | null
          id: string
          internal_ref: string
          internal_type: string
          normalized_status: string
          provider_name: string
          provider_ref: string | null
          provider_session_id: string | null
          provider_status: string | null
          raw_request: Json | null
          raw_response: Json | null
          response_at: string | null
          sent_at: string | null
          settled_at: string | null
          status_reason: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          internal_ref: string
          internal_type: string
          normalized_status: string
          provider_name: string
          provider_ref?: string | null
          provider_session_id?: string | null
          provider_status?: string | null
          raw_request?: Json | null
          raw_response?: Json | null
          response_at?: string | null
          sent_at?: string | null
          settled_at?: string | null
          status_reason?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          internal_ref?: string
          internal_type?: string
          normalized_status?: string
          provider_name?: string
          provider_ref?: string | null
          provider_session_id?: string | null
          provider_status?: string | null
          raw_request?: Json | null
          raw_response?: Json | null
          response_at?: string | null
          sent_at?: string | null
          settled_at?: string | null
          status_reason?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      simple_users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login_at: string | null
          password_hash: string
          project_scope: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          password_hash: string
          project_scope?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          password_hash?: string
          project_scope?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sync_config: {
        Row: {
          created_at: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      user_sync_log: {
        Row: {
          completed_at: string | null
          errors: Json | null
          id: number
          metadata: Json | null
          started_at: string | null
          status: string | null
          sync_type: string
          users_synced: number | null
        }
        Insert: {
          completed_at?: string | null
          errors?: Json | null
          id?: number
          metadata?: Json | null
          started_at?: string | null
          status?: string | null
          sync_type: string
          users_synced?: number | null
        }
        Update: {
          completed_at?: string | null
          errors?: Json | null
          id?: number
          metadata?: Json | null
          started_at?: string | null
          status?: string | null
          sync_type?: string
          users_synced?: number | null
        }
        Relationships: []
      }
      webhook_deliveries: {
        Row: {
          attempt_count: number | null
          created_at: string | null
          endpoint_id: string
          event_id: string
          id: string
          last_attempt_at: string | null
          last_error: string | null
          last_response_body: string | null
          last_status_code: number | null
          max_attempts: number | null
          next_retry_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          attempt_count?: number | null
          created_at?: string | null
          endpoint_id: string
          event_id: string
          id?: string
          last_attempt_at?: string | null
          last_error?: string | null
          last_response_body?: string | null
          last_status_code?: number | null
          max_attempts?: number | null
          next_retry_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          attempt_count?: number | null
          created_at?: string | null
          endpoint_id?: string
          event_id?: string
          id?: string
          last_attempt_at?: string | null
          last_error?: string | null
          last_response_body?: string | null
          last_status_code?: number | null
          max_attempts?: number | null
          next_retry_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_deliveries_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "webhook_endpoints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "webhook_deliveries_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "webhook_events"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_endpoints: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          events: string[] | null
          failed_deliveries: number | null
          id: string
          project_id: string
          retry_count: number | null
          secret: string
          signature_header: string | null
          status: Database["public"]["Enums"]["webhook_status"]
          successful_deliveries: number | null
          timeout_seconds: number | null
          total_deliveries: number | null
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          events?: string[] | null
          failed_deliveries?: number | null
          id?: string
          project_id: string
          retry_count?: number | null
          secret: string
          signature_header?: string | null
          status?: Database["public"]["Enums"]["webhook_status"]
          successful_deliveries?: number | null
          timeout_seconds?: number | null
          total_deliveries?: number | null
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          events?: string[] | null
          failed_deliveries?: number | null
          id?: string
          project_id?: string
          retry_count?: number | null
          secret?: string
          signature_header?: string | null
          status?: Database["public"]["Enums"]["webhook_status"]
          successful_deliveries?: number | null
          timeout_seconds?: number | null
          total_deliveries?: number | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      webhook_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          payload: Json
          processed: boolean | null
          processed_at: string | null
          source_id: string | null
          source_type: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          payload: Json
          processed?: boolean | null
          processed_at?: string | null
          source_id?: string | null
          source_type?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed?: boolean | null
          processed_at?: string | null
          source_id?: string | null
          source_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      ai_chat_sessions: {
        Row: {
          ai_model: string | null
          created_at: string | null
          id: string | null
          messages: Json | null
          session_name: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ai_model?: string | null
          created_at?: string | null
          id?: string | null
          messages?: Json | null
          session_name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ai_model?: string | null
          created_at?: string | null
          id?: string | null
          messages?: Json | null
          session_name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_recommendations: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string | null
          product_id: string | null
          reason: string | null
          recommendation_type: string | null
          score: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          product_id?: string | null
          reason?: string | null
          recommendation_type?: string | null
          score?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          product_id?: string | null
          reason?: string | null
          recommendation_type?: string | null
          score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_response_cache: {
        Row: {
          created_at: string | null
          expires_at: string | null
          hit_count: number | null
          id: string | null
          model_used: string | null
          prompt: string | null
          prompt_hash: string | null
          response: string | null
          tokens_used: number | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          hit_count?: number | null
          id?: string | null
          model_used?: string | null
          prompt?: string | null
          prompt_hash?: string | null
          response?: string | null
          tokens_used?: number | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          hit_count?: number | null
          id?: string | null
          model_used?: string | null
          prompt?: string | null
          prompt_hash?: string | null
          response?: string | null
          tokens_used?: number | null
        }
        Relationships: []
      }
      ai_usage_logs: {
        Row: {
          created_at: string | null
          estimated_cost: number | null
          feedback_text: string | null
          id: string | null
          model_used: string | null
          prompt: string | null
          query_complexity: string | null
          response_time_ms: number | null
          tokens_used: number | null
          user_feedback: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          estimated_cost?: number | null
          feedback_text?: string | null
          id?: string | null
          model_used?: string | null
          prompt?: string | null
          query_complexity?: string | null
          response_time_ms?: number | null
          tokens_used?: number | null
          user_feedback?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          estimated_cost?: number | null
          feedback_text?: string | null
          id?: string | null
          model_used?: string | null
          prompt?: string | null
          query_complexity?: string | null
          response_time_ms?: number | null
          tokens_used?: number | null
          user_feedback?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      api_key_projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          name: string | null
          organization_id: string | null
          owner_id: string | null
          settings: Json | null
          team_members: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          organization_id?: string | null
          owner_id?: string | null
          settings?: Json | null
          team_members?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          organization_id?: string | null
          owner_id?: string | null
          settings?: Json | null
          team_members?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string | null
          is_active: boolean | null
          key_hash: string | null
          last_used: string | null
          name: string | null
          organization_id: string | null
          permissions: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          is_active?: boolean | null
          key_hash?: string | null
          last_used?: string | null
          name?: string | null
          organization_id?: string | null
          permissions?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          is_active?: boolean | null
          key_hash?: string | null
          last_used?: string | null
          name?: string | null
          organization_id?: string | null
          permissions?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      auth_events: {
        Row: {
          aggregate_id: string | null
          aggregate_type: string | null
          event_id: string | null
          event_type: string | null
          event_type_version: number | null
          ingested_at: string | null
          metadata: Json | null
          occurred_at: string | null
          payload: Json | null
          version: number | null
        }
        Insert: {
          aggregate_id?: string | null
          aggregate_type?: string | null
          event_id?: string | null
          event_type?: string | null
          event_type_version?: number | null
          ingested_at?: string | null
          metadata?: Json | null
          occurred_at?: string | null
          payload?: Json | null
          version?: number | null
        }
        Update: {
          aggregate_id?: string | null
          aggregate_type?: string | null
          event_id?: string | null
          event_type?: string | null
          event_type_version?: number | null
          ingested_at?: string | null
          metadata?: Json | null
          occurred_at?: string | null
          payload?: Json | null
          version?: number | null
        }
        Relationships: []
      }
      behavior_patterns: {
        Row: {
          actions: Json | null
          confidence: number | null
          context: Json | null
          created_at: string | null
          final_outcome: string | null
          id: string | null
          last_used_at: string | null
          trigger: string | null
          trigger_embedding: string | null
          updated_at: string | null
          use_count: number | null
          user_id: string | null
        }
        Insert: {
          actions?: Json | null
          confidence?: number | null
          context?: Json | null
          created_at?: string | null
          final_outcome?: string | null
          id?: string | null
          last_used_at?: string | null
          trigger?: string | null
          trigger_embedding?: string | null
          updated_at?: string | null
          use_count?: number | null
          user_id?: string | null
        }
        Update: {
          actions?: Json | null
          confidence?: number | null
          context?: Json | null
          created_at?: string | null
          final_outcome?: string | null
          id?: string | null
          last_used_at?: string | null
          trigger?: string | null
          trigger_embedding?: string | null
          updated_at?: string | null
          use_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      beneficiaries: {
        Row: {
          account_number: string | null
          bank_code: string | null
          category: string | null
          created_at: string | null
          id: string | null
          is_archived: boolean | null
          name: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_number?: string | null
          bank_code?: string | null
          category?: string | null
          created_at?: string | null
          id?: string | null
          is_archived?: boolean | null
          name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_number?: string | null
          bank_code?: string | null
          category?: string | null
          created_at?: string | null
          id?: string | null
          is_archived?: boolean | null
          name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bulk_payments: {
        Row: {
          created_at: string | null
          currency_code: string | null
          id: string | null
          last_error: string | null
          modified_by: string | null
          processed_at: string | null
          scheduled_date: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          title: string | null
          total_amount: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          currency_code?: string | null
          id?: string | null
          last_error?: string | null
          modified_by?: string | null
          processed_at?: string | null
          scheduled_date?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          title?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          currency_code?: string | null
          id?: string | null
          last_error?: string | null
          modified_by?: string | null
          processed_at?: string | null
          scheduled_date?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          title?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
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
          description: string | null
          due_date: string | null
          id: string | null
          impact_score: number | null
          insight_type: string | null
          potential_savings: number | null
          priority_level: string | null
          recommendation: string | null
          status: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          action_items?: Json | null
          completed_at?: string | null
          consent_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string | null
          impact_score?: number | null
          insight_type?: string | null
          potential_savings?: number | null
          priority_level?: string | null
          recommendation?: string | null
          status?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          action_items?: Json | null
          completed_at?: string | null
          consent_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string | null
          impact_score?: number | null
          insight_type?: string | null
          potential_savings?: number | null
          priority_level?: string | null
          recommendation?: string | null
          status?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_profiles: {
        Row: {
          address: Json | null
          business_name: string | null
          business_type: string | null
          contact_info: Json | null
          created_at: string | null
          edoc_markup_pct: number | null
          id: string | null
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
          id?: string | null
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
          id?: string | null
          registration_number?: string | null
          tax_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      client_organizations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          name: string | null
          slug: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      edoc_consents: {
        Row: {
          account_name: string | null
          account_number_masked: string | null
          bank_code: string | null
          bank_name: string | null
          business_profile_id: string | null
          consent_status: string | null
          consent_url: string | null
          created_at: string | null
          edoc_consent_id: string | null
          error_message: string | null
          expires_at: string | null
          id: string | null
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
          bank_name?: string | null
          business_profile_id?: string | null
          consent_status?: string | null
          consent_url?: string | null
          created_at?: string | null
          edoc_consent_id?: string | null
          error_message?: string | null
          expires_at?: string | null
          id?: string | null
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
          bank_name?: string | null
          business_profile_id?: string | null
          consent_status?: string | null
          consent_url?: string | null
          created_at?: string | null
          edoc_consent_id?: string | null
          error_message?: string | null
          expires_at?: string | null
          id?: string | null
          import_complete?: boolean | null
          last_sync_at?: string | null
          raw_response?: Json | null
          redirect_url?: string | null
          sync_frequency?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      edoc_financial_analysis: {
        Row: {
          analysis_data: Json | null
          analysis_period_end: string | null
          analysis_period_start: string | null
          analysis_type: string | null
          confidence_score: number | null
          consent_id: string | null
          created_at: string | null
          id: string | null
          insights: Json | null
          recommendations: Json | null
        }
        Insert: {
          analysis_data?: Json | null
          analysis_period_end?: string | null
          analysis_period_start?: string | null
          analysis_type?: string | null
          confidence_score?: number | null
          consent_id?: string | null
          created_at?: string | null
          id?: string | null
          insights?: Json | null
          recommendations?: Json | null
        }
        Update: {
          analysis_data?: Json | null
          analysis_period_end?: string | null
          analysis_period_start?: string | null
          analysis_type?: string | null
          confidence_score?: number | null
          consent_id?: string | null
          created_at?: string | null
          id?: string | null
          insights?: Json | null
          recommendations?: Json | null
        }
        Relationships: []
      }
      edoc_transactions: {
        Row: {
          amount: number | null
          category: string | null
          confidence_score: number | null
          consent_id: string | null
          created_at: string | null
          edoc_transaction_id: string | null
          id: string | null
          is_credit: boolean | null
          merchant_name: string | null
          narration: string | null
          raw_data: Json | null
          reference_number: string | null
          running_balance: number | null
          subcategory: string | null
          tags: string[] | null
          transaction_date: string | null
          transaction_type: string | null
        }
        Insert: {
          amount?: number | null
          category?: string | null
          confidence_score?: number | null
          consent_id?: string | null
          created_at?: string | null
          edoc_transaction_id?: string | null
          id?: string | null
          is_credit?: boolean | null
          merchant_name?: string | null
          narration?: string | null
          raw_data?: Json | null
          reference_number?: string | null
          running_balance?: number | null
          subcategory?: string | null
          tags?: string[] | null
          transaction_date?: string | null
          transaction_type?: string | null
        }
        Update: {
          amount?: number | null
          category?: string | null
          confidence_score?: number | null
          consent_id?: string | null
          created_at?: string | null
          edoc_transaction_id?: string | null
          id?: string | null
          is_credit?: boolean | null
          merchant_name?: string | null
          narration?: string | null
          raw_data?: Json | null
          reference_number?: string | null
          running_balance?: number | null
          subcategory?: string | null
          tags?: string[] | null
          transaction_date?: string | null
          transaction_type?: string | null
        }
        Relationships: []
      }
      edoc_usage_logs: {
        Row: {
          api_calls_count: number | null
          consent_id: string | null
          cost_usd: number | null
          created_at: string | null
          id: string | null
          markup_applied: number | null
          operation_type: string | null
          total_cost_usd: number | null
          usage_date: string | null
          user_id: string | null
        }
        Insert: {
          api_calls_count?: number | null
          consent_id?: string | null
          cost_usd?: number | null
          created_at?: string | null
          id?: string | null
          markup_applied?: number | null
          operation_type?: string | null
          total_cost_usd?: number | null
          usage_date?: string | null
          user_id?: string | null
        }
        Update: {
          api_calls_count?: number | null
          consent_id?: string | null
          cost_usd?: number | null
          created_at?: string | null
          id?: string | null
          markup_applied?: number | null
          operation_type?: string | null
          total_cost_usd?: number | null
          usage_date?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      external_vendor_keys: {
        Row: {
          created_at: string | null
          description: string | null
          encrypted_key: string | null
          id: string | null
          is_active: boolean | null
          key_name: string | null
          last_used_at: string | null
          updated_at: string | null
          vendor_name: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          encrypted_key?: string | null
          id?: string | null
          is_active?: boolean | null
          key_name?: string | null
          last_used_at?: string | null
          updated_at?: string | null
          vendor_name?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          encrypted_key?: string | null
          id?: string | null
          is_active?: boolean | null
          key_name?: string | null
          last_used_at?: string | null
          updated_at?: string | null
          vendor_name?: string | null
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          created_at: string | null
          description: string | null
          enabled: boolean | null
          name: string | null
          rollout_pct: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          name?: string | null
          rollout_pct?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          name?: string | null
          rollout_pct?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      key_rotation_policies: {
        Row: {
          auto_rotate: boolean | null
          created_at: string | null
          frequency_days: number | null
          id: string | null
          key_id: string | null
          next_rotation: string | null
          notification_webhooks: string[] | null
          overlap_hours: number | null
          updated_at: string | null
        }
        Insert: {
          auto_rotate?: boolean | null
          created_at?: string | null
          frequency_days?: number | null
          id?: string | null
          key_id?: string | null
          next_rotation?: string | null
          notification_webhooks?: string[] | null
          overlap_hours?: number | null
          updated_at?: string | null
        }
        Update: {
          auto_rotate?: boolean | null
          created_at?: string | null
          frequency_days?: number | null
          id?: string | null
          key_id?: string | null
          next_rotation?: string | null
          notification_webhooks?: string[] | null
          overlap_hours?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      key_security_events: {
        Row: {
          description: string | null
          event_type: string | null
          id: string | null
          key_id: string | null
          metadata: Json | null
          organization_id: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string | null
          timestamp: string | null
        }
        Insert: {
          description?: string | null
          event_type?: string | null
          id?: string | null
          key_id?: string | null
          metadata?: Json | null
          organization_id?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          timestamp?: string | null
        }
        Update: {
          description?: string | null
          event_type?: string | null
          id?: string | null
          key_id?: string | null
          metadata?: Json | null
          organization_id?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      key_usage_analytics: {
        Row: {
          error_message: string | null
          id: string | null
          ip_address: unknown
          key_id: string | null
          metadata: Json | null
          operation: string | null
          organization_id: string | null
          response_time_ms: number | null
          session_id: string | null
          success: boolean | null
          timestamp: string | null
          tool_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          error_message?: string | null
          id?: string | null
          ip_address?: unknown
          key_id?: string | null
          metadata?: Json | null
          operation?: string | null
          organization_id?: string | null
          response_time_ms?: number | null
          session_id?: string | null
          success?: boolean | null
          timestamp?: string | null
          tool_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          error_message?: string | null
          id?: string | null
          ip_address?: unknown
          key_id?: string | null
          metadata?: Json | null
          operation?: string | null
          organization_id?: string | null
          response_time_ms?: number | null
          session_id?: string | null
          success?: boolean | null
          timestamp?: string | null
          tool_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      marketplace_transactions: {
        Row: {
          amount: number | null
          buyer_id: string | null
          created_at: string | null
          id: string | null
          order_id: string | null
          platform_fee: number | null
          seller_amount: number | null
          seller_id: string | null
          status: string | null
          stripe_charge_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          buyer_id?: string | null
          created_at?: string | null
          id?: string | null
          order_id?: string | null
          platform_fee?: number | null
          seller_amount?: number | null
          seller_id?: string | null
          status?: string | null
          stripe_charge_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          buyer_id?: string | null
          created_at?: string | null
          id?: string | null
          order_id?: string | null
          platform_fee?: number | null
          seller_amount?: number | null
          seller_id?: string | null
          status?: string | null
          stripe_charge_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      mcp_key_access_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          approver_notes: string | null
          context: Json | null
          created_at: string | null
          environment: "development" | "staging" | "production" | null
          estimated_duration: number | null
          expires_at: string | null
          id: string | null
          justification: string | null
          key_names: string[] | null
          organization_id: string | null
          requires_approval: boolean | null
          status: string | null
          tool_id: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          approver_notes?: string | null
          context?: Json | null
          created_at?: string | null
          environment?: "development" | "staging" | "production" | null
          estimated_duration?: number | null
          expires_at?: string | null
          id?: string | null
          justification?: string | null
          key_names?: string[] | null
          organization_id?: string | null
          requires_approval?: boolean | null
          status?: string | null
          tool_id?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          approver_notes?: string | null
          context?: Json | null
          created_at?: string | null
          environment?: "development" | "staging" | "production" | null
          estimated_duration?: number | null
          expires_at?: string | null
          id?: string | null
          justification?: string | null
          key_names?: string[] | null
          organization_id?: string | null
          requires_approval?: boolean | null
          status?: string | null
          tool_id?: string | null
        }
        Relationships: []
      }
      mcp_key_audit_log: {
        Row: {
          event_type: string | null
          id: string | null
          key_id: string | null
          metadata: Json | null
          organization_id: string | null
          session_id: string | null
          timestamp: string | null
          tool_id: string | null
          user_id: string | null
        }
        Insert: {
          event_type?: string | null
          id?: string | null
          key_id?: string | null
          metadata?: Json | null
          organization_id?: string | null
          session_id?: string | null
          timestamp?: string | null
          tool_id?: string | null
          user_id?: string | null
        }
        Update: {
          event_type?: string | null
          id?: string | null
          key_id?: string | null
          metadata?: Json | null
          organization_id?: string | null
          session_id?: string | null
          timestamp?: string | null
          tool_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      mcp_key_sessions: {
        Row: {
          created_at: string | null
          ended_at: string | null
          environment: "development" | "staging" | "production" | null
          expires_at: string | null
          key_names: string[] | null
          organization_id: string | null
          request_id: string | null
          session_id: string | null
          tool_id: string | null
        }
        Insert: {
          created_at?: string | null
          ended_at?: string | null
          environment?: "development" | "staging" | "production" | null
          expires_at?: string | null
          key_names?: string[] | null
          organization_id?: string | null
          request_id?: string | null
          session_id?: string | null
          tool_id?: string | null
        }
        Update: {
          created_at?: string | null
          ended_at?: string | null
          environment?: "development" | "staging" | "production" | null
          expires_at?: string | null
          key_names?: string[] | null
          organization_id?: string | null
          request_id?: string | null
          session_id?: string | null
          tool_id?: string | null
        }
        Relationships: []
      }
      mcp_key_tools: {
        Row: {
          auto_approve: boolean | null
          created_at: string | null
          created_by: string | null
          id: string | null
          organization_id: string | null
          permissions: Json | null
          risk_level: string | null
          status: string | null
          tool_id: string | null
          tool_name: string | null
          updated_at: string | null
          webhook_url: string | null
        }
        Insert: {
          auto_approve?: boolean | null
          created_at?: string | null
          created_by?: string | null
          id?: string | null
          organization_id?: string | null
          permissions?: Json | null
          risk_level?: string | null
          status?: string | null
          tool_id?: string | null
          tool_name?: string | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          auto_approve?: boolean | null
          created_at?: string | null
          created_by?: string | null
          id?: string | null
          organization_id?: string | null
          permissions?: Json | null
          risk_level?: string | null
          status?: string | null
          tool_id?: string | null
          tool_name?: string | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      mcp_proxy_tokens: {
        Row: {
          created_at: string | null
          encrypted_mapping: string | null
          expires_at: string | null
          key_id: string | null
          organization_id: string | null
          proxy_value: string | null
          revoked_at: string | null
          session_id: string | null
          token_id: string | null
          tool_id: string | null
        }
        Insert: {
          created_at?: string | null
          encrypted_mapping?: string | null
          expires_at?: string | null
          key_id?: string | null
          organization_id?: string | null
          proxy_value?: string | null
          revoked_at?: string | null
          session_id?: string | null
          token_id?: string | null
          tool_id?: string | null
        }
        Update: {
          created_at?: string | null
          encrypted_mapping?: string | null
          expires_at?: string | null
          key_id?: string | null
          organization_id?: string | null
          proxy_value?: string | null
          revoked_at?: string | null
          session_id?: string | null
          token_id?: string | null
          tool_id?: string | null
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          created_at: string | null
          error_enabled: boolean | null
          id: string | null
          info_enabled: boolean | null
          success_enabled: boolean | null
          updated_at: string | null
          user_id: string | null
          warning_enabled: boolean | null
        }
        Insert: {
          created_at?: string | null
          error_enabled?: boolean | null
          id?: string | null
          info_enabled?: boolean | null
          success_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          warning_enabled?: boolean | null
        }
        Update: {
          created_at?: string | null
          error_enabled?: boolean | null
          id?: string | null
          info_enabled?: boolean | null
          success_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          warning_enabled?: boolean | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string | null
          is_read: boolean | null
          message: string | null
          notification_group: string | null
          title: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          is_read?: boolean | null
          message?: string | null
          notification_group?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          is_read?: boolean | null
          message?: string | null
          notification_group?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      oauth_audit_log: {
        Row: {
          client_id: string | null
          created_at: string | null
          error_code: string | null
          error_description: string | null
          event_type: string | null
          grant_type: string | null
          id: string | null
          ip_address: unknown
          metadata: Json | null
          redirect_uri: string | null
          scope: string[] | null
          success: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          error_code?: string | null
          error_description?: string | null
          event_type?: string | null
          grant_type?: string | null
          id?: string | null
          ip_address?: unknown
          metadata?: Json | null
          redirect_uri?: string | null
          scope?: string[] | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          error_code?: string | null
          error_description?: string | null
          event_type?: string | null
          grant_type?: string | null
          id?: string | null
          ip_address?: unknown
          metadata?: Json | null
          redirect_uri?: string | null
          scope?: string[] | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      oauth_authorization_codes: {
        Row: {
          client_id: string | null
          code_challenge: string | null
          code_challenge_method: string | null
          code_hash: string | null
          consumed: boolean | null
          consumed_at: string | null
          created_at: string | null
          expires_at: string | null
          id: string | null
          ip_address: unknown
          redirect_uri: string | null
          scope: string[] | null
          state: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          client_id?: string | null
          code_challenge?: string | null
          code_challenge_method?: string | null
          code_hash?: string | null
          consumed?: boolean | null
          consumed_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          ip_address?: unknown
          redirect_uri?: string | null
          scope?: string[] | null
          state?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          client_id?: string | null
          code_challenge?: string | null
          code_challenge_method?: string | null
          code_hash?: string | null
          consumed?: boolean | null
          consumed_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          ip_address?: unknown
          redirect_uri?: string | null
          scope?: string[] | null
          state?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      oauth_clients: {
        Row: {
          allowed_code_challenge_methods: string[] | null
          allowed_redirect_uris: Json | null
          allowed_scopes: string[] | null
          application_type: string | null
          client_id: string | null
          client_name: string | null
          client_type: string | null
          created_at: string | null
          created_by: string | null
          default_scopes: string[] | null
          description: string | null
          id: string | null
          require_pkce: boolean | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          allowed_code_challenge_methods?: string[] | null
          allowed_redirect_uris?: Json | null
          allowed_scopes?: string[] | null
          application_type?: string | null
          client_id?: string | null
          client_name?: string | null
          client_type?: string | null
          created_at?: string | null
          created_by?: string | null
          default_scopes?: string[] | null
          description?: string | null
          id?: string | null
          require_pkce?: boolean | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          allowed_code_challenge_methods?: string[] | null
          allowed_redirect_uris?: Json | null
          allowed_scopes?: string[] | null
          application_type?: string | null
          client_id?: string | null
          client_name?: string | null
          client_type?: string | null
          created_at?: string | null
          created_by?: string | null
          default_scopes?: string[] | null
          description?: string | null
          id?: string | null
          require_pkce?: boolean | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      oauth_states: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string | null
          state_data: Json | null
          state_key: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          state_data?: Json | null
          state_key?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          state_data?: Json | null
          state_key?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      oauth_tokens: {
        Row: {
          client_id: string | null
          created_at: string | null
          expires_at: string | null
          id: string | null
          ip_address: unknown
          last_used_at: string | null
          parent_token_id: string | null
          revoked: boolean | null
          revoked_at: string | null
          revoked_reason: string | null
          scope: string[] | null
          token_hash: string | null
          token_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          ip_address?: unknown
          last_used_at?: string | null
          parent_token_id?: string | null
          revoked?: boolean | null
          revoked_at?: string | null
          revoked_reason?: string | null
          scope?: string[] | null
          token_hash?: string | null
          token_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          ip_address?: unknown
          last_used_at?: string | null
          parent_token_id?: string | null
          revoked?: boolean | null
          revoked_at?: string | null
          revoked_reason?: string | null
          scope?: string[] | null
          token_hash?: string | null
          token_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string | null
          order_id: string | null
          product_id: string | null
          quantity: number | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          order_id?: string | null
          product_id?: string | null
          quantity?: number | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          order_id?: string | null
          product_id?: string | null
          quantity?: number | null
          unit_price?: number | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string | null
          order_date: string | null
          shipping_address: string | null
          status: string | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string | null
          order_date?: string | null
          shipping_address?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string | null
          order_date?: string | null
          shipping_address?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      payment_audit: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string | null
          new_status: Database["public"]["Enums"]["payment_status"] | null
          old_status: Database["public"]["Enums"]["payment_status"] | null
          payment_id: string | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string | null
          new_status?: Database["public"]["Enums"]["payment_status"] | null
          old_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_id?: string | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string | null
          new_status?: Database["public"]["Enums"]["payment_status"] | null
          old_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_id?: string | null
        }
        Relationships: []
      }
      payment_items: {
        Row: {
          amount: number | null
          beneficiary_id: string | null
          bulk_payment_id: string | null
          created_at: string | null
          currency_code: string | null
          description: string | null
          error_message: string | null
          id: string | null
          processed_at: string | null
          retry_count: number | null
          status: Database["public"]["Enums"]["payment_status"] | null
        }
        Insert: {
          amount?: number | null
          beneficiary_id?: string | null
          bulk_payment_id?: string | null
          created_at?: string | null
          currency_code?: string | null
          description?: string | null
          error_message?: string | null
          id?: string | null
          processed_at?: string | null
          retry_count?: number | null
          status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Update: {
          amount?: number | null
          beneficiary_id?: string | null
          bulk_payment_id?: string | null
          created_at?: string | null
          currency_code?: string | null
          description?: string | null
          error_message?: string | null
          id?: string | null
          processed_at?: string | null
          retry_count?: number | null
          status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Relationships: []
      }
      playing_with_neon: {
        Row: {
          created_at: string | null
          id: number | null
          name: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          name?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          name?: string | null
          value?: string | null
        }
        Relationships: []
      }
      pricing_insights: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          expires_at: string | null
          id: string | null
          market_trend: string | null
          max_viable_price: number | null
          min_viable_price: number | null
          price_elasticity: number | null
          product_id: string | null
          reasoning: string | null
          suggested_price: number | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          market_trend?: string | null
          max_viable_price?: number | null
          min_viable_price?: number | null
          price_elasticity?: number | null
          product_id?: string | null
          reasoning?: string | null
          suggested_price?: number | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          market_trend?: string | null
          max_viable_price?: number | null
          min_viable_price?: number | null
          price_elasticity?: number | null
          product_id?: string | null
          reasoning?: string | null
          suggested_price?: number | null
        }
        Relationships: []
      }
      product_embeddings: {
        Row: {
          created_at: string | null
          embedding: string | null
          id: string | null
          product_id: string | null
          text_content: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          embedding?: string | null
          id?: string | null
          product_id?: string | null
          text_content?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          embedding?: string | null
          id?: string | null
          product_id?: string | null
          text_content?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string | null
          image_url: string | null
          name: string | null
          price: number | null
          stock_quantity: number | null
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          image_url?: string | null
          name?: string | null
          price?: number | null
          stock_quantity?: number | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          image_url?: string | null
          name?: string | null
          price?: number | null
          stock_quantity?: number | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          business_type: string | null
          company_name: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          full_name: string | null
          id: string | null
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
          id?: string | null
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
          id?: string | null
          is_vendor?: boolean | null
          last_name?: string | null
          stripe_customer_id?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_capabilities_with_tier: {
        Row: {
          allowed_currencies: string[] | null
          cards_enabled: boolean | null
          created_at: string | null
          daily_payment_limit: number | null
          daily_transfer_limit: number | null
          effective_daily_transfer_limit: number | null
          effective_per_transfer_limit: number | null
          effective_requests_per_hour: number | null
          effective_requests_per_minute: number | null
          id: string | null
          kyc_enabled: boolean | null
          kyc_types: string[] | null
          monthly_volume_limit: number | null
          payments_enabled: boolean | null
          per_payment_limit: number | null
          per_transfer_limit: number | null
          project_id: string | null
          requests_per_hour: number | null
          requests_per_minute: number | null
          tier: string | null
          tier_display_name: string | null
          transfers_enabled: boolean | null
          updated_at: string | null
          wallet_enabled: boolean | null
          webhooks_enabled: boolean | null
        }
        Relationships: []
      }
      project_stages: {
        Row: {
          description: string | null
          display_order: number | null
          id: number | null
          name: string | null
        }
        Insert: {
          description?: string | null
          display_order?: number | null
          id?: number | null
          name?: string | null
        }
        Update: {
          description?: string | null
          display_order?: number | null
          id?: number | null
          name?: string | null
        }
        Relationships: []
      }
      query_classifications: {
        Row: {
          actual_complexity: string | null
          classified_complexity: string | null
          created_at: string | null
          feedback_score: number | null
          id: string | null
          prompt: string | null
          tokens_used: number | null
          was_escalated: boolean | null
        }
        Insert: {
          actual_complexity?: string | null
          classified_complexity?: string | null
          created_at?: string | null
          feedback_score?: number | null
          id?: string | null
          prompt?: string | null
          tokens_used?: number | null
          was_escalated?: boolean | null
        }
        Update: {
          actual_complexity?: string | null
          classified_complexity?: string | null
          created_at?: string | null
          feedback_score?: number | null
          id?: string | null
          prompt?: string | null
          tokens_used?: number | null
          was_escalated?: boolean | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          clicked: boolean | null
          created_at: string | null
          id: string | null
          product_id: string | null
          reason: string | null
          recommendation_type: string | null
          relevance_score: number | null
          supplier_id: string | null
          updated_at: string | null
          user_id: string | null
          viewed: boolean | null
        }
        Insert: {
          clicked?: boolean | null
          created_at?: string | null
          id?: string | null
          product_id?: string | null
          reason?: string | null
          recommendation_type?: string | null
          relevance_score?: number | null
          supplier_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          viewed?: boolean | null
        }
        Update: {
          clicked?: boolean | null
          created_at?: string | null
          id?: string | null
          product_id?: string | null
          reason?: string | null
          recommendation_type?: string | null
          relevance_score?: number | null
          supplier_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          viewed?: boolean | null
        }
        Relationships: []
      }
      risk_analysis: {
        Row: {
          created_at: string | null
          id: string | null
          is_flagged: boolean | null
          order_id: string | null
          review_status: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          risk_factors: Json | null
          risk_score: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          is_flagged?: boolean | null
          order_id?: string | null
          review_status?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          risk_factors?: Json | null
          risk_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          is_flagged?: boolean | null
          order_id?: string | null
          review_status?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          risk_factors?: Json | null
          risk_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      search_history: {
        Row: {
          category: string | null
          created_at: string | null
          filters: Json | null
          id: string | null
          results_count: number | null
          search_query: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          filters?: Json | null
          id?: string | null
          results_count?: number | null
          search_query?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          filters?: Json | null
          id?: string | null
          results_count?: number | null
          search_query?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      social_accounts: {
        Row: {
          created_at: string | null
          id: string | null
          provider: string | null
          provider_account_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          provider?: string | null
          provider_account_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          provider?: string | null
          provider_account_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      stored_api_keys: {
        Row: {
          access_level:
            | "public"
            | "authenticated"
            | "team"
            | "admin"
            | "enterprise"
            | null
          created_at: string | null
          created_by: string | null
          encrypted_value: string | null
          environment: "development" | "staging" | "production" | null
          expires_at: string | null
          id: string | null
          key_type:
            | "api_key"
            | "database_url"
            | "oauth_token"
            | "certificate"
            | "ssh_key"
            | "webhook_secret"
            | "encryption_key"
            | null
          last_rotated: string | null
          metadata: Json | null
          name: string | null
          organization_id: string | null
          project_id: string | null
          rotation_frequency: number | null
          status: "default" | "valid" | "invalid" | "expired" | null
          tags: string[] | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          access_level?:
            | "public"
            | "authenticated"
            | "team"
            | "admin"
            | "enterprise"
            | null
          created_at?: string | null
          created_by?: string | null
          encrypted_value?: string | null
          environment?: "development" | "staging" | "production" | null
          expires_at?: string | null
          id?: string | null
          key_type?:
            | "api_key"
            | "database_url"
            | "oauth_token"
            | "certificate"
            | "ssh_key"
            | "webhook_secret"
            | "encryption_key"
            | null
          last_rotated?: string | null
          metadata?: Json | null
          name?: string | null
          organization_id?: string | null
          project_id?: string | null
          rotation_frequency?: number | null
          status?: "default" | "valid" | "invalid" | "expired" | null
          tags?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          access_level?:
            | "public"
            | "authenticated"
            | "team"
            | "admin"
            | "enterprise"
            | null
          created_at?: string | null
          created_by?: string | null
          encrypted_value?: string | null
          environment?: "development" | "staging" | "production" | null
          expires_at?: string | null
          id?: string | null
          key_type?:
            | "api_key"
            | "database_url"
            | "oauth_token"
            | "certificate"
            | "ssh_key"
            | "webhook_secret"
            | "encryption_key"
            | null
          last_rotated?: string | null
          metadata?: Json | null
          name?: string | null
          organization_id?: string | null
          project_id?: string | null
          rotation_frequency?: number | null
          status?: "default" | "valid" | "invalid" | "expired" | null
          tags?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      stripe_connect_accounts: {
        Row: {
          created_at: string | null
          id: string | null
          onboarding_complete: boolean | null
          stripe_account_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          onboarding_complete?: boolean | null
          stripe_account_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          onboarding_complete?: boolean | null
          stripe_account_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sub_tasks: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string | null
          task_id: string | null
          title: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string | null
          task_id?: string | null
          title?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string | null
          task_id?: string | null
          title?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string | null
          plan_name: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string | null
          plan_name?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string | null
          plan_name?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_error_logs: {
        Row: {
          created_at: string | null
          error_context: Json | null
          error_message: string | null
          id: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          source: string | null
        }
        Insert: {
          created_at?: string | null
          error_context?: Json | null
          error_message?: string | null
          id?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string | null
          error_context?: Json | null
          error_message?: string | null
          id?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          source?: string | null
        }
        Relationships: []
      }
      task_dependencies: {
        Row: {
          created_at: string | null
          depends_on_task_id: string | null
          id: string | null
          task_id: string | null
        }
        Insert: {
          created_at?: string | null
          depends_on_task_id?: string | null
          id?: string | null
          task_id?: string | null
        }
        Update: {
          created_at?: string | null
          depends_on_task_id?: string | null
          id?: string | null
          task_id?: string | null
        }
        Relationships: []
      }
      task_priorities: {
        Row: {
          description: string | null
          id: number | null
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number | null
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number | null
          name?: string | null
        }
        Relationships: []
      }
      task_statuses: {
        Row: {
          description: string | null
          id: number | null
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number | null
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number | null
          name?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assignee_id: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string | null
          priority_id: number | null
          project_id: string | null
          status_id: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          assignee_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string | null
          priority_id?: number | null
          project_id?: string | null
          status_id?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          assignee_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string | null
          priority_id?: number | null
          project_id?: string | null
          status_id?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string | null
          id: string | null
          role: string | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          role?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          role?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_activity_logs: {
        Row: {
          action_data: Json | null
          action_type: string | null
          ai_processed: boolean | null
          created_at: string | null
          id: string | null
          user_id: string | null
        }
        Insert: {
          action_data?: Json | null
          action_type?: string | null
          ai_processed?: boolean | null
          created_at?: string | null
          id?: string | null
          user_id?: string | null
        }
        Update: {
          action_data?: Json | null
          action_type?: string | null
          ai_processed?: boolean | null
          created_at?: string | null
          id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_consents: {
        Row: {
          consent_type: string | null
          created_at: string | null
          granted: boolean | null
          granted_at: string | null
          id: string | null
          ip_address: unknown
          revoked_at: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          consent_type?: string | null
          created_at?: string | null
          granted?: boolean | null
          granted_at?: string | null
          id?: string | null
          ip_address?: unknown
          revoked_at?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          consent_type?: string | null
          created_at?: string | null
          granted?: boolean | null
          granted_at?: string | null
          id?: string | null
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
          created_at: string | null
          id: string | null
          industry_focus: string[] | null
          payment_methods: string[] | null
          preferred_currencies: string[] | null
          regions_of_interest: string[] | null
          risk_tolerance: string | null
          trade_frequency: string | null
          trade_volume: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          business_size?: string | null
          created_at?: string | null
          id?: string | null
          industry_focus?: string[] | null
          payment_methods?: string[] | null
          preferred_currencies?: string[] | null
          regions_of_interest?: string[] | null
          risk_tolerance?: string | null
          trade_frequency?: string | null
          trade_volume?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          business_size?: string | null
          created_at?: string | null
          id?: string | null
          industry_focus?: string[] | null
          payment_methods?: string[] | null
          preferred_currencies?: string[] | null
          regions_of_interest?: string[] | null
          risk_tolerance?: string | null
          trade_frequency?: string | null
          trade_volume?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_product_interactions: {
        Row: {
          created_at: string | null
          id: string | null
          interaction_data: Json | null
          interaction_type: string | null
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          interaction_data?: Json | null
          interaction_type?: string | null
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          interaction_data?: Json | null
          interaction_type?: string | null
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          id: string | null
          ip_address: string | null
          last_active: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          id?: string | null
          ip_address?: string | null
          last_active?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          id?: string | null
          ip_address?: string | null
          last_active?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_tiers: {
        Row: {
          can_use_advanced_models: boolean | null
          created_at: string | null
          expires_at: string | null
          id: string | null
          max_queries_per_day: number | null
          tier_name: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          can_use_advanced_models?: boolean | null
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          max_queries_per_day?: number | null
          tier_name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          can_use_advanced_models?: boolean | null
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          max_queries_per_day?: number | null
          tier_name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_tool_configs: {
        Row: {
          api_key: string | null
          config: Json | null
          created_at: string | null
          enabled: boolean | null
          id: string | null
          permissions: string[] | null
          tool_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          api_key?: string | null
          config?: Json | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string | null
          permissions?: string[] | null
          tool_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          api_key?: string | null
          config?: Json | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string | null
          permissions?: string[] | null
          tool_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string | null
          last_login: string | null
          organization_id: string | null
          password_hash: string | null
          plan: "free" | "pro" | "enterprise" | null
          role: "admin" | "user" | "viewer" | null
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string | null
          last_login?: string | null
          organization_id?: string | null
          password_hash?: string | null
          plan?: "free" | "pro" | "enterprise" | null
          role?: "admin" | "user" | "viewer" | null
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string | null
          last_login?: string | null
          organization_id?: string | null
          password_hash?: string | null
          plan?: "free" | "pro" | "enterprise" | null
          role?: "admin" | "user" | "viewer" | null
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vendor_billing_records: {
        Row: {
          base_cost: number | null
          billing_period_end: string | null
          billing_period_start: string | null
          created_at: string | null
          currency: string | null
          discount_amount: number | null
          id: string | null
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
          vendor_org_id: string | null
        }
        Insert: {
          base_cost?: number | null
          billing_period_end?: string | null
          billing_period_start?: string | null
          created_at?: string | null
          currency?: string | null
          discount_amount?: number | null
          id?: string | null
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
          vendor_org_id?: string | null
        }
        Update: {
          base_cost?: number | null
          billing_period_end?: string | null
          billing_period_start?: string | null
          created_at?: string | null
          currency?: string | null
          discount_amount?: number | null
          id?: string | null
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
          vendor_org_id?: string | null
        }
        Relationships: []
      }
      vendor_organizations: {
        Row: {
          billing_address: Json | null
          billing_model: string | null
          billing_tier: string | null
          business_registration: string | null
          compliance_requirements: Json | null
          contact_email: string | null
          contact_name: string | null
          created_at: string | null
          created_by: string | null
          credit_balance: number | null
          currency: string | null
          data_retention_days: number | null
          id: string | null
          monthly_limit: number | null
          monthly_spend_limit: number | null
          organization_name: string | null
          organization_type: string | null
          platform_access: Json | null
          privacy_level: string | null
          rate_limit_per_minute: number | null
          service_permissions: Json | null
          status: string | null
          tax_id: string | null
          trial_ends_at: string | null
          updated_at: string | null
          vendor_code: string | null
          website_url: string | null
        }
        Insert: {
          billing_address?: Json | null
          billing_model?: string | null
          billing_tier?: string | null
          business_registration?: string | null
          compliance_requirements?: Json | null
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string | null
          created_by?: string | null
          credit_balance?: number | null
          currency?: string | null
          data_retention_days?: number | null
          id?: string | null
          monthly_limit?: number | null
          monthly_spend_limit?: number | null
          organization_name?: string | null
          organization_type?: string | null
          platform_access?: Json | null
          privacy_level?: string | null
          rate_limit_per_minute?: number | null
          service_permissions?: Json | null
          status?: string | null
          tax_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          vendor_code?: string | null
          website_url?: string | null
        }
        Update: {
          billing_address?: Json | null
          billing_model?: string | null
          billing_tier?: string | null
          business_registration?: string | null
          compliance_requirements?: Json | null
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string | null
          created_by?: string | null
          credit_balance?: number | null
          currency?: string | null
          data_retention_days?: number | null
          id?: string | null
          monthly_limit?: number | null
          monthly_spend_limit?: number | null
          organization_name?: string | null
          organization_type?: string | null
          platform_access?: Json | null
          privacy_level?: string | null
          rate_limit_per_minute?: number | null
          service_permissions?: Json | null
          status?: string | null
          tax_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          vendor_code?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      vendor_platform_sessions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string | null
          ip_address: unknown
          is_active: boolean | null
          last_activity_at: string | null
          mfa_verified_at: string | null
          platform: string | null
          requires_mfa: boolean | null
          session_metadata: Json | null
          session_token: string | null
          user_agent: string | null
          user_id: string | null
          vendor_org_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          ip_address?: unknown
          is_active?: boolean | null
          last_activity_at?: string | null
          mfa_verified_at?: string | null
          platform?: string | null
          requires_mfa?: boolean | null
          session_metadata?: Json | null
          session_token?: string | null
          user_agent?: string | null
          user_id?: string | null
          vendor_org_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          ip_address?: unknown
          is_active?: boolean | null
          last_activity_at?: string | null
          mfa_verified_at?: string | null
          platform?: string | null
          requires_mfa?: boolean | null
          session_metadata?: Json | null
          session_token?: string | null
          user_agent?: string | null
          user_id?: string | null
          vendor_org_id?: string | null
        }
        Relationships: []
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
          id: string | null
          ip_address: unknown
          method: string | null
          platform: string | null
          processed_at: string | null
          processing_time_ms: number | null
          request_id: string | null
          request_metadata: Json | null
          request_size_bytes: number | null
          request_timestamp: string | null
          response_metadata: Json | null
          response_size_bytes: number | null
          service: string | null
          status_code: number | null
          success: boolean | null
          tokens_consumed: number | null
          user_agent: string | null
          vendor_org_id: string | null
        }
        Insert: {
          api_key_id?: string | null
          billing_tier?: string | null
          compute_units?: number | null
          cost_amount?: number | null
          cost_currency?: string | null
          endpoint?: string | null
          error_message?: string | null
          id?: string | null
          ip_address?: unknown
          method?: string | null
          platform?: string | null
          processed_at?: string | null
          processing_time_ms?: number | null
          request_id?: string | null
          request_metadata?: Json | null
          request_size_bytes?: number | null
          request_timestamp?: string | null
          response_metadata?: Json | null
          response_size_bytes?: number | null
          service?: string | null
          status_code?: number | null
          success?: boolean | null
          tokens_consumed?: number | null
          user_agent?: string | null
          vendor_org_id?: string | null
        }
        Update: {
          api_key_id?: string | null
          billing_tier?: string | null
          compute_units?: number | null
          cost_amount?: number | null
          cost_currency?: string | null
          endpoint?: string | null
          error_message?: string | null
          id?: string | null
          ip_address?: unknown
          method?: string | null
          platform?: string | null
          processed_at?: string | null
          processing_time_ms?: number | null
          request_id?: string | null
          request_metadata?: Json | null
          request_size_bytes?: number | null
          request_timestamp?: string | null
          response_metadata?: Json | null
          response_size_bytes?: number | null
          service?: string | null
          status_code?: number | null
          success?: boolean | null
          tokens_consumed?: number | null
          user_agent?: string | null
          vendor_org_id?: string | null
        }
        Relationships: []
      }
      virtual_cards: {
        Row: {
          card_id: string | null
          cardholder_id: string | null
          created_at: string | null
          id: string | null
          is_locked: boolean | null
          last4: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          card_id?: string | null
          cardholder_id?: string | null
          created_at?: string | null
          id?: string | null
          is_locked?: boolean | null
          last4?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          card_id?: string | null
          cardholder_id?: string | null
          created_at?: string | null
          id?: string | null
          is_locked?: boolean | null
          last4?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      vortex_transactions: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: string | null
          metadata: Json | null
          reference: string | null
          status: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
          wallet_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string | null
          metadata?: Json | null
          reference?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          wallet_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string | null
          metadata?: Json | null
          reference?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          wallet_id?: string | null
        }
        Relationships: []
      }
      vortex_wallets: {
        Row: {
          balance: number | null
          created_at: string | null
          currency: string | null
          id: string | null
          is_active: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string | null
          is_active?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string | null
          is_active?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      workflows: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          name: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
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
      cleanup_expired_mcp_resources: { Args: never; Returns: undefined }
      cleanup_expired_oauth_codes: { Args: never; Returns: number }
      cleanup_expired_oauth_states: { Args: never; Returns: number }
      cleanup_expired_oauth_tokens: { Args: never; Returns: number }
      cleanup_expired_recommendations: { Args: never; Returns: undefined }
      create_facade: {
        Args: { p_table_name: string; p_target_schema: string }
        Returns: undefined
      }
      find_similar_patterns: {
        Args: {
          match_count?: number
          match_threshold?: number
          p_user_id?: string
          query_embedding: string
        }
        Returns: {
          actions: Json
          confidence: number
          context: Json
          final_outcome: string
          id: string
          similarity: number
          trigger: string
          use_count: number
        }[]
      }
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
      get_key_for_mcp_session: {
        Args: { key_name_param: string; session_id_param: string }
        Returns: {
          expires_at: string
          proxy_token: string
        }[]
      }
      get_product_image_url: { Args: { image_path: string }; Returns: string }
      get_user_org_ids: { Args: never; Returns: string[] }
      get_user_primary_org_id: { Args: never; Returns: string }
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
      increment_pattern_use_count: {
        Args: { pattern_id: string }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
      is_api_key_valid: {
        Args: { p_key_hash: string }
        Returns: {
          permissions: Json
          project_scope: string
          reason: string
          user_id: string
          valid: boolean
        }[]
      }
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
      trigger_user_sync_to_neon: { Args: never; Returns: undefined }
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
      environment_type: "sandbox" | "live"
      payment_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "canceled"
      provider_status: "active" | "disabled" | "maintenance" | "deprecated"
      provider_type:
        | "wallet"
        | "payment_gateway"
        | "card_issuer"
        | "verification"
        | "transfer"
      webhook_status: "active" | "paused" | "disabled"
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
      environment_type: ["sandbox", "live"],
      payment_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "canceled",
      ],
      provider_status: ["active", "disabled", "maintenance", "deprecated"],
      provider_type: [
        "wallet",
        "payment_gateway",
        "card_issuer",
        "verification",
        "transfer",
      ],
      webhook_status: ["active", "paused", "disabled"],
    },
  },
} as const
