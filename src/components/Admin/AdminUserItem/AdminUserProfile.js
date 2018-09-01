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
            loaduser: false,
            userdata: null,
            usererror: null,
        }
    }
    componentDidMount() {
        if (this.props.data) {
            this.setState({userdata: this.props.data}, () => {
                if (this.state.userdata.profilePictureId) {
                    this.fetchProfilePhoto();
                }
            });
        }
        if (this.props.id) {
            this.fetchUserProfile();
        }
    }
    componentDidUpdate() {
        if (!this.state.photourl && this.state.userdata) {
            this.fetchProfilePhoto();
        }
    }
    fetchProfilePhoto() {
        if (this.props.tokenData.token
            && !this.state.loadphoto
            && !this.state.photourl) {
            const token = this.props.tokenData.token;
            const id = (this.state.userdata)
                ? this.state.userdata.profilePictureId
                : (this.props.data)
                    ? this.props.data.profilePictureId
                    : null;
            if (id) {
                this.setState({ loadphoto: true });
                fetch(`${apiurl}/api/images/${id}`, {
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
    }
    fetchUserProfile() {
        if (this.props.tokenData.token
            && this.props.id
            && !this.state.loaduser
            && !this.state.userdata) {
            const token = this.props.tokenData.token;
            this.setState({ loaduser: true });
            fetch(`${apiurl}/api/admins/getuser/${this.props.id}`, {
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
                        this.setState({ userdata: data, loaduser: false }, () => {
                            if (data.profilePictureId) {
                                this.fetchProfilePhoto(data.profilePictureId);
                            }
                        });
                    }
                })
                .catch(error => this.setState({ usererror: error.message, loaduser: false }))
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
    render() {
        if (this.state.loaduser) {
            return (
                <div className={`${style.adminUserContent} ${style.adminUserProfile}`}>
                    <Loading />
                </div>
            );
        }
        if (this.state.usererror) {
            return <Alert local={true}
                message={`Profile dont load (${this.state.usererror})`}
                click={() => { this.fetchUserProfile() }} />
        }
        if (this.state.userdata) {
            return (
                <div className={`${style.adminUserContent} ${style.adminUserProfile}`}>
                    <div className={style.adminUserProfilePhoto}>
                        <div className={profilestyle.profilePhoto}>
                            {this.renderProfilePhoto()}
                        </div>
                    </div>
                    <div className={style.adminUserProfileInfo}>
                        <div className={style.adminUserProfileText}><span>ID:</span> {this.state.userdata.id}</div>
                        <div className={style.adminUserProfileText}><span>Role:</span> {this.state.userdata.roles[0]}</div>
                        <div className={style.adminUserProfileText}><span>Name:</span> {this.state.userdata.firstName} {this.state.userdata.lastName}</div>
                        <div className={style.adminUserProfileText}><span>Email:</span> {this.state.userdata.email}</div>
                        <div className={style.adminUserProfileText}><span>EmailConfirmed:</span> {(this.state.userdata.emailConfirmed) ? 'Yes' : 'No'}</div>
                        <div className={style.adminUserProfileText}><span>Phone:</span> {this.state.userdata.phoneNumber}</div>
                        <div className={style.adminUserProfileText}><span>PhotoId:</span> {this.state.userdata.profilePictureId}</div>
                    </div>
                </div>
            );
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
