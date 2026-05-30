export const WEEK1 = {
  id: 'w1',
  title: 'Week 1',
  subtitle: 'Family Relationships',
  sections: [
    {
      id: 'remember',
      level: 'Remember',
      emoji: '📚',
      color: '#22d3ee',
      matchTask: {
        words: ['sibling','relative','conflict','support','trust','respect','misunderstanding','communication'],
        definitions: [
          'A. a person from your family',
          'B. a brother or sister',
          'C. a disagreement or argument',
          'D. help and care given to someone',
          'E. belief that someone is honest',
          'F. polite and kind attitude to others',
          'G. a problem caused by not understanding correctly',
          'H. sharing thoughts, feelings, and information',
        ],
        answers: ['B','A','C','D','E','F','G','H'],
      },
      fillGaps: {
        wordBank: ['trust','conflict','communication','support','respect'],
        sentences: [
          { text: 'Good ___ helps family members understand each other.', answer: 'communication' },
          { text: 'Teenagers need emotional ___ from their parents.', answer: 'support' },
          { text: 'A ___ can happen when people have different opinions.', answer: 'conflict' },
          { text: 'Healthy relationships are based on ___ and honesty.', answer: 'trust' },
          { text: 'Family members should show ___ to each other.', answer: 'respect' },
        ],
      },
      mcq: [
        { q: 'My brother is my:', options: ['cousin','sibling','parent'], answer: 1 },
        { q: 'A misunderstanding means:', options: ['good communication','wrong understanding','family support'], answer: 1 },
        { q: 'Respect means:', options: ['listening and being polite','ignoring people','arguing loudly'], answer: 0 },
      ],
    },
    {
      id: 'understand',
      level: 'Understand',
      emoji: '💡',
      color: '#6244eb',
      reading: {
        title: 'Family Relationships in Modern Society',
        text: `Family relationships play a very important role in the lives of teenagers. Family is often the first place where people learn communication skills, values, and social behavior. Strong family relationships provide emotional support, help people overcome difficulties, and contribute to personal development.

Today, family life is changing because of technology, busy schedules, and social changes. Many parents work long hours, while teenagers spend a significant amount of time at school, with friends, or online. As a result, family members may have fewer opportunities to communicate face-to-face. This sometimes leads to misunderstandings and conflicts.

One common issue in many families is the difference between the expectations of parents and teenagers. Parents often want to protect their children and help them make good decisions. Teenagers, on the other hand, usually want more independence and freedom. These differences can create disagreements about school, friendships, social media use, and future plans.

Effective communication is one of the most important factors in maintaining healthy family relationships. Family members should listen carefully to each other, respect different opinions, and express their feelings honestly. When people communicate openly, they are more likely to solve problems peacefully and understand each other's perspectives.

Spending quality time together can also strengthen family bonds. Activities such as having dinner together, watching movies, traveling, playing games, or simply talking about daily experiences help family members feel connected. Research shows that teenagers who have strong family support are often more confident, perform better at school, and experience lower levels of stress.

Technology can have both positive and negative effects on family relationships. On the one hand, messaging applications and video calls allow family members to stay connected even when they are far apart. On the other hand, excessive use of smartphones and social media may reduce direct communication within families. Therefore, it is important to use technology responsibly and maintain a balance between online and offline interactions.

In conclusion, healthy family relationships are built on trust, respect, communication, and support. Although modern life presents many challenges, families can strengthen their relationships by spending time together, listening to one another, and working together to solve problems.`,
      },
      mcq: [
        { q: 'What is the main idea of the text?', options: ['Teenagers should not use technology','Family relationships are important for teenagers\' development','Parents always understand teenagers','Families should spend all day together'], answer: 1 },
        { q: 'Why do conflicts happen between parents and teenagers?', options: ['Because teenagers do not go to school','Because parents and teenagers may have different expectations','Because families never communicate','Because technology is always bad'], answer: 1 },
        { q: 'What does effective communication include?', options: ['Ignoring other opinions','Listening, respect, and honest expression','Spending more time online','Avoiding family discussions'], answer: 1 },
        { q: 'Strong family support can help teenagers to:', options: ['become more confident','avoid studying','stop communicating','use social media more often'], answer: 0 },
        { q: 'What is one positive effect of technology on family relationships?', options: ['It always causes conflicts','It reduces all communication','It helps family members stay connected when they are far apart','It makes teenagers forget their families'], answer: 2 },
        { q: 'What is one negative effect of excessive smartphone use?', options: ['It may reduce face-to-face communication','It improves every relationship','It makes families spend more time together','It solves all problems'], answer: 0 },
        { q: 'Which activity can strengthen family bonds?', options: ['Ignoring each other','Having dinner together','Arguing every day','Spending all time alone'], answer: 1 },
        { q: 'What is the best title for the text?', options: ['Technology Is Dangerous','Family Relationships in Modern Society','Teenagers and School Rules','Why Parents Are Always Right'], answer: 1 },
      ],
    },
    {
      id: 'apply',
      level: 'Apply',
      emoji: '✍️',
      color: '#10b981',
      title: 'Describe your family.',
      prompts: ['Who are the members?','Who do you spend most time with?','What activities do you do together?'],
      wordCount: '120 words',
    },
    {
      id: 'analyze',
      level: 'Analyze',
      emoji: '⚖️',
      color: '#f59e0b',
      title: 'Compare: Family Communication',
      compare: {
        left: { label: 'Positive Communication', items: ['Listening','Respect','Support'] },
        right: { label: 'Negative Communication', items: ['Ignoring','Shouting','Criticizing'] },
      },
      question: 'How do these behaviors affect family relationships?',
    },
    {
      id: 'evaluate',
      level: 'Evaluate',
      emoji: '🗣️',
      color: '#fb7185',
      title: 'Discussion',
      statement: '"Parents should give teenagers more freedom."',
      instruction: 'Do you agree? Give 3 reasons.',
    },
    {
      id: 'create',
      level: 'Create',
      emoji: '🎨',
      color: '#a78bfa',
      title: '🎥 Video Challenge: "My Family, My Support"',
      description: 'Record a 60-second vlog about your family.',
      steps: ['Upload your video','Get peer feedback','Write your reflection'],
    },
  ],
};
