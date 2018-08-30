import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ProfileMain.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';


class ProfileMain extends Component {
    render() {
        if (this.props.userData.user) {
            return (
                <div className={style.main}>
                    <h1 className={style.heading}>PROFILE</h1>
                    <div>
                        <h3><span>Name:</span> {this.props.userData.user.firstName} {this.props.userData.user.lastName}</h3>
                        <h3><span>Email:</span> {this.props.userData.user.email}</h3>
                        <h3><span>Phone:</span> {this.props.userData.user.phoneNumber}</h3>
                        <h3><span>City:</span> {this.props.userData.user.city}</h3>
                    </div>
                </div>
            );
        }
        if (this.props.userData.error) {
            return <Alert local={true} message='Data dont load' click={this.props.getUser} />
        }
        return null;
    }
}

// Check props type
ProfileMain.propTypes = {
    userData: PropTypes.object,
    photoData: PropTypes.object,
}

const mapStateToProps = state => ({
    userData: state.userData,
    photoData: state.photoData
})

const mapDispatchtoProps = dispatch => ({
    getPhoto: () => { dispatch(getPhoto()) },
    getUser: () => { dispatch(getUser()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileMain);
