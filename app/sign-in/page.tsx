import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/PasswordInput";
import { signInAction } from "../auth/actions";

type SignInPageProps = {
  searchParams?: Promise<{
    error?: string;
    registered?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const error = params?.error;
  const registered = params?.registered === "1";

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <Navbar />

      <section className="mx-auto flex max-w-6xl justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Вход</h1>
          <p className="mt-2 text-gray-600">
            Войди в аккаунт, чтобы продолжить обучение.
          </p>

          {registered ? (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              Аккаунт создан. Если в Supabase включено подтверждение email,
              проверьте почту перед входом.
            </div>
          ) : null}

          {error ? (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <form action={signInAction} className="mt-8 space-y-4">
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
              <PasswordInput
                name="password"
                placeholder="Введите пароль"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
            >
              Войти
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
