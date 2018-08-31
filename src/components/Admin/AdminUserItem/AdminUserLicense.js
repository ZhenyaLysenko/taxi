import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import profilestyle from '../../Profile/Profile.css';
import style from './AdminUserItem.css';
import defaultlicense from '../../../assets/default-license.png';

import { connect } from 'react-redux';
import { approveLicense } from '../../../actions/adminaction';
import { apiurl } from '../../../appconfig';

class AdminUserLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            licensephotourl: null,
            licensedata: null,
            loadlicense: false,
            licenseerror: null,
        }
    }
    componentDidMount() {
        // onsole.log(this.props.data);
    }
    componentDidUpdate() {

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
            return (
                <div className={`${style.adminUserContent} ${style.adminUserProfile}`}>
                    <Loading />
                </div>
            )
        }
        if (this.state.licenseerror) {
            return <Alert local={true}
                message={`License dont load (${this.state.licenseerror})`}
                click={() => { this.fetchLicense() }} />
        }
        if (this.state.licensedata) {
            return (
                <div className={`${style.adminUserContent} ${style.adminUserProfile}`}>
                    <div className={style.adminUserProfilePhoto}>
                        <div className={`${profilestyle.profilePhoto} ${style.adminUserLicensePhoto}`}>
                            {this.renderLicensePhoto()}
                        </div>
                    </div>
                    <div className={style.adminUserProfileInfo}>
                        <div className={style.adminUserProfileText}><span>Licensed From:</span> {this.state.licensedata.licensedFrom}</div>
                        <div className={style.adminUserProfileText}><span>Licensed To:</span> {this.state.licensedata.licensedTo}</div>
                        <div className={style.adminUserProfileText}><span>Approved:</span> {(this.state.licensedata.isApproved) ? 'YES' : 'NO'}
                                {this.renderLicenseApproveBtn()}
                        </div>
                        
                    </div>
                </div>
            )
        }
        return null;
    }
    renderLicenseApproveBtn() {
        if (this.props.userData.user.role === 'admin'
            && !this.props.data.roles.includes('admin_access')) {
            return <button className={style.adminUserLicenseAprrove}onClick={() => { this.props.approveLicense(this.props.data.ids.driverId) }}>Approve</button>
        }
        return null;
    }
    render() {
        if (this.props.data) {
            return this.renderLicense();
        }
        return null;
    }
}

// Check props type
AdminUserLicense.propTypes = {
    tokenData: PropTypes.object,
    userData: PropTypes.object,
    data: PropTypes.object,
    approveLicense: PropTypes.func
}

const mapStateToProps = state => ({
    tokenData: state.tokenData,
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
    approveLicense: (id) => { dispatch(approveLicense(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserLicense);
