export default function PointsProgress({ points }: { points: number }) {
  const goal = 100;
  const pct = Math.min(100, Math.round((points / goal) * 100));
  return (
    <div className="w-full my-6">
      <div className="flex justify-between text-sm mb-1">
        <span>Puntos: {points}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full">
        <div className="h-3 bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-white/60 mt-1">A {Math.max(0, goal - points)} pts de tu “Cena para 2”.</p>
    </div>
  );
}
