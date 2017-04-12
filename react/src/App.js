import classNames from 'classnames'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { Component } from 'react'
import ResetIcon from './images/reset.svg'
import DebugIcon from './images/debug.svg'
import './App.css'

class ConsoleButton extends Component {

  render() {
    const { className, label, icon } = this.props
    const buttonClasses = classNames('ConsoleButton', this.props.className)
    return (
      <div className={buttonClasses}>
        <img className="ConsoleButton-icon" src={icon}/>
        <div>{label}</div>
      </div>
    )
  }

}

class ConsoleSlider extends Component {
  render() {
    return (
      <div className="ConsoleSlider">
        <Slider/>
        <div> {this.props.percentage} </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-settingsPanel">
          <div className="App-sliders">
            <ConsoleSlider percentage={50}/>
            <ConsoleSlider percentage={50}/>
          </div>
          <div className="App-buttons">
            <ConsoleButton className="ResetButton" label="reset" icon={ResetIcon}/>
            <ConsoleButton className="DebugButton" label="debug" icon={DebugIcon}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
