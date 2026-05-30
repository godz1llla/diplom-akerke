export const WEEK4 = {
  id: 'w4', title: 'Week 4', subtitle: 'Food Science — Healthy and Unhealthy Food',
  sections: [
    {
      id: 'remember', level: 'Remember', emoji: '📚', color: '#22d3ee',
      matchTask: {
        words: ['nutrient','protein','carbohydrate','vitamin','obesity','balanced diet','processed food','calories'],
        definitions: ['A. energy units in food','B. food changed from its natural form','C. a substance needed for growth and health','D. food that provides energy to the body','E. food that helps build muscles','F. excess body fat that may affect health','G. a healthy combination of different foods','H. substances that help the body function properly'],
        answers: ['C','E','D','H','F','G','B','A'],
      },
      fillGaps: {
        wordBank: ['protein','vitamins','calories','balanced diet','processed food'],
        sentences: [
          { text: 'Chicken, fish, and eggs are rich in ___.', answer: 'protein' },
          { text: 'Fruits and vegetables contain many ___.', answer: 'vitamins' },
          { text: 'Eating too many ___ may lead to weight gain.', answer: 'calories' },
          { text: 'A ___ helps people stay healthy.', answer: 'balanced diet' },
          { text: 'Fast food is often considered ___.', answer: 'processed food' },
        ],
      },
    },
    {
      id: 'understand', level: 'Understand', emoji: '💡', color: '#6244eb',
      reading: {
        title: 'The Science Behind Healthy Eating',
        text: `Food is essential for human life because it provides the energy and nutrients needed for growth, development, and daily activities. Scientists who study nutrition explain that different types of food perform different functions in the body. A healthy diet should include proteins, carbohydrates, healthy fats, vitamins, minerals, and water.

Proteins help build and repair muscles and tissues. Good sources of protein include meat, fish, eggs, beans, and dairy products. Carbohydrates are the body's main source of energy and can be found in bread, rice, pasta, fruits, and vegetables. Healthy fats support brain function and help the body absorb certain vitamins. Nuts, avocados, olive oil, and fish are examples of foods containing healthy fats.

Many health experts recommend eating a balanced diet because it helps reduce the risk of diseases such as obesity, diabetes, and heart disease. A balanced diet includes a variety of foods from different food groups. Fruits and vegetables are especially important because they contain vitamins, minerals, and fiber that support overall health.

However, modern eating habits often include large amounts of processed food. Processed foods usually contain high levels of sugar, salt, and unhealthy fats. While these foods may be convenient and tasty, excessive consumption can lead to health problems. Fast food, sugary drinks, and packaged snacks are common examples.

Teenagers are particularly influenced by advertising and social media trends related to food. Some advertisements promote unhealthy eating habits by encouraging the consumption of high-calorie foods. Therefore, it is important for young people to develop critical thinking skills when making food choices. Reading food labels, comparing nutritional information, and evaluating health claims can help consumers make informed decisions.

In conclusion, healthy eating is not only about avoiding unhealthy foods but also about making balanced and informed choices. Understanding the science behind nutrition allows people to improve their health and maintain a healthy lifestyle.`,
      },
      mcq: [
        { q: 'What is the main purpose of the text?', options: ['To explain healthy eating and nutrition','To describe restaurants','To discuss sports','To compare schools'], answer: 0 },
        { q: 'What is the main function of proteins?', options: ['To build and repair muscles','To provide vitamins','To improve communication','To reduce sleep'], answer: 0 },
        { q: 'Which foods contain healthy fats?', options: ['Candy and chips','Nuts and avocados','Soft drinks','White bread'], answer: 1 },
        { q: 'Why is a balanced diet important?', options: ['It increases screen time','It reduces health risks','It improves internet access','It replaces exercise'], answer: 1 },
        { q: 'What is a common problem with processed foods?', options: ['They contain too much fiber','They often contain high amounts of sugar and salt','They improve health','They are always expensive'], answer: 1 },
        { q: 'Why should teenagers think critically about food advertisements?', options: ['To spend more money','To make healthier decisions','To avoid reading labels','To eat more fast food'], answer: 1 },
      ],
    },
    {
      id: 'apply', level: 'Apply', emoji: '✍️', color: '#10b981',
      title: 'Personal Reflection',
      prompts: ['What do you usually eat for breakfast, lunch, and dinner?','Which foods in your diet are healthy?','Which foods could be improved?','How do your eating habits affect your health?'],
      wordCount: '120–150 words',
    },
    {
      id: 'analyze', level: 'Analyze', emoji: '⚖️', color: '#f59e0b',
      title: 'Food Comparison Task',
      compareTable: {
        left: { label: 'Meal A (Unhealthy)', items: ['Burger','French fries','Cola'] },
        right: { label: 'Meal B (Healthy)', items: ['Grilled chicken','Brown rice','Salad','Water'] },
      },
      questions: ['Which meal is healthier?','Compare the nutritional value of both meals.','What are the possible long-term effects of each meal?','Which meal would you choose and why?'],
      wordCount: '150 words',
    },
    {
      id: 'evaluate', level: 'Evaluate', emoji: '🗣️', color: '#fb7185',
      title: 'Opinion Essay',
      statement: '"Fast food should be limited in school cafeterias."',
      instruction: 'Do you agree or disagree? Write 150–180 words with your opinion, three reasons, one example, and a conclusion.',
    },
    {
      id: 'create', level: 'Create', emoji: '🎨', color: '#a78bfa',
      title: '🍎 Healthy Menu Design Challenge',
      description: 'Design a healthy one-day menu. Include Breakfast, Lunch, Dinner, two healthy snacks, and drinks. Explain why each food is healthy.',
      reflectionPrompts: ['What did you learn about healthy eating?','Which part of the task was most difficult?','How did this activity develop your critical and creative thinking skills?'],
    },
  ],
};

