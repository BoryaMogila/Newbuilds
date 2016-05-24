import React from 'react';
import { Component } from 'react';

class CityLink extends Component {
    constructor(props) {
        super(props);
        this.selectCity = this.selectCity.bind(this);
    }

    selectCity(){
        return this.props.city.cityId == this.props.selectedCity.cityId ? 'selected' : '';
    }

    render() {
        return (
            <li className={this.selectCity()} key={this.props.city.cityId} onClick={this.props.changeCity}>
                <a href="#">{this.props.city.cityName}</a>
            </li>
        );
    }
}


export default CityLink;