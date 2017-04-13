import classNames from 'classnames'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { Component } from 'react'
import ResetIcon from './images/reset.svg'
import DebugIcon from './images/debug.svg'
import BrightnessIcon from './images/brightness.svg'
import VolumeIcon from './images/volume.svg'
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
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }

  renderLabel() {
    return (
      <div className="ConsoleSlider-label"> {Math.round(this.state.value/this.props.max*100)}% </div>
    );
  }
	
  onChange = (value) => {
    this.setState({value: value});
  }

  render() {
    return (
      <div className="ConsoleSlider">
        <img className="ConsoleSlider-icon" src={this.props.icon}/>
        <Slider className="ConsoleSlider-slider" min={this.props.min} max={this.props.max} onChange={this.onChange}/>
	{this.renderLabel()}
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
            <ConsoleSlider icon={BrightnessIcon} percentage={50} min={0} max={255}/>
            <ConsoleSlider icon={VolumeIcon} percentage={50} min={0} max={100}/>
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
