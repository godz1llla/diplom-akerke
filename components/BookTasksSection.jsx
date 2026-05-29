'use client';

import { useState } from 'react';
import styles from './BookTasksSection.module.css';

/* ─── Tab definitions ──────────────────────────────────────────── */
const TABS = [
  { id: 'relationship', label: 'Relationship', emoji: '💬', color: '#f59e0b' },
  { id: 'health',       label: 'Health',       emoji: '🥗', color: '#10b981' },
  { id: 'tall-stories', label: 'Tall Stories', emoji: '📖', color: '#6244eb' },
];

/* ─── Health tasks data ─────────────────────────────────────────── */
const HEALTH_TEXT = `Food is an essential part of our daily lives. It provides the energy and nutrients that our bodies need to grow, learn, and stay healthy. Scientists who study food and nutrition are interested in understanding how different foods affect the human body. This area of study is called food science.

Today, many teenagers have busy schedules. They spend time at school, complete homework, participate in extracurricular activities, and use digital devices for entertainment. Because of this, they often choose convenient foods such as fast food, snacks, and sugary drinks. Although these foods may taste good and save time, they are not always the healthiest option.

Food scientists have discovered that a balanced diet plays an important role in maintaining good health. A balanced diet includes different food groups such as fruits, vegetables, whole grains, dairy products, and sources of protein like meat, fish, eggs, beans, and nuts. Each food group provides specific nutrients that help the body function properly.

For example, fruits and vegetables contain vitamins, minerals, and fiber. These nutrients help strengthen the immune system and protect the body from illness. Whole grains provide energy and help people stay active throughout the day. Protein is necessary for growth and helps repair muscles and tissues. Calcium, which is found in milk, cheese, and yogurt, is important for strong bones and teeth.

Research also shows that eating habits can influence academic performance. Students who eat a healthy breakfast often have better concentration and memory during lessons. Breakfast provides the brain with energy after a long night without food. When students skip breakfast, they may feel tired, distracted, or less motivated to learn.

Another important topic in food science is the relationship between food and mental health. Scientists have found that healthy eating habits can improve mood and reduce stress. Foods rich in vitamins and omega-3 fatty acids, such as fish, nuts, and vegetables, may support brain health and emotional well-being. On the other hand, consuming too much sugar and processed food may negatively affect mood and energy levels.

Hydration is equally important. Water makes up a large part of the human body and is necessary for many bodily functions. Drinking enough water helps regulate body temperature, transport nutrients, and improve concentration. Health experts recommend choosing water instead of sugary soft drinks whenever possible.

Food science also studies how modern food production affects health and the environment. Many food companies are developing healthier products with less sugar, salt, and unhealthy fats. Scientists are researching sustainable farming methods and alternative food sources to ensure that future generations have access to nutritious food.

In addition to healthy eating, regular physical activity is essential for maintaining a healthy lifestyle. Exercise helps the body use energy effectively, strengthens muscles and bones, and improves overall fitness. Teenagers are encouraged to participate in sports, walk regularly, or engage in other forms of physical activity for at least 60 minutes each day.

Developing healthy eating habits does not require dramatic changes. Small steps can make a significant difference. For example, students can choose fruit instead of candy, eat more vegetables with meals, reduce sugary drinks, and drink more water. Over time, these simple choices can improve health and increase energy levels.

In conclusion, food science helps us understand the connection between nutrition and health. By learning about healthy eating habits, teenagers can make informed decisions about their diets and improve both their physical and mental well-being. A balanced diet, sufficient water intake, and regular exercise are key factors in leading a healthy and active life.`;

