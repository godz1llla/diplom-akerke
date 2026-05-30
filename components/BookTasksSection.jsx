'use client';

import { useState } from 'react';
import { BOOK_TABS } from '../data/bookTasksData';
import styles from './BookTasksSection.module.css';

/* ── Generic Section Renderer ── */
function SectionBlock({ section }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [saved, setSaved] = useState(false);

  const setAns = (key, val) => setAnswers(p => ({ ...p, [key]: val }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const wordCount = (answers['essay'] || '').trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className={styles.sectionBody}>

      {/* MATCH TASK */}
      {section.matchTask && (
        <div className={styles.taskBlock}>
          <div className={styles.taskTitle}>📌 Task 1. Match the words with their definitions.</div>
          <div className={styles.matchGrid}>
            <div className={styles.matchWords}>
              {section.matchTask.words.map((word, i) => (
                <div key={i} className={styles.matchRow}>
                  <span className={styles.matchNum}>{i + 1}.</span>
                  <span className={styles.matchWord}>{word}</span>
                  <select
                    className={styles.matchSelect}
                    value={answers[`match-${i}`] || ''}
                    onChange={e => setAns(`match-${i}`, e.target.value)}
                  >
                    <option value="">—</option>
                    {['A','B','C','D','E','F','G','H'].slice(0, section.matchTask.words.length).map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                  {checked && (
                    <span className={answers[`match-${i}`] === section.matchTask.answers[i] ? styles.correct : styles.wrong}>
                      {answers[`match-${i}`] === section.matchTask.answers[i] ? '✓' : `✗ (${section.matchTask.answers[i]})`}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.matchDefs}>
              {section.matchTask.definitions.map((def, i) => (
                <div key={i} className={styles.defRow}>{def}</div>
              ))}
            </div>
          </div>
          <button className={`btn btn-sm ${styles.checkBtn}`} onClick={() => setChecked(true)}>
            Check Answers
          </button>
        </div>
      )}

      {/* FILL GAPS */}
      {section.fillGaps && (
        <div className={styles.taskBlock}>
          <div className={styles.taskTitle}>✏️ Task 2. Fill in the gaps.</div>
          <div className={styles.wordBank}>
            <span className={styles.wordBankLabel}>Words:</span>
            {section.fillGaps.wordBank.map((w, i) => (
              <span key={i} className={styles.wordChip}>{w}</span>
            ))}
          </div>
          <ol className={styles.gapList}>
            {section.fillGaps.sentences.map((s, i) => {
              const parts = s.text.split('___');
              return (
                <li key={i} className={styles.gapItem}>
                  {parts[0]}
                  <input
                    type="text"
                    className={styles.gapInput}
                    placeholder="..."
                    value={answers[`gap-${i}`] || ''}
                    onChange={e => setAns(`gap-${i}`, e.target.value)}
                  />
                  {parts[1]}
                  {checked && (
                    <span className={
                      answers[`gap-${i}`]?.toLowerCase().trim() === s.answer.toLowerCase()
                        ? styles.correct : styles.wrong
                    }>
                      {answers[`gap-${i}`]?.toLowerCase().trim() === s.answer.toLowerCase()
                        ? ' ✓' : ` ✗ (${s.answer})`}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
          <button className={`btn btn-sm ${styles.checkBtn}`} onClick={() => setChecked(true)}>
            Check Answers
          </button>
        </div>
      )}

      {/* MCQ (REMEMBER level) */}
      {section.mcq && !section.reading && (
        <div className={styles.taskBlock}>
          <div className={styles.taskTitle}>🔘 Task 3. Choose the correct word.</div>
          {section.mcq.map((q, qi) => (
            <div key={qi} className={styles.mcqItem}>
              <p className={styles.mcqQ}>{qi + 1}. {q.q}</p>
              {q.options.map((opt, oi) => {
                const letter = String.fromCharCode(65 + oi);
                const isSelected = answers[`mcq-${qi}`] === oi;
                const isCorrect = checked && oi === q.answer;
                const isWrong = checked && isSelected && oi !== q.answer;
                return (
                  <label key={oi} className={`${styles.mcqOption} ${isCorrect ? styles.mcqCorrect : ''} ${isWrong ? styles.mcqWrong : ''}`}>
                    <input
                      type="radio"
                      name={`mcq-${section.id}-${qi}`}
                      checked={isSelected}
                      onChange={() => setAns(`mcq-${qi}`, oi)}
                    />
                    {letter}) {opt}
                  </label>
                );
              })}
            </div>
          ))}
          <button className={`btn btn-sm ${styles.checkBtn}`} onClick={() => setChecked(true)}>
            Check Answers
          </button>
        </div>
      )}

      {/* READING TEXT */}
      {section.reading && (
        <div className={styles.readingCard}>
          <div className={styles.readingHeader}>
            <span className={styles.readingBadge}>📄 Reading Text</span>
            <h3 className={styles.readingTitle}>{section.reading.title}</h3>
          </div>
          <div className={styles.readingBody}>
            {section.reading.text.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
      )}

      {/* MCQ (UNDERSTAND level - after reading) */}
      {section.reading && section.mcq && (
        <div className={styles.taskBlock}>
          <div className={styles.taskTitle}>🔘 Multiple Choice Questions</div>
          {section.mcq.map((q, qi) => (
            <div key={qi} className={styles.mcqItem}>
              <p className={styles.mcqQ}>{qi + 1}. {q.q}</p>
              {q.options.map((opt, oi) => {
                const letter = String.fromCharCode(65 + oi);
                const isSelected = answers[`umcq-${qi}`] === oi;
                const isCorrect = checked && oi === q.answer;
                const isWrong = checked && isSelected && oi !== q.answer;
                return (
                  <label key={oi} className={`${styles.mcqOption} ${isCorrect ? styles.mcqCorrect : ''} ${isWrong ? styles.mcqWrong : ''}`}>
                    <input
                      type="radio"
                      name={`umcq-${section.id}-${qi}`}
                      checked={isSelected}
                      onChange={() => setAns(`umcq-${qi}`, oi)}
                    />
                    {letter}) {opt}
                  </label>
                );
              })}
            </div>
          ))}
          <button className={`btn btn-sm ${styles.checkBtn}`} onClick={() => setChecked(true)}>
            Check Answers
          </button>
        </div>
      )}

      {/* APPLY / WRITING */}
      {section.prompts && (
        <div className={styles.taskBlock}>
          <div className={styles.taskTitle}>✍️ {section.title}</div>
          {section.wordCount && <div className={styles.wordCountBadge}>📝 {section.wordCount}</div>}
          <ul className={styles.promptList}>
            {section.prompts.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          <textarea
            className={styles.essayArea}
            rows={7}
            placeholder="Write your answer here..."
            value={answers['essay'] || ''}
            onChange={e => setAns('essay', e.target.value)}
          />
          <div className={styles.wordCountInfo}>{wordCount} words</div>
          <button className={`btn btn-primary btn-sm`} style={{ marginTop: 12 }} onClick={handleSave}>
            {saved ? '✅ Saved!' : '💾 Save Answer'}
          </button>
        </div>
      )}

      {/* ANALYZE - situation + questions */}
      {(section.situation || section.compare || section.compareTable) && (
        <div className={styles.taskBlock}>
          <div className={styles.taskTitle}>⚖️ {section.title}</div>

          {section.situation && (
            <div className={styles.situationBox}>{section.situation}</div>
          )}

          {(section.compare || section.compareTable) && (() => {
            const tbl = section.compare || section.compareTable;
            return (
              <div className={styles.compareGrid}>
                <div className={styles.compareCol}>
                  <div className={styles.compareLabel} style={{ color: '#10b981' }}>{tbl.left.label}</div>
                  {tbl.left.items.map((it, i) => <div key={i} className={styles.compareItem}>• {it}</div>)}
                </div>
                <div className={styles.compareCol}>
                  <div className={styles.compareLabel} style={{ color: '#ef4444' }}>{tbl.right.label}</div>
                  {tbl.right.items.map((it, i) => <div key={i} className={styles.compareItem}>• {it}</div>)}
                </div>
              </div>
            );
          })()}

          {section.question && (
            <>
              <div className={styles.analyzeQ}>{section.question}</div>
              <textarea
                className={styles.essayArea}
                rows={5}
                placeholder="Write your analysis here..."
                value={answers[`analyze-q`] || ''}
                onChange={e => setAns(`analyze-q`, e.target.value)}
              />
            </>
          )}

          {section.questions && section.questions.map((q, qi) => (
            <div key={qi} style={{ marginTop: 12 }}>
              <div className={styles.analyzeQ}>{qi + 1}. {q}</div>
              <textarea
                className={styles.essayArea}
                rows={3}
                placeholder="Your answer..."
                value={answers[`aq-${qi}`] || ''}
                onChange={e => setAns(`aq-${qi}`, e.target.value)}
              />
            </div>
          ))}

          {section.wordCount && <div className={styles.wordCountBadge}>📝 {section.wordCount}</div>}
          <button className={`btn btn-primary btn-sm`} style={{ marginTop: 12 }} onClick={handleSave}>
            {saved ? '✅ Saved!' : '💾 Save Analysis'}
          </button>
        </div>
      )}

      {/* EVALUATE - essay */}
      {section.statement && (
        <div className={styles.taskBlock}>
          <div className={styles.taskTitle}>🗣️ {section.title}</div>
          <div className={styles.statementBox}>{section.statement}</div>
          <div className={styles.instruction}>{section.instruction}</div>
          <div style={{ position: 'relative' }}>
            <textarea
              className={styles.essayArea}
              rows={8}
              placeholder="Write your essay here..."
              value={answers['essay'] || ''}
              onChange={e => setAns('essay', e.target.value)}
            />
            <span className={styles.wordCountFloat}>{wordCount} words</span>
          </div>
          <button className={`btn btn-primary btn-sm`} style={{ marginTop: 12 }} onClick={handleSave}>
            {saved ? '✅ Saved!' : '💾 Save Essay'}
          </button>
        </div>
      )}

      {/* CREATE */}
      {section.steps && (
        <div className={styles.taskBlock}>
          <div className={styles.taskTitle}>{section.title}</div>
          <div className={styles.createDesc}>{section.description}</div>
          <div className={styles.stepsList}>
            {section.steps.map((s, i) => (
              <div key={i} className={styles.stepItem}>
                <span className={styles.stepNum}>{i + 1}</span> {s}
              </div>
            ))}
          </div>
          {section.reflectionPrompts && (
            <>
              <div className={styles.taskTitle} style={{ marginTop: 20 }}>💬 Reflection</div>
              {section.reflectionPrompts.map((p, i) => <div key={i} className={styles.analyzeQ}>• {p}</div>)}
              <textarea
                className={styles.essayArea}
                rows={5}
                placeholder="Write your reflection here..."
                value={answers['reflection'] || ''}
                onChange={e => setAns('reflection', e.target.value)}
              />
              <button className={`btn btn-primary btn-sm`} style={{ marginTop: 12 }} onClick={handleSave}>
                {saved ? '✅ Saved!' : '💾 Save Reflection'}
              </button>
            </>
          )}
        </div>
      )}

      {/* CREATE (requirements/options version) */}
      {section.requirements && (
        <div className={styles.taskBlock}>
          <div className={styles.taskTitle}>{section.title || section.level}</div>
          {section.description && <div className={styles.createDesc}>{section.description}</div>}
          {section.options && (
            <div className={styles.optionsGrid}>
              {section.options.map((opt, i) => (
                <div key={i} className={styles.optionCard}>
                  {typeof opt === 'string' ? `✅ ${opt}` : (
                    <>
                      <strong>{opt.label}</strong>
                      <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: 4 }}>{opt.question}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          {section.requirements && (
            <div className={styles.checklistBox}>
              <div className={styles.checklistTitle}>Requirements:</div>
              {section.requirements.map((r, i) => (
                <div key={i} className={styles.checklistItem}><span className={styles.checkmark}>✓</span> {r}</div>
              ))}
            </div>
          )}
          {section.prompts && (
            <>
              <div className={styles.taskTitle} style={{ marginTop: 20 }}>💬 {section.wordCount ? `Reflection (${section.wordCount})` : 'Reflection'}</div>
              <ul className={styles.promptList}>
                {section.prompts.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              <textarea
                className={styles.essayArea}
                rows={6}
                placeholder="Write your response here..."
                value={answers['reflection'] || ''}
                onChange={e => setAns('reflection', e.target.value)}
              />
              <button className={`btn btn-primary btn-sm`} style={{ marginTop: 12 }} onClick={handleSave}>
                {saved ? '✅ Saved!' : '💾 Save'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Week View ── */
function WeekView({ week }) {
  const [openSection, setOpenSection] = useState(null);
  const toggle = (id) => setOpenSection(openSection === id ? null : id);

  return (
    <div className={styles.weekView}>
      <div className={styles.weekHeader}>
        <div className={styles.weekTitle}>{week.title}</div>
        <div className={styles.weekSubtitle}>{week.subtitle}</div>
      </div>
      <div className={styles.sectionsGrid}>
        {week.sections.map((section) => {
          const isOpen = openSection === section.id;
          return (
            <div key={section.id} className={`${styles.sectionCard} glass-card`}>
              <button
                className={styles.sectionHeader}
                onClick={() => toggle(section.id)}
                style={{ '--sec-color': section.color }}
              >
                <div className={styles.sectionHeaderLeft}>
                  <span className={styles.sectionEmoji}>{section.emoji}</span>
                  <span className={styles.sectionLevel} style={{ color: section.color }}>
                    {section.level}
                  </span>
                </div>
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>▼</span>
              </button>
              {isOpen && <SectionBlock section={section} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function BookTasksSection() {
  const [activeTab, setActiveTab] = useState('relationship');
  const [activeWeekIdx, setActiveWeekIdx] = useState(0);

  const currentTab = BOOK_TABS.find(t => t.id === activeTab);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setActiveWeekIdx(0);
  };

  return (
    <section id="book-tasks" className={`section-padding ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <div className="badge badge-primary section-badge">📚 Bloom's Taxonomy Tasks</div>
          <h2>Textbook <span className="gradient-text">Task Library</span></h2>
          <p>10 weeks of activities — from remembering facts to creating original projects.</p>
        </div>

        {/* Main Tabs */}
        <div className={styles.tabBar}>
          {BOOK_TABS.map(tab => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
              onClick={() => handleTabChange(tab.id)}
              style={{ '--tab-color': tab.color }}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && <span className={styles.tabIndicator} style={{ background: tab.color }} />}
            </button>
          ))}
        </div>

        {/* Week Sub-Tabs */}
        {currentTab && currentTab.weeks.length > 1 && (
          <div className={styles.weekTabs}>
            {currentTab.weeks.map((week, i) => (
              <button
                key={week.id}
                className={`${styles.weekTab} ${activeWeekIdx === i ? styles.weekTabActive : ''}`}
                onClick={() => setActiveWeekIdx(i)}
                style={{ '--tab-color': currentTab.color }}
              >
                {week.title}
              </button>
            ))}
          </div>
        )}

        {/* Week Content */}
        {currentTab && <WeekView week={currentTab.weeks[activeWeekIdx]} />}

        {/* Final Challenge completion badge */}
        {activeTab === 'final' && (
          <div className={styles.completionBadge}>
            <div className={styles.completionIcon}>🎉</div>
            <h3>Congratulations!</h3>
            <p>You have completed the Critical Minds Program.</p>
            <div className={styles.completionList}>
              {['Improved critical thinking skills','Improved creative thinking skills','Practiced analyzing information','Learned to evaluate evidence','Developed digital literacy skills','Created original projects','Increased confidence in English communication'].map((item, i) => (
                <div key={i} className={styles.completionItem}>✅ {item}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
