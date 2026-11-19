import { Link } from 'react-router-dom';
import HistoryTimeline from '../components/history/HistoryTimeline';

export default function HistoryPage() {
  return (
    <section className="py-12 sm:py-14 px-4 max-w-5xl mx-auto bg-transparent">
      <HistoryTimeline showHeader={true} headingTag="h1" />

      <div className="mt-12 sm:mt-14 text-center">
        <Link
          to="/elaboracion"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8b1d1d] hover:bg-[#6e1414] text-[#fbf3e1] font-semibold text-sm border border-[#26110a]/20 shadow-lg transition"
        >
          Conocer el proceso de elaboración →
        </Link>
      </div>
    </section>
  );
}