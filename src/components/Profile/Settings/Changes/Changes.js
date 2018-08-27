import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Settings.css';
// import Loading from '../../Loading/Loading';
import Alert from '../../../Alert/Alert';

import { connect } from 'react-redux';
import { chengeName, clearSuccess } from '../../../../actions/chengeaction';

class Changes extends Component{
    constructor(props){
        super(props);
        this.props = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            city: "",
            currentPassword: "",
            newPassword: "",
        }
    }
    updateFirstName() {
        this.props.chengeName({
            firstName: this.state.firstName,
        })

    }
    updateLastName() {
        this.props.chengeName({
            lastName: this.state. lastName,
        })

    }
    updatePhoneNumber() {
        this.props.chengeName({
            phoneNumber: this.state.phoneNumber,
        })

    }
    updateCity() {
        this.props.chengeName({
            city: this.state.city,
        })

    }
    updatePassword() {
        if (currentPassword == newPassword) {
            this.props.chengeName({
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword,
            })
        }

    }
    render(){
        if (this.props.userData.user){
            return (
                <div>
                    <div>
                        <h1>Change First Name</h1>
                        <input type='text' placeholder="new name" required onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                        <button onClick={this.updateFirstName.bind(this)}>Apply</button>
                    </div>
                    <div>
                        <h1>Change  Last Name</h1>
                        <input type='text' placeholder="new name" required onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                        <button onClick={this.updateLastName.bind(this)}>Apply</button>
                    </div>
                    <div>
                        <h1>Change Phone Number</h1>
                        <input type='text' placeholder="new name" required onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} />
                        <button onClick={this.updatePhoneNumber.bind(this)}>Apply</button>
                    </div>
                    <div>
                        <h1>Change City</h1>
                        <input type='text' placeholder="new name" required onChange={(e) => { this.setState({ city: e.target.value }) }} />
                        <button onClick={this.updateCity.bind(this)}>Apply</button>
                    </div>
                    <div>
                        <h1>Change Passwaord</h1>
                        <input type='text' placeholder="current Password" required onChange={(e) => { this.setState({ currentPassword: e.target.value }) }} />
                        <input type='text' placeholder="new Password" required onChange={(e) => { this.setState({ newPassword: e.target.value }) }} />
                        <button onClick={this.updatePassword.bind(this)}>Apply</button>
                    </div>
                </div>
            );
        }
        return null;
    }

}
Changes.propTypes = {
    userData: PropTypes.object,
    chengeName: PropTypes.func,
}
const mapStateToProps = state => ({
    userData: state.userData,
    changedData: state.chengeddata
})
const mapDispatchtoProps = dispatch => ({
    chengeName: (data) => { dispatch(chengeName(data)) },
})
export default connect(mapStateToProps, mapDispatchtoProps)(Changes);