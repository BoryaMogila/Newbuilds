import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import { selectPage, getNewbuilds, getCount} from '../actions/index';
import {Pagination} from 'react-bootstrap';

import Newbuild from './Newbuild';


export default class Newbuilds extends Component {
    constructor(props){
        super(props);

        this.handleSelect = this.handleSelect.bind(this)
    }
    componentWillMount(){
        if(!this.props.count.pagesCount){
            this.props.getCount(this.props.city.tableName);
        }
        if(!this.props.newbuilds.length){
            this.props.getNewbuilds(this.props.city.tableName, 25, 0);
        }

    }

    renderNewbuilds(){
        return  this.props.newbuilds.map((newbuild) => {

            return (
                <Newbuild key={newbuild.newbuildId} newbuild={newbuild} />
            );
        })
    }
    handleSelect(event, element){
        const limit = element.eventKey * 25;
        const offset = (element.eventKey - 1) * 25;
        this.props.selectPage(element.eventKey);
        this.props.getNewbuilds(this.props.city.tableName, limit, offset);
    }
    render() {
        return (
            <div>
                <h1>{this.props.city.cityName}</h1>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Новостройки</th>
                        <th>Контакти</th>
                        <th>Результат</th>
                        <th>Коментарий</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderNewbuilds()}
                    </tbody>
                </table>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.props.count.pagesCount}
                    maxButtons={this.props.count.pagesCount > 20 ? 20 : this.props.count.pagesCount}
                    activePage={this.props.count.page}
                    onSelect={this.handleSelect} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        city: state.city,
        newbuilds: state.newbuilds,
        count: state.count
    }

}
export default connect(mapStateToProps, { selectPage, getNewbuilds, getCount})(Newbuilds);