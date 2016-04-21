import React from 'react';
import { Component } from 'react';
import Cities from '../conteiners/Cities';
import Newbuilds from '../conteiners/Newbuilds';
import {getCities, getNewbuilds, getCount} from '../actions/index';


export default class Wrapper extends Component {
    render() {
        return (
            <div id="wrapper">
                <div id="sidebar-wrapper">
                    <Cities />
                </div>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
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


Wrapper.need = [
    getCount("vse_novostroyki_kieva"), getCities(), getNewbuilds("vse_novostroyki_kieva", 25, 0)
];
