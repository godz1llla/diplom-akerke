export const WEEK2 = {
  id: 'w2',
  title: 'Week 2',
  subtitle: 'Communication Problems',
  sections: [
    {
      id: 'remember',
      level: 'Remember',
      emoji: '📚',
      color: '#22d3ee',
      matchTask: {
        words: ['misunderstanding','argument','advice','permission','rule','generation gap','compromise','responsibility'],
        definitions: [
          'A. a suggestion about what someone should do',
          'B. a disagreement between people',
          'C. a problem caused by not understanding something correctly',
          'D. the difference in opinions between young and older people',
          'E. an agreement where both sides accept something',
          'F. the right to do something allowed by another person',
          'G. something you must or must not do',
          'H. a duty or something you should take care of',
        ],
        answers: ['C','B','A','F','G','D','E','H'],
      },
      fillGaps: {
        wordBank: ['misunderstanding','argument','permission','compromise','responsibility'],
        sentences: [
          { text: 'Teenagers often need their parents\' ___ to go out late.', answer: 'permission' },
          { text: 'A ___ can happen when people do not listen carefully.', answer: 'misunderstanding' },
          { text: 'A family ___ may start because of different opinions.', answer: 'argument' },
          { text: 'A good solution is often a ___ between parents and teenagers.', answer: 'compromise' },
          { text: 'Taking care of your schoolwork is your ___.', answer: 'responsibility' },
        ],
      },
    },
    {
      id: 'understand',
      level: 'Understand',
      emoji: '💡',
      color: '#6244eb',
      reading: {
        title: 'Misunderstandings Between Teenagers and Parents',
        text: `Misunderstandings between teenagers and parents are common in many families. They often happen because parents and teenagers see the same situation in different ways. Parents usually want to protect their children and help them make safe decisions. Teenagers, however, often want more freedom and independence. This difference can create conflicts about school, friends, social media, clothes, free time, and future plans.

One common reason for misunderstanding is poor communication. Sometimes teenagers do not explain their feelings clearly, and parents may think that their children are being rude or irresponsible. At the same time, parents may give advice in a strict way, and teenagers may feel that nobody listens to them. As a result, a small problem can become a serious argument.

Another reason is the generation gap. Parents grew up in a different time, so they may not always understand modern teenage life, especially online communication and social media. For example, a teenager may think that chatting with friends online is normal, while parents may worry that it is a waste of time or dangerous. Both sides may have good reasons, but they need to listen to each other.

To solve communication problems, families should try to speak calmly and respectfully. Teenagers should explain their opinions with reasons, not only emotions. Parents should also listen carefully before making decisions. A compromise can help both sides feel respected. For example, parents may allow a teenager to use social media, but only after homework is finished.

In conclusion, misunderstandings between teenagers and parents are natural, but they can be solved through respect, patience, honest communication, and compromise. When both sides try to understand each other, family relationships become stronger.`,
      },
      mcq: [
        { q: 'What is the main idea of the text?', options: ['Parents and teenagers never understand each other','Misunderstandings can happen, but they can be solved through communication','Teenagers should always do what they want','Social media is the only reason for family conflicts'], answer: 1 },
        { q: 'Why do parents often make rules?', options: ['Because they want to control everything','Because they want to protect their children','Because they do not like teenagers','Because they do not understand school'], answer: 1 },
        { q: 'What can poor communication cause?', options: ['Better marks','Stronger vocabulary','Arguments and misunderstandings','More free time'], answer: 2 },
        { q: 'What does "generation gap" mean?', options: ['A school rule','A difference in opinions between younger and older people','A type of social media','A family celebration'], answer: 1 },
        { q: 'What is one example of compromise from the text?', options: ['Parents never allow social media','Teenagers ignore parents','Teenagers may use social media after homework','Parents stop talking to teenagers'], answer: 2 },
        { q: 'What should teenagers do to solve problems?', options: ['Shout loudly','Explain their opinions with reasons','Avoid all conversations','Spend more time online'], answer: 1 },
      ],
    },
    {
      id: 'apply',
      level: 'Apply',
      emoji: '✍️',
      color: '#10b981',
      title: 'Personal Situation Task',
      prompts: ['Have you ever had a misunderstanding with your parents or another adult?','What was the reason?','How did you feel?','How could the problem be solved in a better way?'],
      wordCount: '100–120 words',
    },
    {
      id: 'analyze',
      level: 'Analyze',
      emoji: '⚖️',
      color: '#f59e0b',
      title: 'Problem Analysis',
      situation: 'A teenager wants to go out with friends in the evening. The parents say no because they are worried about safety. The teenager feels angry and thinks the parents do not trust him/her.',
      questions: ["What is the teenager's point of view?","What is the parents' point of view?","What caused the misunderstanding?","What words or actions made the situation worse?","What solution would be fair for both sides?"],
    },
    {
      id: 'evaluate',
      level: 'Evaluate',
      emoji: '🗣️',
      color: '#fb7185',
      title: 'Opinion Writing',
      statement: '"Parents should always control teenagers\' social media use."',
      instruction: 'Do you agree or disagree? Write 150–180 words. Include your opinion, 3 reasons, one example, and a short conclusion.',
    },
    {
      id: 'create',
      level: 'Create',
      emoji: '🎨',
      color: '#a78bfa',
      title: '🎭 Role-Play Video Challenge',
      description: 'Create a short role-play video about solving a misunderstanding between a teenager and parents.',
      steps: ['Show a problem','Show two different opinions','Include a calm discussion','Reach a compromise','Show a positive ending'],
      reflectionPrompts: ['What was the problem?','How did you solve it?','What did you learn about communication?'],
    },
  ],
};
