// @flow
import * as React from 'react';
import { Slider, Text, View } from 'react-native';
import styles from './styles';

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

  setSpeed = (speed: number): void => {
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
          maximumValue={1000}
          minimumValue={100}
          onSlidingComplete={this.setSpeed}
          value={300}
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
