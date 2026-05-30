export const WEEK7 = {
  id: 'w7', title: 'Week 7', subtitle: 'Truth and Lies',
  sections: [
    {
      id: 'remember', level: 'Remember', emoji: '📚', color: '#22d3ee',
      matchTask: {
        words: ['honesty','lie','truth','trust','deception','exaggeration','evidence','rumor'],
        definitions: ['A. information that proves something is true','B. telling something that is not true','C. belief that someone is reliable and honest','D. facts about a situation','E. intentionally misleading someone','F. making something seem bigger or more important than it is','G. a story or information that may not be true','H. the quality of being truthful'],
        answers: ['H','B','D','C','E','F','A','G'],
      },
      fillGaps: {
        wordBank: ['truth','trust','rumor','lie','evidence'],
        sentences: [
          { text: 'Good relationships are built on ___.', answer: 'trust' },
          { text: 'A ___ is information that has not been confirmed.', answer: 'rumor' },
          { text: 'People often lose confidence in someone who tells a ___.', answer: 'lie' },
          { text: 'We need ___ before believing information.', answer: 'evidence' },
          { text: 'Sometimes telling the ___ can be difficult.', answer: 'truth' },
        ],
      },
    },
    {
      id: 'understand', level: 'Understand', emoji: '💡', color: '#6244eb',
      reading: {
        title: 'Is It Ever Acceptable to Tell a Lie?',
        text: `Most people learn from an early age that honesty is important. Parents, teachers, and society generally encourage people to tell the truth. Honesty helps build trust, strengthens relationships, and allows people to communicate openly. However, there are situations where telling the truth may be difficult, and people sometimes choose to tell lies instead.

Some lies are told to avoid punishment or responsibility. For example, a student who forgets to complete homework may invent an excuse instead of admitting the truth. In these situations, lies often create additional problems because they damage trust when discovered.

However, not all lies are intended to cause harm. Some people tell what are often called "white lies." A white lie is a small lie told to avoid hurting someone's feelings. For instance, if a friend asks whether you like a gift they gave you, you might say you like it even if it is not your favorite. In this case, the purpose of the lie is kindness rather than deception.

There are also situations where people lie to protect others. During emergencies or dangerous situations, individuals may hide information to keep someone safe. Some people argue that these lies are morally acceptable because they prevent harm. Others believe that honesty should always be the most important principle, regardless of the situation.

Modern technology has made the issue of truth and lies even more complex. Social media allows information to spread quickly, but not all information online is accurate. False news, rumors, and misleading content can influence people's opinions and decisions. Therefore, critical thinking is essential when evaluating information. People should ask questions, verify sources, and look for evidence before accepting information as true.

In conclusion, honesty remains an important value in society. However, whether a lie is acceptable often depends on the situation, the intention behind it, and its consequences. People should carefully consider the effects of their words and actions before deciding whether to tell the truth or a lie.`,
      },
      mcq: [
        { q: 'What is the main purpose of the text?', options: ['To encourage people to lie','To discuss different situations involving truth and lies','To explain social media','To describe school rules'], answer: 1 },
        { q: 'Why is honesty important?', options: ['It saves time','It builds trust and strengthens relationships','It prevents communication','It reduces learning'], answer: 1 },
        { q: 'What is a white lie?', options: ['A dangerous lie','A lie told to avoid hurting someone\'s feelings','A rumor','A joke'], answer: 1 },
        { q: 'Why do some people believe certain lies are acceptable?', options: ['Because they are entertaining','Because they may protect someone from harm','Because lying is always good','Because they avoid school'], answer: 1 },
        { q: 'What problem does social media create?', options: ['Too much honesty','False information and rumors','More exercise','Better sleep'], answer: 1 },
        { q: 'What should people do before believing information online?', options: ['Share it immediately','Ignore it','Verify sources and look for evidence','Ask friends only'], answer: 2 },
      ],
    },
    {
      id: 'apply', level: 'Apply', emoji: '✍️', color: '#10b981',
      title: 'Personal Reflection',
      prompts: ['Have you ever told a white lie?','Why did you tell it?','Do you think it was the right decision?','How did the situation end?'],
      wordCount: '120–150 words',
    },
    {
      id: 'analyze', level: 'Analyze', emoji: '⚖️', color: '#f59e0b',
      title: 'Situation Analysis',
      situation: 'A student accidentally breaks a classroom projector. When the teacher asks what happened, the student blames another classmate because they are afraid of punishment.',
      questions: ['Why did the student lie?','What are the short-term consequences?','What are the long-term consequences?','How might the classmate feel?','What would have happened if the student had told the truth?'],
      wordCount: '150–180 words',
    },
    {
      id: 'evaluate', level: 'Evaluate', emoji: '🗣️', color: '#fb7185',
      title: 'Opinion Essay',
      statement: '"It is sometimes acceptable to tell a lie."',
      instruction: 'Do you agree or disagree? Write 150–180 words with your opinion, three reasons, one example, and a conclusion.',
    },
    {
      id: 'create', level: 'Create', emoji: '🎨', color: '#a78bfa',
      title: '🎭 Ethical Dilemma Challenge',
      description: 'Create a short video, comic strip, podcast, or digital story about a situation where someone must choose between telling the truth and telling a lie. Include a realistic situation, a difficult decision, consequences of both choices, and your final judgment.',
      reflectionPrompts: ['What did you learn about honesty?','Was it difficult to judge the situation?','How did this task develop your critical and creative thinking skills?'],
    },
  ],
};

