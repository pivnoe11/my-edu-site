import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { createClient } from "../../../lib/supabase/server";
import { getTopicBySlug } from "../../../lib/topics";

export default async function TopicGraphPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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

  if (supabase && user) {
    const { error } = await supabase.from("user_topic_progress").upsert(
      {
        user_id: user.id,
        topic_slug: topic.slug,
        status: "started",
        last_opened_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,topic_slug",
      }
    );

    progressSaved = !error;
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

          {progressSaved ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
              Прогресс сохранён
            </div>
          ) : null}
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