const HEALTH_TASKS = [
  {
    level: 1,
    title: 'Level 1: Remembering',
    emoji: '🔍',
    color: '#22d3ee',
    taskTitle: 'Task 1. Answer the Questions',
    type: 'text-answers',
    questions: [
      'What is food science?',
      'Name three food groups mentioned in the text.',
      'Which nutrient is important for strong bones?',
      'Why is water important for the body?',
      'How many minutes of physical activity are recommended each day?',
    ],
    descriptor: [
      '5 points – Answers all questions correctly.',
      '4 points – One mistake.',
      '3 points – Two mistakes.',
      '2 points – Three mistakes.',
      '1 point – Four or more mistakes.',
    ],
  },
  {
    level: 2,
    title: 'Level 2: Understanding',
    emoji: '💡',
    color: '#6244eb',
    taskTitle: 'Task 2. Explain the Ideas',
    instruction: 'Answer in 2–3 sentences.',
    type: 'text-answers',
    questions: [
      'Why is a balanced diet important?',
      'How does breakfast help students at school?',
      'How can healthy food affect mental health?',
    ],
    descriptor: [
      '5 points – Explains ideas clearly using information from the text.',
      '4 points – Mostly clear explanation.',
      '3 points – Basic understanding shown.',
      '2 points – Limited explanation.',
      '1 point – Incorrect or incomplete response.',
    ],
  },
  {
    level: 3,
    title: 'Level 3: Applying',
    emoji: '🍽️',
    color: '#10b981',
    taskTitle: 'Task 3. Create a Healthy Daily Menu',
    instruction: 'Imagine you are a nutrition expert. Create a healthy menu for one day. Then explain why your menu is healthy.',
    type: 'menu-table',
    meals: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    descriptor: [
      '5 points – Menu is realistic, balanced, and explanation is clear.',
      '4 points – Mostly balanced menu.',
      '3 points – Some healthy choices included.',
      '2 points – Limited application of knowledge.',
      '1 point – Menu does not reflect healthy eating principles.',
    ],
  },
  {
    level: 4,
    title: 'Level 4: Analyzing',
    emoji: '⚖️',
    color: '#f59e0b',
    taskTitle: 'Task 4. Compare Healthy Food and Fast Food',
    instruction: 'Complete the comparison table. Then answer: Which type of food is better for teenagers? Why?',
    type: 'comparison-table',
    criteria: ['Nutritional value', 'Energy level', 'Effect on health', 'Long-term impact'],
    descriptor: [
      '5 points – Provides detailed comparison and logical analysis.',
      '4 points – Good comparison with minor gaps.',
      '3 points – Basic comparison.',
      '2 points – Limited analysis.',
      '1 point – Incomplete answer.',
    ],
  },
  {
    level: 5,
    title: 'Level 5: Evaluating',
    emoji: '🗣️',
    color: '#fb7185',
    taskTitle: 'Task 5. Express Your Opinion',
    statement: '"Schools should provide only healthy food in cafeterias."',
    instruction: 'Do you agree or disagree? Write 80–100 words and give at least two reasons.',
    type: 'opinion',
    descriptor: [
      '5 points – Strong argument with two or more supporting reasons.',
      '4 points – Clear opinion with some support.',
      '3 points – Opinion given but limited justification.',
      '2 points – Weak argument.',
      '1 point – Opinion unclear or unsupported.',
    ],
  },
  {
    level: 6,
    title: 'Level 6: Creating',
    emoji: '🎨',
    color: '#a78bfa',
    taskTitle: 'Task 6. Design a Healthy Lifestyle Campaign',
    instruction: 'Imagine your school wants to encourage healthy living. Create one of the following:',
    options: ['A poster', 'A social media campaign', 'A short presentation'],
    checklist: ['healthy eating', 'drinking water', 'physical activity', 'healthy habits'],
    note: 'Create a slogan for your campaign. Example: "Eat Smart, Live Strong!"',
    type: 'creative',
    descriptor: [
      '5 points – Creative, original, and well-organized product.',
      '4 points – Good creativity and organization.',
      '3 points – Adequate completion.',
      '2 points – Limited creativity.',
      '1 point – Incomplete task.',
    ],
  },
];

/* ─── Placeholder tabs content ──────────────────────────────────── */
function ComingSoonTab({ label }) {
  return (
    <div className={styles.comingSoon}>
      <div className={styles.comingSoonIcon}>🚧</div>
      <h3>{label} Tasks</h3>
      <p>Tasks for this topic are coming soon. Check back later!</p>
    </div>
  );
}