export const WEEK8 = {
  id: 'w8', title: 'Week 8', subtitle: 'Urban Legends',
  sections: [
    {
      id: 'remember', level: 'Remember', emoji: '📚', color: '#22d3ee',
      matchTask: {
        words: ['urban legend','myth','rumor','eyewitness','supernatural','mystery','evidence','belief'],
        definitions: ['A. something that cannot be explained easily','B. information that proves something is true','C. a person who claims to have seen an event','D. a traditional story that may not be true','E. a widely shared story believed by many people but often unverified','F. involving forces beyond scientific explanation','G. an idea accepted as true by people','H. information spread from person to person without proof'],
        answers: ['E','D','H','C','F','A','B','G'],
      },
      fillGaps: {
        wordBank: ['evidence','rumor','mystery','eyewitness','urban legend'],
        sentences: [
          { text: 'Many people believe the story, but there is no ___.', answer: 'evidence' },
          { text: 'An ___ claims to have seen the strange event.', answer: 'eyewitness' },
          { text: 'A(n) ___ often spreads quickly through social media.', answer: 'rumor' },
          { text: 'The disappearance of the traveler remains a ___.', answer: 'mystery' },
          { text: 'The story became a famous ___ known around the world.', answer: 'urban legend' },
        ],
      },
    },
    {
      id: 'understand', level: 'Understand', emoji: '💡', color: '#6244eb',
      reading: {
        title: 'Why Do People Believe Urban Legends?',
        text: `Urban legends are stories that are widely shared and believed by many people, even though there is often little or no evidence to prove them. These stories usually involve mysterious events, unusual creatures, strange disappearances, or surprising situations. Urban legends exist in almost every culture and have been passed from generation to generation for many years.

One reason why urban legends are so popular is that they often sound realistic. Many stories include specific locations, names, or eyewitness accounts that make them seem believable. People are more likely to trust a story when it contains details that appear authentic, even if those details cannot be verified.

Another reason is that urban legends appeal to emotions. Stories involving fear, surprise, curiosity, or danger are easier to remember and share. For example, a story about a mysterious creature living in a local forest may spread quickly because people find it exciting and interesting. Emotional reactions often make people less likely to question whether a story is true.

The development of the internet and social media has made urban legends spread faster than ever before. A story can be shared with thousands of people within minutes. Unfortunately, many people do not verify information before sharing it. As a result, false stories can become widely accepted as facts.

Critical thinking plays an important role in evaluating urban legends. Before believing a story, people should ask questions such as: Who created the story? Is there reliable evidence? Are there trustworthy sources confirming the information? By analyzing information carefully, people can avoid being misled by false or exaggerated claims.

Although many urban legends are not true, they remain an important part of popular culture. They reflect people's fears, beliefs, and curiosity about the unknown. Studying urban legends can help us understand how information spreads and why people sometimes believe stories without evidence.`,
      },
      mcq: [
        { q: 'What is an urban legend?', options: ['A scientific fact','A story that is widely shared but often lacks evidence','A school rule','A historical document'], answer: 1 },
        { q: 'Why do urban legends seem believable?', options: ['They always contain proof','They include realistic details and eyewitness accounts','They are written by scientists','They are always true'], answer: 1 },
        { q: 'What makes urban legends easy to remember?', options: ['Mathematical formulas','Emotional reactions such as fear and curiosity','Academic language','Long explanations'], answer: 1 },
        { q: 'How has social media affected urban legends?', options: ['It stopped them completely','It made them spread more quickly','It proved all of them true','It reduced communication'], answer: 1 },
        { q: 'What should people do before believing a story?', options: ['Share it immediately','Verify sources and evidence','Ignore all information','Ask only one friend'], answer: 1 },
        { q: 'What does the text suggest about critical thinking?', options: ['It is unnecessary','It helps people evaluate information more effectively','It prevents learning','It only applies to science'], answer: 1 },
      ],
    },
    {
      id: 'apply', level: 'Apply', emoji: '✍️', color: '#10b981',
      title: 'Personal Reflection',
      prompts: ['Have you ever heard an urban legend?','Did you believe it at first?','Why do you think people share these stories?','How can you check if a story is true?'],
      wordCount: '120–150 words',
    },
    {
      id: 'analyze', level: 'Analyze', emoji: '⚖️', color: '#f59e0b',
      title: 'Story Analysis Task',
      situation: '"Many people claim that a mysterious figure appears in a local park at midnight. Several social media users have shared photos, but no official investigation has confirmed the story."',
      questions: ['What evidence supports the story?','What evidence is missing?','Why might people believe this story?','How could social media influence public opinion?','Is the story reliable? Explain your answer.'],
      wordCount: '150–180 words',
    },
    {
      id: 'evaluate', level: 'Evaluate', emoji: '🗣️', color: '#fb7185',
      title: 'Opinion Essay',
      statement: '"People should not believe information unless there is strong evidence."',
      instruction: 'Do you agree or disagree? Write 150–180 words with your opinion, three reasons, one example, and a conclusion.',
    },
    {
      id: 'create', level: 'Create', emoji: '🎨', color: '#a78bfa',
      title: '👻 Create Your Own Urban Legend',
      description: 'Create an original urban legend (200–250 words) with a mysterious event, an interesting setting, at least one eyewitness, suspense and mystery, and an ending that leaves readers wondering. You may also record a podcast, create a short video, design a comic strip, or make a digital story in Canva.',
      reflectionPrompts: ['What makes urban legends interesting?','How did you use creativity in this task?','How did critical thinking help you evaluate stories and evidence?'],
    },
  ],
};

