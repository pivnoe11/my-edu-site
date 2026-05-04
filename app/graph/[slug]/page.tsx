import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { completeTopicAction } from "../../auth/actions";
import { createClient } from "../../../lib/supabase/server";
import { getTopicBySlug } from "../../../lib/topics";

export default async function TopicGraphPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ completed?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const wasJustCompleted = query?.completed === "1";
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#f4f4f2] text-black">
        <Navbar />
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-3xl font-bold">Тема не найдена</h1>
          <Link
            href="/mechanics"
            className="mt-6 inline-block rounded-xl bg-green-800 px-5 py-3 text-white"
          >
            Назад к механике
          </Link>
        </section>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = supabase
    ? await supabase.auth.getUser()
    : { data: { user: null } };

  let progressSaved = false;
  let isCompleted = false;

  if (supabase && user) {
    const { data: existingProgress } = await supabase
      .from("user_topic_progress")
      .select("status")
      .eq("user_id", user.id)
      .eq("topic_slug", topic.slug)
      .maybeSingle<{ status: string }>();
    const status =
      existingProgress?.status === "completed" ? "completed" : "started";
    const { error } = await supabase.from("user_topic_progress").upsert(
      {
        user_id: user.id,
        topic_slug: topic.slug,
        status,
        last_opened_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,topic_slug",
      }
    );

    progressSaved = !error;
    isCompleted = status === "completed" || wasJustCompleted;
  }

  return (
    <main className="min-h-screen bg-[#f4f4f2] text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/mechanics"
          className="mb-6 inline-block text-sm text-green-800 hover:underline"
        >
          ← Назад к разделу механики
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">{topic.title}</h1>

            <p className="mt-4 max-w-3xl text-lg text-gray-600">
              {topic.description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            {progressSaved ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                {isCompleted ? "Тема завершена" : "Прогресс сохранён"}
              </div>
            ) : null}

            {user ? (
              <form action={completeTopicAction}>
                <input type="hidden" name="topic_slug" value={topic.slug} />
                <button
                  type="submit"
                  className="rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-default disabled:bg-gray-400"
                  disabled={isCompleted}
                >
                  {isCompleted ? "Тема завершена" : "Завершить тему"}
                </button>
              </form>
            ) : (
              <Link
                href="/sign-in"
                className="rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                Войти, чтобы сохранить прогресс
              </Link>
            )}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-dashed border-green-700/40 bg-white p-10 shadow-sm">
          <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-green-50 text-center text-lg text-green-900">
            Здесь будет граф по теме «{topic.title}»
          </div>
        </div>
      </section>
    </main>
  );
}
