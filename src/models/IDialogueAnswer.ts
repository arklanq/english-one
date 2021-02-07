import IAnswer from './IAnswer';

export default interface IDialogueAnswer extends IAnswer {
  isCorrect: boolean;
  helperText?: string;
}
