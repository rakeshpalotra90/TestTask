import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import Theme from '../../Theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

/**
 * FocusList - Component is used to display focus list of doNotDisturb, Sleep, Personal and Work
 **/
export default class FocusList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {focusList.map(item => {
          return (
            <TouchableWithoutFeedback>
              <View style={styles.itemContainer}>
                <View style={styles.leftIconBody}>
                  <Icon
                    name={'chevron-down'}
                    size={20}
                    color={Theme.Colors.white}
                    solid
                  />
                </View>
                <View>
                  <Text children={item.title} style={styles.titleText} />
                  {item.description ? (
                    <Text
                      children={item.description}
                      style={styles.descriptionText}
                    />
                  ) : null}
                </View>

                <View style={styles.rightIconBody}>
                  {item.righticon ? (
                    <Entypo
                      name={'dots-three-horizontal'}
                      size={20}
                      color={Theme.Colors.white}
                    />
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
        <View style={styles.addFocus}>
          <View style={styles.addFocusIconBody}>
            <Entypo name={'plus'} size={30} color={Theme.Colors.white} />
          </View>
          <Text children={'New Focus'} style={styles.newFocusText} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  itemContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: 90,
    backgroundColor: Theme.Colors.black,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15,
  },
  leftIconBody: {
    width: 100,
    alignItems: 'center',
  },
  titleText: {
    color: Theme.Colors.white,
    fontSize: Theme.Sizes.font.focusTitle.firstLine,
    fontFamily: Theme.Fonts.primary,
  },
  descriptionText: {
    color: Theme.Colors.entity.color1,
    fontSize: Theme.Sizes.font.focusTitle.secondLine,
    fontFamily: Theme.Fonts.primary,
  },
  rightIconBody: {
    width: 100,
    alignItems: 'center',
  },
  addFocus: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginTop: 40,
  },
  addFocusIconBody: {
    width: 60,
    height: 60,
    backgroundColor: Theme.Colors.black,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newFocusText: {
    color: Theme.Colors.white,
    fontSize: Theme.Sizes.font.focusTitle.secondLine,
    fontFamily: Theme.Fonts.primary,
    marginTop: 10,
  },
});

const focusList = [
  {title: 'Do Not Disturb', description: '', righticon: true},
  {title: 'Sleep', description: '', righticon: true},
  {title: 'Personal', description: 'Get Started', righticon: false},
  {title: 'Work', description: 'Get Started', righticon: false},
];
