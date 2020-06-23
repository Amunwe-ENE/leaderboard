import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {Form} from 'react-bootstrap';

//import Image from 'react-bootstrap/lib/Image';
//import Data from '../src/data.json';

class App  extends Component{
  state = {
        scores: [],
        order: 1,
  }
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
  }
  
 getleaderboardData() {
    axios.get('/leaderboard')
    .then(({ data }) => {
     this.setState({scores:data})
     
    }).catch(err =>{
      console.log(err);
    })
  }
  componentDidMount(){
    this.getleaderboardData();

  }
  handleSort(e) {
    e.preventDefault();
    if(this.state.order === 1){
      this.setState({order : 2});
    this.state.scores.sort((a, b) => parseFloat(a.points) - parseFloat(b.points))
    console.log("Hii")
  }else{
    this.setState({order : 1});
    this.state.scores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points))
    console.log("Heey")
  }
  }
  render(){
    const{scores} = this.state;
    
    const rows = [];
    // const first = {backgroundColor: 'green'};
    // const second = {backgroundColor: 'lightgreen'};
    // const third = {backgroundColor: 'yellow'};
    scores.map((row, index)=> {
    rows.push(<tr style={{
      backgroundColor: index === 0 ? 'limegreen' :index === 1 ?'#00FF00':index === 2 ? '#ADFF2F': 'none'
    }}>
        <td>{index + 1}</td>
        <td>
         {row.slackname}
        </td>
        <td>{row.points}</td>
      </tr>)
      return row
    })
    return(
      <div className='App'>
        <div className='container'>
          <h1>HNGi7 LeaderBoard</h1>
          <Form>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Sort By Points"
            onChange= {this.handleSort}
            />
          </Form.Group></Form>
          <Table  stripped condensed hover bordered className="coloBlack"> 
            <thead>
              <tr>
                <th>#</th>
                <th>Slack Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}



export default App;
