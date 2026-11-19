import { ELABORATION_STEPS } from '../../data/elaboration';

export default function ElaborationSteps() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ELABORATION_STEPS.map((item) => (
        <div
          key={item.step}
          className="bg-Capitán-surface border border-white/10 hover:border-Capitán-gold/40 rounded-2xl p-5 transition"
        >
          <div className="w-9 h-9 rounded-full bg-Capitán-red border border-Capitán-gold text-white font-bold flex items-center justify-center text-sm">
            {item.step}
          </div>
          <h3 className="font-display font-bold text-white text-lg mt-3">
            {item.title}
          </h3>
          <p className="text-sm text-gray-300 mt-1.5">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
