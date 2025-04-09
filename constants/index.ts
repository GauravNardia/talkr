export const voices = [
    {
      name: "Devi - Clear Hindi pronunciation",
      desc: "Devi is the pen name of a young Indian female artist with clear Hin...",
      icon: "🟠",
    },
    {
      name: "Monika Sogam - Hindi Modulated",
      desc: "Monika Sogam is already a pretty loved voice on ElevenLabs in th...",
      icon: "🟡",
    },
    {
      name: "Niraj - Hindi Narrator",
      desc: "Niraj is the pen name of a veteran Indian actor. The base and...",
      icon: "🟣",
    },
  ];

 export const scenarios = [
    {
      icon: '🍕',
      title: 'Ordering Food',
      level: 'Beginner',
      description: 'Practice speaking at a restaurant.'
    },
    {
      icon: '✈️',
      title: 'Airport Check-in',
      level: 'Intermediate',
      description: 'Go through airport and security talk.'
    },
    {
      icon: '🏨',
      title: 'Hotel Reservation',
      level: 'Beginner',
      description: 'Book a hotel room & ask questions.'
    },
    {
      icon: '👨‍⚕️',
      title: 'Visiting the Doctor',
      level: 'Intermediate',
      description: 'Explain symptoms and understand advice.'
    },
    {
      icon: '💼',
      title: 'Job Interview',
      level: 'Advanced',
      description: 'Answer common interview questions.'
    },
    {
      icon: '🛍️',
      title: 'Shopping for Clothes',
      level: 'Beginner',
      description: 'Ask for sizes, colors, or prices.'
    },
    {
      icon: '🎙️',
      title: 'Custom Roleplay',
      level: 'All Levels',
      description: 'Type your own scenario to simulate.'
    }
  ];

  export const quizPrompt = `You are a language learning assistant that helps users learn a **target language** from their **native language** through short, beginner-friendly quiz questions.

Return only one quiz question in this **exact JSON format**, and nothing else:

{
  "question": "Your question here (written in the native language)",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"], 
  "correctAnswer": "The correct answer exactly matching one of the options",
  "explanation": "A short explanation in the native language explaining why this is the correct answer"
}

🧠 Goal:
Help the user understand how to say something in the **target language** using their **native language**.

🔤 Instructions:
- Write the question in the user's **native language** (e.g. Hindi)
- All options must be in the **target language** (e.g. French)
- The correctAnswer must exactly match one of the options
- The explanation must be in the **native language**, explaining the meaning of the correct answer
- Keep vocabulary and sentence structure simple (Beginner level)
- Focus on useful everyday topics like greetings, food, common phrases, numbers, etc.
- Generate diffeerent questions and topics according to the level(first -> beginner then -> intermidiate -> advanced) start with simple then increase levels as user go on.
- If user seen the question once dont repeat that question.
-structure better questions.

🌍 Example Inputs:
Target language: French  
Native language: Hindi  

🌟 Output format must be valid JSON only, with no extra text or markdown.
`