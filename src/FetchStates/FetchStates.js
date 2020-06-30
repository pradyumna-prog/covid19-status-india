import React, { Component } from 'react';
//import './FetchStates.css';
import CountUp from 'react-countup';
import {Grid, Card, CardContent, Typography} from '@material-ui/core';

export default class FetchStates extends Component {

    state = {
        loading: true,
        index: '',
        confirmed: '',
        active: '',
        recovered: '',
        deceased: '',
        deltaConfirmed: '',
        deltaDeaths: '',
        deltaRecovered: ''
    };

    async componentDidMount() {
        let data = '0'
        this.props.dataRender.forEach(row => {
            if(row['state'] === this.props.stateName){
                data = row
            } 
        });
        this.setState({
            loading: false,
            index: data,
            confirmed: data['confirmed'],
            active: data['active'],
            recovered: data['recovered'],
            deceased: data['deaths'],
            deltaConfirmed: data['deltaconfirmed'],
            deltaDeaths: data['deltadeaths'],
            deltaRecovered: data['deltarecovered']
        });   
    }
/*
    static getDerivedStateFromProps(props, state){
        let data = '0'
        props.dataRender.forEach(row => {
            if(row['state'] === props.stateName){
                data = row
            } 
        });
        state = {
            loading: false,
            index: data,
            confirmed: data['confirmed'],
            active: data['active'],
            recovered: data['recovered'],
            deceased: data['deaths'],
            deltaConfirmed: data['deltaconfirmed'],
            deltaDeaths: data['deltadeaths'],
            deltaRecovered: data['deltarecovered']
        };
        return state;
    }
*/
    componentWillReceiveProps() { this.componentDidMount() }

    render() {
        let data = null;
        let title = this.state.index['state'];
        if(title === 'Total') { title = ""; }
        if(this.state.loading || this.state.index['state'] === undefined){
            return <h2> loading.....</h2>
        } 
        else{
            data = 
            <div className = "CardsContainer">
                <Grid container spacing = {3} justify = "center">
                    <Grid item component = {Card} xs = {12} md = {3} className = "Card" id = "confirmed">
                        <CardContent>
                            <Typography>Confirmed</Typography>
                            <Typography variant = 'h5'>
                            <CountUp start = {0} end = {parseInt(this.state.confirmed,10)} duration = {2} separator = ',' />
                            ({this.state.deltaConfirmed < 0 ? this.state.deltaConfirmed : '+'+this.state.deltaConfirmed})
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component = {Card} xs = {12} md = {3} className = "Card" id = "active">
                        <CardContent>
                            <Typography>Active</Typography>
                            <Typography variant = 'h5'>
                            <CountUp start = {0} end = {parseInt(this.state.active,10)} duration = {2} separator = ',' />
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component = {Card} xs = {12} md = {3} className = "Card" id ="recovered">
                        <CardContent>
                            <Typography>Recovered</Typography>
                            <Typography variant ='h5'>
                                <CountUp start = {0} end = {parseInt(this.state.recovered,10)} duration = {2} separator = ',' /> 
                                ({this.state.deltaRecovered < 0 ? this.state.deltaRecovered : '+'+this.state.deltaRecovered})
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component = {Card} xs = {12} md = {3} className = "Card" id ="deceased">
                        <CardContent>
                            <Typography>Deaths</Typography>
                            <Typography variant ='h5'>
                                <CountUp start = {0} end = {parseInt(this.state.deceased,10)} duration = {2} separator = ',' /> 
                                ({this.state.deltaDeaths < 0 ? this.state.deltaDeaths : '+'+this.state.deltaDeaths})
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        }
        return(
            <div> 
                {data}
            </div>
        );
    }
}