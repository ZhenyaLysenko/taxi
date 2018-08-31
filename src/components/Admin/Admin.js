import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Admin.css';
import profilestyle from "../Profile/Profile.css";
import Header from '../Header/Header';
import AdminUserList from './AdminUserList/AdminUserList';
import AdminRefundList from './AdminRefundList/AdminRefundList';
import AdminComissionTool from './AdminComissionTool/AdminComissionTool';

import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'main',
        }
    }
    componentDidMount() {
        if (!this.props.userData.user) {
            this.props.history.replace('/sign-in');
        }
    }
    componentDidUpdate() {
        if (!this.props.userData.user) {
            this.props.history.replace('/sign-in');
        }
    }
    renderMain() {
        switch (this.state.show) {
            case 'main': return <Main />;
            case 'userlist': return <AdminUserList />;
            case 'refundlist': return <AdminRefundList />;
            case 'comission': return <AdminComissionTool />;
            default: return null;
        }
    }
    renderComissionTool() {
        const rootid = '1eb67299-3eea-400e-a72c-0ef7c1e3246d';
        if (this.props.userData.user.id === rootid) {
            return <div className={`${profilestyle.profileToolItem}`} onClick={() => { this.setState({ show: 'comission' }) }}>Manage comission</div>
        }
        return null;
    }
    render() {
        if (this.props.userData.user) {
            if (this.props.userData.user.role === 'admin') {
                return (
                    <div>
                        <Header></Header>
                        <div className={`${profilestyle.profileContainer}`}>
                            <div className={`${profilestyle.profileToolbar}`}>
                                <div className={`${style.profileToolbarMain} ${style.Toolbarfixed}`}>
                                    <div className={`${profilestyle.profileToolItem}`} onClick={() => { this.setState({ show: 'main' }) }}>Main</div>
                                    <div className={`${profilestyle.profileToolItem}`} onClick={() => { this.setState({ show: 'userlist' }) }}>Manage users</div>
                                    <div className={`${profilestyle.profileToolItem}`} onClick={() => { this.setState({ show: 'refundlist' }) }}>Manage requests</div>
                                    {this.renderComissionTool()}
                                </div>
                            </div>
                            {this.renderMain()}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Header></Header>
                        <div className={`${profilestyle.profileContainer}`}>
                            <div className={`${profilestyle.profileMain}`}>
                                You are not admin
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return null;
    }
}

const Main = (props) => {
    return <div className={`${profilestyle.profileMain}`}>'This is admin panel'</div>;
}

// Check props type
Profile.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
})

const mapDispatchtoProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchtoProps)(Profile);
