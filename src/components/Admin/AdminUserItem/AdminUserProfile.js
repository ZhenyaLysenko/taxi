import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import profilestyle from '../../Profile/ProfileMain/ProfileMain.css';

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
            <div>
                <div className={profilestyle.profilePhoto}>
                    {this.renderProfilePhoto()}
                </div>
                <p>ID: {this.props.data.id}</p>
                <p>ROLE: {this.props.data.roles[0]}</p>
                <p>Name: {this.props.data.firstName} {this.props.data.lastName}</p>
                <p>Email: {this.props.data.email}</p>
                <p>EmailConfirmed: {(this.props.data.emailConfirmed) ? 'Yes' : 'No'}</p>
                <p>Phone: {this.props.data.phoneNumber}</p>
                <p>PhotoId: {this.props.data.profilePictureId}</p>
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
