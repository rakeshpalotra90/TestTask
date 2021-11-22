import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  LayoutChangeEvent,
  Modal,
} from 'react-native';
import {ScreenProps} from '../types/Application.d';
import ButtonSquared from '../components/Buttons/ButtonSquared';
import ButtonRectangled from '../components/Buttons/ButtonRectangled';
import FlexView from '../components/Wrappers/FlexView';
import MusicControlSection from '../components/Sections/MusicControlSection';
import NetworkControlSection from '../components/Sections/NetworkControlSection';
import Row from '../components/Wrappers/Row';
import SliderControl from '../components/Controls/SliderControl';
import NetworkControlScreen from '../screens/NetworkControlScreen';
import MusicControlScreen from '../screens/MusicControlScreen';
import FocusControlScreen from '../screens/FocusControlScreen';
import BrightnessControllSreen from '../screens/BrightnessControllSreen';
import Theme from '../Theme';

/**
 * HomeScreen - Screen is used to display block of network, music, focus, brightness, volume, Camera.
 **/
export default class HomeScreen extends React.Component<ScreenProps> {
  defineAnimationParams = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;

    let yDistance =
      Theme.Dimensions.screenHeight / 2 - (layout.height / 2 + layout.y);
    yDistance = StatusBar.currentHeight
      ? yDistance - StatusBar.currentHeight
      : yDistance;
    Theme.Animations.screens.musicControl.onUnmount.translate.Y.toValue =
      -yDistance;
    Theme.Animations.screens.musicControl.initial.translateYValue = -yDistance;
    Theme.Animations.screens.networkControl.onUnmount.translate.Y.toValue =
      -yDistance;
    Theme.Animations.screens.networkControl.initial.translateYValue =
      -yDistance;

    const xDistance = layout.width / 4;
    Theme.Animations.screens.musicControl.onUnmount.translate.X.toValue =
      xDistance;
    Theme.Animations.screens.musicControl.initial.translateXValue = xDistance;
    Theme.Animations.screens.networkControl.onUnmount.translate.X.toValue =
      -xDistance;
    Theme.Animations.screens.networkControl.initial.translateXValue =
      -xDistance;
  };

  state = {
    isEnableOverlay: false,
    componentId: 0, //0 for home screen menus, 1 for network control, 2 for music control, 3 for Focus Control, 4 for Brightness Control
    modalVisible: false,
  };

  onLongPress = (compoenentId: number) => {
    this.setState({
      isEnableOverlay: true,
      componentId: compoenentId,
      modalVisible: true,
    });
  };

  onLongPressFocusControlSection = () => {
    const {Application, componentId} = this.props;
    Application.navigateFocusControl(componentId);
  };

  renderModalComponent = () => {
    switch (this.state.componentId) {
      case 1:
        return (
          <NetworkControlScreen
            onDismiss={() => this.setState({isEnableOverlay: false})}
            onCloseModal={() =>
              this.setState({modalVisible: false, componentId: 0})
            }
          />
        );
      case 2:
        return (
          <MusicControlScreen
            onDismiss={() => this.setState({isEnableOverlay: false})}
            onCloseModal={() =>
              this.setState({modalVisible: false, componentId: 0})
            }
          />
        );
      case 3:
        return (
          <FocusControlScreen
            onDismiss={() => this.setState({isEnableOverlay: false})}
            onCloseModal={() =>
              this.setState({modalVisible: false, componentId: 0})
            }
          />
        );
      case 4:
        return (
          <BrightnessControllSreen
            onDismiss={() => this.setState({isEnableOverlay: false})}
            onCloseModal={() =>
              this.setState({modalVisible: false, componentId: 0})
            }
          />
        );

      default:
        break;
    }
  };

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        blurRadius={10}
        source={Theme.Images.backgroundImage}>
        {!this.state.isEnableOverlay && (
          <View style={styles.controlsBoardWrapper}>
            <Row onLayout={this.defineAnimationParams}>
              <NetworkControlSection
                onLongPress={() => this.onLongPress(1)}
                style={styles.flex}
              />
              <MusicControlSection
                onLongPress={() => this.onLongPress(2)}
                style={styles.flex}
              />
            </Row>
            <Row>
              <FlexView>
                <Row>
                  <ButtonSquared icon={'lock'} />
                  <ButtonSquared
                    icon={'moon'}
                    onLongPress={() => this.onLongPressFocusControlSection()}
                  />
                </Row>
                <Row>
                  <ButtonRectangled
                    icon={'desktop'}
                    text={'Screen\nMirroring'}
                  />
                </Row>
              </FlexView>
              <FlexView>
                <Row style={StyleSheet.absoluteFill}>
                  <SliderControl
                    icon={'adjust'}
                    onLongPress={() => this.onLongPress(4)}
                  />
                  <SliderControl icon={'volume-up'} />
                </Row>
              </FlexView>
            </Row>
            <Row>
              <ButtonSquared icon={'lightbulb'} />
              <ButtonSquared icon={'stopwatch'} />
              <ButtonSquared icon={'calculator'} />
              <ButtonSquared icon={'camera'} />
            </Row>
            <Row>
              <ButtonSquared
                icon={'microphone'}
                iconDisabled={'microphone-slash'}
                initiallyEnabled
              />
              <ButtonSquared
                icon={'phone'}
                iconDisabled={'phone-slash'}
                initiallyEnabled
              />
              <ButtonSquared
                icon={'bell'}
                iconDisabled={'bell-slash'}
                initiallyEnabled
              />
              <ButtonSquared icon={'github'} />
            </Row>
          </View>
        )}
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({
              modalVisible: !this.state.modalVisible,
            });
          }}>
          <View
            style={[
              {
                backgroundColor: Theme.Colors.transparent,
              },
              styles.flex,
            ]}>
            {this.renderModalComponent()}
          </View>
        </Modal>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  controlsBoardWrapper: {
    padding: Theme.Indents.lg,
    flex: 1,
    justifyContent: 'flex-end',
  },
  flex: {
    flex: 1,
  },
});
