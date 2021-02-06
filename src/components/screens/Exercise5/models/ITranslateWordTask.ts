import IAnswer from '@/models/IAnswer';
import IQuestion from '@/models/IQuestion';

export default interface ITranslateWordTask {
  question: IQuestion;
  answers: IAnswer[];
}
