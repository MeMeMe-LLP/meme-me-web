"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [mems, setMems] = useState<{ id: number; type: string; x: number }[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const counter = useRef(0);

  // Use Web Audio API for a generic "Thud" sound to ensure it works without external assets
  const playThudSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); // Low frequency
      oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  const spawnMeme = (type: string) => {
    // Add to screen
    const newMeme = {
      id: counter.current++,
      type,
      x: Math.random() * 60 + 20, // Random X position (20% to 80%)
    };
    
    setMems((prev) => [...prev, newMeme]);

    // Play sound and shake screen when it "hits"
    setTimeout(() => {
      playThudSound();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }, 400); // Trigger hit effect after animation plays partway

    // Remove after animation completes
    setTimeout(() => {
      setMems((prev) => prev.filter((m) => m.id !== newMeme.id));
    }, 2000);
  };

  return (
    <div className={`min-h-screen bg-gray-950 text-white flex flex-col font-sans overflow-hidden ${isShaking ? "animate-shake" : ""}`}>
      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex justify-between items-center bg-gray-900">
        <h1 className="text-xl font-bold text-purple-400 font-mono tracking-tight">Meme@Me // Web Demo</h1>
        <div className="flex gap-4 text-sm text-gray-400">
          <span>Viewers: 1,402</span>
          <span className="text-red-400 animate-pulse">● LIVE</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Stream Area */}
        <main className="flex-1 relative bg-black flex flex-col items-center justify-center p-8">
          {/* Fake Stream Video */}
          <div className="w-full max-w-5xl aspect-video bg-gray-800 rounded-lg border-2 border-gray-700 flex items-center justify-center relative overflow-hidden shadow-2xl">
            <p className="text-gray-500 font-mono text-xl">Streamer Feed</p>
            
            {/* Spawned Memes */}
            {mems.map((meme) => (
              <div 
                key={meme.id}
                className="absolute animate-drop top-0"
                style={{ left: `${meme.x}%` }}
              >
                {meme.type === "anvil" && (
                  <img 
                    src="/assets/images/anvil.jpg" 
                    alt="Anvil" 
                    className="w-48 h-48 object-contain filter drop-shadow-2xl mix-blend-screen opacity-90"
                  />
                )}
                {meme.type === "doge" && (
                  <img 
                    src="/assets/images/doge.jpg" 
                    alt="Doge" 
                    className="w-48 h-48 object-cover rounded-full border-4 border-yellow-400 shadow-yellow-500/50 shadow-2xl animate-spin"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">The "Role Reversal" Meta-Game</h2>
            <p className="text-gray-400">
              This is a web proof-of-concept. Imagine this overlay injected directly into a streamer's desktop or a Unity game. 
              The viewers pay bits to drop physical, cartoonish pain onto the streamer's screen.
            </p>
          </div>
        </main>

        {/* Fake Twitch Chat / Interaction Panel */}
        <aside className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800 bg-gray-800 font-bold uppercase text-xs tracking-widest text-gray-400">
            Viewer Arsenal (Chat)
          </div>
          
          <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
            <button 
              onClick={() => spawnMeme("anvil")}
              className="group relative w-full p-4 bg-gray-800 hover:bg-purple-900 border border-purple-800 rounded-xl transition-all active:scale-95 flex flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">🔨</span>
              <span className="font-bold">Drop Anvil</span>
              <span className="text-xs bg-purple-600/30 text-purple-300 px-2 py-1 rounded">Cost: 100 Bits</span>
            </button>

            <button 
              onClick={() => spawnMeme("doge")}
              className="group relative w-full p-4 bg-gray-800 hover:bg-yellow-900 border border-yellow-800 rounded-xl transition-all active:scale-95 flex flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">🐕</span>
              <span className="font-bold">Doge Wrecking Ball</span>
              <span className="text-xs bg-yellow-600/30 text-yellow-300 px-2 py-1 rounded">Cost: 250 Bits</span>
            </button>
          </div>

          {/* Fake Chat stream */}
          <div className="h-64 border-t border-gray-800 p-4 bg-gray-950 font-mono text-sm overflow-hidden flex flex-col justify-end text-gray-500">
            <p><span className="text-blue-400">xX_Troll_Xx:</span> LOL here comes the anvil</p>
            <p><span className="text-green-400">PogChamp99:</span> !shield</p>
            <p><span className="text-purple-400">StreamerFan:</span> RIP his monitor</p>
          </div>
        </aside>

      </div>

      {/* Embedded Styles for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drop {
          0% { transform: translateY(-200px) scale(1); opacity: 0; }
          20% { opacity: 1; }
          40% { transform: translateY(400px) scale(1.2); }
          50% { transform: translateY(350px) scale(0.9); }
          60% { transform: translateY(400px) scale(1.1); }
          100% { transform: translateY(1000px) scale(1); opacity: 0; }
        }
        .animate-drop {
          animation: drop 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}} />
    </div>
  );
}
