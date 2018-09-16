import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import * as React from 'react';
import './App.css';


import logo from './icon.png';

interface IState {
  // fields private to the class
  enter: any,
  input: any,
  date: string,
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
      date: "",
      description: "",
      enter: this.button.bind(this),
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
      date: "",
      description: "",
      location: "",
      temperature: ""
    })

    this.upload(this.state.location)

  }


  public upload(location: string) {

    location = "Chicago"

    // The 'string' to get the weather info
    fetch('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in'
      + '(select woeid from geo.places(1) where text="' + location + '")&format=json', {
        method: 'POST'
      })


      // The response from there server turned into text then displayed

      .then((response: any) => {
        if (response.query.results.title === null) {

          this.setState({

            condition: "FAIL"

          })

        }
        else {

          this.setState({

            condition: response.query.results.channel.item.condition.text,
            date: response.query.results.channel.item.condition.date,
            description: response.query.results.channel.item.description,
            temperature: response.query.results.channel.item.condition.temp

          })

        }
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


         <p className="intro">
          {this.state.temperature} {this.state.date} {this.state.condition} {this.state.description}
          {this.state.location}
        </p>


      </div>
    );
  }

}