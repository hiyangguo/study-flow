// @flow
import React, { Component } from 'react';

type Props = {
  text: string,
  count?: number,
};

type State = {
  count: number,
};

class BasicComponent extends Component<Props, State> {
  state = {
    count: this.props.count || 0,
  };

  componentDidMount() {
    const addCountTimer = setInterval(() => {
      this.setState(prevState => {
        const count = prevState.count + 1;
        if (count === 10) {
          clearInterval(addCountTimer);
        }
        return { count };
      });
    }, 1000);
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        <p>{`文字:${text}`}</p>
        <p>{`计数:${this.state.count}`}</p>
      </div>
    );
  }
}

export default BasicComponent;