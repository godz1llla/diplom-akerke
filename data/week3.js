export const WEEK3 = {
  id: 'w3',
  title: 'Week 3',
  subtitle: 'Social Media & Relationships',
  sections: [
    {
      id: 'remember',
      level: 'Remember',
      emoji: '📚',
      color: '#22d3ee',
      matchTask: {
        words: ['follower','privacy','profile','cyberbullying','content','interaction','online community','digital footprint'],
        definitions: [
          'A. information shared online',
          'B. communication between people',
          'C. personal information page on social media',
          'D. people connected through the internet',
          'E. a record of online activities',
          'F. protection of personal information',
          'G. a person who follows an account',
          'H. bullying through digital technologies',
        ],
        answers: ['G','F','C','H','A','B','D','E'],
      },
      fillGaps: {
        wordBank: ['privacy','content','follower','interaction','cyberbullying'],
        sentences: [
          { text: 'Teenagers should protect their ___ online.', answer: 'privacy' },
          { text: 'Photos and videos posted online are called ___.', answer: 'content' },
          { text: 'A ___ is someone who subscribes to your account.', answer: 'follower' },
          { text: 'Social media encourages communication and ___.', answer: 'interaction' },
          { text: '___ can negatively affect mental health.', answer: 'cyberbullying' },
        ],
      },
    },
    {
      id: 'understand',
      level: 'Understand',
      emoji: '💡',
      color: '#6244eb',
      reading: {
        title: 'Can Social Media Improve Relationships?',
        text: `Social media has become one of the most popular forms of communication among teenagers. Platforms such as Instagram, TikTok, Snapchat, WhatsApp, and Telegram allow people to connect instantly regardless of distance. Many teenagers use social media every day to communicate with friends, share experiences, and maintain relationships.

One major advantage of social media is that it helps people stay connected. Friends who attend different schools or live in different cities can communicate regularly through messages, video calls, and shared content. Social media also allows family members to stay in touch, especially when they live far apart. Through online communication, people can share important moments, celebrate achievements, and support each other.

In addition, social media provides opportunities to build new relationships. Teenagers can join online communities based on their interests, hobbies, or educational goals. For example, students learning English may join language-learning groups where they can practice communication skills and exchange ideas with people from different countries. These interactions can increase confidence and encourage cultural understanding.

However, social media is not always beneficial. Excessive use may reduce face-to-face communication and sometimes create misunderstandings. Online messages do not always express emotions clearly, which can lead to conflicts. Furthermore, some users present idealized versions of their lives, causing others to feel insecure or dissatisfied. Cyberbullying and privacy concerns are additional challenges that may negatively affect relationships.

To use social media effectively, teenagers should balance online and offline communication. They should think critically about the information they see online, respect others, and protect their personal information. When used responsibly, social media can strengthen relationships, support communication, and create valuable opportunities for learning and collaboration.`,
      },
      mcq: [
        { q: 'What is the main purpose of the text?', options: ['To explain how social media can influence relationships','To teach students how to create social media accounts','To compare schools','To describe technology history'], answer: 0 },
        { q: 'What is one advantage of social media?', options: ['It reduces communication','It helps people stay connected','It prevents friendships','It creates more schoolwork'], answer: 1 },
        { q: 'How can students benefit from online communities?', options: ['By avoiding communication','By learning new skills and sharing ideas','By spending all day online','By ignoring others'], answer: 1 },
        { q: 'What problem may result from social media use?', options: ['Better health','More face-to-face communication','Cyberbullying and misunderstandings','Better sleep habits'], answer: 2 },
        { q: 'What should teenagers do to use social media responsibly?', options: ['Share all personal information','Spend more time online','Balance online and offline communication','Avoid communication completely'], answer: 2 },
        { q: 'What does the author suggest?', options: ['Social media should be banned','Social media is always harmful','Social media can be useful when used responsibly','Teenagers should stop using technology'], answer: 2 },
      ],
    },
    {
      id: 'apply',
      level: 'Apply',
      emoji: '✍️',
      color: '#10b981',
      title: 'Personal Reflection',
      prompts: ['Which social media platforms do you use most often?','How do you communicate with friends online?','Have social media platforms helped you maintain friendships?','What benefits and challenges have you experienced?'],
      wordCount: '120–150 words',
    },
    {
      id: 'analyze',
      level: 'Analyze',
      emoji: '⚖️',
      color: '#f59e0b',
      title: 'Compare and Analyze',
      compareTable: {
        left: { label: 'Positive Effects', items: ['Staying connected','Learning opportunities','Sharing experiences','Building communities'] },
        right: { label: 'Negative Effects', items: ['Cyberbullying','Addiction','Privacy risks','Misunderstandings'] },
      },
      questions: ['Which positive effect is the most valuable? Why?','Which negative effect is the most serious? Why?','How can social media both strengthen and weaken relationships?','What factors influence whether social media has a positive or negative impact?'],
      wordCount: '150 words',
    },
    {
      id: 'evaluate',
      level: 'Evaluate',
      emoji: '🗣️',
      color: '#fb7185',
      title: 'Discussion Essay',
      statement: '"Social media improves relationships more than it damages them."',
      instruction: 'Do you agree or disagree? Write 150–180 words. Include your opinion, three supporting reasons, one real-life example, and a conclusion.',
    },
    {
      id: 'create',
      level: 'Create',
      emoji: '🎨',
      color: '#a78bfa',
      title: '🎥 Create a Digital Campaign: Using Social Media Responsibly',
      description: 'Create a poster, infographic, or short video with at least 5 tips for healthy social media use.',
      reflectionPrompts: ['What did you learn about social media and relationships?','How did this activity develop your critical thinking?','How did it help you become more creative?'],
    },
  ],
};
