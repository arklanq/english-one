import {makeStyles, useTheme, VariousStyles} from '@idkman/react-native-styles';
import Color from 'color';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import Svg from 'react-native-svg';
import {useSelector} from 'react-redux';
import {AnimationStyle} from 'victory-core';
import {VictoryAnimation, VictoryLabel, VictoryPie} from 'victory-native';

import {ITheme, ThemeVariant} from '@/models/theme/ITheme';
import {selectExercisesOverallProgress} from '@/redux-store/features/exercises/selectors';

export interface IProgressChartProps {
  style?: VariousStyles;
}

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

function ProgressChart(props: IProgressChartProps) {
  const {style: _style} = props;
  const theme: ITheme = useTheme();
  const stylesheet = useStyles();

  const [initial, setInitial] = useState<boolean>(true);
  const overallProgress = useSelector(selectExercisesOverallProgress);
  const percent = initial && overallProgress < 50 ? 0 : Math.floor((overallProgress / (5 * 10)) * 100);
  const data: {x: number; y: number}[] = useMemo(() => {
    return [
      {x: 1, y: percent},
      {x: 2, y: 100 - percent},
    ];
  }, [percent]);

  useEffect(() => {
    setInitial(false);
  }, [setInitial]);

  return (
    <View style={[_style, stylesheet.root]}>
      <Svg viewBox='0 0 400 400' width='100%' height='100%'>
        <VictoryPie
          standalone={false}
          animate={{duration: 1000}}
          width={400}
          height={400}
          data={data}
          innerRadius={138}
          labels={() => null}
          style={{
            data: {
              fill: ({datum}) => {
                let color: Color | string = Color(theme.palette.secondary.light);

                if (theme.variant === ThemeVariant.LIGHT) color = color.darken(datum.y / 400).toString();
                else color = color.darken(datum.y / 400).toString();

                return datum.x === 1 ? color : theme.palette.action.selected;
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={{percent}}>
          {({percent}: AnimationStyle) => {
            return (
              <VictoryLabel
                textAnchor='middle'
                verticalAnchor='middle'
                x={200}
                y={200}
                backgroundPadding={[{bottom: 16}, {bottom: 0}]}
                text={(percent === 100 ? ['Nice!'] : []).concat([`${Math.round(percent as number)}%`])}
                style={[
                  {
                    ...theme.typography.h1,
                    fontWeight: 'bold',
                    fill: theme.palette.text.primary,
                  },
                  {
                    ...theme.typography.h2,
                    fontWeight: 'bold',
                    fill: theme.palette.text.secondary,
                  },
                ]}
              />
            );
          }}
        </VictoryAnimation>
      </Svg>
    </View>
  );
}

export default memo(ProgressChart);
