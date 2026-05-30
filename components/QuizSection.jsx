'use client';

import { useState } from 'react';
import styles from './QuizSection.module.css';

const QUIZ_DATA = [
  {
    id: 1,
    type: 'multiple',
    question: 'What is the main benefit of critical thinking in education?',
    options: [
      'Memorizing facts faster',
      'Analyzing information and forming independent judgments',
      'Following instructions without questioning',
      'Completing tasks more quickly',
    ],
    correct: 1,
    explanation:
      'Critical thinking enables students to analyze information, evaluate evidence, and form well-reasoned independent judgments — a core 21st-century skill.',
  },
  {
    id: 2,
    type: 'multiple',
    question: 'Which digital tool is BEST for collaborative text annotation?',
    options: ['TikTok', 'Newsela', 'Instagram', 'Spotify'],
    correct: 1,
    explanation:
      'Newsela provides leveled news texts with built-in annotation tools, comprehension quizzes, and writing prompts designed for education.',
  },
  {
    id: 3,
    type: 'multiple',
    question: 'What does "Error Analysis Journal" help students develop?',
    options: [
      'Speed reading',
      'Grammar memorization',
      'Self-reflection and metacognitive awareness',
      'Vocabulary lists',
    ],
    correct: 2,
    explanation:
      'Error Analysis Journals develop metacognition — students learn to recognize patterns in their mistakes, understand why they occurred, and plan improvements.',
  },
  {
    id: 4,
    type: 'multiple',
    question: 'Creating a TikTok video about a topic primarily develops:',
    options: [
      'Reading speed',
      'Creative expression and communication confidence',
      'Grammar rules memorization',
      'Spelling accuracy',
    ],
    correct: 1,
    explanation:
      'Video creation tasks require students to understand, synthesize, and communicate ideas creatively — building confidence, language fluency, and digital literacy.',
  },
];

export default function QuizSection() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionId, optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < QUIZ_DATA.length) {
      alert('Please answer all questions before submitting.');
      return;
    }
    let correct = 0;
    QUIZ_DATA.forEach((q) => {
      if (answers[q.id] === q.correct) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const pct = Math.round((score / QUIZ_DATA.length) * 100);

  return (
    <section id="quiz" className="section-padding" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="badge badge-accent section-badge">🧠 Interactive Quiz</div>
          <h2>
            Test Your{' '}
            <span className="gradient-text">Critical Thinking</span>
          </h2>
          <p>
            Answer all questions, then see your results with detailed explanations.
            This demonstrates the self-assessment model used with students.
          </p>
        </div>

        {/* Score Banner (shown after submit) */}
        {submitted && (
          <div className={`${styles.scoreBanner} glass-card`} id="quiz-result">
            <div className={styles.scoreCircle}>
              <svg viewBox="0 0 80 80" className={styles.scoreSvg}>
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(124,106,245,0.15)" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke="url(#scoreGrad)" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6244eb" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className={styles.scoreText}>
                <span className={styles.scoreNum}>{pct}%</span>
                <span className={styles.scoreSubtext}>{score}/{QUIZ_DATA.length}</span>
              </div>
            </div>
            <div>
              <h3 style={{ color: 'var(--gray-900)', marginBottom: '8px' }}>
                {pct >= 75 ? '🎉 Excellent work!' : pct >= 50 ? '📚 Good effort!' : '🔍 Keep learning!'}
              </h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: '16px' }}>
                You scored <strong style={{ color: 'var(--primary-700)' }}>{score} out of {QUIZ_DATA.length}</strong> questions correctly.
                Review the explanations below to understand each answer.
              </p>
              <button onClick={handleRetry} className="btn btn-secondary btn-sm" id="quiz-retry-btn">
                🔄 Try Again
              </button>
            </div>
          </div>
        )}

        {/* Questions */}
        <div className={styles.questions}>
          {QUIZ_DATA.map((q, qi) => {
            const selected = answers[q.id];
            const isAnswered = selected !== undefined;
            const isCorrect = selected === q.correct;

            return (
              <div key={q.id} className={`${styles.questionCard} glass-card`} id={`question-${q.id}`}>
                <div className={styles.questionHeader}>
                  <span className={styles.questionNum}>Q{qi + 1}</span>
                  <span className={styles.questionType}>Multiple Choice</span>
                </div>
                <h4 className={styles.questionText}>{q.question}</h4>

                <div className={styles.options}>
                  {q.options.map((opt, oi) => {
                    let cls = styles.option;
                    if (submitted) {
                      if (oi === q.correct) cls += ` ${styles.optionCorrect}`;
                      else if (oi === selected && !isCorrect) cls += ` ${styles.optionWrong}`;
                    } else if (selected === oi) {
                      cls += ` ${styles.optionSelected}`;
                    }
                    return (
                      <button
                        key={oi}
                        className={cls}
                        onClick={() => handleSelect(q.id, oi)}
                        id={`q${q.id}-opt${oi}`}
                      >
                        <span className={styles.optionLetter}>{String.fromCharCode(65 + oi)}</span>
                        <span>{opt}</span>
                        {submitted && oi === q.correct && <span className={styles.optionIcon}>✓</span>}
                        {submitted && oi === selected && !isCorrect && <span className={styles.optionIcon}>✗</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {submitted && (
                  <div className={`${styles.explanation} ${isCorrect ? styles.explanationCorrect : styles.explanationWrong}`}>
                    <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={handleSubmit}
              id="quiz-submit-btn"
              disabled={Object.keys(answers).length < QUIZ_DATA.length}
              style={{ opacity: Object.keys(answers).length < QUIZ_DATA.length ? 0.5 : 1 }}
            >
              ✅ Submit Answers ({Object.keys(answers).length}/{QUIZ_DATA.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
