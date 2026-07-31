"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";

import { loginAction, type LoginState } from "@/lib/actions/auth-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-5">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Email</span>
        <Input type="email" name="email" required autoComplete="username" />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Password</span>
        <Input type="password" name="password" required autoComplete="current-password" />
      </label>
      {state.error && <p className="text-sm text-noble-error">{state.error}</p>}
      <Button type="submit" size="lg" disabled={isPending} className="mt-2 gap-2">
        <Lock className="h-4 w-4" />
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
