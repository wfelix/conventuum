import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-6 text-black">
      <div className="flex justify-center mb-6">
        <Image
          src="/logo-neutrino.png"
          alt="Logo da Equipe Neutrino"
          width={160}
          height={160}
          className="rounded-full"
          priority
        />
      </div>

      <h1 className="text-center text-gray-600 mb-2">Equipe Neutrino</h1>
      <h2 className="text-center text-gray-500 mb-8">Coordenador: Wilson Felix</h2>

      <h1 className="text-2xl font-bold text-center">Primeiro Aperfeiçoamento Prático</h1>
      <h3 className="text-3xl font-bold text-center">05/06/2025</h3>
    </main>
  );
}
