import {useTheme} from '@idkman/react-native-styles';
import {Formik, FormikProps} from 'formik';
import React, {memo, MutableRefObject, useRef} from 'react';
import {View} from 'react-native';
import {Avatar, Card, IconButton, List, RadioButton} from 'react-native-paper';

import Typography from '@/components/atoms/Typography';
import ICompleteDialogueQuestion from '@/components/screens/Dialogue/models/ICompleteDialogueQuestion';
import IDialogueAnswer from '@/models/IDialogueAnswer';
import {ITheme} from '@/models/theme/ITheme';

import useFormSubmitHandler from './hooks/useFormSubmitHandler';
import useListItemPressHandler from './hooks/useListItemPressHandler';
import useRenderRadioButton from './hooks/useRenderRadioButton';
import useStyles from './hooks/useStyles';
import {IFormValues, initialValues, validationSchema} from './misc/form';

export interface IDialogueQuestionProps {
  question: ICompleteDialogueQuestion;
  proceed: () => unknown;
}

function DialogueQuestion(props: IDialogueQuestionProps) {
  const formikRef: MutableRefObject<FormikProps<IFormValues> | null> = useRef(null);
  const {question, proceed} = props;
  const stylesheet = useStyles();
  const theme: ITheme = useTheme();

  const handleSubmitForm = useFormSubmitHandler(question.answers, proceed);
  const generateListItemPressHandler = useListItemPressHandler(formikRef);
  const generateRadioButtonRenderFn = useRenderRadioButton();

  return (
    <View style={stylesheet.root}>
      <View style={stylesheet.questionView}>
        <Avatar.Icon size={48} icon='account' color={theme.palette.contrastText.icon} style={stylesheet.avatar} />
        <Card style={stylesheet.questionCard}>
          <Card.Content>
            <Typography variant='body2'>{question.question}</Typography>
          </Card.Content>
        </Card>
      </View>

      <Formik<IFormValues>
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({values, touched, errors, handleChange, handleBlur, handleSubmit}) => (
          <View>
            <View style={stylesheet.answersView}>
              <RadioButton.Group value={values.answer} onValueChange={handleChange('answer')}>
                {question.answers.map((answer: IDialogueAnswer) => {
                  const isChecked: boolean = values.answer === answer.id.toString();

                  return (
                    <View key={answer.id} style={stylesheet.answerView}>
                      <View>
                        <Card style={stylesheet.answerCard}>
                          <List.Item
                            title={answer.value}
                            titleNumberOfLines={0}
                            left={generateRadioButtonRenderFn(values, answer)}
                            style={stylesheet.answerListItem}
                            onPress={generateListItemPressHandler(answer)}
                            onBlur={handleBlur('answer')}
                          />
                        </Card>
                      </View>

                      {isChecked && touched.answer && errors.answer && (
                        <Typography variant='caption' style={stylesheet.errorHelper}>
                          {errors.answer}
                        </Typography>
                      )}
                    </View>
                  );
                })}
              </RadioButton.Group>
            </View>

            <View style={stylesheet.submitFormView}>
              <View style={stylesheet.generalErrorHelperWrapper}>
                <Typography variant='caption' style={stylesheet.errorHelper}>
                  {values.answer.length === 0 && touched.answer && errors.answer ? errors.answer : ''}
                </Typography>
              </View>
              <IconButton
                icon='send'
                color={theme.palette.secondary.main}
                size={36}
                onPress={handleSubmit}
                style={stylesheet.submitButton}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default memo(DialogueQuestion);
