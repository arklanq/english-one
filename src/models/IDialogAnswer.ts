import IAnswer from './IAnswer';

export default interface IDialogAnswer extends IAnswer {
  isCorrect: boolean;
  helperText?: string;
}
