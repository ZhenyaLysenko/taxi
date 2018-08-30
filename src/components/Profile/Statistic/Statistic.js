import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Statistic.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import LazyLoad from '../../LazyLoad/LazyLoad';

import { connect } from 'react-redux';

import { getStatistic } from '../../../actions/stataction';

class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        // if (!this.props.statData.stat) {
            this.props.getStatistic();
        //}
    }
    renderList() {
        return this.props.statData.stat.map((item, key) => {
            return <li key={key}><h1>Item</h1></li>;
        });
    }
    renderLazyLoad() {
        if(!this.props.statData.all) {
            return <LazyLoad loading={this.props.statData.loading} do={() => {this.props.getStatistic()}}/>
        }
        return null;
    }
    render() {
        /* if (this.props.statData.loading) {
            return <Loading />
        } */
        if (this.props.statData.error) {
            return <Alert local={true} message='Data dont load' click={() => { this.props.getStatistic() }} />
        }
        if (this.props.statData.stat) {
            return (
                <div>
                    <h1>Statistic</h1>
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
Statistic.propTypes = {
    statData: PropTypes.object,
    getStatistic: PropTypes.func,
}

const mapStateToProps = state => ({
    statData: state.statData,
})

const mapDispatchtoProps = dispatch => ({
    getStatistic: () => { dispatch(getStatistic()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Statistic);
