// @flow
import * as React from 'react';


type Props = {
  children?: React.Node
};

export default class GenerallyComponent extends React.Component<Props> {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}