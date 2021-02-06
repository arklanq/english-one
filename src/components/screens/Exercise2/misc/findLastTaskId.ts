import IGuessImageTask from '../models/IGuessImageTask';

export default function findLastTaskId(questions: IGuessImageTask[]) {
  return questions.reduce(
    (offset: number, item: IGuessImageTask) => (item.image.id > offset ? item.image.id : offset),
    0
  );
}
