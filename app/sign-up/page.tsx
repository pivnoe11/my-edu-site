import Navbar from "../../components/Navbar";
import { signUpAction } from "../auth/actions";

type SignUpPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <Navbar />

      <section className="mx-auto flex max-w-6xl justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Регистрация</h1>
          <p className="mt-2 text-gray-600">
            Создай аккаунт, чтобы сохранять прогресс.
          </p>

          {error ? (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <form action={signUpAction} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Имя</label>
              <input
                name="name"
                type="text"
                placeholder="Ваше имя"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Пароль</label>
              <input
                name="password"
                type="password"
                placeholder="Придумайте пароль"
                required
                minLength={6}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
