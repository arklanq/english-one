import {makeStyles} from '@idkman/react-native-styles';
import React, {Fragment, memo, useCallback} from 'react';
import {View} from 'react-native';
import {Divider, IconButton, List} from 'react-native-paper';

import {ScreenNavigationProp, StackParamList} from '@/components/other/Router';
import listItems, {IListItem} from '@/components/screens/Home/list';
import {ITheme} from '@/models/theme/ITheme';

interface IProps {
  navigation: ScreenNavigationProp<'home'>;
}

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
  },
  arrowRight: {
    alignSelf: 'center',
  },
}));

function Home(props: IProps) {
  const {navigation} = props;
  const stylesheet = useStyles();

  const generateListItemPressHandler = useCallback(
    (routeName: keyof StackParamList) => () => {
      navigation.navigate(routeName);
    },
    [navigation]
  );

  return (
    <View style={stylesheet.container}>
      <List.Section>
        <List.Subheader>Dostępne ćwiczenia</List.Subheader>
        <Divider />
        {listItems.map(({name, title, icon}: IListItem, index: number) => (
          <Fragment key={index}>
            <List.Item
              title={title}
              description='0 / 10 punktów'
              left={icon}
              right={(props) => (
                <IconButton {...props} icon='chevron-right' style={[props.style, stylesheet.arrowRight]} size={32} />
              )}
              onPress={generateListItemPressHandler(name)}
            />
            <Divider />
          </Fragment>
        ))}
      </List.Section>
    </View>
  );
}

export default memo(Home);
