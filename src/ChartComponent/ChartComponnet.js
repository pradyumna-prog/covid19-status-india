import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class Charts extends Component{

    render() {
        const state = {
            labels: this.props.labels,
            datasets: [{
                label: 'Confirmed',
                data: this.props.valuesConfirm,
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(255,0,0,0.3)',
                borderColor: 'firebrick',
              }, {
                label: 'Recovered',
                data: this.props.valuesRecover,
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(0,255,0,0.5)',
                borderColor: 'darkgreen'
              }]
        }
        
        return (
            <Line 
                className = "Charts"
                data = {state}
                options={{ 
                    title:{
                        display:true,
                        text:'Cases of Covid 19 in India',
                        fontSize:20,
                        position:'bottom'
                    },
                    legend:{ 
                        display:true,
                        position:'top'
                    }
                 }}
                />
            );
    }
}

export default Charts;