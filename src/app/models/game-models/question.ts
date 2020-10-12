export interface Question {
    id: string,
    type: "select" | "match",   // type of question -> Multiple choice or matching
    name: string, 
    question: string,       
    options: Array<string>,     // possible answers 
    answers: Array<number> | Array<[number, number]>    // indexes of options array for select or tuples for matching
}