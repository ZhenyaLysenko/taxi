import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminUserLicense from "./AdminUserLicense";
import AdminUserProfile from "./AdminUserProfile";
import AdminUserResponse from "./AdminUserResponse";

import { connect } from 'react-redux';
import { setUserToAdmin, deleteAdmin, deleteUser } from '../../../actions/adminaction';

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
    renderLicenseBtn() {
        if (this.props.data.roles.includes('driver_access')) {
            if (this.state.show === 'license') {
                return (
                    <button onClick={() => { this.setState({ show: 'close' }) }}>Close license</button>
                );
            }
            return <button onClick={() => { this.setState({ show: 'license' }) }}>Show license</button>;
        }
        return null;
    }
    renderProfileBtn() {
        if (this.state.show === 'profile') {
            return (
                <button onClick={() => { this.setState({ show: 'close' }) }}>Close profile</button>
            );
        }
        return <button onClick={() => { this.setState({ show: 'profile' }) }}>Show profile</button>
    }
    renderToAdminBtn() {
        const rootid = '1eb67299-3eea-400e-a72c-0ef7c1e3246d';
        if (this.props.userData.user.id === rootid && this.props.data.id !== rootid) {
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
    renderResponseBtn() {
        if (this.state.show === 'response') {
            return <button onClick={() => { this.setState({ show: 'close' }) }}>Close response</button>
        }
        return <button onClick={() => { this.setState({ show: 'response' }) }}>Send response</button>
    }
    renderClose() {
        return (
            <div>
                <p>Email: {this.props.data.email}</p>
                {this.renderProfileBtn()}
                {this.renderLicenseBtn()}
                {this.renderToAdminBtn()}
                {this.renderDeleteUserBtn()}
                {this.renderResponseBtn()}
            </div>
        );
    }
    renderShow() {
        switch (this.state.show) {
            case 'profile': return <AdminUserProfile data={this.props.data} />;
            case 'license': return <AdminUserLicense data={this.props.data} />;
            case 'response': return <AdminUserResponse data={this.props.data} />;
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
    deleteUser: PropTypes.func,
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    tokenData: state.tokenData,
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
    setAdmin: (id) => { dispatch(setUserToAdmin(id)) },
    deleteAdmin: (id) => { dispatch(deleteAdmin(id)) },
    deleteUser: (id) => { dispatch(deleteUser(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserItem);
