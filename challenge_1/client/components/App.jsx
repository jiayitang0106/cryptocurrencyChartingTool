import ReactPaginate from 'react-paginate';
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/events`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return(
      <h1>hello</h1>
    )
  }
}
export default App;