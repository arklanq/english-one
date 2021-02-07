import IDialogue from '@/models/IDialogue';

import ICompleteDialogueQuestion from './ICompleteDialogueQuestion';

export default interface ICompleteDialogue extends IDialogue {
  questions: ICompleteDialogueQuestion[];
}
