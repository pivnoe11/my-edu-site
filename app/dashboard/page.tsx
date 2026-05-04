import { redirect } from "next/navigation";
import Navbar from "../../components/Navbar";
import { signOutAction, updateProfileAction } from "../auth/actions";
import { createClient } from "@/lib/supabase/server";

type Profile = {
  full_name: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export const dynamic = "force-dynamic";

function formatDate(value?: string | null) {
  if (!value) {
    return "пока неизвестно";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

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
  const joinedAt = profile?.created_at ?? user.created_at;
  const profileUpdatedAt =
    profile?.updated_at ??
    (typeof user.user_metadata.full_name === "string"
      ? user.updated_at
      : null);
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

          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-xl border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
            >
              Выйти
            </button>
          </form>
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

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 p-4">
                <dt className="text-sm text-gray-500">Имя</dt>
                <dd className="mt-1 text-lg font-semibold">{displayName}</dd>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <dt className="text-sm text-gray-500">Email</dt>
                <dd className="mt-1 break-all text-lg font-semibold">
                  {email}
                </dd>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <dt className="text-sm text-gray-500">Дата регистрации</dt>
                <dd className="mt-1 text-lg font-semibold">
                  {formatDate(joinedAt)}
                </dd>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <dt className="text-sm text-gray-500">Профиль обновлён</dt>
                <dd className="mt-1 text-lg font-semibold">
                  {formatDate(profileUpdatedAt)}
                </dd>
              </div>
            </dl>

            <form
              action={updateProfileAction}
              className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4"
            >
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-600"
              >
                Изменить имя
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  defaultValue={displayName}
                  required
                  maxLength={40}
                  className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
                >
                  Сохранить
                </button>
              </div>
            </form>
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
