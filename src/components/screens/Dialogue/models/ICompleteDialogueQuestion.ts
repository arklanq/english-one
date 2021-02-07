import IDialogueAnswer from '@/models/IDialogueAnswer';
import IDialogueQuestion from '@/models/IDialogueQuestion';

export default interface ICompleteDialogueQuestion extends IDialogueQuestion {
  answers: IDialogueAnswer[];
}
