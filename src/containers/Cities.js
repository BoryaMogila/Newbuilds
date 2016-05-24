import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import { getCities, getCount, changeCity, getNewbuilds} from '../actions/index';

import CityLink from '../components/CityLink'

class Cities extends Component {
    constructor(props){
        super(props);

    }

    componentWillMount(){
        if(!this.props.cities.length){
            this.props.getCities();
        }
    }

    renderCities(){
        return  this.props.cities.map((city, index) => {
            city.cityId = index;
            function changeCity (){
                this.props.changeCity(city);
                this.props.getNewbuilds(city.cityName, 25, 0, this.props.checked.value);
                this.props.getCount(city.cityName, this.props.checked.value);
            };
            return (
                <CityLink key={index} city={city} changeCity={changeCity.bind(this)} selectedCity={this.props.city} />
            );
        })
    }
    render() {
        return (
            <div>
                <ul className="sidebar-nav" key={this.props.city.cityId}>
                    <li className="sidebar-brand">
                        <a href="#">Города Украины</a>
                    </li>
                    {this.renderCities()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        cities: state.cities,
        city: state.city,
        checked: state.checked
    }

}
export default connect(mapStateToProps, {getCities, getCount, getNewbuilds, changeCity})(Cities);