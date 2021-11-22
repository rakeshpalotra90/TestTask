import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Theme from '../Theme';
import SwipeSlider from 'react-native-swipe-slider';
import ButtonRounded from '../components/Buttons/ButtonRounded';

/**
 * BrightnessControlScreen - Screen is used to display by moving finger from brightness blockshouldchangesfullness heigh.
 **/
export default class BrightnessControlScreen extends React.Component<any> {
  animatedScaleValue: Animated.Value | Animated.ValueXY;
  animatedTranslateYValue: Animated.Value | Animated.ValueXY;
  animatedTranslateXValue: Animated.Value | Animated.ValueXY;
  animatedBackgroundOpacityValue: Animated.Value | Animated.ValueXY;
  animatedContainerOpacityValue: Animated.Value | Animated.ValueXY;

  constructor(props: any) {
    super(props);
    this.animatedScaleValue = new Animated.Value(
      Theme.Animations.screens.brightNessControl.initial.scaleValue,
    );
    this.animatedTranslateYValue = new Animated.Value(
      Theme.Animations.screens.brightNessControl.initial.translateYValue,
    );
    this.animatedTranslateXValue = new Animated.Value(
      Theme.Animations.screens.brightNessControl.initial.translateXValue,
    );
    this.animatedBackgroundOpacityValue = new Animated.Value(
      Theme.Animations.screens.brightNessControl.initial.backgroundOpacityValue,
    );
    this.animatedContainerOpacityValue = new Animated.Value(
      Theme.Animations.screens.brightNessControl.initial.containerOpacityValue,
    );
  }

  state = {
    hydrationLevel: 30,
  };

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.animatedContainerOpacityValue, {
        toValue:
          Theme.Animations.screens.brightNessControl.onMount.opacity.container
            .toValue,
        duration:
          Theme.Animations.screens.brightNessControl.onMount.opacity.container
            .duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedTranslateYValue, {
        toValue:
          Theme.Animations.screens.brightNessControl.onMount.translate.Y
            .toValue,
        duration:
          Theme.Animations.screens.brightNessControl.onMount.translate.Y
            .duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedTranslateXValue, {
        toValue:
          Theme.Animations.screens.brightNessControl.onMount.translate.X
            .toValue,
        duration:
          Theme.Animations.screens.brightNessControl.onMount.translate.X
            .duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedScaleValue, {
        toValue:
          Theme.Animations.screens.brightNessControl.onMount.scale.toValue,
        duration:
          Theme.Animations.screens.brightNessControl.onMount.scale.duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedBackgroundOpacityValue, {
        toValue:
          Theme.Animations.screens.brightNessControl.onMount.opacity.background
            .toValue,
        duration:
          Theme.Animations.screens.brightNessControl.onMount.opacity.background
            .duration,
        useNativeDriver: true,
      }),
    ]).start();
  }

