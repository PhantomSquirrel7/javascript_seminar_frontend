export interface Quiz {
    question: string; // Question text
    answers: string[]; // answer text
    type: string;
    selectedAnswers: string[]; // Index of selected answers
    correctAnswers: any[]; // Index of correct answers
  }
