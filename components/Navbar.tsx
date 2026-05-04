import Link from "next/link";
import { signOutAction } from "../app/auth/actions";
import { createClient } from "../lib/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.auth.getClaims()
    : { data: null };
  const email =
    typeof data?.claims?.email === "string" ? data.claims.email : null;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-black">
          Физическая одиссея
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/sections"
            className="text-gray-600 transition hover:text-black"
          >
            Разделы
          </Link>

          {email ? (
            <>
              <Link
                href="/dashboard"
                className="max-w-[240px] truncate rounded-xl border border-gray-200 px-4 py-2 text-gray-700 transition hover:border-black hover:text-black"
                title={email}
              >
                {email}
              </Link>

              <form action={signOutAction}>
                <button
                  type="submit"
                  className="text-gray-600 transition hover:text-black"
                >
                  Выйти
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-gray-600 transition hover:text-black"
              >
                Войти
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl bg-black px-5 py-2 text-white transition hover:bg-gray-800"
              >
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
