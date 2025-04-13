"use client";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ScanQR = dynamic(
  () => import('@/components/ScanQR'),
  { ssr: false }
);

type Stamp = {
  id: number;
  code: string;
  name: string;
  redeemedAt?: string;
};

export default function CardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [pegarStamps, setPegarStamps] = useState<Stamp[]>([]);
  const [userStamps, setUserStamps] = useState<Stamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [animFilp, setAnimFilp] = useState(false);
  const [mensagemForm, setMensagemForm] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);
  const [renderScan, serRenderScan] = useState(false);
  const inputCodigo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('/api/auth/user');
        
        if (userRes.status === 401) {
          router.push('/login');
          return;
        }

        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();
        setUser(userData.user);

        const [stampsRes, userStampsRes] = await Promise.all([
          fetch('/api/stamps'),
          fetch('/api/user/stamps')
        ]);

        if (!stampsRes.ok || !userStampsRes.ok) {
          throw new Error('Erro ao recuperar os stamps');
        }

        setPegarStamps(await stampsRes.json());
        setUserStamps(await userStampsRes.json());

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleFlip = () => {
    if (animFilp) return;
    setAnimFilp(true);
    setIsFlipped(!isFlipped);
    setTimeout(() => setAnimFilp(false), 200);
  };

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "GET" });
    if (res.ok) {
      router.push("/login");
    }
  };

  const getCode = (result: string) => {
    if (inputCodigo.current) {
      inputCodigo.current.value = result;
      inputCodigo.current.focus();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"/>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Usuário não autenticado.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <button
        onClick={handleLogout}
        className="absolute top-5 right-6 py-2 px-3 bg-red-500 text-xl font-semibold rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 z-50 shadow-md"
      >
        Sair
      </button>

      <div className={`flip-container w-full max-w-sm h-[35rem] ${animFilp ? 'pointer-events-none' : ''}`}>
        <div className={`flip-card relative w-full h-full ${isFlipped ? 'flipped' : ''}`}>
          <div className={`card-face absolute w-full h-full ${isFlipped ? 'hidden' : ''}`}>
            <div className="absolute -top-18 left-1/2 -translate-x-1/2 w-22 h-24 rounded-b-lg z-30 shadow-xl bg-[linear-gradient(to_bottom,transparent_0%,rgba(31,41,55,0.8)_10%,rgba(31,41,55,1)_20%)]"/>
            <div className="absolute inset-0 w-full h-full rounded-xl shadow-xl overflow-hidden flex flex-col p-8">
              <div className="absolute inset-0 bg-[url('/images/card-bg.png')] bg-cover"/>
              <div className="relative z-40 flex flex-col h-full items-center">
                <div className="w-40 h-20 mx-auto mb-8">
                  <Image 
                    src="/images/logo.svg" 
                    alt="Event Logo" 
                    width={500} 
                    height={200} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="bg-white/90 rounded-lg p-2 mb-4 w-full max-w-xs">
                  <p className="text-2xl font-bold text-gray-800 text-center uppercase">visitante</p>
                </div>
                <div className="bg-white/90 rounded-lg p-4 w-full max-w-xs">
                  <h1 className="text-3xl font-semibold text-gray-800 text-center">{user.name}</h1>
                </div>
                <div className="mt-auto relative">
                  <button onClick={handleFlip} className="absolute left-35 bottom-0 translate-y-5">
                    <span className="text-4xl">↪</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`card-face card-back bg-[url('/images/card-bg.png')] rounded-xl bg-cover absolute w-full h-full ${!isFlipped ? 'hidden' : ''}`}>
            <div className="absolute -top-18 left-1/2 -translate-x-1/2 w-22 h-24 rounded-b-lg z-30 shadow-xl bg-[linear-gradient(to_bottom,transparent_0%,rgba(17,24,39,0.5)_30%,rgba(17,24,39,1)_70%)]"/>
            <div className="absolute inset-0 w-full h-full shadow-xl overflow-hidden flex flex-col">
              <button onClick={handleFlip} className="absolute top-4 left-4 rounded-full flex items-center justify-center z-40">
                <span className="text-4xl">↩</span>
              </button>
              <div className="p-6 pt-16">
                <h2 className="text-2xl font-bold text-center mb-6 uppercase">gamificação</h2>
                <div className="grid grid-cols-5 gap-2 mb-8">
                  {pegarStamps.map((stamp) => {
                    const resgatado = userStamps.some(us => us.id === stamp.id);
                    return (
                      <div
                        key={stamp.id}
                        className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                          resgatado 
                            ? 'bg-green-100/90 border-2 border-green-300 shadow-inner' 
                            : 'bg-white/30 border border-white/50'
                        }`}
                      >
                        {resgatado && <span className="text-green-700 text-xl font-medium">✔</span>}
                      </div>
                    );
                  })}
                </div>
                <div className="bg-white/90 rounded-xl p-6 shadow-sm border border-white/50">
                  <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">Resgatar</h3>
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const code = formData.get('code') as string;
                      try {
                        setMensagemForm(null);
                        const response = await fetch('/api/stamps/redeem', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ code }),
                        });
                        const data = await response.json();
                        if (!response.ok) {
                          setMensagemForm({
                            text: data.error || 'Erro ao resgatar.',
                            isError: true
                          });
                          return;
                        }
                        const userStampsRes = await fetch('/api/user/stamps');
                        if (userStampsRes.ok) {
                          setUserStamps(await userStampsRes.json());
                        }
                        form.reset();
                        setMensagemForm({
                          text: 'Resgate feito com sucesso.',
                          isError: false
                        });
                      } catch (error) {
                        console.error('Error:', error);
                        setMensagemForm({
                          text: 'Ocorreu um erro. Tente novamente.',
                          isError: true
                        });
                      }
                    }}
                    className="flex flex-col gap-3"
                  >
                    <input
                      ref={inputCodigo}
                      name="code"
                      type="text"
                      placeholder="Insira um código"
                      className="px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <div className="h-5 flex items-center justify-center">
                      {mensagemForm && (
                        <p className={`text-sm ${
                          mensagemForm.isError ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {mensagemForm.text}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex-1"
                      >
                        Confirmar
                      </button>
                      <button
                        type="button"
                        onClick={() => serRenderScan(true)}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex-1"
                      >
                        QR Code
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderScan && (
        <ScanQR
          onScan={getCode}
          onClose={() => serRenderScan(false)}
        />
      )}
    </div>
  );
}