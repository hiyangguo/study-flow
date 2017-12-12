// @flow
import * as React from 'react';
import GenerallyComponent from './GenerallyComponent';

const { Component } = React;

type Props = {
  children: React.ChildrenArray<React.Element<typeof GenerallyComponent>>,
};

export default class SpecificElementComponent extends Component<Props> {
  static Item = GenerallyComponent;

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}