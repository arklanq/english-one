import {makeStyles, useTheme} from '@idkman/react-native-styles';
import {Formik, FormikProps} from 'formik';
import {FormikHelpers} from 'formik/dist/types';
import React, {ForwardedRef, forwardRef, memo, useCallback} from 'react';
import {Dimensions, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {object, string} from 'yup';

import {ITheme} from '@/models/theme/ITheme';

export interface IAnswerValues {
  answer: string;
}
export interface ISimpleAnswerFormProps {
  handleSkip: () => void | Promise<void>;
  handleSubmit: (answer: string, formikHelpers: FormikHelpers<IAnswerValues>) => void | Promise<void>;
}

const windowWidth = Dimensions.get('window').width;
const contentWidth = windowWidth * 0.9 - 2 * 24;
const useStyles = makeStyles((theme: ITheme) => ({
  bottomSection: {
    width: '100%',
    maxWidth: contentWidth,
    alignItems: 'stretch',
  },
  formControl: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 0,
  },
  inputView: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  helper: {
    width: '100%',
  },
  formControlGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    maxWidth: 250,
    alignSelf: 'center',
  },
  button__label: {
    color: theme.palette.primary.contrastText,
  },
}));
const initialValues: IAnswerValues = {answer: ''};
const validationSchema = object()
  .required()
  .shape({
    answer: string()
      .label('Odpowiedź')
      .matches(/^[A-Ża-ż\s]+$/, 'Dozwolone tylko litery'),
  });

const SimpleAnswerForm = forwardRef(
  (props: ISimpleAnswerFormProps, ref: ForwardedRef<FormikProps<IAnswerValues> | null>) => {
    const {handleSkip: handleSkipQuestion, handleSubmit: handleSubmitAnswer} = props;
    const stylesheet = useStyles();
    const theme: ITheme = useTheme();

    const handleSubmit = useCallback(
      (values: IAnswerValues, formikHelpers: FormikHelpers<IAnswerValues>) => {
        handleSubmitAnswer(values.answer, formikHelpers);
      },
      [handleSubmitAnswer]
    );

    return (
      <Formik<IAnswerValues>
        innerRef={ref}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({values, errors, touched, handleSubmit, handleChange, handleBlur}) => (
          <View style={stylesheet.bottomSection}>
            <View style={stylesheet.formControl}>
              <View style={stylesheet.inputView}>
                <TextInput
                  label='Odpowiedź'
                  value={values.answer}
                  onChangeText={handleChange('answer')}
                  onBlur={handleBlur('answer')}
                  style={stylesheet.input}
                  error={touched.answer && Boolean(errors.answer)}
                />
              </View>
              <HelperText type='error' visible={touched.answer && Boolean(errors.answer)} style={stylesheet.helper}>
                {errors.answer}
              </HelperText>
            </View>

            <View style={stylesheet.formControlGroup}>
              <Button
                icon='send-check'
                mode='contained'
                onPress={handleSkipQuestion}
                style={stylesheet.button}
                labelStyle={stylesheet.button__label}
              >
                Pomiń
              </Button>

              <Button
                icon='check-circle'
                mode='contained'
                color={theme.palette.secondary.main}
                onPress={handleSubmit}
                style={stylesheet.button}
                labelStyle={stylesheet.button__label}
              >
                Sprawdź
              </Button>
            </View>
          </View>
        )}
      </Formik>
    );
  }
);

export default memo(SimpleAnswerForm);
