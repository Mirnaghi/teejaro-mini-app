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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      account_balances: {
        Row: {
          ab_acc_id: number
          ab_asset_id: number | null
          ab_available_bal: number | null
          ab_id: number
          ab_locked_bal: number | null
          ab_status:
            | Database["public"]["Enums"]["accountbalancestatusenum"]
            | null
          ab_type: Database["public"]["Enums"]["accountbalancetypeenum"] | null
        }
        Insert: {
          ab_acc_id: number
          ab_asset_id?: number | null
          ab_available_bal?: number | null
          ab_id?: number
          ab_locked_bal?: number | null
          ab_status?:
            | Database["public"]["Enums"]["accountbalancestatusenum"]
            | null
          ab_type?: Database["public"]["Enums"]["accountbalancetypeenum"] | null
        }
        Update: {
          ab_acc_id?: number
          ab_asset_id?: number | null
          ab_available_bal?: number | null
          ab_id?: number
          ab_locked_bal?: number | null
          ab_status?:
            | Database["public"]["Enums"]["accountbalancestatusenum"]
            | null
          ab_type?: Database["public"]["Enums"]["accountbalancetypeenum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "account_balances_ab_acc_id_fkey"
            columns: ["ab_acc_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["acc_id"]
          },
          {
            foreignKeyName: "account_balances_ab_asset_id_fkey"
            columns: ["ab_asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["a_id"]
          },
        ]
      }
      account_cards: {
        Row: {
          acc_id: number | null
          c_c_time: string
          c_id: number
          c_status: Database["public"]["Enums"]["cardstatusenum"] | null
          card_details: Json
          card_name: string
          card_status: number
          l_u_time: string
        }
        Insert: {
          acc_id?: number | null
          c_c_time?: string
          c_id?: number
          c_status?: Database["public"]["Enums"]["cardstatusenum"] | null
          card_details: Json
          card_name: string
          card_status?: number
          l_u_time?: string
        }
        Update: {
          acc_id?: number | null
          c_c_time?: string
          c_id?: number
          c_status?: Database["public"]["Enums"]["cardstatusenum"] | null
          card_details?: Json
          card_name?: string
          card_status?: number
          l_u_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_cards_acc_id_fkey"
            columns: ["acc_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["acc_id"]
          },
        ]
      }
      account_groups: {
        Row: {
          acc_group_c_time: string
          acc_group_id: number
          acc_group_name: string | null
          acc_group_settings: Json | null
          acc_group_status:
            | Database["public"]["Enums"]["accountgroupstatusenum"]
            | null
          acc_group_u_time: string
          app_id: number
        }
        Insert: {
          acc_group_c_time?: string
          acc_group_id?: number
          acc_group_name?: string | null
          acc_group_settings?: Json | null
          acc_group_status?:
            | Database["public"]["Enums"]["accountgroupstatusenum"]
            | null
          acc_group_u_time?: string
          app_id: number
        }
        Update: {
          acc_group_c_time?: string
          acc_group_id?: number
          acc_group_name?: string | null
          acc_group_settings?: Json | null
          acc_group_status?:
            | Database["public"]["Enums"]["accountgroupstatusenum"]
            | null
          acc_group_u_time?: string
          app_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "account_groups_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
        ]
      }
      account_provider_keys: {
        Row: {
          ap_acc_id: number | null
          ap_api_key: string | null
          ap_api_key_id: string | null
          ap_created_at: number | null
          ap_id: number
          ap_ip_whitelist: string | null
          ap_passphrase: string | null
          ap_permissions: Json | null
          ap_provider: string | null
          ap_secret_key: string | null
          ap_sub_uid: string | null
          ap_updated_at: number | null
          ap_username: string | null
        }
        Insert: {
          ap_acc_id?: number | null
          ap_api_key?: string | null
          ap_api_key_id?: string | null
          ap_created_at?: number | null
          ap_id?: number
          ap_ip_whitelist?: string | null
          ap_passphrase?: string | null
          ap_permissions?: Json | null
          ap_provider?: string | null
          ap_secret_key?: string | null
          ap_sub_uid?: string | null
          ap_updated_at?: number | null
          ap_username?: string | null
        }
        Update: {
          ap_acc_id?: number | null
          ap_api_key?: string | null
          ap_api_key_id?: string | null
          ap_created_at?: number | null
          ap_id?: number
          ap_ip_whitelist?: string | null
          ap_passphrase?: string | null
          ap_permissions?: Json | null
          ap_provider?: string | null
          ap_secret_key?: string | null
          ap_sub_uid?: string | null
          ap_updated_at?: number | null
          ap_username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_provider_keys_ap_acc_id_fkey"
            columns: ["ap_acc_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["acc_id"]
          },
        ]
      }
      accounts: {
        Row: {
          acc_c_time: string
          acc_data: Json
          acc_group_id: number
          acc_id: number
          acc_status: Database["public"]["Enums"]["accountstatusenum"]
          acc_type: number
          acc_u_time: string
        }
        Insert: {
          acc_c_time?: string
          acc_data: Json
          acc_group_id: number
          acc_id?: number
          acc_status?: Database["public"]["Enums"]["accountstatusenum"]
          acc_type: number
          acc_u_time?: string
        }
        Update: {
          acc_c_time?: string
          acc_data?: Json
          acc_group_id?: number
          acc_id?: number
          acc_status?: Database["public"]["Enums"]["accountstatusenum"]
          acc_type?: number
          acc_u_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_acc_group_id_fkey"
            columns: ["acc_group_id"]
            isOneToOne: false
            referencedRelation: "account_groups"
            referencedColumns: ["acc_group_id"]
          },
        ]
      }
      alembic_version: {
        Row: {
          version_num: string
        }
        Insert: {
          version_num: string
        }
        Update: {
          version_num?: string
        }
        Relationships: []
      }
      apps: {
        Row: {
          app_id: number
          app_name: string
          app_settings: Json
          app_status: Database["public"]["Enums"]["appstatusenum"] | null
        }
        Insert: {
          app_id?: number
          app_name: string
          app_settings: Json
          app_status?: Database["public"]["Enums"]["appstatusenum"] | null
        }
        Update: {
          app_id?: number
          app_name?: string
          app_settings?: Json
          app_status?: Database["public"]["Enums"]["appstatusenum"] | null
        }
        Relationships: []
      }
      assets: {
        Row: {
          a_id: number
          a_logo: string | null
          a_name: string | null
          a_status: Database["public"]["Enums"]["assetstatusenum"] | null
          a_symbol: string | null
        }
        Insert: {
          a_id?: number
          a_logo?: string | null
          a_name?: string | null
          a_status?: Database["public"]["Enums"]["assetstatusenum"] | null
          a_symbol?: string | null
        }
        Update: {
          a_id?: number
          a_logo?: string | null
          a_name?: string | null
          a_status?: Database["public"]["Enums"]["assetstatusenum"] | null
          a_symbol?: string | null
        }
        Relationships: []
      }
      crypto_transactions: {
        Row: {
          ct_created_at: string | null
          ct_deposit_fee: string | null
          ct_from_address: string | null
          ct_id: number
          ct_network_fee: string | null
          ct_network_name: string | null
          ct_provider_id: string | null
          ct_success_at: string | null
          ct_t_id: number
          ct_tag: string | null
          ct_to_address: string | null
          ct_tx_hash: string | null
          ct_withdraw_fee: string | null
        }
        Insert: {
          ct_created_at?: string | null
          ct_deposit_fee?: string | null
          ct_from_address?: string | null
          ct_id?: number
          ct_network_fee?: string | null
          ct_network_name?: string | null
          ct_provider_id?: string | null
          ct_success_at?: string | null
          ct_t_id: number
          ct_tag?: string | null
          ct_to_address?: string | null
          ct_tx_hash?: string | null
          ct_withdraw_fee?: string | null
        }
        Update: {
          ct_created_at?: string | null
          ct_deposit_fee?: string | null
          ct_from_address?: string | null
          ct_id?: number
          ct_network_fee?: string | null
          ct_network_name?: string | null
          ct_provider_id?: string | null
          ct_success_at?: string | null
          ct_t_id?: number
          ct_tag?: string | null
          ct_to_address?: string | null
          ct_tx_hash?: string | null
          ct_withdraw_fee?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crypto_transactions_ct_t_id_fkey"
            columns: ["ct_t_id"]
            isOneToOne: true
            referencedRelation: "transactions"
            referencedColumns: ["t_id"]
          },
        ]
      }
      internal_transfers: {
        Row: {
          it_id: number
          it_receiver_id: number | null
          it_sender_id: number | null
          it_t_id: number | null
        }
        Insert: {
          it_id?: number
          it_receiver_id?: number | null
          it_sender_id?: number | null
          it_t_id?: number | null
        }
        Update: {
          it_id?: number
          it_receiver_id?: number | null
          it_sender_id?: number | null
          it_t_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "internal_transfers_it_receiver_id_fkey"
            columns: ["it_receiver_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["acc_id"]
          },
          {
            foreignKeyName: "internal_transfers_it_sender_id_fkey"
            columns: ["it_sender_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["acc_id"]
          },
          {
            foreignKeyName: "internal_transfers_it_t_id_fkey"
            columns: ["it_t_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["t_id"]
          },
        ]
      }
      ip_blocks: {
        Row: {
          ipb_blocked_until: number | null
          ipb_created_at: number
          ipb_failed_attempts: number | null
          ipb_id: number
          ipb_ip_address: string
          ipb_updated_at: number
        }
        Insert: {
          ipb_blocked_until?: number | null
          ipb_created_at: number
          ipb_failed_attempts?: number | null
          ipb_id?: number
          ipb_ip_address: string
          ipb_updated_at: number
        }
        Update: {
          ipb_blocked_until?: number | null
          ipb_created_at?: number
          ipb_failed_attempts?: number | null
          ipb_id?: number
          ipb_ip_address?: string
          ipb_updated_at?: number
        }
        Relationships: []
      }
      kyc_verifications: {
        Row: {
          kv_applicant_data: Json | null
          kv_client_comment: string | null
          kv_created_at: string
          kv_external_user_id: string | null
          kv_id: number
          kv_level_name: string | null
          kv_moderation_comment: string | null
          kv_reject_labels: Json | null
          kv_review_answer: string | null
          kv_review_reject_type: string | null
          kv_review_result: Json | null
          kv_status: Database["public"]["Enums"]["kycverificationstatusenum"]
          kv_sumsub_applicant_id: string | null
          kv_updated_at: string
          kv_user_id: number
          kv_verification_type: Database["public"]["Enums"]["kycverificationtypeenum"]
        }
        Insert: {
          kv_applicant_data?: Json | null
          kv_client_comment?: string | null
          kv_created_at?: string
          kv_external_user_id?: string | null
          kv_id?: number
          kv_level_name?: string | null
          kv_moderation_comment?: string | null
          kv_reject_labels?: Json | null
          kv_review_answer?: string | null
          kv_review_reject_type?: string | null
          kv_review_result?: Json | null
          kv_status?: Database["public"]["Enums"]["kycverificationstatusenum"]
          kv_sumsub_applicant_id?: string | null
          kv_updated_at?: string
          kv_user_id: number
          kv_verification_type: Database["public"]["Enums"]["kycverificationtypeenum"]
        }
        Update: {
          kv_applicant_data?: Json | null
          kv_client_comment?: string | null
          kv_created_at?: string
          kv_external_user_id?: string | null
          kv_id?: number
          kv_level_name?: string | null
          kv_moderation_comment?: string | null
          kv_reject_labels?: Json | null
          kv_review_answer?: string | null
          kv_review_reject_type?: string | null
          kv_review_result?: Json | null
          kv_status?: Database["public"]["Enums"]["kycverificationstatusenum"]
          kv_sumsub_applicant_id?: string | null
          kv_updated_at?: string
          kv_user_id?: number
          kv_verification_type?: Database["public"]["Enums"]["kycverificationtypeenum"]
        }
        Relationships: [
          {
            foreignKeyName: "kyc_verifications_kv_user_id_fkey"
            columns: ["kv_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["u_id"]
          },
        ]
      }
      otp: {
        Row: {
          o_c_time: string
          o_code: string
          o_context_hash: string | null
          o_expires_at: string
          o_id: number
          o_purpose: Database["public"]["Enums"]["otppurposeenum"] | null
          o_user_id: number | null
        }
        Insert: {
          o_c_time?: string
          o_code: string
          o_context_hash?: string | null
          o_expires_at: string
          o_id?: number
          o_purpose?: Database["public"]["Enums"]["otppurposeenum"] | null
          o_user_id?: number | null
        }
        Update: {
          o_c_time?: string
          o_code?: string
          o_context_hash?: string | null
          o_expires_at?: string
          o_id?: number
          o_purpose?: Database["public"]["Enums"]["otppurposeenum"] | null
          o_user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "otp_o_user_id_fkey"
            columns: ["o_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["u_id"]
          },
        ]
      }
      payments: {
        Row: {
          p_id: number
          p_t_id: number | null
        }
        Insert: {
          p_id?: number
          p_t_id?: number | null
        }
        Update: {
          p_id?: number
          p_t_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_p_t_id_fkey"
            columns: ["p_t_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["t_id"]
          },
        ]
      }
      rewards: {
        Row: {
          r_amount: string
          r_c_time: string
          r_currency: string
          r_destination: string
          r_details: Json
          r_id: number
          r_status: Database["public"]["Enums"]["rewardstatusenum"] | null
          t_id: number | null
        }
        Insert: {
          r_amount: string
          r_c_time?: string
          r_currency: string
          r_destination: string
          r_details: Json
          r_id?: number
          r_status?: Database["public"]["Enums"]["rewardstatusenum"] | null
          t_id?: number | null
        }
        Update: {
          r_amount?: string
          r_c_time?: string
          r_currency?: string
          r_destination?: string
          r_details?: Json
          r_id?: number
          r_status?: Database["public"]["Enums"]["rewardstatusenum"] | null
          t_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rewards_t_id_fkey"
            columns: ["t_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["t_id"]
          },
        ]
      }
      sessions: {
        Row: {
          s_active: boolean
          s_c_time: number
          s_device_id: string | null
          s_e_time: number
          s_id: string
          s_ip_address: string | null
          s_location: string | null
          s_refresh_token: string
          s_session_secret: string
          s_user_agent: string | null
          s_user_id: number
        }
        Insert: {
          s_active?: boolean
          s_c_time: number
          s_device_id?: string | null
          s_e_time: number
          s_id: string
          s_ip_address?: string | null
          s_location?: string | null
          s_refresh_token: string
          s_session_secret: string
          s_user_agent?: string | null
          s_user_id: number
        }
        Update: {
          s_active?: boolean
          s_c_time?: number
          s_device_id?: string | null
          s_e_time?: number
          s_id?: string
          s_ip_address?: string | null
          s_location?: string | null
          s_refresh_token?: string
          s_session_secret?: string
          s_user_agent?: string | null
          s_user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sessions_s_user_id_fkey"
            columns: ["s_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["u_id"]
          },
        ]
      }
      trades: {
        Row: {
          t_id: number
          t_pair: string | null
          t_t_id: number | null
        }
        Insert: {
          t_id?: number
          t_pair?: string | null
          t_t_id?: number | null
        }
        Update: {
          t_id?: number
          t_pair?: string | null
          t_t_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "trades_t_t_id_fkey"
            columns: ["t_t_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["t_id"]
          },
        ]
      }
      transaction_sync_status: {
        Row: {
          account_id: number
          created_at: string
          id: number
          last_error: string | null
          last_processed_tx_id: string | null
          last_sync_time: number
          sub_uid: string
          sync_count: number | null
          transaction_type: Database["public"]["Enums"]["transactiontypeenum"]
          updated_at: string
        }
        Insert: {
          account_id: number
          created_at?: string
          id?: number
          last_error?: string | null
          last_processed_tx_id?: string | null
          last_sync_time: number
          sub_uid: string
          sync_count?: number | null
          transaction_type: Database["public"]["Enums"]["transactiontypeenum"]
          updated_at?: string
        }
        Update: {
          account_id?: number
          created_at?: string
          id?: number
          last_error?: string | null
          last_processed_tx_id?: string | null
          last_sync_time?: number
          sub_uid?: string
          sync_count?: number | null
          transaction_type?: Database["public"]["Enums"]["transactiontypeenum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_sync_status_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["acc_id"]
          },
        ]
      }
      transactions: {
        Row: {
          acc_id: number
          t_amount: number | null
          t_asset_id: number | null
          t_id: number
          t_status: Database["public"]["Enums"]["transactionstatusenum"] | null
          t_timestamp: string
          t_type: Database["public"]["Enums"]["transactiontypeenum"] | null
        }
        Insert: {
          acc_id: number
          t_amount?: number | null
          t_asset_id?: number | null
          t_id?: number
          t_status?: Database["public"]["Enums"]["transactionstatusenum"] | null
          t_timestamp?: string
          t_type?: Database["public"]["Enums"]["transactiontypeenum"] | null
        }
        Update: {
          acc_id?: number
          t_amount?: number | null
          t_asset_id?: number | null
          t_id?: number
          t_status?: Database["public"]["Enums"]["transactionstatusenum"] | null
          t_timestamp?: string
          t_type?: Database["public"]["Enums"]["transactiontypeenum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_acc_id_fkey"
            columns: ["acc_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["acc_id"]
          },
          {
            foreignKeyName: "transactions_t_asset_id_fkey"
            columns: ["t_asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["a_id"]
          },
        ]
      }
      user_oauth: {
        Row: {
          u_status: Database["public"]["Enums"]["useroauthstatusenum"]
          uo_c_time: string
          uo_id: number
          uo_provider: Database["public"]["Enums"]["oauthproviderenum"]
          uo_provider_user_id: string
          uo_user_id: number
        }
        Insert: {
          u_status?: Database["public"]["Enums"]["useroauthstatusenum"]
          uo_c_time?: string
          uo_id?: number
          uo_provider: Database["public"]["Enums"]["oauthproviderenum"]
          uo_provider_user_id: string
          uo_user_id: number
        }
        Update: {
          u_status?: Database["public"]["Enums"]["useroauthstatusenum"]
          uo_c_time?: string
          uo_id?: number
          uo_provider?: Database["public"]["Enums"]["oauthproviderenum"]
          uo_provider_user_id?: string
          uo_user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_oauth_uo_user_id_fkey"
            columns: ["uo_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["u_id"]
          },
        ]
      }
      users: {
        Row: {
          acc_id: number
          app_id: number
          u_biometric_data: string | null
          u_biometric_enabled: boolean | null
          u_c_time: string
          u_details: Json | null
          u_email: string | null
          u_fullname: string | null
          u_id: number
          u_kyc_status: Database["public"]["Enums"]["kycstatusenum"] | null
          u_o_identificator: string | null
          u_phone: string | null
          u_profile_photo: string | null
          u_status: Database["public"]["Enums"]["userstatusenum"]
          u_tfa_activated: boolean | null
          u_tfa_secret: string | null
          u_u_time: string
          u_username: string | null
          u_uuid: string
        }
        Insert: {
          acc_id: number
          app_id: number
          u_biometric_data?: string | null
          u_biometric_enabled?: boolean | null
          u_c_time?: string
          u_details?: Json | null
          u_email?: string | null
          u_fullname?: string | null
          u_id?: number
          u_kyc_status?: Database["public"]["Enums"]["kycstatusenum"] | null
          u_o_identificator?: string | null
          u_phone?: string | null
          u_profile_photo?: string | null
          u_status?: Database["public"]["Enums"]["userstatusenum"]
          u_tfa_activated?: boolean | null
          u_tfa_secret?: string | null
          u_u_time?: string
          u_username?: string | null
          u_uuid: string
        }
        Update: {
          acc_id?: number
          app_id?: number
          u_biometric_data?: string | null
          u_biometric_enabled?: boolean | null
          u_c_time?: string
          u_details?: Json | null
          u_email?: string | null
          u_fullname?: string | null
          u_id?: number
          u_kyc_status?: Database["public"]["Enums"]["kycstatusenum"] | null
          u_o_identificator?: string | null
          u_phone?: string | null
          u_profile_photo?: string | null
          u_status?: Database["public"]["Enums"]["userstatusenum"]
          u_tfa_activated?: boolean | null
          u_tfa_secret?: string | null
          u_u_time?: string
          u_username?: string | null
          u_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_acc_id_fkey"
            columns: ["acc_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["acc_id"]
          },
          {
            foreignKeyName: "users_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["app_id"]
          },
        ]
      }
      verification_attempts: {
        Row: {
          va_attempts_count: number | null
          va_created_at: number
          va_expires_at: number
          va_id: number
          va_ip_address: string | null
          va_max_attempts: number | null
          va_type: Database["public"]["Enums"]["verificationtypeenum"]
          va_used: boolean
          va_user_agent: string | null
          va_user_id: number | null
          va_verification_code: string
          va_verification_data: Json | null
        }
        Insert: {
          va_attempts_count?: number | null
          va_created_at: number
          va_expires_at: number
          va_id?: number
          va_ip_address?: string | null
          va_max_attempts?: number | null
          va_type: Database["public"]["Enums"]["verificationtypeenum"]
          va_used?: boolean
          va_user_agent?: string | null
          va_user_id?: number | null
          va_verification_code: string
          va_verification_data?: Json | null
        }
        Update: {
          va_attempts_count?: number | null
          va_created_at?: number
          va_expires_at?: number
          va_id?: number
          va_ip_address?: string | null
          va_max_attempts?: number | null
          va_type?: Database["public"]["Enums"]["verificationtypeenum"]
          va_used?: boolean
          va_user_agent?: string | null
          va_user_id?: number | null
          va_verification_code?: string
          va_verification_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_attempts_va_user_id_fkey"
            columns: ["va_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["u_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      accountbalancestatusenum: "active" | "inactive"
      accountbalancetypeenum: "card" | "funding"
      accountgroupstatusenum: "active" | "inactive"
      accountstatusenum: "active" | "inactive"
      appstatusenum: "active" | "inactive"
      assetstatusenum: "active" | "inactive"
      cardstatusenum: "active" | "inactive"
      kycstatusenum: "not_verified" | "pending" | "verified" | "rejected"
      kycverificationstatusenum: "pending" | "approved" | "rejected" | "failed"
      kycverificationtypeenum: "identity" | "address" | "face" | "document"
      oauthproviderenum: "google" | "apple"
      otppurposeenum:
        | "register"
        | "change_identity"
        | "new_identity"
        | "forgot_password"
        | "login"
        | "deactivate_tfa"
        | "change_email_old"
        | "change_email_new"
        | "change_password"
      rewardstatusenum: "active" | "inactive"
      transactionstatusenum: "success" | "failed" | "pending"
      transactiontypeenum:
        | "withdraw"
        | "deposit"
        | "payment"
        | "internal_transfer"
      useroauthstatusenum: "active" | "inactive"
      userstatusenum:
        | "active"
        | "contact_verification"
        | "account_setup"
        | "inactive"
      verificationtypeenum:
        | "login"
        | "registration"
        | "password_reset"
        | "withdrawal"
        | "change_email"
        | "change_password"
        | "deactivate_tfa"
        | "change_identity"
        | "kyc_verification"
        | "device_registration"
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
      accountbalancestatusenum: ["active", "inactive"],
      accountbalancetypeenum: ["card", "funding"],
      accountgroupstatusenum: ["active", "inactive"],
      accountstatusenum: ["active", "inactive"],
      appstatusenum: ["active", "inactive"],
      assetstatusenum: ["active", "inactive"],
      cardstatusenum: ["active", "inactive"],
      kycstatusenum: ["not_verified", "pending", "verified", "rejected"],
      kycverificationstatusenum: ["pending", "approved", "rejected", "failed"],
      kycverificationtypeenum: ["identity", "address", "face", "document"],
      oauthproviderenum: ["google", "apple"],
      otppurposeenum: [
        "register",
        "change_identity",
        "new_identity",
        "forgot_password",
        "login",
        "deactivate_tfa",
        "change_email_old",
        "change_email_new",
        "change_password",
      ],
      rewardstatusenum: ["active", "inactive"],
      transactionstatusenum: ["success", "failed", "pending"],
      transactiontypeenum: [
        "withdraw",
        "deposit",
        "payment",
        "internal_transfer",
      ],
      useroauthstatusenum: ["active", "inactive"],
      userstatusenum: [
        "active",
        "contact_verification",
        "account_setup",
        "inactive",
      ],
      verificationtypeenum: [
        "login",
        "registration",
        "password_reset",
        "withdrawal",
        "change_email",
        "change_password",
        "deactivate_tfa",
        "change_identity",
        "kyc_verification",
        "device_registration",
      ],
    },
  },
} as const
