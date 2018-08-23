import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ProfileMain.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import defaultphoto from '../../../assets/default-user.png';

import { connect } from 'react-redux';

import { getUser, getPhoto } from '../../../actions/authaction';

class ProfileMain extends Component {
    constructor(props) {
        super(props);
    }
    renderPhoto() {
        if (this.props.photoData.url) {
            return <img src={this.props.photoData.url} alt='photo' />;
        }
        if (this.props.photoData.loading) {
            return <Loading />
        }
        if (this.props.photoData.error) {
            return <Alert local={true} message='Photo dont load' click={this.props.getPhoto} />
        }
        return <img src={defaultphoto} className={style.profilePhoto} alt='photo' />;
    }
    render() {
        if (this.props.userData.user) {
            return (
                <div>
                    <h1>Profile</h1>
                    <div className={style.profilePhoto}>
                        {this.renderPhoto()}
                    </div>
                    <h3>Name: {this.props.userData.user.firstName} {this.props.userData.user.lastName}</h3>
                    <h3>Email: {this.props.userData.user.email}</h3>
                    <h3>Phone: {this.props.userData.user.phoneNumber}</h3>
                    <h3>City: {this.props.userData.user.city}</h3>
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
