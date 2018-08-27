import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Settings.css';
// import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import Changes from './Changes/Changes';

import { connect } from 'react-redux';

import { uploadPhoto, clearErrors } from '../../../actions/authaction';
import { uploadDocument } from '../../../actions/docaction';
import { chengeName, clearSuccess } from '../../../actions/chengeaction';
import { uploadVehicle } from '../../../actions/vehiclesaction';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newphoto: null,
            newphotourl: null,
            docphoto: null,
            docphotourl: null,
            dayFrom: "",
            yearFrom: "",
            monthFrom: "",
            dayTo: "",
            yearTo: "",
            monthTo: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            city: "",
            currentPassword: "",
            newPassword: "",
            vehphoto: null,
            vehphotourl: null,
            number: "",
            model: "",
            brand: "",
            color: "",
        }
        this.chooseNewPhoto = this.chooseNewPhoto.bind(this);
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
    chooseDocPhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ docphotourl: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({ docphoto: file });
        }
    }
    uploadDoc() {
        this.props.uploadDocument({
            dayFrom: this.state.dayFrom,
            yearFrom: this.state.yearFrom,
            monthFrom: this.state.monthFrom,
            dayTo: this.state.dayTo,
            yearTo: this.state.yearTo,
            monthTo: this.state.monthTo,
        }, this.state.docphoto);
    }
    chooseVehPhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ vehphotourl: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({ vehphoto: file });
        }
    }
    uploadVeh() {
        this.props.uploadVehicle({
            number: this.state.number,
            model: this.state.model,
            brand: this.state.brand,
            color: this.state.color,
        }, this.state.vehphoto)
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
                    <div>
                        <h1>Change Photo</h1>
                        <input type='file' accept='image/*' onChange={(e) => { this.chooseNewPhoto(e) }} />
                        <button onClick={this.uploadNewPhoto.bind(this)}>Apply</button>
                    </div>
                    <Changes />
                    <div>
                        <h1>Add Documents</h1>
                        <input type='file' accept='image/*' onChange={(e) => { this.chooseDocPhoto(e) }} />
                        <input type='text' placeholder="dayFrom" required onChange={(e) => { this.setState({ dayFrom: e.target.value }) }} />
                        <input type='text' placeholder="yearFrom" required onChange={(e) => { this.setState({ yearFrom: e.target.value }) }} />
                        <input type='text' placeholder="monthFrom" required onChange={(e) => { this.setState({ monthFrom: e.target.value }) }} />
                        <input type='text' placeholder="dayTo" required onChange={(e) => { this.setState({ dayTo: e.target.value }) }} />
                        <input type='text' placeholder="yearTo" required onChange={(e) => { this.setState({ yearTo: e.target.value }) }} />
                        <input type='text' placeholder="monthTo" required onChange={(e) => { this.setState({ monthTo: e.target.value }) }} />
                        <button onClick={this.uploadDoc.bind(this)}>Apply</button>
                    </div>
                    <div>
                        <h1>Add Vehicle</h1>
                        <input type='file' accept='image/*' onChange={(e) => { this.chooseVehPhoto(e) }} />
                        <input type='text' placeholder="Number" required onChange={(e) => { this.setState({ number: e.target.value }) }} />
                        <input type='text' placeholder="Model" required onChange={(e) => { this.setState({ model: e.target.value }) }} />
                        <input type='text' placeholder="Brand" required onChange={(e) => { this.setState({ brand: e.target.value }) }} />
                        <input type='text' placeholder="Color" required onChange={(e) => { this.setState({ color: e.target.value }) }} />
                        <button onClick={this.uploadVeh.bind(this)}>Apply</button>
                    </div>
                </div>
            );
        }
        return null;
    }
}

// Check props type
Settings.propTypes = {
    userData: PropTypes.object,
    photoData: PropTypes.object,
    uploadPhoto: PropTypes.func,
    uploadDocument: PropTypes.func,
    changedData: PropTypes.object,
    clearErrors: PropTypes.func,
    clearSuccess: PropTypes.func,
}

const mapStateToProps = state => ({
    userData: state.userData,
    photoData: state.photoData,
    changedData: state.chengeddata
})

const mapDispatchtoProps = dispatch => ({
    uploadPhoto: (file) => { dispatch(uploadPhoto(file)) },
    uploadDocument: (data, file) => { dispatch(uploadDocument(data, file)) },
    uploadVehicle: (data, file) => { dispatch(uploadVehicle(data, file)) },
    clearErrors: () => { dispatch(clearErrors()) },
    clearSuccess: () => { dispatch(clearSuccess()) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(Settings);
