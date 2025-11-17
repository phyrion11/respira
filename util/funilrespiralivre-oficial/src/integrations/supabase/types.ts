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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achieved_at: string | null
          coins_reward: number | null
          description: string
          id: string
          type: string
          user_id: string
          xp_reward: number | null
        }
        Insert: {
          achieved_at?: string | null
          coins_reward?: number | null
          description: string
          id?: string
          type: string
          user_id: string
          xp_reward?: number | null
        }
        Update: {
          achieved_at?: string | null
          coins_reward?: number | null
          description?: string
          id?: string
          type?: string
          user_id?: string
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          created_at: string | null
          description: string
          icon_url: string
          id: string
          name: string
          rarity: Database["public"]["Enums"]["badge_rarity"] | null
          requirement: string
        }
        Insert: {
          created_at?: string | null
          description: string
          icon_url: string
          id?: string
          name: string
          rarity?: Database["public"]["Enums"]["badge_rarity"] | null
          requirement: string
        }
        Update: {
          created_at?: string | null
          description?: string
          icon_url?: string
          id?: string
          name?: string
          rarity?: Database["public"]["Enums"]["badge_rarity"] | null
          requirement?: string
        }
        Relationships: []
      }
      check_ins: {
        Row: {
          coins_earned: number | null
          coping_strategy: string | null
          craving_level: number
          created_at: string | null
          id: string
          mood: Database["public"]["Enums"]["checkin_mood"]
          notes: string | null
          trigger_moment: string | null
          user_id: string
        }
        Insert: {
          coins_earned?: number | null
          coping_strategy?: string | null
          craving_level: number
          created_at?: string | null
          id?: string
          mood: Database["public"]["Enums"]["checkin_mood"]
          notes?: string | null
          trigger_moment?: string | null
          user_id: string
        }
        Update: {
          coins_earned?: number | null
          coping_strategy?: string | null
          craving_level?: number
          created_at?: string | null
          id?: string
          mood?: Database["public"]["Enums"]["checkin_mood"]
          notes?: string | null
          trigger_moment?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "check_ins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          addiction_type: Database["public"]["Enums"]["addiction_type"]
          age: number | null
          avatar_url: string | null
          cigarettes_per_day: number | null
          created_at: string | null
          current_streak: number | null
          gender: string | null
          id: string
          last_smoke_date: string | null
          league: Database["public"]["Enums"]["league_type"] | null
          level: number | null
          location: string | null
          longest_streak: number | null
          quit_attempts: number | null
          quit_start_date: string | null
          respir_coins: number | null
          status: Database["public"]["Enums"]["user_status"] | null
          total_xp: number | null
          updated_at: string | null
          username: string
          years_smoking: number | null
        }
        Insert: {
          addiction_type: Database["public"]["Enums"]["addiction_type"]
          age?: number | null
          avatar_url?: string | null
          cigarettes_per_day?: number | null
          created_at?: string | null
          current_streak?: number | null
          gender?: string | null
          id: string
          last_smoke_date?: string | null
          league?: Database["public"]["Enums"]["league_type"] | null
          level?: number | null
          location?: string | null
          longest_streak?: number | null
          quit_attempts?: number | null
          quit_start_date?: string | null
          respir_coins?: number | null
          status?: Database["public"]["Enums"]["user_status"] | null
          total_xp?: number | null
          updated_at?: string | null
          username: string
          years_smoking?: number | null
        }
        Update: {
          addiction_type?: Database["public"]["Enums"]["addiction_type"]
          age?: number | null
          avatar_url?: string | null
          cigarettes_per_day?: number | null
          created_at?: string | null
          current_streak?: number | null
          gender?: string | null
          id?: string
          last_smoke_date?: string | null
          league?: Database["public"]["Enums"]["league_type"] | null
          level?: number | null
          location?: string | null
          longest_streak?: number | null
          quit_attempts?: number | null
          quit_start_date?: string | null
          respir_coins?: number | null
          status?: Database["public"]["Enums"]["user_status"] | null
          total_xp?: number | null
          updated_at?: string | null
          username?: string
          years_smoking?: number | null
        }
        Relationships: []
      }
      squad_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string | null
          squad_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string | null
          squad_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string | null
          squad_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "squad_members_squad_id_fkey"
            columns: ["squad_id"]
            isOneToOne: false
            referencedRelation: "squads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "squad_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      squads: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          max_members: number | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          max_members?: number | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          max_members?: number | null
          name?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
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
      increment_coins: {
        Args: { amount: number; user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      addiction_type: "CIGARETTE" | "MARIJUANA" | "BOTH"
      badge_rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY"
      checkin_mood: "GREAT" | "GOOD" | "STRUGGLING" | "CRISIS"
      league_type:
        | "INICIANTE"
        | "BRONZE"
        | "PRATA"
        | "OURO"
        | "PLATINA"
        | "DIAMANTE"
        | "LIBERDADE"
      user_status: "ACTIVE" | "PAUSED" | "INACTIVE"
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
      addiction_type: ["CIGARETTE", "MARIJUANA", "BOTH"],
      badge_rarity: ["COMMON", "RARE", "EPIC", "LEGENDARY"],
      checkin_mood: ["GREAT", "GOOD", "STRUGGLING", "CRISIS"],
      league_type: [
        "INICIANTE",
        "BRONZE",
        "PRATA",
        "OURO",
        "PLATINA",
        "DIAMANTE",
        "LIBERDADE",
      ],
      user_status: ["ACTIVE", "PAUSED", "INACTIVE"],
    },
  },
} as const
