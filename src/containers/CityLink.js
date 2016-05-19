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
        this.props.getNewbuilds(this.props.city.cityName, 25, 0, this.props.checked.value);
        this.props.getCount(this.props.city.cityName, this.props.checked.value);
    }

    render() {
        return (
            <li className={this.selectCity()} key={this.props.city.cityId} onClick={this.changeCity}>
                <a href="#">{this.props.city.cityName}</a>
            </li>
        );
    }
}

function mapStateToProps(state){
    return {
        checked: state.checked
    }

}

export default connect(mapStateToProps, {getCount, getNewbuilds, changeCity })(CityLink);