import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import * as React from 'react';
import './App.css';


import logo from './icon.png';

interface IState {
  // fields private to the class
  fail:boolean,
  enter: any,
  input: any,
  condition: string,
  location: string,
  temperature: string,
  description: string
}



export default class App extends React.Component<{}, IState>{

  constructor(props: any) {
    super(props)
    this.state = {
      condition: "",
      description: "",
      enter: this.button.bind(this),
      fail: true,
      input: this.userData.bind(this),
      location: "",
      temperature: ""
    }

  }


  public userData(prefPlace: any) {

    this.setState({
      location: prefPlace.value,
    })

  }


  public button(prefPlace: any) {

    this.setState({
      condition: "",
      description: "",
      fail:true,
      location: "",
      temperature: ""
    })

    this.upload(this.state.location)

  }


  public upload(location: string) {

    location = "Chicago"

    // The 'string' to get the weather info
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&APPID=3068ca5891f45fc0b650fa2ab42e2d22', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
      .then((response: any) => {
        if (!response.ok) {
          this.setState({ condition: "No city found named: " + location, fail:true })
        }
        else {
          response.json().then((data: any) => this.setState({
            fail:false,
            condition: data.weather[0].main,
            temperature: data.main.temp,
            description: data.weather[3],
          }))
          console.log(this.state.condition)
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
            onChange={this.state.input}
            value={this.state.location}
          />
        </div>


        <div className="button" style={{ padding: '10px' }}>
          <Button variant="contained" className={"button"}
            onClick={this.state.enter}>
            Enter
        </Button>
        </div>


       <div className="results1">
          {
            this.state.fail === true && this.state.location !== "" ?
              <CircularProgress /> :
              <p> {this.state.condition}</p>
          }
        </div>

        <div className="results">
          {
            this.state.fail === false && this.state.location !== "" ?
              <CircularProgress /> :
              <p> {this.state.temperature} {this.state.condition} {this.state.description}
                {this.state.location}YOOOOOO</p>
          }
        </div>


      </div>
    );
  }

}