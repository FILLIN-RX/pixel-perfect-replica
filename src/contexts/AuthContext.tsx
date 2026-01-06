import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AppRole = "chef_departement" | "enseignant" | "delegue";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: AppRole;
  departement: string | null;
  niveau: string | null;
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  createUser: (email: string, password: string, fullName: string, role: AppRole, departement?: string, niveau?: string) => Promise<{ error: Error | null }>;
  getAllProfiles: () => Promise<Profile[]>;
  deleteUser: (userId: string) => Promise<{ error: Error | null }>;
  isChef: boolean;
  isEnseignant: boolean;
  isDelegue: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      return data as Profile | null;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Defer profile fetch to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id).then(setProfile);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then((p) => {
          setProfile(p);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error(error.message);
        return { error };
      }
      toast.success("Connexion réussie");
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    toast.success("Déconnexion réussie");
  };

  // Function for Chef to create new users
  const createUser = async (
    email: string,
    password: string,
    fullName: string,
    role: AppRole,
    departement?: string,
    niveau?: string
  ) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Cet email est déjà utilisé");
        } else {
          toast.error(error.message);
        }
        return { error };
      }

      // Update profile with additional info if provided
      if (data.user && (departement || niveau)) {
        await supabase
          .from("profiles")
          .update({ 
            departement: departement || null, 
            niveau: niveau || null 
          })
          .eq("user_id", data.user.id);
      }
      
      toast.success(`${role === "enseignant" ? "Enseignant" : "Délégué"} créé avec succès`);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Function for Chef to get all profiles
  const getAllProfiles = async (): Promise<Profile[]> => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching profiles:", error);
        return [];
      }
      return data as Profile[];
    } catch (error) {
      console.error("Error fetching profiles:", error);
      return [];
    }
  };

  // Function for Chef to delete a user (soft delete - just removes from profiles)
  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("user_id", userId);

      if (error) {
        toast.error("Erreur lors de la suppression");
        return { error };
      }
      
      toast.success("Utilisateur supprimé");
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const isChef = profile?.role === "chef_departement";
  const isEnseignant = profile?.role === "enseignant";
  const isDelegue = profile?.role === "delegue";

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signOut,
        createUser,
        getAllProfiles,
        deleteUser,
        isChef,
        isEnseignant,
        isDelegue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
