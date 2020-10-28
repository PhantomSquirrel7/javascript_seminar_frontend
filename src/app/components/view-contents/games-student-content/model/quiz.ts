export interface Quiz {
    question: string; // Question text
    answers: string[]; // answer text
    type: string;
    selectedAnswers: string[]; // Index of selected answers
    correctAnswers: any[]; // Index of correct answers
    leftAnswers: string[]; // Used for matching by client
    rightAnswers: string[]; // Used for matching by client
  }
