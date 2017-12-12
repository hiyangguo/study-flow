// @flow
import React, { Component } from 'react';
import './App.css';
import BasicComponent from './components/BasicComponent';
import DefaultPropsComponent from './components/DefaultPropsComponent';
import EventHandlingComponent from './components/EventHandlingComponent';
import RefComponents from './components/RefComponents';
import { GenerallyComponent, SpecificElementComponent, SingleChildComponent } from './components/children';

class App extends Component<{}> {
  render() {
    return (
      <div className="App">
        <h1>组件</h1>
        <BasicComponent text="按钮" />
        <DefaultPropsComponent />
        <h1>事件处理</h1>
        <EventHandlingComponent />
        <h1>Ref</h1>
        <RefComponents />
        <h1>Children</h1>
        <GenerallyComponent />
        <GenerallyComponent>一个child</GenerallyComponent>
        <GenerallyComponent>
          {
            new Array(5).fill(null).map((_null, index) => (<strong key={index}>{index}</strong>))
          }
        </GenerallyComponent>
        <SpecificElementComponent>
          <SpecificElementComponent.Item>1</SpecificElementComponent.Item>
          <SpecificElementComponent.Item>2</SpecificElementComponent.Item>
        </SpecificElementComponent>
        <SingleChildComponent>
          <div>Single child</div>
        </SingleChildComponent>
      </div>
    );
  }
}

export default App;
