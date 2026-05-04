"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function redirectWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function signUpAction(formData: FormData) {
  const name = getString(formData, "name");
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");

  if (!name || !email || !password) {
    redirectWithError("/sign-up", "Заполните имя, email и пароль.");
  }

  if (password.length < 6) {
    redirectWithError("/sign-up", "Пароль должен быть не короче 6 символов.");
  }

  const supabase = await createClient();

  if (!supabase) {
    redirectWithError(
      "/sign-up",
      "Supabase ещё не настроен. Добавьте переменные окружения."
    );
  }

  const origin =
    (await headers()).get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    redirectWithError("/sign-up", error.message);
  }

  redirect("/sign-in?registered=1");
}

export async function signInAction(formData: FormData) {
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");

  if (!email || !password) {
    redirectWithError("/sign-in", "Введите email и пароль.");
  }

  const supabase = await createClient();

  if (!supabase) {
    redirectWithError(
      "/sign-in",
      "Supabase ещё не настроен. Добавьте переменные окружения."
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirectWithError("/sign-in", error.message);
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/sign-in");
}

