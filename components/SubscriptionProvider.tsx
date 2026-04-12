"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthProvider";
import {
  getSubscription,
  type SubscriptionStatus,
  type SubscriptionTier,
} from "@/lib/subscription";

interface SubscriptionContextType {
  tier: SubscriptionTier;
  subscription: SubscriptionStatus | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  tier: "free",
  subscription: null,
  loading: true,
  refresh: async () => {},
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [subscription, setSubscription] =
    useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }
    try {
      const sub = await getSubscription(user.id);
      setSubscription(sub);
    } catch {
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <SubscriptionContext.Provider
      value={{
        tier: subscription?.tier ?? "free",
        subscription,
        loading,
        refresh,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
