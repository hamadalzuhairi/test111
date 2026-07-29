import { useCallback, useMemo, useState } from "react";
import { LanguageProvider } from "./i18n";
import Header from "./components/Header";
import AttractHero from "./components/AttractHero";
import CaseGrid from "./components/CaseGrid";
import CaseViewer from "./components/CaseViewer";
import TriageSim from "./components/TriageSim";
import CompareColumns from "./components/CompareColumns";
import AlertCards from "./components/AlertCards";
import FAQ from "./components/FAQ";
import Closing from "./components/Closing";
import IdleReset from "./components/IdleReset";
import cases from "./data/cases";
import usePrefersReducedMotion from "./hooks/usePrefersReducedMotion";

interface CaseResult {
  youCorrect: boolean;
  aiCorrect: boolean;
}

function AppInner() {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, CaseResult>>({});
  const reducedMotion = usePrefersReducedMotion();

  const activeIndex = useMemo(
    () => (activeCaseId ? cases.findIndex((c) => c.id === activeCaseId) : -1),
    [activeCaseId]
  );
  const activeCase = activeIndex >= 0 ? cases[activeIndex] : null;
  const hasNext = activeIndex >= 0 && activeIndex < cases.length - 1;

  const handleOpenCase = useCallback((id: string) => setActiveCaseId(id), []);
  const handleClose = useCallback(() => setActiveCaseId(null), []);

  const handleComplete = useCallback((caseId: string, result: CaseResult) => {
    setResults((prev) => ({ ...prev, [caseId]: result }));
  }, []);

  const handleNextCase = useCallback(() => {
    if (activeIndex >= 0 && activeIndex < cases.length - 1) {
      setActiveCaseId(cases[activeIndex + 1].id);
    }
  }, [activeIndex]);

  const handleIdleReset = useCallback(() => {
    setActiveCaseId(null);
    setResults({});
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [reducedMotion]);

  const scoreYou = Object.values(results).filter((r) => r.youCorrect).length;
  const scoreAI = Object.values(results).filter((r) => r.aiCorrect).length;
  const scoreTotal = Object.keys(results).length;
  const completedIds = useMemo(() => new Set(Object.keys(results)), [results]);

  return (
    <div className="app">
      <Header />
      <main>
        <AttractHero />
        <CaseGrid onOpenCase={handleOpenCase} completedIds={completedIds} />
        <TriageSim reducedMotion={reducedMotion} />
        <CompareColumns />
        <AlertCards />
        <FAQ />
        <Closing />
      </main>

      {activeCase && (
        <CaseViewer
          caseData={activeCase}
          caseNumber={activeIndex + 1}
          totalCases={cases.length}
          onClose={handleClose}
          onComplete={handleComplete}
          onNextCase={handleNextCase}
          hasNext={hasNext}
          scoreYou={scoreYou}
          scoreAI={scoreAI}
          scoreTotal={scoreTotal}
          reducedMotion={reducedMotion}
        />
      )}

      <IdleReset onReset={handleIdleReset} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
