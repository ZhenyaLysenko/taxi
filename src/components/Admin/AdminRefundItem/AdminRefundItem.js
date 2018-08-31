import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert'; */

import userstyle from '../AdminUserItem/AdminUserItem.css'

import { connect } from 'react-redux';
import { resolveRequest } from "../../../actions/adminaction";

class AdminRefundItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'close',
            message: ""
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }
    submit() {
        this.props.resolveRequest(this.props.data.id, this.state.message);
    }
    renderResolveMain() {
        if (this.state.show === 'resolve') {
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
        return null;
    }
    renderResolveBtn() {
        if (this.state.show === 'resolve') {
            return <button className={userstyle.adminUserLicenseAprrove}
                    onClick={() => { this.setState({ show: 'close' }) }}>Close</button>
        }
        if (this.state.show === 'close') {
            return <button className={userstyle.adminUserLicenseAprrove}
                    onClick={() => { this.setState({ show: 'resolve' }) }}>Resolve it</button>
        }
        return null;
    }
    render() {
        if (this.props.data) {
            return (
                <div className={userstyle.adminUserContainer}>
                    <div className={userstyle.adminUserProfile}>
                        <div className={userstyle.adminUserProfileInfo}>
                            <div className={userstyle.adminUserProfileText}><span>Id:</span> {this.props.data.id}</div>
                            <div className={userstyle.adminUserProfileText}><span>Identity Id:</span> {this.props.data.identityId}</div>
                            <div className={userstyle.adminUserProfileText}><span>CustomerId:</span> {this.props.data.customerId}</div>
                            <div className={userstyle.adminUserProfileText}><span>TripHistoryId:</span> {this.props.data.tripHistoryId}</div>
                            <div className={userstyle.adminUserProfileText}><span>CreationTime:</span> {this.props.data.creationTime}</div>
                            <div className={userstyle.adminUserProfileText}><span>Message:</span> {this.props.data.message}</div>
                            <div className={userstyle.adminUserProfileText}><span>Solved:</span> {(this.props.data.solved) ? 'Yes' : 'No'}
                                {this.renderResolveBtn()}
                            </div>
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
    resolveRequest: PropTypes.func
}

const mapStateToProps = state => ({

});

const mapDispatchtoProps = dispatch => ({
    resolveRequest: (id, message) => { dispatch(resolveRequest(id, message)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminRefundItem);
