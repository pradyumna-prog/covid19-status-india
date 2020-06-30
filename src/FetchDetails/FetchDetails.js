import React, { Component } from 'react';
//import './FetchDetails.css';
import CountUp from 'react-countup';
import {Grid, Card, CardContent, Typography} from '@material-ui/core';

export default class FetchDetails extends Component {

    state = {
        loading: true,
        confirmed: '',
        active: '',
        recovered: '',
        deceased: '',
        delta: []
    };

    async componentDidMount() {
        const url = 'https://api.covid19india.org/state_district_wise.json';
        const response = await fetch(url);
        const data = await response.json();
        const dataRender = await data[this.props.stateName]['districtData'];
        
        this.setState({
            loading: false,
            confirmed: dataRender[this.props.districtName]['confirmed'],
            active: dataRender[this.props.districtName]['active'],
            recovered: (parseInt(dataRender[this.props.districtName]['confirmed'], 10) - parseInt(dataRender[this.props.districtName]['active'], 10)).toString(),
            deceased: dataRender[this.props.districtName]['deceased'],
            delta: dataRender[this.props.districtName]['delta']
        })  
    }
/*
    static async getDerivedStateFromProps(props, state) {
        const url = 'https://api.covid19india.org/state_district_wise.json';
        const response = await fetch(url);
        const data = await response.json();
        const dataRender = await data[props.stateName]['districtData'];
        
        state = {
            loading: false,
            confirmed: dataRender[props.districtName]['confirmed'],
            active: dataRender[props.districtName]['active'],
            recovered: (parseInt(dataRender[props.districtName]['confirmed'], 10) - parseInt(dataRender[props.districtName]['active'], 10)).toString(),
            deceased: dataRender[props.districtName]['deceased'],
            delta: dataRender[props.districtName]['delta']
        };

        return state;
    }
*/
    componentWillReceiveProps() { this.componentDidMount() }

    render() {
        let data = null
        if(this.state.loading){
            return <h2> loading.....</h2>
        } 
        else{
            data = 
            <div className = "CardsContainer">
                <h1>{this.props.districtName}</h1> 
                <Grid container spacing = {3} justify = "center">
                    <Grid item component = {Card} xs = {12} md = {3} className = "Card" id = "confirmed">
                        <CardContent>
                            <Typography>Confirmed</Typography>
                            <Typography variant = 'h5'>
                                <CountUp start = {0} end = {parseInt(this.state.confirmed,10)} duration = {2} separator = ',' />
                                ({this.state.delta['confirmed'] < 0 ? this.state.delta['confirmed'] : '+'+this.state.delta['confirmed']})
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
                                ({this.state.delta['recovered'] < 0 ? this.state.delta['recovered'] : '+'+this.state.delta['recovered']})
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component = {Card} xs = {12} md = {3} className = "Card" id ="deceased">
                        <CardContent>
                            <Typography>Deaths</Typography>
                            <Typography variant ='h5'>
                                <CountUp start = {0} end = {parseInt(this.state.deceased,10)} duration = {2} separator = ',' /> 
                                ({this.state.delta['deceased'] < 0 ? this.state.delta['deceased'] : '+'+this.state.delta['deceased']})
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

