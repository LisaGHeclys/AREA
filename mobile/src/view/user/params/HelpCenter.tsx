import React, {useState} from 'react';
import {View, StyleSheet, useColorScheme, ScrollView} from 'react-native';
import {List} from 'react-native-paper';

import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Colors} from '../../../../Style';

import Credit from '../../../components/Credit';
import SeparatorColor from '../../../components/SeparatorColor';
import TitleApp from '../../../components/TitleApp';

const Styles = StyleSheet.create({
  container: {
    height: '100%',
    flexGrow: 1,
    paddingBottom: 15,
  },
  end: {
    flexGrow: 2,
    justifyContent: 'flex-end',
  },
});

const qnaList: {
  id: string;
  questions: {
    question: string;
    response: string;
  }[];
}[] = [
  {
    id: '',
    questions: [
      {
        question: 'What is the application AREA ?',
        response:
          'This application has the goal to regroup every action reaction useful to our users.',
      },
    ],
  },
  {
    id: 'Basics',
    questions: [
      {
        question: 'What is an AREA ?',
        response:
          "It's when you want to link a reaction to an action. ex: you wanna get an email everytime someone tweets.",
      },
      {
        question: 'How do you create an AREA ?',
        response:
          'On the the create page, then you can name your AREA, and chose what action or reaction to put.',
      },
      {
        question: 'How can I see my AREAs ?',
        response:
          'On the homepage, there will be a list of the AREAs you created.',
      },
    ],
  },
  {
    id: 'Why this application ?',
    questions: [
      {
        question: 'Why did you create this application ?',
        response:
          "It's a third year Epitech project to be carried out by groups of 4 to 5.",
      },
      {
        question: 'What was your deadline ?',
        response: 'About 2 months.',
      },
      {
        question: 'What was the stack used for the mobile ?',
        response: 'React Native, TypesScript, Metro and Gradlew',
      },
    ],
  },
];

const HelpCenter = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={[
          {
            backgroundColor: isDarkMode
              ? Colors.backgroundD
              : Colors.backgroundW,
          },
          Styles.container,
        ]}>
        <TitleApp title="Help Center" path="User" backbutton={true} />
        <SeparatorColor width={360} marginTop={0} marginLeft={0} />
        {qnaList.map((section, index) => (
          <List.Section title={section.id} key={index} style={{zIndex: 1}}>
            {section.questions.map(
              (qna: {question: string; response: string}, index: number) => {
                const [isDown, setIsDown] = useState(false);

                const handleOnPress = () => {
                  setIsDown(!isDown);
                };

                return (
                  <List.Accordion
                    key={index}
                    style={{
                      backgroundColor: isDarkMode
                        ? Colors.backgroundD
                        : Colors.backgroundW,
                      zIndex: 1,
                    }}
                    title={qna.question}
                    right={() => (
                      <FontAwesomeIcon
                        icon={isDown ? faAngleUp : faAngleDown}
                        size={20}
                        color={isDarkMode ? Colors.majorD : Colors.majorW}
                      />
                    )}
                    onPress={handleOnPress}
                    titleStyle={{
                      fontWeight: 'bold',
                      color: isDarkMode ? Colors.textD : Colors.textW,
                    }}>
                    <List.Item
                      style={{zIndex: 1}}
                      title={qna.response}
                      titleNumberOfLines={2}
                    />
                  </List.Accordion>
                );
              },
            )}
          </List.Section>
        ))}
      </ScrollView>
      <View style={Styles.end}>
        <Credit />
      </View>
    </View>
  );
};

export default HelpCenter;
