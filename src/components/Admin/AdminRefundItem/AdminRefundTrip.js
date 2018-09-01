import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import userstyle from '../AdminUserItem/AdminUserItem.css';
import style from "./AdminRefundItem.css";

import { connect } from 'react-redux';
import { apiurl } from '../../../appconfig';

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
                message={`Profile dont load (${this.state.triperror})`}
                click={() => { this.fetchTrip() }} />
        }
        if (true/* this.state.trip */) {
            return (
                <div className={`${userstyle.adminUserContent} ${userstyle.adminUserProfile}`}>
                    <div className={style.adminUserProfileInfo}>
                        <div className={style.adminUserProfileText}><span>Trip:</span> This is trip</div>
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
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminRefundItem);
