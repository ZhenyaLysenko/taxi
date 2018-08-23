import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Vehicle.css';
import Loading from '../../Loading/Loading';

import { connect } from 'react-redux';

import { getVehicle } from '../../../actions/vehiclesaction';

class Vehicle extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.vehData.veh) {
            this.props.getVehicle();
        }
    }
    renderPhoto() {
        if (this.props.vehData.url) {
            return <img src={this.props.vehData.url} alt='photo' />;
        }
        if (this.props.vehData.loadphoto) {
            return <Loading />
        }
        if (this.props.vehData.errorphoto) {
            return "Error";
        }
        return "VEHICLE";
    }
    render() {
        if (this.props.vehData.veh) {
            return (
                <div>
                    <h1>Profile</h1>
                    <div className={style.vehPhoto}>
                        {this.renderPhoto()}
                    </div>
                    <h3>Number: {this.props.vehData.veh.number}</h3>
                    <h3>Model: {this.props.vehData.veh.model}</h3>
                    <h3>Brand: {this.props.vehData.veh.brand}</h3>
                    <h3>Color: {this.props.vehData.veh.color}</h3>
                </div>
            );
        }
        if (this.props.vehData.errorveh) {
            return (
                <div>
                    <h1>Vehilce</h1>
                    Error
                </div>
            );
        }
        return null;
    }
}

// Check props type
Vehicle.propTypes = {
    vehData: PropTypes.object,
    getVehicle: PropTypes.func,
}

const mapStateToProps = state => ({
    vehData: state.vehData
})

const mapDispatchtoProps = dispatch => ({
    getVehicle: () => { dispatch(getVehicle()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Vehicle);
