import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ResponseList.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import LazyLoad from '../../LazyLoad/LazyLoad';

import { connect } from 'react-redux';

import { getResponseList, resClear } from '../../../actions/reslistaction';

class ResponseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        // if (!this.props.statData.stat) {
        this.props.getResponseList();
        //}
    }
    refresh() {
        this.props.resClear();
        this.props.getResponseList();
    }
    renderList() {
        return this.props.listData.ress.map((item, key) => {
            return (
                <li key={key}>
                    <p>From: {item.email}</p>
                    <p>Time: {item.creationTime}</p>
                    <p>Message: {item.message}</p>
                </li>);
        });
    }
    renderLazyLoad() {
        if (!this.props.listData.all) {
            return <LazyLoad loading={this.props.listData.loading} do={() => { this.props.getResponseList() }} />
        }
        return null;
    }
    render() {
        /* if (this.props.statData.loading) {
            return <Loading />
        } */
        if (this.props.listData.error) {
            return <Alert local={true} message='Data dont load' click={() => { this.props.getResponseList() }} />
        }
        if (this.props.listData.ress) {
            return (
                <div>
                    <h1>Responses list</h1>
                    <button onClick={this.refresh.bind(this)}>Refresh</button>
                    <ul>
                        {this.renderList()}
                    </ul>
                    {this.renderLazyLoad()}
                </div>
            );
        }
        return null;
    }
}

// Check props type
ResponseList.propTypes = {
    listData: PropTypes.object,
    getStatistic: PropTypes.func,
}

const mapStateToProps = state => ({
    listData: state.reslistData,
})

const mapDispatchtoProps = dispatch => ({
    getResponseList: () => { dispatch(getResponseList()) },
    resClear: () => { dispatch(resClear()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(ResponseList);
