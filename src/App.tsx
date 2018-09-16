import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import * as React from 'react';
import './App.css';


import logo from './icon.png';

interface IState {
  // fields private to the class
  fail: boolean,
  enter: any,
  input: string,
  condition: string,
  location: string,
  temperature: string,
  description: string,
  wind: string,
  temperatureN:string,
  temperatureX: string,
  humid: string
}



export default class App extends React.Component<{}, IState>{

  constructor(props: any) {
    super(props)
    this.state = {
      condition: "",
      description: "",
      enter: this.button.bind(this),
      fail: true,
      humid: "",
      input: this.userData.bind(this),
      location: "",
      temperature: "",
      temperatureN:"",
      temperatureX: "",
      wind: ""
    }

  }


  public userData = (event: any) => {
    this.setState({
      input: event.target.value,
    })

  }


  public button(prefPlace: any) {

    this.setState({
      condition: "",
      description: "",
      fail: true,
      location: "",
      temperature: ""
    })

    this.upload(this.state.input)

  }


  public upload(location: string) {

    // The 'string' to get the weather info
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&APPID=3068ca5891f45fc0b650fa2ab42e2d22', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
      .then((response: any) => {
        if (!response.ok) {
          this.setState({ description: 'No city found named: ' + location, fail: true })
        }
        else {
          response.json().then((data: any) => this.setState({
            fail: false,
            condition: data.weather[0].main,
            temperature: data.main.temp,
            temperatureN: data.main.temp_min,
            temperatureX: data.main.temp_max,
            description: data.weather[0].description,
            wind: data.wind.speed,
            humid: data.main.humidity,
          }))
        }
        return response
      })

  }


  public render() {
    return (
      <div className="App">
        <header className="header">
          <img src={logo} className="icon" />
          <h1 className="title">Weather Today</h1>
        </header>
        <p className="intro">
          Enter Country or City here for weather conditions:
        </p>

        <div className="field">
          <Input
            placeholder="Country/City"
            className={"textField"}
            inputProps={{
              'aria-label': 'Description',
            }}
            value={this.state.input}
            onChange={this.userData}
          />
        </div>


        <div className="button" style={{ padding: '10px' }}>
          <Button variant="contained" className={"button"}
            onClick={this.state.enter}>
            Enter
        </Button>
        </div>




        <div className="results">
          {
            this.state.fail === false && this.state.location !== "" ?
              <CircularProgress /> :
              <p> Location: {this.state.input} <br /> <br />
                Wind Speed: {this.state.wind} km/hour <br /> <br />
                Temperature: {this.state.temperature}℃ <br />
                Low: {this.state.temperatureN}℃ <br />
                High: {this.state.temperatureX}℃ <br /> <br />
                Humidity: {this.state.humid}%  <br />
                Condition: {this.state.condition} <br />
                Description: {this.state.description} <br />
              </p>
          }
        </div>


      </div>
    );
  }

}