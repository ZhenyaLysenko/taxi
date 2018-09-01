import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert'; */

import userstyle from '../AdminUserItem/AdminUserItem.css';
import style from "./AdminRefundItem.css";

import settingsvg from "../../../assets/settings.svg";
import closesvg from '../../../assets/close.svg';
import AdminUserProfile from '../AdminUserItem/AdminUserProfile';
import AdminRefundTrip from './AdminRefundTrip';

import { connect } from 'react-redux';
import { resolveRequest } from '../../../actions/adminaction';

class AdminRefundItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'close',
            message: "",
            settings: false,
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }
    submit() {
        this.props.resolveRequest(this.props.data.id, this.state.message);
    }
    renderResolve() {
        return (
            <div className={`${userstyle.adminUserContent}`}>
                <form className={userstyle.adminUserResForm} onSubmit={(e) => { e.preventDefault() }}>
                    <h3>Resolve it</h3>
                    <textarea type="text" placeholder="You text" onChange={(e) => { this.setState({ message: e.target.value }) }} />
                    <input type="submit" value="Submit" onClick={this.submit.bind(this)} />
                </form>
            </div>
        );
    }
    renderResolveMain() {
        switch (this.state.show) {
            case 'resolve': return this.renderResolve();
            case 'profile': return <AdminUserProfile id={this.props.data.identityId} />;
            case 'trip': return <AdminRefundTrip id={this.props.data.tripHistoryId} />
            default: return null;
        }
    }
    renderResolveBtn() {
        /*  if (this.state.show === 'resolve') {
             return <button className={userstyle.settingsMainItem}
                 onClick={() => { this.setState({ show: 'close' }) }}>Close</button>
         } */
        return <button className={userstyle.settingsMainItem}
            onClick={() => { this.setState({ show: 'resolve' }) }}>Resolve it</button>
    }
    renderProfileBtn() {
        /* if (this.state.show === 'profile') {
            return <button className={userstyle.settingsMainItem}
                onClick={() => { this.setState({ show: 'close' }) }}>Close</button>
        } */
        return <button className={userstyle.settingsMainItem}
            onClick={() => { this.setState({ show: 'profile' }) }}>Show profile</button>
    }
    renderCloseBtn() {
        if (this.state.show !== 'close') {
            return (
                <div className={userstyle.adminSettingsBtn} onClick={() => this.setState({ show: 'close' })}>
                    <img src={closesvg} alt="photo" />
                </div>
            );
        }
        return null;
    }
    renderTripBtn() {
        return <button className={userstyle.settingsMainItem}
            onClick={() => { this.setState({ show: 'trip' }) }}>Show trip</button>
    }
    renderSettnigs() {
        if (this.state.settings) {
            return (
                <div className={userstyle.settingsMain}>
                    {this.renderProfileBtn()}
                    {this.renderResolveBtn()}
                    {this.renderTripBtn()}
                </div>
            );
        }
        return null;
    }
    render() {
        if (this.props.data) {
            return (
                <div className={userstyle.adminUserContainer}>
                    <div className={userstyle.adminUserMain}>
                        <div className={userstyle.adminUserText}
                            onClick={() => { this.setState({ show: (this.state.show === 'close') ? 'profile' : 'close' }) }}>
                            <span>Id:</span> {this.props.data.id}
                        </div>
                        {this.renderCloseBtn()}
                        <div className={userstyle.adminSettingsBtn} onClick={() => { this.setState({ settings: (this.state.settings) ? false : true }) }}>
                            <img src={settingsvg} alt="photo" />
                            <div className={userstyle.settingsContainer}>
                                {this.renderSettnigs()}
                            </div>
                        </div>
                    </div>
                    <div className={style.refundMain}>
                        <div className={userstyle.adminUserProfileInfo}>
                            <div className={userstyle.adminUserProfileText}><span>CreationTime:</span> <p>{this.props.data.creationTime}</p></div>
                            <div className={userstyle.adminUserProfileText}><span>Solved:</span> <p>{(this.props.data.solved) ? 'Yes' : 'No'}</p></div>
                        </div>
                        <div className={style.refundMessage}>
                            <p>{this.props.data.message}</p>
                        </div>
                    </div>
                    {this.renderResolveMain()}
                </div>
            );
        }
        return null;
    }
}

// Check props type
AdminRefundItem.propTypes = {
    resolveRequest: PropTypes.func,
}

const mapStateToProps = state => ({
});

const mapDispatchtoProps = dispatch => ({
    resolveRequest: (id, mess) => { dispatch(resolveRequest(id, mess)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminRefundItem);
