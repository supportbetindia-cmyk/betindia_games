"use client";

import { useState, useEffect, useRef } from "react";
import { Plane, Coins, History, CheckCircle2 } from "lucide-react";

type GameState = "idle" | "countdown" | "flying" | "cashed_out" | "crashed";

const INITIAL_HISTORY = [1.45, 2.84, 1.12, 5.60, 1.95, 3.42, 1.08, 12.40, 2.10, 1.65];

export default function AviatorSimulator() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [multiplier, setMultiplier] = useState(1.00);
  const [countdown, setCountdown] = useState(5);
  const [betAmount, setBetAmount] = useState(1000);
  const [hasBet, setHasBet] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [history, setHistory] = useState<number[]>(INITIAL_HISTORY);
  
  const crashPointRef = useRef(1.00);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Start the game cycle
  useEffect(() => {
    startCountdown();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const startCountdown = () => {
    setGameState("countdown");
    setCountdown(5);
    setMultiplier(1.00);
    setHasBet(false);
    setWinAmount(0);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          startFlight();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startFlight = () => {
    const rand = Math.random();
    if (rand < 0.15) {
      crashPointRef.current = 1.01 + Math.random() * 0.09; // Instant crash
    } else if (rand < 0.65) {
      crashPointRef.current = 1.1 + Math.random() * 1.4; // Low multiplier
    } else if (rand < 0.92) {
      crashPointRef.current = 2.5 + Math.random() * 4.5; // Medium multiplier
    } else {
      crashPointRef.current = 7.0 + Math.random() * 15.0; // High multiplier
    }

    setGameState("flying");
    startTimeRef.current = Date.now();
    runFlightAnimation();
  };

  const runFlightAnimation = () => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const currentMultiplier = parseFloat(Math.exp(0.13 * elapsed).toFixed(2));

    if (currentMultiplier >= crashPointRef.current) {
      setMultiplier(crashPointRef.current);
      setGameState("crashed");
      setHistory(prev => [parseFloat(crashPointRef.current.toFixed(2)), ...prev.slice(0, 7)]);
      setTimeout(startCountdown, 3000);
    } else {
      setMultiplier(currentMultiplier);
      animationRef.current = requestAnimationFrame(runFlightAnimation);
    }
  };

  const handlePlaceBet = () => {
    if (gameState === "countdown") {
      setHasBet(true);
    }
  };

  const handleCashOut = () => {
    if (gameState === "flying" && hasBet) {
      const finalMult = multiplier;
      const payout = Math.round(betAmount * finalMult);
      setWinAmount(payout);
      setGameState("cashed_out");
      setHasBet(false);
    }
  };

  const progressPercent = Math.min(((multiplier - 1) / (Math.max(crashPointRef.current, 4) - 1)) * 100, 100);
  const svgWidth = 400;
  const svgHeight = 180;
  
  const planeX = (progressPercent / 100) * (svgWidth - 50) + 20;
  const planeY = svgHeight - ((progressPercent / 100) * (svgHeight - 50)) - 25;
  const pathD = `M 20,${svgHeight - 20} Q ${svgWidth / 2},${svgHeight - 20} ${planeX},${planeY}`;

  return (
    <div className="w-full rounded-3xl border border-white/[0.08] bg-[#0c1424]/90 p-4 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-48 w-48 rounded-full bg-[#FF6B00]/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-1/4 -bottom-1/4 h-48 w-48 rounded-full bg-red-600/5 blur-2xl" />

      {/* Top Telemetry / Recent Multipliers */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Live Demo</span>
        </div>

        {/* Mini History log */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[200px]">
          {history.map((val, idx) => (
            <span
              key={idx}
              className={`rounded px-1.5 py-0.5 text-[10px] font-black shrink-0 ${
                val >= 2.0
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                  : "bg-white/[0.03] text-slate-450 border border-white/5"
              }`}
            >
              {val.toFixed(2)}x
            </span>
          ))}
        </div>
      </div>

      {/* Screen area */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#050B18] h-[180px] flex flex-col justify-between p-3.5">
        
        {/* Overlay states */}
        {gameState === "countdown" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050B18]/95 z-20">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Takeoff In</p>
            <div className="text-3xl font-black text-white tabular-nums drop-shadow">
              {countdown}s
            </div>
            <div className="w-16 h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-[#FF6B00] transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {gameState === "cashed_out" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-green-600/90 border border-green-500 px-4 py-1.5 rounded-lg z-20 flex items-center gap-1.5 shadow-lg shadow-green-600/20 animate-bounce">
            <CheckCircle2 size={13} className="text-white" />
            <span className="text-xs font-bold text-white">Won ₹{winAmount.toLocaleString()}</span>
          </div>
        )}

        {gameState === "crashed" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/10 backdrop-blur-[2px] z-20 animate-fade-in">
            <p className="text-lg font-black text-red-500 uppercase tracking-widest drop-shadow">FLEW AWAY!</p>
            <p className="text-slate-400 font-bold mt-0.5 text-xs">at {multiplier.toFixed(2)}x</p>
          </div>
        )}

        {/* Real-time multiplier display */}
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <span className="text-[8px] uppercase font-bold tracking-widest text-slate-500 block leading-none">Multiplier</span>
            <span className="text-2xl font-black text-white tracking-tight mt-0.5 block">
              {multiplier.toFixed(2)}x
            </span>
          </div>
          {hasBet && (
            <div className="text-right">
              <span className="text-[8px] uppercase font-bold tracking-widest text-slate-500 block leading-none">Payout</span>
              <span className="text-xs font-bold text-green-400 mt-0.5 block">
                ₹{Math.round(betAmount * multiplier).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* SVG Flight Path */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {gameState === "flying" && (
            <svg className="w-full h-full" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
              <path
                d={pathD}
                fill="none"
                stroke="#FF6B00"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d={`${pathD} L ${planeX},${svgHeight - 20} L 20,${svgHeight - 20} Z`}
                fill="url(#gradient-fill-compact)"
              />
              <defs>
                <linearGradient id="gradient-fill-compact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Plane Icon */}
          {gameState === "flying" && (
            <div
              className="absolute z-10"
              style={{
                left: `${(planeX / svgWidth) * 100}%`,
                top: `${(planeY / svgHeight) * 100}%`,
                transform: "translate(-50%, -50%) rotate(-15deg)"
              }}
            >
              <div className="relative">
                <Plane size={18} className="text-[#FF6B00]" fill="#FF6B00" />
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-[8px] text-slate-500 font-bold tracking-wider leading-none">
          {gameState === "flying" ? "CASH OUT BEFORE CRASH" : "PLACE A BET TO PREVIEW SIMULATION"}
        </div>
      </div>

      {/* Control Panel */}
      <div className="mt-3 space-y-2.5">
        <div className="flex gap-2">
          {/* Presets */}
          {[200, 500, 1000, 2000].map(amt => (
            <button
              key={amt}
              disabled={gameState === "flying" && hasBet}
              onClick={() => setBetAmount(amt)}
              className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition ${
                betAmount === amt 
                  ? "border-[#FF6B00] bg-[#FF6B00]/10 text-white" 
                  : "border-white/5 bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* Action Button */}
        {gameState === "countdown" ? (
          <button
            onClick={handlePlaceBet}
            disabled={hasBet}
            className={`w-full py-3.5 rounded-xl font-black text-white text-xs tracking-wider uppercase transition shadow-lg ${
              hasBet 
                ? "bg-slate-700 border border-slate-650 cursor-not-allowed" 
                : "bg-[#FF6B00] hover:bg-[#FF8A00] shadow-[#FF6B00]/20"
            }`}
          >
            {hasBet ? "BET PLACED..." : `PLACE BET (₹${betAmount})`}
          </button>
        ) : gameState === "flying" ? (
          <button
            disabled={!hasBet}
            onClick={handleCashOut}
            className={`w-full py-3.5 rounded-xl font-black text-white text-xs tracking-wider uppercase transition shadow-lg ${
              hasBet
                ? "bg-green-600 hover:bg-green-500 shadow-green-650/20 cursor-pointer animate-pulse"
                : "bg-slate-800 cursor-not-allowed opacity-40 text-slate-500"
            }`}
          >
            {hasBet ? `CASH OUT ₹${Math.round(betAmount * multiplier)}` : "WAITING..."}
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3.5 rounded-xl bg-slate-800 border border-white/5 cursor-not-allowed font-black text-slate-500 text-xs tracking-wider uppercase"
          >
            Next round starting...
          </button>
        )}
      </div>
    </div>
  );
}
