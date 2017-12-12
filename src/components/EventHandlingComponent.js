// @flow
import * as React from 'react';

class EventHandlingComponent extends React.Component<{}, { count: number }> {
  state = {
    count: 0
  };

  handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    //使用`event.currentTarget`访问按钮实例
    console.log((event.currentTarget: HTMLButtonElement));
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    return (
      <div>
        <p>计数: {this.state.count}</p>
        <button onClick={this.handleClick}>
          增加
        </button>
      </div>
    );
  }
}

export default EventHandlingComponent;
