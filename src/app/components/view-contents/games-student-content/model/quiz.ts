export interface Quiz {
    question: string; // Question text
    answers: string[]; // answer text
    selectedAnswers: string[]; // Index of selected answers
    correctAnswers: string[]; // Index of correct answers
  }
