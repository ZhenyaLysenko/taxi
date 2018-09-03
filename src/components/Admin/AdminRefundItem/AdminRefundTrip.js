import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import userstyle from '../AdminUserItem/AdminUserItem.css';
import style from "./AdminRefundItem.css";

import { connect } from 'react-redux';
import { apiurl } from '../../../appconfig';
import { openGoogleMap } from '../../../actions/globalviewaction';

class AdminRefundItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: null,
            loadtrip: false,
            triperror: null,
        }
    }
    componentDidMount() {
        this.fetchTrip();
    }
    componentDidUpdate() {
        if (this.state.trip) {
            console.log(this.state.trip);
        }
    }
    fetchTrip() {
        if (this.props.tokenData.token
            && this.props.id
            && !this.state.loadtrip
            && !this.state.trip) {
            const token = this.props.tokenData.token;
            this.setState({ loadtrip: true });
            fetch(`${apiurl}/api/tripshistory/${this.props.id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (data) {
                        this.setState({ trip: data, loadtrip: false });
                    }
                })
                .catch(error => this.setState({ triperror: error.message, loadtrip: false }))
        }
    }
    renderMap() {
        const center = {
            lat: this.state.trip.from.latitude,
            lng: this.state.trip.from.longitude
        }
        const labels = [{
            lat: this.state.trip.from.latitude,
            lng: this.state.trip.from.longitude,
            text: 'Start'
        },
        {
            lat: this.state.trip.to.latitude,
            lng: this.state.trip.to.longitude,
            text: 'End'
        }];
        this.props.openGoogleMap(center, labels);
    }
    render() {
        if (this.state.loadtrip) {
            return (
                <div className={`${userstyle.adminUserContent} ${userstyle.adminUserProfile}`}>
                    <Loading />
                </div>
            );
        }
        if (this.state.triperror) {
            return <Alert local={true}
                message={`Trip dont load (${this.state.triperror})`}
                click={() => { this.fetchTrip() }} />
        }
        if (this.state.trip) {
            return (
                <div className={`${userstyle.adminUserContent} ${userstyle.adminUserProfile}`}>
                    <div className={userstyle.adminUserProfileInfo}>
                        <div className={userstyle.adminUserProfileText}><span>Created:</span> {(new Date(this.state.trip.creationTime)).toTimeString()}</div>
                        <div className={userstyle.adminUserProfileText}><span>Taken:</span> {(new Date(this.state.trip.driverTakeTripTime)).toTimeString()}</div>
                        <div className={userstyle.adminUserProfileText}><span>Started:</span> {(new Date(this.state.trip.startTime)).toTimeString()}</div>
                        <div className={userstyle.adminUserProfileText}><span>Ended:</span> {(new Date(this.state.trip.finishTime)).toTimeString()}</div>
                        <div className={userstyle.adminUserProfileText}><span>Distance:</span> {this.state.trip.distance}</div>
                        <div className={userstyle.adminUserProfileText}><span>Price:</span> {this.state.trip.price}</div>
                        <div className={userstyle.adminUserProfileText}><button className={userstyle.adminUserBtn} onClick={this.renderMap.bind(this)}>Open Map</button></div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

// Check props type
AdminRefundItem.propTypes = {
    tokenData: PropTypes.object,
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    tokenData: state.tokenData,
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
    openGoogleMap: (center, labels) => { dispatch(openGoogleMap(center, labels)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminRefundItem);
