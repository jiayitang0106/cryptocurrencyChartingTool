import React from 'react';
import ReactDOM from 'react-dom';
import { Calendar } from 'react-date-range';
import axios from "axios";
import moment from 'moment';
import Chart from 'chart.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      date: [],
      price: [],
    };

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(date){
    console.log(moment.utc(date).format('YYYY-MM-DD'));
    const selectedDate = moment.utc(date).format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${selectedDate}&end=${today}`)
      .then(res => {
        console.log(res.data);
        console.log(Object.keys(res.data.bpi));
        const dateRange = Object.keys(res.data.bpi);
        const priceRange = Object.values(res.data.bpi);
        this.setState({
          date: dateRange,
          price: priceRange,
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { date, price } = this.state;
    const myChart = new Chart('myChart', {
      type: 'line',
      data: {
          labels: date,
          datasets: [{
              label: 'price of bitcoin',
              data: price,
              backgroundColor: 'red',
              borderColor: 'red',
              lineTension: 0,
              borderWidth: 3,
              fill: false,
              pointRadius: 0,
              pointBackgroundColor: 'red',
              pointHitRadius: '1',
              pointBorderColor: 'red',
              pointStyle: 'circle',
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false
                  }
              }]
          }
      }
  });
    return (
      <div>
          <Calendar onChange={this.handleSelect} />
      </div>
    )
  }
}
export default App;

