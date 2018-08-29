import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import profilestyle from '../../Profile/ProfileMain/ProfileMain.css';

import defaultphoto from '../../../assets/default-user.png';
import defaultlicense from '../../../assets/default-license.png';

import { connect } from 'react-redux';
import { setUserToAdmin, deleteAdmin, deleteUser } from '../../../actions/adminaction';
import { apiurl } from '../../../appconfig';

class AdminUserItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'close',
            photourl: null,
            licensephotourl: null,
            licensedata: null,
            loadphoto: false,
            loadlicense: false,
            photoerror: null,
            licenseerror: null,
        }
    }
    componentDidMount() {
        // onsole.log(this.props.data);
    }
    componentDidUpdate() {
    }
    fetchProfilePhoto() {
        if (this.props.tokenData.token) {
            const token = this.props.tokenData.token;
            this.setState({ loadphoto: true });
            fetch(`${apiurl}/api/images/${this.props.data.profilePictureI}`, {
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
    fetchLicensePhoto(token, id, data) {
        if (token && id) {
            fetch(`${apiurl}/api/admins/driverlicenses/${id}/image`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.blob();
                    } else if (res.status === 404) {
                        this.setState({
                            licensedata: data,
                            licensephotourl: null,
                            loadlicense: false,
                        })
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(blob => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        this.setState({ licensedata: data, licensephotourl: url, loadlicense: false });
                    }
                })
                .catch(error => this.setState({ licenseerror: error.message, loadlicense: false }));
        }
    }
    fetchLicense() {
        if (this.props.tokenData.token && this.props.data.ids.driverId) {
            const id = this.props.data.ids.driverId;
            const token = this.props.tokenData.token;
            this.setState({ loadlicense: true });
            fetch(`${apiurl}/api/admins/driverlicenses/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    // console.log(res);
                    if (res.status === 200) {
                        return res.json();
                    } else if (res.status === 404) {
                        this.setState({
                            licensedata: {
                                licensedFrom: 'Not set',
                                licensedTo: 'Not set',
                                isApproved: false
                            },
                            licensephotourl: null,
                            loadlicense: false,
                        })
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(data => {
                    if (data) {
                        if (this.state.licensephotourl) {
                            this.setState({ licensedata: data });
                        } else {
                            this.fetchLicensePhoto(token, id, data);
                        }
                    }
                })
                .catch(error => this.setState({ licenseerror: error.message, loadlicense: false }));
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
        if (this.props.data.profilePictureId && !this.state.loadphoto) {
            this.fetchProfilePhoto();
        }
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
            </div>
        )
    }
    renderLicensePhoto() {
        if (this.state.licensephotourl) {
            return <img src={this.state.licensephotourl} alt='photo' />
        }
        return <img src={defaultlicense} alt='photo' />
    }
    renderLicense() {
        if (!this.state.licensedata && !this.state.loadlicense) {
            this.fetchLicense();
        }
        if (this.state.loadlicense) {
            return <Loading />
        }
        if (this.state.licenseerror) {
            return <Alert local={true}
                message={`License dont load (${this.state.licenseerror})`}
                click={() => { this.fetchLicense() }} />
        }
        if (this.state.licensedata) {
            return (
                <div>
                    <div className={profilestyle.profilePhoto}>
                        {this.renderLicensePhoto()}
                    </div>
                    <p>Licensed From: {this.state.licensedata.licensedFrom}</p>
                    <p>Licensed To: {this.state.licensedata.licensedTo}</p>
                    <p>Approved: {(this.state.licensedata.isApproved) ? 'YES' : 'NO'}</p>
                </div>
            )
        }
        return null;
    }
    renderLicenseBtn() {
        if (this.props.data.roles.includes('driver_access')) {
            if (this.state.show === 'close' || this.state.show === 'profile') {
                return (
                    <button onClick={() => { this.setState({ show: 'license' }) }}>Show license</button>
                );
            }
            if (this.state.show === 'license') {
                return (
                    <button onClick={() => { this.setState({ show: 'close' }) }}>Close license</button>
                );
            }
            return null;
        }
        return null;
    }
    renderProfileBtn() {
        if (this.state.show === 'close' || this.state.show === 'license') {
            return (
                <button onClick={() => { this.setState({ show: 'profile' }) }}>Show profile</button>
            );
        }
        if (this.state.show === 'profile') {
            return (
                <button onClick={() => { this.setState({ show: 'close' }) }}>Close profile</button>
            );
        }
        return null;
    }
    renderToAdminBtn() {
        const rootid = '1eb67299-3eea-400e-a72c-0ef7c1e3246d';
        if (this.props.userData.user.id === rootid && this.props.data !== rootid) {
            if (!this.props.data.roles.includes('admin_access')) {
                return <button onClick={() => { this.props.setAdmin(this.props.data.id) }}>Up to admin</button>
            } else {
                return <button onClick={() => { this.props.deleteAdmin(this.props.data.id) }}>Remove from admin</button>
            }
            return null;
        }
        return null;
    }
    renderDeleteUserBtn() {
        if (!this.props.data.roles.includes('admin_access')) {
            return <button onClick={() => { this.props.deleteUser(this.props.data.id) }}>Delete user</button>
        }
        return null;
    }
    renderClose() {
        return (
            <div>
                <p>Email: {this.props.data.email}</p>
                {this.renderProfileBtn()}
                {this.renderLicenseBtn()}
                {this.renderToAdminBtn()}
                {this.renderDeleteUserBtn()}
            </div>
        );
    }
    renderShow() {
        switch (this.state.show) {
            case 'profile': return this.renderProfile();
            case 'license': return this.renderLicense();
            default: return null;
        }
    }
    render() {
        if (this.props.data) {
            return (
                <div>
                    {this.renderClose()}
                    {this.renderShow()}
                </div>
            );
        }
        return null;
    }
}

// Check props type
AdminUserItem.propTypes = {
    tokenData: PropTypes.object,
    setAdmin: PropTypes.func,
    deleteAdmin: PropTypes.func,
    deleteUser: PropTypes.func
}

const mapStateToProps = state => ({
    tokenData: state.tokenData,
    userData: state.userData
})

const mapDispatchtoProps = dispatch => ({
    setAdmin: (id) => { dispatch(setUserToAdmin(id)) },
    deleteAdmin: (id) => { dispatch(deleteAdmin(id)) },
    deleteUser: (id) => { dispatch(deleteUser(id)) }
})


export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserItem);
