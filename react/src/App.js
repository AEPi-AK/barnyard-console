import classNames from 'classnames'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { Component } from 'react'
import ResetIcon from './images/reset.svg'
import DebugIcon from './images/debug.svg'
import BrightnessIcon from './images/brightness.svg'
import VolumeIcon from './images/volume.svg'
import './App.css'
import ReactJsonSyntaxHighlighter from 'react-json-syntax-highlighter'

const SERVER_URL="http://barnyard-nuc.local"

class ConsoleButton extends Component {

  render() {
    const { className, label, icon, onClick } = this.props
    const buttonClasses = classNames('ConsoleButton', this.props.className)
    return (
      <div className={buttonClasses} onClick={onClick}>
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
    {this.props.onChange(value)}
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

  constructor() {
    super();
    this.state = {
      normalMode: true,
    };
  }	  

  onBrightnessChange = (value) => {
    fetch(`${SERVER_URL}/settings/brightness/${value}`, {
      method: "POST",
    })
  }

  onVolumeChange = (value) => {
    fetch(`${SERVER_URL}/settings/volume/${value}`, {
      method: "POST",
    })
  }

  onResetClick() {
    fetch(`${SERVER_URL}/reset`, {
      method: "POST",
    })
  }

  onDebugClick() {
    this.setState({normalMode: !this.state.normalMode});
  }

  render() {
    return (
      <div className="App">
        {this.state.normalMode ?
          <div className="App-settingsPanel">
            <div className="App-sliders">
              <ConsoleSlider icon={BrightnessIcon} min={0} max={255} onChange={this.onBrightnessChange}/>
              <ConsoleSlider icon={VolumeIcon} min={0} max={100} onChange={this.onVolumeChange}/>
            </div>
            <div className="App-buttons">
              <ConsoleButton className="ResetButton" label="reset" icon={ResetIcon} onClick={this.onResetClick}/>
              <ConsoleButton className="DebugButton" label="debug" icon={DebugIcon} onClick={this.onDebugClick.bind(this)}/>
            </div>
          </div>
	:
          <ReactJsonSyntaxHighlighter obj={JSON.parse(`{"phaseTime":"0","player1":{"slot0":"NoHead","slot1":"NoBody","joined":"False","slot2":"NoLeg"},"location":"Tundra","settings":{"volume":"50","brightness":"250"},"currentPhase":"GameWaiting","timeSincePhaseStart":"2630.62617","player2":{"slot0":"NoHead","slot1":"NoBody","joined":"False","slot2":"NoLeg"},"winner":"Player1"}`)} />
	}
      </div>
    );
  }
}

export default App;
