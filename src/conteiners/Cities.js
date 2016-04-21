import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import { getCities, changeCity } from '../actions/index';

import CityLink from './CityLink'

class Cities extends Component {
    constructor(props){
        super(props);

        this.selectCity = this.selectCity.bind(this);

    }
    componentWillMount(){
        if(!this.props.cities.length){
            this.props.getCities();
        }
    }

    selectCity(cityId){
        return this.props.city.cityId == cityId ? 'selected' : '';
    }
    renderCities(){
        return  this.props.cities.map((city) => {
            return (
                <CityLink key={city.cityId} city={city} selectedCity={this.props.city} />

            );
        })
    }
    render() {
        return (
            <ul className="sidebar-nav" key={this.props.city.cityId}>
                <li className="sidebar-brand">
                    <a href="#">Города Украины</a>
                </li>
                {this.renderCities()}
            </ul>
        );
    }
}

function mapStateToProps(state){
    return {
        cities: state.cities,
        city: state.city
    }

}
export default connect(mapStateToProps, {getCities, changeCity })(Cities);