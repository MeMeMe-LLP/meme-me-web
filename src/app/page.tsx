import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-slate-50 text-slate-900">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center max-w-2xl">
        <div className="text-sm font-mono bg-blue-100 text-blue-800 px-3 py-1 rounded-full animate-bounce">
          Enterprise-grade disruption. Now with more Doge.
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
          Meme<span className="text-blue-600">@Me</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed font-light">
          The world's first <span className="font-semibold italic underline decoration-wavy decoration-pink-500">highly professional</span> platform for injecting unsolicited, fully-animated memes directly onto your desktop.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-lg sm:text-xl h-14 px-8 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
            href="https://npmjs.com/package/@meme/me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-2xl">🚀</span> Install CLI
          </a>
          <a
            className="rounded-full border-2 border-slate-300 transition-colors flex items-center justify-center hover:bg-slate-100 hover:border-slate-400 text-lg sm:text-xl h-14 px-8 font-semibold shadow-sm"
            href="#docs"
          >
            Read the Whitepaper (lol)
          </a>
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl shadow-xl border border-slate-100 w-full text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-500 text-6xl">
            🐕
          </div>
          <h3 className="font-mono text-sm text-slate-500 mb-2 uppercase tracking-widest">Quick Start</h3>
          <pre className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm sm:text-base overflow-x-auto shadow-inner">
            <code>
              $ npx @meme/me --gif=nyan --walk --sound=max --duration=infinite
            </code>
          </pre>
          <p className="mt-4 text-sm text-slate-500">
            Warning: We are not responsible for lost productivity, HR complaints, or sudden feelings of immense joy.
          </p>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Meme@Me Corporation. Serious Business Only.</p>
      </footer>
    </div>
  );
}
