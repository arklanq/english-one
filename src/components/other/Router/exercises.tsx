import {ComponentType} from 'react';

import {StackParamList} from '@/components/other/Router';
import Exercise1 from '@/components/screens/Exercise1';
import Exercise2 from '@/components/screens/Exercise2';
import Exercise3 from '@/components/screens/Exercise3';
import Exercise4 from '@/components/screens/Exercise4';
import Exercise5 from '@/components/screens/Exercise5';

export interface IExerciseRoute {
  name: keyof StackParamList;
  title: string;
  component: ComponentType<any>;
}

const exercises: IExerciseRoute[] = [
  {
    name: 'exercise1',
    title: 'Dopasuj kolejność',
    component: Exercise1,
  },
  {
    name: 'exercise2',
    title: 'Zgadnij co to',
    component: Exercise2,
  },
  {
    name: 'exercise3',
    title: 'Dialogi sytuacyjne',
    component: Exercise3,
  },
  {
    name: 'exercise4',
    title: 'Przetłumacz na polski',
    component: Exercise4,
  },
  {
    name: 'exercise5',
    title: 'Przetłumacz na angielski',
    component: Exercise5,
  },
];

export default exercises;
