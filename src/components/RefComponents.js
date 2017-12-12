// @flow
import * as React from 'react';

class RefComponents extends React.Component<{}> {
  // 这里的？是及其重要的，因为你可能并不总是有实例
  button: ?HTMLButtonElement;

  bindButton = (ref: ?HTMLButtonElement) => this.button = ref;

  render() {
    return <button ref={this.bindButton}>按钮</button>;
  }
}

export default RefComponents;