import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Newbuild extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            newbuildId: this.props.newbuild.newbuildId,
            checked: Number(this.props.newbuild.checked),
            changed: this.props.newbuild.changed,
            coment: this.props.newbuild.coment
        };
        this.changeResult = this.changeResult.bind(this);
        this.changeComent = this.changeComent.bind(this);
        this.saveNewbuild = this.saveNewbuild.bind(this);
    }
    static propTypes = {
        saveNewbuild: PropTypes.func.isRequired,
        newbuild: PropTypes.shape({
            newbuildId: PropTypes.number,
            checked: PropTypes.number,
            changed: PropTypes.number,
            coment: PropTypes.string,
            name: PropTypes.string,
            contact: PropTypes.string,
            lunLink: PropTypes.string
        })
    };
    componentWillReceiveProps(nextProps){
        this.setState({
            checked: Number(nextProps.newbuild.checked),
            changed: nextProps.newbuild.changed,
            coment: nextProps.newbuild.coment
        });
    }
    changeResult(element){
        this.setState({
            checked: element.target.value,
            changed: 1
        });
    }
    changeComent(element){
        this.setState({
            coment: element.target.value,
            changed: 1
        });
    }

    saveNewbuild(){
        this.props.saveNewbuild(this.state);

    }

    render() {
        return (
            <tr key={this.props.newbuild.newbuildId}>
                <td>
                    <a target="_blank" href={this.props.newbuild.lunLink}>{this.props.newbuild.name}</a>
                </td>
                <td>
                    {this.props.newbuild.contact}
                </td>
                <td>
                    <select value ={this.state.checked} className="form-control" onChange={this.changeResult}>
                        <option value="0">Результат</option>
                        <option value="1">Нет денег</option>
                        <option value="2">Все продали</option>
                        <option value="3">Есть на DOM.RIA</option>
                        <option value="4">В работе</option>
                        <option value="5">Отстрочка запуска</option>
                        <option value="6">Назначе звонок</option>
                    </select>
                    <p>{moment(new Date(this.props.newbuild.date)).format('DD-MM-YYYY')}</p>
                </td>
                <td>
                    <textarea
                        value={this.state.coment}
                        rows="4" cols="400"
                        className="form-control"
                        onChange={this.changeComent}></textarea>
                </td>
                <td>
                    <button className={!this.state.changed ? 'hide' : ''} onClick={this.saveNewbuild} >
                        Сохранить
                    </button>
                </td>
            </tr>
        );
    }
}