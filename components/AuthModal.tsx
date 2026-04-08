"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export function AuthModal({
  open,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "login") {
      const err = await signIn(email, password);
      if (err) {
        setError(err);
      } else {
        onClose();
      }
    } else {
      const err = await signUp(email, password);
      if (err) {
        setError(err);
      } else {
        setSignupSuccess(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl w-full max-w-sm mx-4 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">
            {mode === "login" ? "Log In" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {signupSuccess ? (
          <div className="text-center py-4">
            <p className="text-green-400 font-medium mb-2">Account created!</p>
            <p className="text-gray-400 text-sm">
              Check your email for a confirmation link, then log in.
            </p>
            <Button
              className="mt-4 bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              onClick={() => {
                setMode("login");
                setSignupSuccess(false);
              }}
            >
              Go to Log In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2.5 rounded-lg bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold h-11"
            >
              {loading
                ? "..."
                : mode === "login"
                  ? "Log In"
                  : "Create Account"}
            </Button>

            <p className="text-center text-sm text-gray-500">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError(null);
                    }}
                    className="text-yellow-400 hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                    }}
                    className="text-yellow-400 hover:underline cursor-pointer"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