export const WEEK5 = {
  id: 'w5', title: 'Week 5', subtitle: 'Healthy Lifestyle — Sleep, Diet, and Stress',
  sections: [
    {
      id: 'remember', level: 'Remember', emoji: '📚', color: '#22d3ee',
      matchTask: {
        words: ['nutrition','stress','sleep deprivation','hydration','exercise','mental health','routine','wellbeing'],
        definitions: ['A. the condition of being healthy and comfortable','B. regular physical activity','C. lack of enough sleep','D. drinking enough water','E. emotional and psychological health','F. a regular way of doing things','G. pressure or worry caused by difficulties','H. the process of getting proper food and nutrients'],
        answers: ['H','G','C','D','B','E','F','A'],
      },
      fillGaps: {
        wordBank: ['stress','exercise','hydration','routine','sleep'],
        sentences: [
          { text: 'Regular ___ helps keep the body strong and healthy.', answer: 'exercise' },
          { text: 'Drinking enough water improves ___.', answer: 'hydration' },
          { text: 'A healthy daily ___ helps people manage their time.', answer: 'routine' },
          { text: 'Too much ___ can negatively affect mental health.', answer: 'stress' },
          { text: 'Good ___ is essential for concentration and learning.', answer: 'sleep' },
        ],
      },
    },
    {
      id: 'understand', level: 'Understand', emoji: '💡', color: '#6244eb',
      reading: {
        title: 'The Importance of a Healthy Lifestyle',
        text: `A healthy lifestyle is essential for both physical and mental wellbeing. It involves maintaining healthy habits related to sleep, nutrition, physical activity, and stress management. Health experts believe that adopting healthy habits at an early age can help prevent many diseases and improve overall quality of life.

Sleep is one of the most important factors in maintaining good health. Teenagers generally need between eight and ten hours of sleep each night. During sleep, the body recovers, the brain processes information, and energy levels are restored. However, many teenagers do not get enough sleep because of school responsibilities, social media use, and excessive screen time. Lack of sleep can cause fatigue, poor concentration, stress, and reduced academic performance.

Nutrition also plays a vital role in maintaining health. A balanced diet provides the body with essential nutrients needed for growth and development. Fruits, vegetables, whole grains, proteins, and healthy fats contribute to good health. On the other hand, excessive consumption of sugary drinks, fast food, and processed snacks may increase the risk of obesity and other health problems.

Stress is another important issue affecting teenagers. Students often experience stress because of exams, homework, family expectations, and social pressures. While a small amount of stress can motivate people to achieve goals, excessive stress can negatively affect both physical and mental health. Common symptoms include headaches, anxiety, irritability, and difficulty sleeping.

There are several ways to maintain a healthy lifestyle. Regular physical activity helps reduce stress and improves physical fitness. Drinking enough water, following a consistent sleep schedule, and spending time with family and friends can also improve wellbeing. Additionally, relaxation techniques such as meditation, deep breathing, and hobbies can help individuals manage stress effectively.

In conclusion, a healthy lifestyle requires balance and self-discipline. By paying attention to sleep, nutrition, exercise, and stress management, teenagers can improve their health, academic performance, and overall quality of life.`,
      },
      mcq: [
        { q: 'What is the main idea of the text?', options: ['Teenagers should spend more time online','Healthy habits improve physical and mental wellbeing','School is the main cause of stress','Sleep is not important'], answer: 1 },
        { q: 'How many hours of sleep do teenagers generally need?', options: ['4–5 hours','6–7 hours','8–10 hours','12–14 hours'], answer: 2 },
        { q: 'What can happen if teenagers do not get enough sleep?', options: ['Better concentration','Improved memory','Fatigue and poor concentration','Better health'], answer: 2 },
        { q: 'Which foods are part of a balanced diet?', options: ['Fast food and soda','Fruits, vegetables, and proteins','Candy and chips','Only meat'], answer: 1 },
        { q: 'Which of the following can help reduce stress?', options: ['Ignoring problems','Spending more time online','Exercise and relaxation techniques','Skipping sleep'], answer: 2 },
        { q: 'What is one symptom of excessive stress?', options: ['Increased energy','Anxiety','Better sleep','Improved concentration'], answer: 1 },
      ],
    },
    {
      id: 'apply', level: 'Apply', emoji: '✍️', color: '#10b981',
      title: 'Personal Reflection',
      prompts: ['How many hours do you sleep every night?','Do you think your diet is healthy?','What causes stress in your life?','What healthy habits would you like to improve?'],
      wordCount: '120–150 words',
    },
    {
      id: 'analyze', level: 'Analyze', emoji: '⚖️', color: '#f59e0b',
      title: 'Lifestyle Analysis Task',
      compareTable: {
        left: { label: 'Student A', items: ['Sleeps 5 hours per night','Eats fast food 4 times a week','Exercises rarely','Spends 6 hours a day on social media'] },
        right: { label: 'Student B', items: ['Sleeps 8 hours per night','Eats balanced meals','Exercises 3 times a week','Limits screen time'] },
      },
      questions: ['Which student has a healthier lifestyle?','Compare their habits.','What health problems might Student A experience?','Which habits should Student A change first?'],
      wordCount: '150–180 words',
    },
    {
      id: 'evaluate', level: 'Evaluate', emoji: '🗣️', color: '#fb7185',
      title: 'Opinion Essay',
      statement: '"Teenagers should spend less time on social media and more time improving their health."',
      instruction: 'Do you agree or disagree? Write 150–180 words with your opinion, three reasons, one example, and a conclusion.',
    },
    {
      id: 'create', level: 'Create', emoji: '🎨', color: '#a78bfa',
      title: '🌟 7-Day Healthy Lifestyle Plan Challenge',
      description: 'Design your own 7-Day Healthy Lifestyle Plan including daily sleep schedule, healthy meals, physical activity, water intake goals, and stress management activities.',
      reflectionPrompts: ['What did you learn about healthy living?','Which habit was most difficult to follow?','How did this task improve your critical and creative thinking skills?'],
    },
  ],
};

