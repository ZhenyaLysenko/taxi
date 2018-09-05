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
            lock: "",
            fileName: "Choose file"

        }
    }
    formVisibility(){
        console.log('ok');

    }
    chooseNewPhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ newphotourl: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({ newphoto: file,
                            fileName: file.name,
            });
        }
    }
    uploadNewPhoto() {
        this.props.uploadPhoto(this.state.newphoto);
    }
    confirmChange() {
        if (this.state.firstName) {
            this.props.changeProfile({
                firstName: this.state.firstName,
            });

        }
        if (this.state.lastName) {
            this.props.changeProfile({
                lastName: this.state.lastName,
            });

        }
        if (this.state.phoneNumber) {
            this.props.changeProfile({
                phoneNumber: this.state.phoneNumber,
            });

        }
        if (this.state.city) {
            this.props.changeProfile({
                city: this.state.city,
            });

        }
        if (this.state.currentPassword && this.state.newPassword) {
            if (this.state.currentPassword === this.state.newPassword) {
                this.props.changeProfile({
                    currentPassword: this.state.currentPassword,
                    newPassword: this.state.newPassword,
                })
            }

        }

    }
    render(){
        if (this.props.userData.user){
            return (
                <div>
                    <div onClick={this.formVisibility.bind(this)}>
                    </div>
                    {this.formVisibility()}
                    <div className={style.showForm}  hidden = {false} >
                        <div className={style.changePhoto}>
                            <h1>Photo</h1>
                            <div>
                                <input type='file' id="pfotoloader" className={style.pfotoinput} accept='image/*' onChange={(e) => { this.chooseNewPhoto(e)}} />
                                <label htmlFor="pfotoloader" ><span><strong>{this.state.fileName}</strong></span></label>
                                <button className={style.button} onClick={this.uploadNewPhoto.bind(this)}>Submit</button>
                            </div>
                        </div>
                        <h1>Name</h1>
                        <div className={style.changePhoto}>
                            <div className={style.marginRight}>
                                <input className={style.signInInput} type='text' placeholder="First Name" required onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                            </div>
                            <div>
                                <input className={style.signInInput} type='text' placeholder="Last Name" required onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                            </div>
                        </div>
                        <h1>Phone Number</h1>
                        <div className={style.changePhoto}>
                            <input className={style.signInInput} type='text' placeholder="Enter new phone" required onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} />
                        </div>
                        <h1 className={style.Label}>City</h1>
                        <div className={style.changePhoto}>
                            <input className={style.signInInput} type='text' placeholder="Enter new city" required onChange={(e) => { this.setState({ city: e.target.value }) }} />
                        </div>
                        <h1 className={style.Label}>Password</h1>
                        <div className={style.changePhoto}>
                            <div className={style.marginRight}>
                                <input className={style.signInInput} type='text' placeholder="Current password" required onChange={(e) => { this.setState({ currentPassword: e.target.value }) }} />
                            </div>
                            <div>
                                <input className={style.signInInput} type='text' placeholder="New password" required onChange={(e) => { this.setState({ newPassword: e.target.value }) }} />
                            </div>
                        </div>
                        <button className={style.signInInputSubmit} onClick={this.confirmChange.bind(this)}>S U B M I T</button>
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
    confirmChange: PropTypes.func,
    uploadPhoto: PropTypes.func,
    formVisibility: PropTypes.func,
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
