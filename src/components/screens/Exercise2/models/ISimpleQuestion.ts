import IAnswer from '@/models/IAnswer';
import IImage from '@/models/IImage';

export default interface ISimpleQuestion {
  image: IImage;
  answers: IAnswer[];
}
