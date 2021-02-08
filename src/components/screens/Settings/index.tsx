import {Feather as FeatherIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, {memo} from 'react';
import {Image, ImageStyle, View} from 'react-native';
import {useSelector} from 'react-redux';

import {selectColorSchemeInfo} from '@/redux-store/features/appearance/selectors';
import {IColorSchemeInfo} from '@/redux-store/features/appearance/slice';
import {selectDatabaseVersion} from '@/redux-store/features/database/selectors';

import SquereCard, {ICardIconProps} from './components/SquereCard';
import useAppearanceChangeHandler from './hooks/useAppearanceChangeHandler';
import useStyles from './hooks/useStyles';
import {DarkModeInfo} from './misc/utils';

function MainView() {
  const stylesheet = useStyles();
  const dbVersion: number | null = useSelector(selectDatabaseVersion);
  const colorSchemeInfo: IColorSchemeInfo = useSelector(selectColorSchemeInfo);
  const handleAppearanceChange = useAppearanceChangeHandler();

  return (
    <>
      <View style={stylesheet.container}>
        <View style={stylesheet.tilesRow}>
          <SquereCard
            title='Wersja aplikacji'
            content={Constants.nativeAppVersion ?? '?'}
            icon={(props: ICardIconProps) => <MaterialCommunityIcons {...props} name='cellphone-android' />}
          />
          <SquereCard
            title='Wersja bazy zadań'
            content={dbVersion?.toString() ?? '?'}
            icon={(props: ICardIconProps) => <FeatherIcons {...props} name='database' />}
          />
        </View>

        <View style={stylesheet.tilesRow}>
          <SquereCard
            title='Tryb ciemny'
            content={DarkModeInfo[colorSchemeInfo.userPreference]}
            icon={(props: ICardIconProps) => <MaterialCommunityIcons {...props} name='theme-light-dark' />}
            onPress={handleAppearanceChange}
          />
        </View>

        <Image
          source={require('../../../assets/arts/settings_app.png')}
          resizeMode='contain'
          style={stylesheet.art as ImageStyle}
        />
      </View>
    </>
  );
}

export default memo(MainView);
