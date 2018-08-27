import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Settings.css';
// import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import ChangeProfile from './ChangeProfile/ChangeProfile';
import ChangeDoc from './ChangeDoc/ChangeDoc';
import ChangeVeh from './ChangeVeh/ChangeVeh';

import { connect } from 'react-redux';

import { clearErrors } from '../../../actions/authaction';
import { clearSuccess } from '../../../actions/chengeaction';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    renderUpdateInfo() {
        if (this.props.changedData.success) {
            return (
                <Alert global={true} success={this.props.changedData.success} click={this.props.clearSuccess} />
            );
        }
        if (this.props.changedData.error) {
            return (
                <Alert global={true} error={this.props.changedData.error} click={this.props.clearErrors}/>
            );
        }
        return null;
    }
    render() {
        if (this.props.userData.user) {
            return (
                <div>
                    {this.renderUpdateInfo()}
                    <ChangeProfile />
                    <ChangeDoc />
                    <ChangeVeh />
                </div>
            );
        }
        return null;
    }
}

// Check props type
Settings.propTypes = {
    userData: PropTypes.object,
    changedData: PropTypes.object,
    clearErrors: PropTypes.func,
    clearSuccess: PropTypes.func,
}

const mapStateToProps = state => ({
    userData: state.userData,
    changedData: state.chengeddata
})

const mapDispatchtoProps = dispatch => ({
    clearErrors: () => { dispatch(clearErrors()) },
    clearSuccess: () => { dispatch(clearSuccess()) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(Settings);