  //onDismiss - dismiss overlay by componentId
  onDismiss = () => {
    this.props.onDismiss();
    Animated.parallel([
      Animated.timing(this.animatedContainerOpacityValue, {
        toValue:
          Theme.Animations.screens.brightNessControl.onUnmount.opacity.container
            .toValue,
        duration:
          Theme.Animations.screens.brightNessControl.onUnmount.opacity.container
            .duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedTranslateYValue, {
        toValue:
          Theme.Animations.screens.brightNessControl.onUnmount.translate.Y
            .toValue,
        duration:
          Theme.Animations.screens.brightNessControl.onUnmount.translate.Y
            .duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedTranslateXValue, {
        toValue:
          Theme.Animations.screens.brightNessControl.onUnmount.translate.X
            .toValue,
        duration:
          Theme.Animations.screens.brightNessControl.onUnmount.translate.X
            .duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedScaleValue, {
        toValue:
          Theme.Animations.screens.brightNessControl.onUnmount.scale.toValue,
        duration:
          Theme.Animations.screens.brightNessControl.onUnmount.scale.duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.props.onCloseModal();
    });
  };

  render() {
    const animatedStyle: any = {
      transform: [
        {
          translateY: this.animatedTranslateYValue,
        },
        {
          translateX: this.animatedTranslateXValue,
        },
        {
          scale: this.animatedScaleValue,
        },
      ],
      opacity: this.animatedContainerOpacityValue,
    };

    return (
      <TouchableWithoutFeedback onPress={this.onDismiss}>
        <View style={styles.wrapper}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.container, animatedStyle]}>
              <View style={styles.swipeSliderBody}>
                <SwipeSlider
                  style={styles.swipeSliderStle}
                  min={0}
                  max={100}
                  value={this.state.hydrationLevel}
                  onChange={(value: any) =>
                    this.setState({hydrationLevel: value})
                  }
                  backgroundColor={Theme.Colors.entity.color2}
                  barColor={Theme.Colors.white}
                  vertical
                />
              </View>

              <View>
                <View style={styles.modeContainer}>
                  <View style={styles.modeButtonBody}>
                    <ButtonRounded
                      icon={'moon'}
                      iconSize={25}
                      colorEnabledButton={Theme.Colors.black}
                      colorDisabledButton={Theme.Colors.white}
                      colorDisabledIcon={Theme.Colors.black}
                      colorEnabledIcon={Theme.Colors.white}
                    />
                  </View>
                  <View style={styles.modeButtonBody}>
                    <ButtonRounded
                      icon={'moon'}
                      iconSize={25}
                      colorEnabledButton={Theme.Colors.white}
                      colorDisabledButton={Theme.Colors.black}
                      colorDisabledIcon={Theme.Colors.white}
                      colorEnabledIcon={Theme.Colors.black}
                    />
                  </View>
                </View>
                <View style={styles.modeContainer}>
                  <Text children={'Dark Mode \n On'} style={styles.modeText} />
                  <Text
                    children={'Night Shift \n Off'}
                    style={styles.modeText}
                  />
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: Theme.Dimensions.screenWidth,
    height: Theme.Dimensions.screenHeight,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: Theme.Indents.xxl,
    marginHorizontal: Theme.Indents.lg,
    padding: Theme.Indents.xl,
    backgroundColor: Theme.Colors.sections.default.background,
    borderRadius: Theme.Borders.radius * 2,
  },
  swipeSliderBody: {
    height: 350,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeSliderStle: {
    height: 300,
    width: 65,
    borderRadius: 20,
  },
  modeContainer: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
  },
  modeButtonBody: {
    width: 80,
    flexDirection: 'row',
  },
  modeText: {
    color: Theme.Colors.white,
    fontSize: Theme.Sizes.font.focusTitle.secondLine,
    fontFamily: Theme.Fonts.primary,
    marginTop: 10,
    textAlign: 'center',
  },
  controls: {
    justifyContent: 'space-around',
    width: '100%',
    aspectRatio: 1.5,
  },
  icon: {
    margin: Theme.Indents.md,
  },
  play: {
    color: Theme.Colors.sections.musicControl.icons.play,
    fontSize: Theme.Sizes.icon.musicControlSection.play,
  },
  wards: {
    color: Theme.Colors.sections.musicControl.icons.wards,
    fontSize: Theme.Sizes.icon.musicControlSection.wards,
  },
  airDropIcon: {
    color: Theme.Colors.sections.musicControl.icons.wards,
    fontSize: Theme.Sizes.icon.musicControlSection.wards * 1.5,
    margin: 0,
  },
  volumeBarLine: {
    height: 4,
    flex: 1,
    borderRadius: 4,
    backgroundColor: Theme.Colors.semiWhite,
  },
  songImage: {
    width: 50,
    height: 50,
  },
  songImageWrapper: {
    width: 75,
    height: 75,
    borderRadius: Theme.Borders.radius / 2,
    backgroundColor: Theme.Colors.screens.musicControl.songImageWrapper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songTitleBar: {
    flex: 1,
    padding: Theme.Indents.md,
  },
  songTitleFirstLine: {
    color: Theme.Colors.semiWhite,
    marginBottom: 2,
    fontSize: Theme.Sizes.font.songTitle.firstLine,
  },
  songTitleSecondLine: {
    color: 'white',
    fontSize: Theme.Sizes.font.songTitle.secondLine,
  },
  horizontalLine: {
    height: 1,
    flex: 1,
    backgroundColor: Theme.Colors.semiWhite,
  },
  horizontalLineWrapper: {
    marginHorizontal: -Theme.Indents.xl,
    marginVertical: Theme.Indents.lg,
  },
  horizontalBoldLine: {
    height: 3,
    flex: 1,
    borderRadius: 3,
    backgroundColor: Theme.Colors.semiWhite,
  },
  horizontalBoldLineWrapper: {
    marginHorizontal: Theme.Indents.lg,
  },
});
