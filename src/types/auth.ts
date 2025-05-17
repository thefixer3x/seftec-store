
import { Session, User } from '@supabase/supabase-js';

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  business_type: string | null;
  is_vendor: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<Profile>) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: { fullName: string; email: string; phone?: string }) => Promise<void>;
  signInWithBiometric: () => Promise<void>;
}