export const WEEK9 = {
  id: 'w9', title: 'Week 9', subtitle: 'Misinformation & Fake News',
  sections: [
    {
      id: 'remember', level: 'Remember', emoji: '📚', color: '#22d3ee',
      matchTask: {
        words: ['misinformation','fake news','source','fact','opinion','bias','verification','credibility'],
        definitions: ['A. checking whether information is true','B. a statement that can be proven true','C. information that is false or inaccurate','D. trustworthiness of information or a person','E. a personal belief or viewpoint','F. false information presented as news','G. where information comes from','H. a tendency to favor one side'],
        answers: ['C','F','G','B','E','H','A','D'],
      },
      fillGaps: {
        wordBank: ['source','fact','misinformation','credibility','verification'],
        sentences: [
          { text: 'Before sharing information, it is important to check the ___.', answer: 'source' },
          { text: 'A ___ can be proven with evidence.', answer: 'fact' },
          { text: 'False information online is often called ___.', answer: 'misinformation' },
          { text: 'Journalists use ___ to confirm information.', answer: 'verification' },
          { text: 'Reliable websites usually have high ___.', answer: 'credibility' },
        ],
      },
    },
    {
      id: 'understand', level: 'Understand', emoji: '💡', color: '#6244eb',
      reading: {
        title: 'The Growing Problem of Fake News',
        text: `In today's digital world, information spreads faster than ever before. Millions of people use social media platforms, websites, and messaging applications to receive news and information. While technology has made communication easier, it has also increased the spread of misinformation and fake news.

Fake news refers to false or misleading information that is presented as real news. Sometimes fake news is created intentionally to influence public opinion, attract attention, or generate profit through website traffic. In other cases, misinformation spreads because people share inaccurate information without checking whether it is true.

One reason fake news spreads quickly is that people often react emotionally to information. Stories that create fear, anger, surprise, or excitement are more likely to be shared. Unfortunately, many users read only headlines without checking the full article or verifying the source. As a result, false information can reach thousands or even millions of people within a short period.

Fake news can have serious consequences. It may influence political decisions, create social conflicts, damage reputations, and cause confusion. During health emergencies, false information can even put people's lives at risk if individuals follow incorrect advice or ignore reliable medical recommendations.

To identify fake news, people should develop strong critical thinking skills. First, they should examine the source of information and determine whether it comes from a trustworthy organization. Second, they should compare information with other reliable sources. Third, they should look for evidence, statistics, and expert opinions. Finally, readers should be aware of emotional language and sensational headlines that are designed to attract attention rather than provide accurate information.

Digital literacy is becoming increasingly important in modern society. Students who can evaluate information critically are better prepared to make informed decisions and participate responsibly in online communities. Learning how to recognize fake news is an essential skill for the twenty-first century.`,
      },
      mcq: [
        { q: 'What is fake news?', options: ['Educational information','False or misleading information presented as news','Scientific research','Historical facts'], answer: 1 },
        { q: 'Why does fake news spread quickly?', options: ['People always verify information','People often react emotionally and share information quickly','It contains scientific evidence','It is always true'], answer: 1 },
        { q: 'What is one consequence of fake news?', options: ['Better communication','Improved health','Social conflicts and confusion','Increased exercise'], answer: 2 },
        { q: 'What should readers check first?', options: ['The comments section','The source of information','The advertisements','The number of likes'], answer: 1 },
        { q: 'What helps people identify fake news?', options: ['Critical thinking skills','Guessing','Sharing immediately','Following rumors'], answer: 0 },
        { q: 'What is digital literacy?', options: ['The ability to use social media only','The ability to evaluate and use information responsibly','The ability to play games online','The ability to memorize facts'], answer: 1 },
      ],
    },
    {
      id: 'apply', level: 'Apply', emoji: '✍️', color: '#10b981',
      title: 'Personal Reflection',
      prompts: ['Have you ever seen fake news online?','Did you believe it at first?','How did you discover it was false?','What steps do you take to verify information?'],
      wordCount: '120–150 words',
    },
    {
      id: 'analyze', level: 'Analyze', emoji: '⚖️', color: '#f59e0b',
      title: 'Fake News Investigation',
      situation: 'Headline: "Scientists Confirm That Students Who Use Smartphones During Lessons Get Higher Exam Scores."',
      questions: ['Why might people believe this headline?','What information is missing?','What evidence would you need to trust this claim?','Which sources would you check?','Could the headline be misleading? Why?'],
      wordCount: '150–180 words',
    },
    {
      id: 'evaluate', level: 'Evaluate', emoji: '🗣️', color: '#fb7185',
      title: 'Opinion Essay',
      statement: '"Social media companies should be responsible for stopping the spread of fake news."',
      instruction: 'Do you agree or disagree? Write 150–180 words with your opinion, three reasons, one example, and a conclusion.',
    },
    {
      id: 'create', level: 'Create', emoji: '🎨', color: '#a78bfa',
      title: '🔎 Fact-Checking Challenge — Become a Digital Investigator',
      description: 'Find one news story, social media post, or viral claim online. Identify the original source, check whether the information is true or false, compare at least two reliable sources, explain your investigation process, and present your final conclusion.',
      reflectionPrompts: ['What did you learn about fake news?','Which fact-checking strategy was most useful?','How did this task improve your critical thinking and digital literacy skills?'],
    },
  ],
};

