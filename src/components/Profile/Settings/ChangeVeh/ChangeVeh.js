import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Settings.css';

import { connect } from 'react-redux';

import { uploadVehicle } from '../../../../actions/vehiclesaction';


class ChangeVeh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehphoto: null,
            vehphotourl: null,
            number: "",
            model: "",
            brand: "",
            color: "",
            fileName: "Choose file",
        }
        this.chooseVehPhoto = this.chooseVehPhoto.bind(this);
    }
    chooseVehPhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ vehphotourl: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({ vehphoto: file,
                            fileName: file.name, });
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
    render() {
        if (this.props.userData.user) {
            return (
                <div className={style.vehForm}>
                    <div className={style.changePhoto}>
                        <h1>Add Vehicle</h1>
                        <input type='file' id="pfotoloader" className={style.pfotoinput} accept='image/*' onChange={(e) => { this.chooseVehPhoto(e) }} />
                        <label htmlFor="pfotoloader"><span><strong>{this.state.fileName}</strong></span></label>
                    </div>
                        <input className={style.signInInput} type='text' placeholder="Number" required onChange={(e) => { this.setState({ number: e.target.value }) }} />
                        <input className={style.signInInput} type='text' placeholder="Model" required onChange={(e) => { this.setState({ model: e.target.value }) }} />
                        <input className={style.signInInput} type='text' placeholder="Brand" required onChange={(e) => { this.setState({ brand: e.target.value }) }} />
                        <input className={style.signInInput} type='text' placeholder="Color" required onChange={(e) => { this.setState({ color: e.target.value }) }} />
                    <button className={style.signInInputSubmit} onClick={this.uploadVeh.bind(this)}>S U B M I T</button>
                </div>
            );
        }
        return null;
    }
}

// Check props type
ChangeVeh.propTypes = {
    uploadVehicle: PropTypes.func,
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    userData: state.userData
});

const mapDispatchtoProps = dispatch => ({
    uploadVehicle: (data, file) => { dispatch(uploadVehicle(data, file)) },
});

export default connect(mapStateToProps, mapDispatchtoProps)(ChangeVeh);
