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
  const userMetadata = data?.claims?.user_metadata;
  const name =
    userMetadata &&
    typeof userMetadata === "object" &&
    "full_name" in userMetadata &&
    typeof userMetadata.full_name === "string"
      ? userMetadata.full_name
      : null;
  const accountLabel = name || email;
  const accountInitial = (accountLabel?.trim().charAt(0) || "Я").toUpperCase();

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

          {accountLabel ? (
            <>
              <Link
                href="/dashboard"
                className="flex max-w-[260px] items-center gap-3 rounded-2xl border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:border-black hover:bg-white hover:shadow-md"
                title={email || accountLabel}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  {accountInitial}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold leading-4">
                    {accountLabel}
                  </span>
                  <span className="block text-xs leading-4 text-gray-500">
                    Личный кабинет
                  </span>
                </span>
              </Link>

              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-xl border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
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