/* ─── Descriptor component ──────────────────────────────────────── */
function Descriptor({ points }) {
  return (
    <div className={styles.descriptor}>
      <div className={styles.descriptorTitle}>📋 Descriptor</div>
      <ul>
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Health Tab ─────────────────────────────────────────────────── */
function HealthTab() {
  const [openTask, setOpenTask] = useState(null);
  const [answers, setAnswers] = useState({});
  const [menuRows, setMenuRows] = useState({ Breakfast: '', Lunch: '', Dinner: '', Snack: '' });
  const [menuExplanation, setMenuExplanation] = useState('');
  const [comparisonRows, setComparisonRows] = useState({
    'Nutritional value': { healthy: '', fast: '' },
    'Energy level':      { healthy: '', fast: '' },
    'Effect on health':  { healthy: '', fast: '' },
    'Long-term impact':  { healthy: '', fast: '' },
  });
  const [comparisonAnswer, setComparisonAnswer] = useState('');
  const [opinionText, setOpinionText] = useState('');
  const [creativeText, setCreativeText] = useState('');
  const [slogan, setSlogan] = useState('');
  const [saved, setSaved] = useState({});

  const toggle = (level) => setOpenTask(openTask === level ? null : level);

  const handleSave = (level) => {
    setSaved((prev) => ({ ...prev, [level]: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, [level]: false })), 2000);
  };

  const wordCount = opinionText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className={styles.healthTab}>
      {/* Reading Text */}
      <div className={`${styles.readingCard} glass-card`}>
        <div className={styles.readingHeader}>
          <span className={styles.readingBadge}>📄 Reading Text</span>
          <h3 className={styles.readingTitle}>Food Science: How Food Affects Our Health</h3>
        </div>
        <div className={styles.readingBody}>
          {HEALTH_TEXT.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div className={styles.tasksGrid}>
        {HEALTH_TASKS.map((task) => {
          const isOpen = openTask === task.level;
          return (
            <div key={task.level} className={`${styles.taskCard} glass-card`} id={`health-task-${task.level}`}>
              {/* Task Header (clickable) */}
              <button
                className={styles.taskHeader}
                onClick={() => toggle(task.level)}
                style={{ '--task-color': task.color }}
              >
                <div className={styles.taskHeaderLeft}>
                  <span className={styles.taskEmoji}>{task.emoji}</span>
                  <div>
                    <div className={styles.taskLevel} style={{ color: task.color }}>{task.title}</div>
                    <div className={styles.taskName}>{task.taskTitle}</div>
                  </div>
                </div>
                <span className={`${styles.taskChevron} ${isOpen ? styles.taskChevronOpen : ''}`}>▼</span>
              </button>

              {/* Task Body */}
              {isOpen && (
                <div className={styles.taskBody}>
                  {/* ── Level 1 & 2: Text Answers ── */}
                  {task.type === 'text-answers' && (
                    <>
                      {task.instruction && (
                        <p className={styles.taskInstruction}>{task.instruction}</p>
                      )}
                      <ol className={styles.questionList}>
                        {task.questions.map((q, qi) => (
                          <li key={qi}>
                            <p className={styles.questionText}>{q}</p>
                            <textarea
                              className={styles.answerArea}
                              placeholder="Write your answer here..."
                              rows={2}
                              value={answers[`${task.level}-${qi}`] || ''}
                              onChange={(e) =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  [`${task.level}-${qi}`]: e.target.value,
                                }))
                              }
                            />
                          </li>
                        ))}
                      </ol>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginTop: '16px' }}
                        onClick={() => handleSave(task.level)}
                        id={`save-task-${task.level}`}
                      >
                        {saved[task.level] ? '✅ Saved!' : '💾 Save Answers'}
                      </button>
                    </>
                  )}

                  {/* ── Level 3: Menu Table ── */}
                  {task.type === 'menu-table' && (
                    <>
                      <p className={styles.taskInstruction}>{task.instruction}</p>
                      <div className={styles.tableWrapper}>
                        <table className={styles.dataTable}>
                          <thead>
                            <tr>
                              <th>Meal</th>
                              <th>Food</th>
                            </tr>
                          </thead>
                          <tbody>
                            {task.meals.map((meal) => (
                              <tr key={meal}>
                                <td className={styles.mealLabel}>{meal}</td>
                                <td>
                                  <input
                                    type="text"
                                    placeholder={`Enter ${meal.toLowerCase()} food...`}
                                    value={menuRows[meal]}
                                    onChange={(e) =>
                                      setMenuRows((prev) => ({ ...prev, [meal]: e.target.value }))
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <label style={{ marginTop: '16px' }}>Why is your menu healthy?</label>
                      <textarea
                        className={styles.answerArea}
                        placeholder="Explain why your menu is balanced and healthy..."
                        rows={3}
                        value={menuExplanation}
                        onChange={(e) => setMenuExplanation(e.target.value)}
                      />
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginTop: '16px' }}
                        onClick={() => handleSave(task.level)}
                        id="save-task-3"
                      >
                        {saved[task.level] ? '✅ Saved!' : '💾 Save Menu'}
                      </button>
                    </>
                  )}

                  {/* ── Level 4: Comparison Table ── */}
                  {task.type === 'comparison-table' && (
                    <>
                      <p className={styles.taskInstruction}>{task.instruction}</p>
                      <div className={styles.tableWrapper}>
                        <table className={styles.dataTable}>
                          <thead>
                            <tr>
                              <th>Criteria</th>
                              <th>🥗 Healthy Food</th>
                              <th>🍔 Fast Food</th>
                            </tr>
                          </thead>
                          <tbody>
                            {task.criteria.map((criterion) => (
                              <tr key={criterion}>
                                <td className={styles.mealLabel}>{criterion}</td>
                                <td>
                                  <input
                                    type="text"
                                    placeholder="..."
                                    value={comparisonRows[criterion]?.healthy || ''}
                                    onChange={(e) =>
                                      setComparisonRows((prev) => ({
                                        ...prev,
                                        [criterion]: { ...prev[criterion], healthy: e.target.value },
                                      }))
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    placeholder="..."
                                    value={comparisonRows[criterion]?.fast || ''}
                                    onChange={(e) =>
                                      setComparisonRows((prev) => ({
                                        ...prev,
                                        [criterion]: { ...prev[criterion], fast: e.target.value },
                                      }))
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <label style={{ marginTop: '16px' }}>
                        Which type of food is better for teenagers? Why?
                      </label>
                      <textarea
                        className={styles.answerArea}
                        placeholder="Write your analysis here..."
                        rows={3}
                        value={comparisonAnswer}
                        onChange={(e) => setComparisonAnswer(e.target.value)}
                      />
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginTop: '16px' }}
                        onClick={() => handleSave(task.level)}
                        id="save-task-4"
                      >
                        {saved[task.level] ? '✅ Saved!' : '💾 Save Analysis'}
                      </button>
                    </>
                  )}

                  {/* ── Level 5: Opinion ── */}
                  {task.type === 'opinion' && (
                    <>
                      <div className={styles.statement}>
                        <span className={styles.quoteIcon}>"</span>
                        {task.statement.replace(/"/g, '')}
                      </div>
                      <p className={styles.taskInstruction}>{task.instruction}</p>
                      <div style={{ position: 'relative' }}>
                        <textarea
                          className={styles.answerArea}
                          placeholder="Write your opinion here (80–100 words)..."
                          rows={6}
                          value={opinionText}
                          onChange={(e) => setOpinionText(e.target.value)}
                        />
                        <span
                          className={styles.wordCount}
                          style={{ color: wordCount >= 80 && wordCount <= 100 ? '#10b981' : '#9ca3af' }}
                        >
                          {wordCount} words {wordCount >= 80 && wordCount <= 100 ? '✓' : '(80–100 required)'}
                        </span>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginTop: '16px' }}
                        onClick={() => handleSave(task.level)}
                        id="save-task-5"
                      >
                        {saved[task.level] ? '✅ Saved!' : '💾 Save Opinion'}
                      </button>
                    </>
                  )}

                  {/* ── Level 6: Creative ── */}
                  {task.type === 'creative' && (
                    <>
                      <p className={styles.taskInstruction}>{task.instruction}</p>
                      <div className={styles.optionsList}>
                        {task.options.map((opt, i) => (
                          <span key={i} className={styles.optionChip}>• {opt}</span>
                        ))}
                      </div>
                      <div className={styles.checklistBox}>
                        <p className={styles.checklistTitle}>Your campaign must include:</p>
                        {task.checklist.map((item, i) => (
                          <div key={i} className={styles.checklistItem}>
                            <span className={styles.checkmark}>✓</span> {item}
                          </div>
                        ))}
                      </div>
                      <label>Your slogan</label>
                      <input
                        type="text"
                        placeholder='e.g. "Eat Smart, Live Strong!"'
                        value={slogan}
                        onChange={(e) => setSlogan(e.target.value)}
                        style={{ marginBottom: '12px' }}
                      />
                      <label>Describe your campaign</label>
                      <textarea
                        className={styles.answerArea}
                        placeholder="Describe your poster / social media campaign / presentation here..."
                        rows={5}
                        value={creativeText}
                        onChange={(e) => setCreativeText(e.target.value)}
                      />
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginTop: '16px' }}
                        onClick={() => handleSave(task.level)}
                        id="save-task-6"
                      >
                        {saved[task.level] ? '✅ Saved!' : '💾 Save Campaign'}
                      </button>
                    </>
                  )}

                  <Descriptor points={task.descriptor} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────── */
export default function BookTasksSection() {
  const [activeTab, setActiveTab] = useState('health');

  return (
    <section id="book-tasks" className={`section-padding ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge badge-emerald section-badge">📚 Bloom's Taxonomy Tasks</div>
          <h2>
            Textbook <span className="gradient-text">Task Library</span>
          </h2>
          <p>
            Explore tasks organized by topic and Bloom's taxonomy levels —
            from remembering facts to creating your own projects.
          </p>
        </div>

        {/* Tab Bar */}
        <div className={styles.tabBar}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ '--tab-color': tab.color }}
            >
              <span className={styles.tabEmoji}>{tab.emoji}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && <span className={styles.tabIndicator} style={{ background: tab.color }} />}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'relationship' && <ComingSoonTab label="Relationship" />}
          {activeTab === 'health'       && <HealthTab />}
          {activeTab === 'tall-stories' && <ComingSoonTab label="Tall Stories" />}
        </div>
      </div>
    </section>
  );
}
