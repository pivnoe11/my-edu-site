import { redirect } from "next/navigation";
import Navbar from "../../components/Navbar";
import { signOutAction } from "../auth/actions";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <main className="min-h-screen bg-gray-50 text-black">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-12">
          <h1 className="text-4xl font-bold">Личный кабинет</h1>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            Supabase ещё не настроен. Добавьте переменные окружения, чтобы вход и
            регистрация начали работать.
          </div>
        </section>
      </main>
    );
  }

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (error || !claims) {
    redirect("/sign-in");
  }

  const email = typeof claims.email === "string" ? claims.email : "ученик";

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Личный кабинет</h1>
            <p className="mt-2 text-gray-600">
              Здесь будет твой прогресс, темы и последние задания.
            </p>
            <p className="mt-2 text-sm text-gray-500">Вы вошли как {email}</p>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-xl border border-gray-300 px-5 py-2 text-gray-700 transition hover:border-black hover:text-black"
            >
              Выйти
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Общий прогресс</h2>
            <p className="mt-4 text-3xl font-bold">24%</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Решено заданий</h2>
            <p className="mt-4 text-3xl font-bold">12</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Текущая тема</h2>
            <p className="mt-4 text-xl font-medium">Графики функций</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Последние действия</h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>Решено задание №5</li>
            <li>Открыта тема “Линейные функции”</li>
            <li>Получена подсказка в задании №3</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
