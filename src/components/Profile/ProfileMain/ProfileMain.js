import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ProfileMain.css';
import Loading from '../../Loading/Loading';


import { connect } from 'react-redux';

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
            return "Error";
        }
        return null;
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
})

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileMain);
