import React, { Component, PropTypes } from 'react';

class CityLink extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        cityName: PropTypes.string.isRequired,
        selectedCityId: PropTypes.number.isRequired,
        cityId: PropTypes.number.isRequired,
        changeCity: PropTypes.func.isRequired
    };

    selectCity = () => {
        return this.props.cityId == this.props.selectedCityId ? 'selected' : '';
    };

    render() {
        return (
            <li className={this.selectCity()} onClick={this.props.changeCity}>
                <a href="#">{this.props.cityName}</a>
            </li>
        );
    }
}


export default CityLink;