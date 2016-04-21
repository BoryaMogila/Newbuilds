import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';

import { getCount, changeCity, getNewbuilds } from '../actions/index';

class CityLink extends Component {
    constructor(props) {
        super(props);
        this.selectCity = this.selectCity.bind(this);
        this.changeCity = this.changeCity.bind(this);
    }

    selectCity(){
        return this.props.city.cityId == this.props.selectedCity.cityId ? 'selected' : '';
    }
    changeCity(){
        this.props.changeCity(this.props.city);
        this.props.getNewbuilds(this.props.city.tableName, 25, 0);
        this.props.getCount(this.props.city.tableName);
    }

    render() {
        return (
            <li className={this.selectCity()} key={this.props.city.cityId} onClick={this.changeCity}>
                <a href="#">{this.props.city.cityName}</a>
            </li>
        );
    }
}

export default connect(null, {getCount, getNewbuilds, changeCity })(CityLink);