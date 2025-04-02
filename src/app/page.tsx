import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold">Acesse seu crachá virtual aqui e acompanhe seu progresso.</h1>
      <p className="mt-4 text-lg text-center">
        Entre ou cadastre-se.
      </p>
      <div className="mt-6 flex gap-4">
        <Link href="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Entrar
          </button>
        </Link>
        <Link href="/register">
          <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
            Criar Conta
          </button>
        </Link>
      </div>
    </div>
  );
}