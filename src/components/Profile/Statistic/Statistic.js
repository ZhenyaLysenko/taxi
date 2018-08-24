import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Statistic.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';

import { getStatistic } from '../../../actions/stataction';

class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 10,
        }
    }
    componentDidMount() {
        if (!this.props.statData.stat) {
            this.props.getStatistic(this.state.page, this.state.size);
        }
    }
    render() {
        if (this.props.statData.loading) {
            return <Loading />
        }
        if (this.props.statData.stat) {
            return (
                <div>
                    <h1>Statistic</h1>
                </div>
            );
        }
        if (this.props.statData.error) {
            return <Alert local={true} message='Data dont load' click={() => { this.props.getStatistic(this.state.page, this.state.size) }} />
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
    getStatistic: (page, size) => { dispatch(getStatistic(page, size)) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Statistic);
