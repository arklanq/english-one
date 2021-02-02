import {FontAwesome5 as FontAwesome5Icon} from '@expo/vector-icons';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';

import {StackParamList} from '@/components/other/Router';

export interface IListItemIconProps {
  color: string;
  style: {
    marginLeft: number;
    marginRight: number;
    marginVertical?: number;
  };
}

export interface IListItem {
  name: keyof StackParamList;
  title: string;
  icon: (props: IListItemIconProps) => ReactNode;
}

const listItems: IListItem[] = [
  {
    name: 'exercise1',
    title: 'Dopasuj kolejność',
    icon: (props: IListItemIconProps) => <List.Icon {...props} icon='drag-variant' />,
  },
  {
    name: 'exercise2',
    title: 'Zgadnij co to',
    icon: (props: IListItemIconProps) => <List.Icon {...props} icon='lock-question' />,
  },
  {
    name: 'exercise3',
    title: 'Dialogi sytuacyjne',
    icon: (props: IListItemIconProps) => <List.Icon {...props} icon='forum' />,
  },
  {
    name: 'exercise4',
    title: 'Przetłumacz na polski',
    icon: (props: IListItemIconProps) => <List.Icon {...props} icon='flag-variant' />,
  },
  {
    name: 'exercise5',
    title: 'Przetłumacz na angielski',
    icon: (props: IListItemIconProps) => (
      <View style={[props.style, {alignItems: 'center', justifyContent: 'center', height: 40, width: 40, margin: 8}]}>
        <FontAwesome5Icon color={props.color} name='flag-usa' size={16} />
      </View>
    ),
  },
];

export default listItems;
