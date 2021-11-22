import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Theme from '../Theme';
import FocusList from '../components/Lists/FocusList';

/**
 * FousControlScreen - Screen is used to display doNotDisturb, sleep mode, personal and work settings.
 **/
export default class FousControlScreen extends React.Component<any> {
  animatedScaleValue: Animated.Value | Animated.ValueXY;
  animatedTranslateYValue: Animated.Value | Animated.ValueXY;
  animatedTranslateXValue: Animated.Value | Animated.ValueXY;
  animatedBackgroundOpacityValue: Animated.Value | Animated.ValueXY;
  animatedContainerOpacityValue: Animated.Value | Animated.ValueXY;

  constructor(props: any) {
    super(props);
    this.animatedScaleValue = new Animated.Value(
      Theme.Animations.screens.focusControl.initial.scaleValue,
    );
    this.animatedTranslateYValue = new Animated.Value(
      Theme.Animations.screens.focusControl.initial.translateYValue,
    );
    this.animatedTranslateXValue = new Animated.Value(
      Theme.Animations.screens.focusControl.initial.translateXValue,
    );
    this.animatedBackgroundOpacityValue = new Animated.Value(
      Theme.Animations.screens.focusControl.initial.backgroundOpacityValue,
    );
    this.animatedContainerOpacityValue = new Animated.Value(
      Theme.Animations.screens.focusControl.initial.containerOpacityValue,
    );
  }

  //onDismiss - dismiss overlay by componentId
  onDismiss = () => {
    const {Application, componentId} = this.props;
    Animated.parallel([
      Animated.timing(this.animatedContainerOpacityValue, {
        toValue:
          Theme.Animations.screens.focusControl.onUnmount.opacity.container
            .toValue,
        duration:
          Theme.Animations.screens.focusControl.onUnmount.opacity.container
            .duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedTranslateYValue, {
        toValue:
          Theme.Animations.screens.focusControl.onUnmount.translate.Y.toValue,
        duration:
          Theme.Animations.screens.focusControl.onUnmount.translate.Y.duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedTranslateXValue, {
        toValue:
          Theme.Animations.screens.focusControl.onUnmount.translate.X.toValue,
        duration:
          Theme.Animations.screens.focusControl.onUnmount.translate.X.duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedScaleValue, {
        toValue: Theme.Animations.screens.focusControl.onUnmount.scale.toValue,
        duration:
          Theme.Animations.screens.focusControl.onUnmount.scale.duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedBackgroundOpacityValue, {
        toValue:
          Theme.Animations.screens.focusControl.onUnmount.opacity.background
            .toValue,
        duration:
          Theme.Animations.screens.focusControl.onUnmount.opacity.background
            .duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Application.navigateDismissOverlay(componentId);
    });
  };

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.animatedContainerOpacityValue, {
        toValue:
          Theme.Animations.screens.focusControl.onMount.opacity.container
            .toValue,
        duration:
          Theme.Animations.screens.focusControl.onMount.opacity.container
            .duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedTranslateYValue, {
        toValue:
          Theme.Animations.screens.focusControl.onMount.translate.Y.toValue,
        duration:
          Theme.Animations.screens.focusControl.onMount.translate.Y.duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedTranslateXValue, {
        toValue:
          Theme.Animations.screens.focusControl.onMount.translate.X.toValue,
        duration:
          Theme.Animations.screens.focusControl.onMount.translate.X.duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedScaleValue, {
        toValue: Theme.Animations.screens.focusControl.onMount.scale.toValue,
        duration: Theme.Animations.screens.focusControl.onMount.scale.duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedBackgroundOpacityValue, {
        toValue:
          Theme.Animations.screens.focusControl.onMount.opacity.background
            .toValue,
        duration:
          Theme.Animations.screens.focusControl.onMount.opacity.background
            .duration,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const animatedStyle = {
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
          <Animated.Image
            style={styles.backgroundImage}
            blurRadius={10}
            source={Theme.Images.backgroundImage}
          />
          <TouchableWithoutFeedback>
            <FocusList />
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
