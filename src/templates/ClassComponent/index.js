// @flow
import * as React from 'react';
import { Text, View } from 'react-native';

type Props = {};
type State = {};

export default class COMPONENT_NAME extends React.Component<Props, State> {
  constructor(): void {
    super();
    this.state = {};
  }

  render(): React.Element<any> {
    return (
      <View>
        <Text>This is the COMPONENT_NAME component!</Text>
      </View>
    );
  }
}
