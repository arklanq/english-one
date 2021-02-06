import IAnswer from '@/models/IAnswer';
import IImage from '@/models/IImage';

export default interface IGuessImageTask {
  image: IImage;
  answers: IAnswer[];
}
