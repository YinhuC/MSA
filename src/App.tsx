import * as React from 'react';
import './App.css';

import logo from './icon.png';

interface IState {
  // fields private to the class
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
      location: this.userData.bind(this),
      temperature: ""
    }
  }


  public userData(prefPlace: string) {

    // Set the variables up
    this.setState({
      location: "prefPlace",
    })

    // Call next method
    this.upload(prefPlace)

  }


  public upload(location: string) {


    // The 'string' to get the weather info
    fetch('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in'
    + '(select woeid from geo.places(1) where text="' + 'Chicago' + '")&format=json', {
      method: 'POST'
    })

     // The response from there server turned into text then displayed

    .then((response : any) => {
      if (response.query.results === null) {

        // SEND ERROR MESSAGE

      }
      else {

        let AAA:string = "lol"

        
      }
    })

  }


  public render() {
    return (
      <div className="App">
        <header className="header">
          <img src={logo} className="icon"/>
          <h1 className="title">Weather Today</h1>
        </header>
        <p className="intro">
          TEXT ENBTRSDFE HERE
        </p>
      </div>
    );
  }

}