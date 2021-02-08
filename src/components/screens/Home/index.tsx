import {makeStyles} from '@idkman/react-native-styles';
import React, {Fragment, memo, ReactNode, useCallback} from 'react';
import {View} from 'react-native';
import {Divider, IconButton, List} from 'react-native-paper';
import {useSelector} from 'react-redux';

import ProgressChart from '@/components/molecules/ProgressChart';
import {IScreenNavigationProps, StackParamList} from '@/components/other/Router';
import IListItemIconProps from '@/models/IListItemIconProps';
import {ITheme, ThemeVariant} from '@/models/theme/ITheme';
import {AllExercisesPoints, selectAllExercisesPoints} from '@/redux-store/features/exercises/selectors';
import {ExerciseNumber} from '@/redux-store/features/exercises/slice';

import listItems, {IListItem} from './list';

interface IProps extends IScreenNavigationProps<'home'> {}

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
  },
  goldenListItem: () => ({
    backgroundColor: theme.variant === ThemeVariant.LIGHT ? theme.palette.primary.light : theme.palette.primary.dark,
  }),
  arrowRight: {
    alignSelf: 'center',
  },
  chart: {
    flex: 1,
  },
}));

function Home(props: IProps) {
  const {navigation} = props;
  const stylesheet = useStyles();
  const tasksPoints: AllExercisesPoints = useSelector(selectAllExercisesPoints);

  const generateListItemPressHandler = useCallback(
    (routeName: keyof StackParamList) => () => {
      navigation.navigate(routeName);
    },
    [navigation]
  );
  const generateRenderIconHandler = useCallback(
    (points: number, renderIcon: (props: IListItemIconProps) => ReactNode) => (props: IListItemIconProps) => {
      return renderIcon({
        ...props,
        color: props.color,
      });
    },
    []
  );

  return (
    <View style={stylesheet.container}>
      <List.Section>
        <List.Subheader>Dostępne ćwiczenia</List.Subheader>
        <Divider />
        {listItems.map(({name, title, icon}: IListItem, index: number) => {
          const points = tasksPoints[(index + 2) as ExerciseNumber];
          const isFullPoints = points >= 10;

          return (
            <Fragment key={index}>
              <List.Item
                title={title}
                description={`${points} / 10 punktów`}
                left={generateRenderIconHandler(points, icon)}
                right={(props) => (
                  <IconButton {...props} icon='chevron-right' style={[props.style, stylesheet.arrowRight]} size={32} />
                )}
                onPress={generateListItemPressHandler(name)}
                style={isFullPoints && stylesheet.goldenListItem}
              />
              <Divider />
            </Fragment>
          );
        })}
      </List.Section>

      <ProgressChart style={stylesheet.chart} />
    </View>
  );
}

export default memo(Home);
