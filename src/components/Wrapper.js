import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Cities from '../containers/Cities';
import Newbuilds from '../containers/Newbuilds';
import {getNewbuilds, changeChecked, getCount, getCities} from '../actions/index';


export default class Wrapper extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggled: '',
            menu: 'скрыть'
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.changeChecked = this.changeChecked.bind(this);
    }

    toggleMenu(e){
        e.preventDefault();
        if(this.state.toggled == ''){
            this.setState({
                toggled: 'toggled',
                menu: 'Показать'
            })
        } else {
            this.setState({
                toggled: '',
                menu: 'Скрить'
            })
        }
    }

    changeChecked(e){
        this.props.changeChecked(e.target.value);
        this.props.getNewbuilds(this.props.city.tableName, 25, 0, e.target.value);
        this.props.getCount(this.props.city.tableName, e.target.value);

    }

    render() {

        return (
            <div id="wrapper" className={this.state.toggled}>
                <div id="sidebar-wrapper">
                    <Cities />
                </div>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <a href="#menu-toggle" className="btn btn-default"
                               onClick={this.toggleMenu} id="menu-toggle">{this.state.menu} меню</a>

                            <label>
                                Сортировать по ответу
                                <select value={this.props.checked.value} className="form-control right"  onChange={this.changeChecked} >
                                    <option value="all">Все</option>
                                    <option value="notChecked">не провереные</option>
                                    <option value="1">Нет денег</option>
                                    <option value="2">Все продали</option>
                                    <option value="3">Есть на DOM.RIA</option>
                                    <option value="4">В работе</option>
                                    <option value="5">Отстрочка запуска</option>
                                    <option value="6">Назначе звонок</option>
                                </select>
                            </label>
                            <div className="col-lg-12">
                                <Newbuilds />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        checked : state.checked,
        city    : state.city
    }

}



Wrapper.need = [
    getCount("vse_novostroyki_kieva", 'all'), getCities(), getNewbuilds("vse_novostroyki_kieva", 25, 0, 'all')
];

export default connect(mapStateToProps, { changeChecked, getNewbuilds, getCount })(Wrapper);