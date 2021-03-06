// @flow
import * as React from 'react';
import { Slider, Text, View } from 'react-native';
import styles from './styles';

const MAXIMUM_SPEED: number = 1000;
const MINIMUM_SPEED: number = 100;

type Props = {};
type State = { activeWordIndex: number, bookDescription: string[], speed: number };

export default class Main extends React.Component<Props, State> {
  constructor(): void {
    super();
    this.state = { activeWordIndex: 0, bookDescription: [], speed: 300 };
  }

  componentDidMount = (): void => {
    this.getBookDescription();
  }

  getBookDescription = (): void => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyAP-RO8s7jbRWL95HXTOUVGsgJxM_ceAEM')
      .then(response => response.json())
      .then((json) => {
        const bookDescription = json.items[0].volumeInfo.description.split(' ');
        this.setState({ activeWordIndex: 0, bookDescription }, this.startIterator);
      });
  }

  setSpeed = (sliderValue: number): void => {
    const speed: number = MAXIMUM_SPEED - sliderValue + MINIMUM_SPEED;
    this.endIterator();
    this.setState({ speed }, this.startIterator);
  }

  endIterator = (): void => {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  showNextWord = (): void => {
    this.setState((previousState) => {
      if (previousState.activeWordIndex === previousState.bookDescription.length - 1) {
        this.endIterator();
        return previousState;
      }
      return {
        ...previousState,
        activeWordIndex: previousState.activeWordIndex + 1
      };
    });
  }

  startIterator = (): void => {
    this.intervalId = setInterval(this.showNextWord, this.state.speed);
  }

  togglePlaybackState = (): void => {
    if (this.intervalId === null) {
      this.startIterator();
    } else {
      this.endIterator();
    }
  }

  render(): React.Element<any> {
    return (
      <View style={styles.container}>
        <Slider
          maximumValue={MAXIMUM_SPEED}
          minimumValue={MINIMUM_SPEED}
          onSlidingComplete={this.setSpeed}
          value={700}
          style={styles.slider}
        />
        <View
          style={styles.main}
          onStartShouldSetResponder={() => {
            this.togglePlaybackState();
            return true;
          }}
        >
          <Text style={styles.text}>{this.state.bookDescription[this.state.activeWordIndex]}</Text>
        </View>
      </View>
    );
  }
}
