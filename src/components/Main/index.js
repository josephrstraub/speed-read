// @flow
import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

type Props = {};
type State = {};

export default class Main extends React.Component<Props, State> {
  constructor(): void {
    super();
    this.state = {};
  }

  render(): React.Element<any> {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