export const WEEK10 = {
  id: 'w10', title: 'Week 10', subtitle: 'Critical Minds Final Challenge',
  sections: [
    {
      id: 'step1', level: 'Step 1: Choose a Topic', emoji: '🎯', color: '#3b82f6',
      options: [
        { label: 'Option A: Family Relationships', question: 'How can teenagers improve communication with their family members?' },
        { label: 'Option B: Social Media & Relationships', question: 'Does social media help or harm relationships?' },
        { label: 'Option C: Healthy Lifestyle', question: 'How can teenagers maintain a healthy lifestyle in the digital age?' },
      ],
    },
    {
      id: 'step2', level: 'Step 2: Research', emoji: '🔍', color: '#10b981',
      questions: ['What is the problem?','Why is it important?','What evidence supports your ideas?','What solutions can be suggested?'],
    },
    {
      id: 'step3', level: 'Step 3: Analyze', emoji: '⚖️', color: '#f59e0b',
      instruction: 'Write a short analysis (150–200 words). Consider causes, consequences, different perspectives, and supporting evidence.',
    },
    {
      id: 'step4', level: 'Step 4: Evaluate', emoji: '🗣️', color: '#fb7185',
      instruction: 'Which solution is the most effective? Justify your opinion using evidence and examples. (150–180 words)',
    },
    {
      id: 'step5', level: 'Step 5: Create', emoji: '🎨', color: '#a78bfa',
      title: 'Create ONE final product',
      options: ['Video Presentation (2–3 minutes)','Digital Poster','Canva Presentation','Infographic','Blog Article'],
      requirements: ['Present information clearly','Include evidence','Show critical thinking','Demonstrate creativity'],
    },
    {
      id: 'reflection', level: 'Final Reflection', emoji: '🌟', color: '#6244eb',
      prompts: ['Which activity helped you learn the most?','How did digital platforms support your learning?','How have your critical thinking skills improved?','How have your creative thinking skills improved?','Which digital tool was the most useful? Why?','What challenges did you face?','What would you like to improve in the future?'],
      wordCount: '100–150 words',
    },
  ],
};
