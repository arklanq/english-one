import ISimpleQuestion from '../models/ISimpleQuestion';

export default function findLastQuestionId(questions: ISimpleQuestion[]) {
  return questions.reduce(
    (offset: number, item: ISimpleQuestion) => (item.image.id > offset ? item.image.id : offset),
    0
  );
}