export const WEEK6 = {
  id: 'w6', title: 'Week 6', subtitle: 'Sports & Fitness — Benefits of Exercise',
  sections: [
    {
      id: 'remember', level: 'Remember', emoji: '📚', color: '#22d3ee',
      matchTask: {
        words: ['fitness','endurance','flexibility','strength','stamina','physical activity','workout','healthy lifestyle'],
        definitions: ['A. the ability to continue physical activity for a long time','B. the ability of muscles to produce force','C. regular exercise session','D. the ability to bend and move easily','E. any movement that requires energy','F. good physical condition and health','G. a way of living that promotes good health','H. the ability to resist fatigue'],
        answers: ['F','A','D','B','H','E','C','G'],
      },
      fillGaps: {
        wordBank: ['fitness','strength','workout','endurance','physical activity'],
        sentences: [
          { text: 'Regular ___ improves overall health.', answer: 'physical activity' },
          { text: 'Running helps develop ___.', answer: 'endurance' },
          { text: 'Weightlifting increases muscle ___.', answer: 'strength' },
          { text: 'A daily ___ can improve fitness levels.', answer: 'workout' },
          { text: 'Walking, cycling, and swimming are forms of ___.', answer: 'physical activity' },
        ],
      },
    },
    {
      id: 'understand', level: 'Understand', emoji: '💡', color: '#6244eb',
      reading: {
        title: 'Why Exercise Is Important for Teenagers',
        text: `Physical activity is an essential part of a healthy lifestyle. Health experts recommend that teenagers engage in at least sixty minutes of moderate to vigorous physical activity every day. Regular exercise benefits not only physical health but also mental and emotional wellbeing.

One of the most important benefits of exercise is improved physical fitness. Activities such as running, swimming, cycling, and playing sports help strengthen muscles, improve cardiovascular health, and increase endurance. Exercise also helps maintain a healthy weight and reduces the risk of diseases such as obesity, diabetes, and heart disease.

In addition to physical benefits, exercise has a positive effect on mental health. Many teenagers experience stress due to schoolwork, exams, and social pressures. Physical activity helps reduce stress by releasing chemicals called endorphins, which improve mood and promote feelings of happiness. As a result, students who exercise regularly often feel more energetic and confident.

Exercise can also improve academic performance. Research has shown that physical activity increases blood flow to the brain, which may improve concentration, memory, and problem-solving abilities. Students who participate in sports often develop important life skills such as teamwork, discipline, leadership, and time management.

However, many teenagers today spend long hours using smartphones, computers, and other digital devices. This sedentary lifestyle can reduce physical activity levels and negatively affect health. Therefore, it is important for young people to balance screen time with regular exercise and outdoor activities.

In conclusion, exercise is essential for both physical and mental health. Regular physical activity helps teenagers stay healthy, manage stress, improve academic performance, and develop valuable life skills.`,
      },
      mcq: [
        { q: 'What is the main idea of the text?', options: ['Teenagers should avoid sports','Exercise provides many physical and mental benefits','Sports are only important for professional athletes','Exercise is less important than studying'], answer: 1 },
        { q: 'How much physical activity is recommended for teenagers daily?', options: ['15 minutes','30 minutes','60 minutes','120 minutes'], answer: 2 },
        { q: 'What chemical released during exercise improves mood?', options: ['Protein','Endorphins','Vitamins','Calories'], answer: 1 },
        { q: 'Which of the following is a mental benefit of exercise?', options: ['Increased stress','Better mood and confidence','Weight gain','Reduced memory'], answer: 1 },
        { q: 'What problem is associated with excessive screen time?', options: ['Better fitness','Improved endurance','Reduced physical activity','Better concentration'], answer: 2 },
        { q: 'According to the text, why is exercise important for students?', options: ['It improves concentration and memory','It replaces studying','It reduces communication skills','It increases screen time'], answer: 0 },
      ],
    },
    {
      id: 'apply', level: 'Apply', emoji: '✍️', color: '#10b981',
      title: 'Personal Reflection',
      prompts: ['What type of exercise do you do regularly?','How often do you exercise?','How does exercise affect your mood and energy?','What physical activity would you like to try in the future?'],
      wordCount: '120–150 words',
    },
    {
      id: 'analyze', level: 'Analyze', emoji: '⚖️', color: '#f59e0b',
      title: 'Fitness Profile Analysis',
      compareTable: {
        left: { label: 'Student A (Active)', items: ['Exercises 4 times a week','Sleeps 8 hours per night','Drinks plenty of water','Plays football'] },
        right: { label: 'Student B (Sedentary)', items: ['Rarely exercises','Sleeps 5 hours per night','Spends 7 hours on screens daily','Often feels tired'] },
      },
      questions: ['Which student has a healthier lifestyle?','Compare their daily habits.','What health risks may Student B face?','Which habits should Student B improve first?','How might exercise affect Student B\'s health?'],
      wordCount: '150–180 words',
    },
    {
      id: 'evaluate', level: 'Evaluate', emoji: '🗣️', color: '#fb7185',
      title: 'Opinion Essay',
      statement: '"Physical education classes are just as important as academic subjects."',
      instruction: 'Do you agree or disagree? Write 150–180 words with your opinion, three reasons, one example, and a conclusion.',
    },
    {
      id: 'create', level: 'Create', emoji: '🎨', color: '#a78bfa',
      title: '🏆 Fitness Challenge Project — 7-Day Fitness Plan',
      description: 'Design a 7-Day Fitness Challenge including daily physical activity, warm-up exercises, water intake goals, healthy eating suggestions, and daily reflection.',
      reflectionPrompts: ['What did you learn about physical fitness?','Which activity did you enjoy most?','How did this challenge improve your critical and creative thinking skills?'],
    },
  ],
};
