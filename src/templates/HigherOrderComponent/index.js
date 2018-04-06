/* @flow */
import * as React from 'react';

export default function COMPONENT_NAME(WrappedComponent: React.ComponentType<any>): React.ComponentType<any> {
  type Props = {};
  type State = {};

  return class RenameThis extends React.Component<Props, State> {
    constructor(props: Props): void {
      super(props);
      this.state = {};
    }

    render(): React.Element<any> {
      return <WrappedComponent />;
    }
  };
}
