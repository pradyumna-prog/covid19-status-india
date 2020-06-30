import React, { Component } from 'react';
import './App.css';
import FetchDetails from './FetchDetails/FetchDetails';
import FetchStates from './FetchStates/FetchStates';
import Charts from './ChartComponent/ChartComponnet';
import titleimage from './title.png';
import DesignerInformation from './DesignerInformation/DesignerInformation';

class App extends Component {

  state = {
    inputState: 'Total',
    inputDistrict: '',
    dataRender: {},
    fetchdetails: null,
    loading: true,
    stateNames : [],
    districtNames: [],
    labels: [],
    valuesConfirm: [],
    valuesRecover: [],
    showDistrict: false
  }

  tempState = '';

  async componentDidMount() {
    const url = 'https://api.covid19india.org/data.json';
    const response = await fetch(url);
    const data = await response.json();
    const datarender = await data['statewise'];
    const graphdata = await data['cases_time_series'];
    let labels = [], valuesConfirm = [], valuesRecover = [];
    graphdata.forEach(obj => {
        labels.push(obj['date'])
        valuesConfirm.push(obj['totalconfirmed'])
        valuesRecover.push(obj['totalrecovered'])
    });
    let stateNames = datarender.map(row => {
      if(row['state'] !== 'Total') {
        return row['state']
      }
      return ''      
    });
    stateNames.sort().splice(0,1)
    this.setState({
      dataRender: datarender, 
      loading: false, 
      stateNames: stateNames, 
      labels: labels,
      valuesConfirm: valuesConfirm,
      valuesRecover: valuesRecover
    });
  }

  async getDistrictList() {
    const url = 'https://api.covid19india.org/state_district_wise.json';
    const response = await fetch(url);
    const data = await response.json();
    const datarender = await data[this.state.inputState]['districtData']
    let list = []
    for (const row in datarender) {
      list.push(row)
    }
    this.setState({districtNames: list})
}

  stateInputHandler = (event) => {
    let temp = event.target.value;
    this.setState({ inputState : temp });
  }

  districtInputHandler = (event) => {
    this.setState({ inputDistrict: event.target.value });
  }

  checkStatesHandler = () => {
    this.setState({ inputState : this.state.inputState, showDistrict: false });
    if(this.state.inputState !== 'Total'){
      this.getDistrictList();
    }
  }

  checkDistrictHandler = () => {
    this.setState({ inputDistrict: this.state.inputDistrict, showDistrict: true });
    this.setState({ 
      fetchdetails: <FetchDetails 
        stateName = {this.state.inputState} 
        districtName = {this.state.inputDistrict} />
      });
  }

  render() {
    if(this.state.loading){
      return <div className = "App"><h3>loading...</h3></div>
    }
    let stateoptions = this.state.stateNames.map( (name, index) =>{
      return (
        <option
          key = {index} value = {name}> 
          {name} </option>
        );
    });
    let selectList = null;
    if(this.state.districtNames.length !== 0){
      let districtoptions = this.state.districtNames.map( (name, index) =>{
        return (
          <option
            key = {index} value = {name}> 
            {name} </option>
          );
      });
      selectList = <div>
        <select onChange = {this.districtInputHandler}>
          <option>Select a district</option> 
          {districtoptions} 
        </select> &nbsp;
        <button onClick = {this.checkDistrictHandler}> Check District Cases </button>
        <br/><br/>
        </div>
    }
    let statesComponent = null;
    if(this.state.showDistrict){
      statesComponent = this.state.fetchdetails;
    }
    else{
      statesComponent = <FetchStates dataRender = {this.state.dataRender} stateName = {this.state.inputState}/>
    }

    return (
      <div className="App">
        <img src = {titleimage} alt = 'Covid 19 India' className = "image"/><br/>
        <select onChange = {this.stateInputHandler}> 
          <option>Total</option>
          {stateoptions} 
        </select> &nbsp;
        <button onClick = {this.checkStatesHandler}> Check State Cases </button>
        <br/><br/>
        {selectList}
        <div className = "Container">
          {statesComponent}
          <Charts 
            labels = {this.state.labels} 
            valuesConfirm = {this.state.valuesConfirm} valuesRecover = {this.state.valuesRecover}/>    
        </div>
        <DesignerInformation />
      </div>
      );
  }
}

export default App;
