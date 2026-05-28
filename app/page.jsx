import Navbar            from '../components/Navbar';
import HeroSection        from '../components/HeroSection';
import LearningProcess    from '../components/LearningProcess';
import QuizSection        from '../components/QuizSection';
import ErrorAnalysisSection from '../components/ErrorAnalysisSection';
import ChallengeSection   from '../components/ChallengeSection';
import GallerySection     from '../components/GallerySection';
import UploadSection      from '../components/UploadSection';
import FeedbackSection    from '../components/FeedbackSection';
import ResultsSection     from '../components/ResultsSection';
import ReflectionSection  from '../components/ReflectionSection';
import Footer             from '../components/Footer';

export default function HomePage() {
  return (
    <>
      {/* ── Sticky Navigation ── */}
      <Navbar />

      <main>
        {/* SECTION 1: Hero / Home */}
        <HeroSection />

        {/* Divider */}
        <div className="divider" />

        {/* SECTION 2: 8-Step Learning Process Timeline */}
        <LearningProcess />

        {/* Divider */}
        <div className="divider" />

        {/* SECTION 2b: Quiz & Self-Analysis (interactive) */}
        <QuizSection />

        {/* Divider */}
        <div className="divider" />

        {/* SECTION 3: Error Analysis Journal */}
        <ErrorAnalysisSection />

        {/* Divider */}
        <div className="divider" />

        {/* SECTION 4: 2-Week Creative Thinking Challenge */}
        <ChallengeSection />

        {/* Divider */}
        <div className="divider" />

        {/* SECTION 5: Student Project Gallery */}
        <GallerySection />

        {/* Divider */}
        <div className="divider" />

        {/* SECTION 6: Upload Your Project */}
        <UploadSection />

        {/* Divider */}
        <div className="divider" />

        {/* SECTION 7: Feedback (Quantitative + Qualitative) */}
        <FeedbackSection />

        {/* Divider */}
        <div className="divider" />

        {/* SECTION 8: Research Results */}
        <ResultsSection />

        {/* Divider */}
        <div className="divider" />

        {/* SECTION 9: Final Reflection */}
        <ReflectionSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
