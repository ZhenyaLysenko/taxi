import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import profilestyle from '../../Profile/Profile.css';
import style from './AdminUserItem.css'
import defaultphoto from '../../../assets/default-user.png';

import { connect } from 'react-redux';
import { apiurl } from '../../../appconfig';

class AdminUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photourl: null,
            loadphoto: false,
            photoerror: null,
        }
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    fetchProfilePhoto() {
        if (this.props.tokenData.token
            && this.props.data.profilePictureId
            && !this.state.loadphoto
            && !this.state.photourl) {
            const token = this.props.tokenData.token;
            this.setState({ loadphoto: true });
            fetch(`${apiurl}/api/images/${this.props.data.profilePictureId}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.blob();
                    } else if (res.status === 404) {
                        this.setState({ photourl: defaultphoto });
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(blob => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        this.setState({ photourl: url, loadphoto: false });
                    }
                })
                .catch(error => this.setState({ photoerror: error.message, loadphoto: false }));
        }
    }
    renderProfilePhoto() {
        if (this.state.photourl) {
            return <img src={this.state.photourl} alt='photo' />
        }
        if (this.state.loadphoto) {
            return <Loading />
        }
        if (this.state.photoerror) {
            return <Alert local={true}
                message={`Photo dont load (${this.state.photoerror})`}
                click={() => { this.fetchProfilePhoto() }} />
        }
        return <img src={defaultphoto} alt='photo' />
    }
    renderProfile() {
        this.fetchProfilePhoto();
        return (
            <div className={`${style.adminUserContent} ${style.adminUserProfile}`}>
                <div className={style.adminUserProfilePhoto}>
                    <div className={profilestyle.profilePhoto}>
                        {this.renderProfilePhoto()}
                    </div>
                </div>
                <div className={style.adminUserProfileInfo}>
                    <div className={style.adminUserProfileText}><span>ID:</span> {this.props.data.id}</div>
                    <div className={style.adminUserProfileText}><span>Role:</span> {this.props.data.roles[0]}</div>
                    <div className={style.adminUserProfileText}><span>Name:</span> {this.props.data.firstName} {this.props.data.lastName}</div>
                    <div className={style.adminUserProfileText}><span>Email:</span> {this.props.data.email}</div>
                    <div className={style.adminUserProfileText}><span>EmailConfirmed:</span> {(this.props.data.emailConfirmed) ? 'Yes' : 'No'}</div>
                    <div className={style.adminUserProfileText}><span>Phone:</span> {this.props.data.phoneNumber}</div>
                    <div className={style.adminUserProfileText}><span>PhotoId:</span> {this.props.data.profilePictureId}</div>
                </div>
            </div>
        )
    }
    render() {
        if (this.props.data) {
            return this.renderProfile();
        }
        return null;
    }
}

// Check props type
AdminUserProfile.propTypes = {
    tokenData: PropTypes.object,
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    tokenData: state.tokenData,
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserProfile);
