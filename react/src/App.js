import classNames from 'classnames'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { Component } from 'react'
import ResetIcon from './images/reset.svg'
import DebugIcon from './images/debug.svg'
import BrightnessIcon from './images/brightness.svg'
import VolumeIcon from './images/volume.svg'
import StartIcon from './images/start.svg'
import XIcon from './images/x_button.svg'
import './App.css'
import ReactJsonSyntaxHighlighter from 'react-json-syntax-highlighter'

const REFRESH_INTERVAL = 250 //ms
const SERVER_URL = "http://barnyard-nuc.local"

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
  
	renderLabel() {
    return (
      <div className="ConsoleSlider-label"> {Math.round(this.props.value/this.props.max*100)}% </div>
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
        <Slider className="ConsoleSlider-slider" min={this.props.min} max={this.props.max} onChange={this.onChange} defaultValue={Number(this.props.value)}/>
	{this.renderLabel()}
      </div>
    );
  }
}

class App extends Component {

  constructor() {
    super();
    setInterval(() => this.onRefreshTimer(), REFRESH_INTERVAL)
    this.state = {
      normalMode: true,
      gamestate: {settings: {brightness: 0, volume: 0}, currentPhase: "GameWaiting", timeSincePhaseStart: 0.00},
    };
  }	  

  changeBackgroundToRed() {
    document.body.style.backgroundColor = '#B1252D';
  }

  changeBackgroundToBlack() {
    document.body.style.backgroundColor = 'black';
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

  onStartClick() {

  }

  onCloseClick() {
    this.setState({normalMode: !this.state.normalMode});
  }
	
  onRefreshTimer() {
    fetch(`${SERVER_URL}/gamestate`)
    .then(response => response.json())
    .catch((error) => {
      this.changeBackgroundToRed()
      throw error
    }).then((responseJson) => {
      this.changeBackgroundToBlack()
      this.setState({gamestate: responseJson})
    }).catch(function(error) {})
  }

  render() {
    return (
      <div className="App">
        {this.state.normalMode ?
          <div className="App-settingsPanel">
            <div className="App-sliders">
              <ConsoleSlider icon={BrightnessIcon} min={0} max={255} onChange={this.onBrightnessChange} value={this.state.gamestate.settings.brightness}/>
              <ConsoleSlider icon={VolumeIcon} min={0} max={100} onChange={this.onVolumeChange} value={this.state.gamestate.settings.volume}/>
            </div>
            <div className="App-buttons">
              <ConsoleButton className="ResetButton" label="reset" icon={ResetIcon} onClick={this.onResetClick}/>
              <ConsoleButton className="DebugButton" label="debug" icon={DebugIcon} onClick={this.onDebugClick.bind(this)}/>
              <ConsoleButton className="StartButton" label="start" icon={StartIcon} onClick={this.onStartClick}/>
            </div>
          </div>
	:
	  <div className="App-debugPanel">
	    <div className="App-debugPanelContents">
	      <div className="App-debugText">
                <ReactJsonSyntaxHighlighter obj={this.state.gamestate} />
	      </div>
	      <div className="App-debugInfoPanel">
	        <div className="App-debugInfoContents">
                  <img src={XIcon} onClick={this.onCloseClick.bind(this)}/>
		  {this.state.gamestate.currentPhase}
		  <br/>
                  {this.state.gamestate.timeSincePhaseStart.toFixed(1)}
		</div>
	      </div>
	    </div>
	  </div>
    	}
      </div>
    );
  }
}

export default App; 
