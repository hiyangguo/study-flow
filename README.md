# study-flow
## 起步
本项目主要为了学习 `flow` 语法，所以使用[create-react-app][create-react-app]创建。创建过程如下：
首先使用创建项目：
```bash
create-react-app study-flow && cd study-flow
``` 
然后执行了以下操作：
1. 运行`yarn add flow-bin`(或 `npm install --save flow-bin`)
2. 然后在 `package.json` 文件中的 `script` 部分加入`"flow": "flow"`
3. 运行`yarn run flow init`

## 入门
### 基础组件
```javascript
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
  //...
}
```
普通的`Component` 默认接受两个参数，`Props`和`State`。第二个参数 `State` 是可选的。默认值是 `undefined`。如果不需要，则直接写为
```javascript
class BasicComponent extends Component<Props> {
  //...
}
```
如果你的 `Props`和`State` 不会重用，也可以直接写在 Component 中。
```javascript
class BasicComponent extends Component<{text: string},{count: number}> {
  //...
}
```
[本节源代码](src/components/BasicComponent.js);

## 使用默认值
```javascript
// @flow
import React, { Component } from 'react';

type Props = {
  text: string
};


class DefaultPropsComponent extends Component<Props> {
  static defaultProps = {
    text: '默认文字'
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        <p>{text}</p>
      </div>
    );
  }
}

export default DefaultPropsComponent;
```
使用 `DefaultPropsComponent` 时不需要提供 `text` 属性。
```javascript
<DefaultPropsComponent/>
```
`React`支持默认属性的概念，你可以理解为函数的默认参数。`flow` 当然也支持这个概念。只需要在你的 `class` 中添加` static defaultProps`即可。
[本节源代码](src/components/DefaultPropsComponent.js)

## 事件处理
```javascript
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
```
要输入事件处理程序，可以使用`SyntheticEvent <T>`类型。`SyntheticEvent` 都带有一个类型参数，用来描述时间处理程序 `html` 类型。
如果你不想带这个参数你也可以，写成`SyntheticEvent<>`。`React`提供的合成事件与 `html dom` 事件的关系如下。
```
SyntheticEvent<T> 对应 Event
SyntheticAnimationEvent<T> 对应 AnimationEvent
SyntheticCompositionEvent<T> 对应 CompositionEvent
SyntheticInputEvent<T> 对应 InputEvent
SyntheticUIEvent<T> 对应 UIEvent
SyntheticFocusEvent<T> 对应 FocusEvent
SyntheticKeyboardEvent<T> 对应 KeyboardEvent
SyntheticMouseEvent<T> 对应 MouseEvent
SyntheticDragEvent<T> 对应 DragEvent
SyntheticWheelEvent<T> 对应 WheelEvent
SyntheticTouchEvent<T> 对应 TouchEvent
SyntheticTransitionEvent<T> 对应 TransitionEvent
```
[本节源代码](src/components/EventHandlingComponent.js)

## Ref 方法
```javascript
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
```
由于 `React`在组件`unmonts`（未挂载）的时候[调用`ref`方法，参数可能为`null`][call your ref callback with null]。所以直到完成渲染之前，`RefComponents`的`button`将为`undefiend`。所以在`button`的描述应为可选的。
[本节源代码](src/components/RefComponents.js)

## Children
### `React.Node`
```javascript
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
```

一般情况对 `child` 的描述使用`React.Node` 即可。重要的一点是你必须使用`import * as React from 'react';`替代`import React from 'react'`来访问` React.Node`。具体解释见[React Type 参考][React Type Reference]。
[本节源代码](src/components/children/GenerallyComponent.js)

### 指定某种元素作为 children
```javascript
// @flow
import * as React from 'react';

const { Component } = React;

class GenerallyComponent extends React.Component<{}> {
  //...
}

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
```
有时你只需要一个特定的组件作为子组件。我们将 `props` 的 `type` 设置为 `React.ChildrenArray<React.Element<typeof GenerallyComponent>>` 确保 `SpecificElementComponent` 只接收 `GenerallyComponent` 作为子组件。
[本节源代码](src/components/children/SpecificElementComponent.js)

### 只接收一个 children
```javascript
// @flow
import * as React from 'react';

type Props = {
  children: React.Element<any>,
};

export default (props: Props) => (
  <div>
    {props.children}
  </div>
);
```
有时候你希望你的组件只接收一个`children`。这时候你只需要去除 `React.ChildrenArray<T>` 的 包裹即可。

[本节源代码](src/components/children/SingleChildComponent.js)

[create-react-app]:https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-flow
[call your ref callback with null]:https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-dom-element
[React Type Reference]:https://flow.org/en/docs/react/types/