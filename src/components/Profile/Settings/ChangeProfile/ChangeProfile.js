import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Settings.css';
// import Loading from '../../Loading/Loading';
import Alert from '../../../Alert/Alert';

import { connect } from 'react-redux';
import { uploadPhoto } from '../../../../actions/authaction';
import { changeProfile } from '../../../../actions/chengeaction';

class ChangeProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            city: "",
            currentPassword: "",
            newPassword: "",
            newphotourl: null,
            newphoto: null,
            newphotoname: null,
        }
    }
    chooseNewPhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ newphotourl: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({ newphoto: file });
        }
    }
    uploadNewPhoto() {
        this.props.uploadPhoto(this.state.newphoto);
    }
    updateFirstName() {
        this.props.changeProfile({
            firstName: this.state.firstName,
        });

    }
    updateLastName() {
        this.props.changeProfile({
            lastName: this.state. lastName,
        })

    }
    updatePhoneNumber() {
        this.props.changeProfile({
            phoneNumber: this.state.phoneNumber,
        })

    }
    updateCity() {
        this.props.changeProfile({
            city: this.state.city,
        })

    }
    updatePassword() {
        if (this.state.currentPassword === this.state.newPassword) {
            this.props.changeProfile({
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
                        <h1>Change Photo</h1>
                        <input type='file' accept='image/*' onChange={(e) => { this.chooseNewPhoto(e) }} />
                        <button onClick={this.uploadNewPhoto.bind(this)}>Apply</button>
                    </div>
                    <div>
                        <h1>Change First Name</h1>
                        <input type='text' placeholder="new name" required onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                        <button onClick={this.updateFirstName.bind(this)}>Apply</button>
                    </div>
                    <div>
                        <h1>Change Last Name</h1>
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

ChangeProfile.propTypes = {
    userData: PropTypes.object,
    chengeName: PropTypes.func,
    uploadPhoto: PropTypes.func,
}
const mapStateToProps = state => ({
    userData: state.userData,
    changedData: state.chengeddata
})
const mapDispatchtoProps = dispatch => ({
    changeProfile: (data) => { dispatch(changeProfile(data)) },
    uploadPhoto: (file) => { dispatch(uploadPhoto(file)) },
})
export default connect(mapStateToProps, mapDispatchtoProps)(ChangeProfile);