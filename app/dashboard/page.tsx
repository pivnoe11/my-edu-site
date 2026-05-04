import { redirect } from "next/navigation";
import Navbar from "../../components/Navbar";
import ProfileNameEditor from "../../components/ProfileNameEditor";
import { createClient } from "@/lib/supabase/server";

type Profile = {
  full_name: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export const dynamic = "force-dynamic";

type DashboardPageProps = {
  searchParams?: Promise<{
    error?: string;
    updated?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const errorMessage = params?.error;
  const isUpdated = params?.updated === "1";
  const supabase = await createClient();

  if (!supabase) {
    return (
      <main className="min-h-screen bg-gray-50 text-black">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-12">
          <h1 className="text-4xl font-bold">Личный кабинет</h1>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            Supabase ещё не настроен. Добавьте переменные окружения, чтобы вход
            и регистрация начали работать.
          </div>
        </section>
      </main>
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/sign-in");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, created_at, updated_at")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  const metadataName =
    typeof user.user_metadata.full_name === "string"
      ? user.user_metadata.full_name
      : null;
  const displayName = profile?.full_name || metadataName || "Ученик";
  const email = user.email ?? "email не указан";
  const solvedTasks = 0;
  const progressPercent = 0;
  const currentTopic = "Выберите тему";

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
              Профиль ученика
            </p>
            <h1 className="mt-2 text-4xl font-bold">{displayName}</h1>
            <p className="mt-2 text-gray-600">
              Личный кабинет с реальными данными аккаунта.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Аккаунт</h2>

            {isUpdated ? (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                Профиль обновлён.
              </div>
            ) : null}

            {errorMessage ? (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <dl className="mt-6">
              <div className="rounded-2xl border border-gray-200 p-4">
                <ProfileNameEditor displayName={displayName} email={email} />
              </div>
            </dl>

          </section>

          <section className="rounded-3xl bg-black p-6 text-white shadow-sm">
            <h2 className="text-xl font-semibold">Мой прогресс</h2>
            <p className="mt-2 text-sm text-gray-300">
              Здесь будут реальные результаты после подключения заданий.
            </p>

            <div className="mt-8">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Общий прогресс</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-gray-300">Решено заданий</p>
                <p className="mt-1 text-3xl font-bold">{solvedTasks}</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-gray-300">Текущая тема</p>
                <p className="mt-1 text-lg font-semibold">{currentTopic}</p>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Последние действия</h2>
          <div className="mt-4 rounded-2xl border border-dashed border-gray-300 p-6 text-gray-600">
            Пока нет сохранённых действий. Когда появятся задания и темы, здесь
            будет история обучения.
          </div>
        </section>
      </section>
    </main>
  );
}
