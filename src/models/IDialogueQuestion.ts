import IQuestion from './IQuestion';

export default interface IDialogueQuestion extends IQuestion {
  dialogueId: number;
  sequence: number;
}
