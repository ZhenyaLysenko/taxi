import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Settings.css';
// import Loading from '../../Loading/Loading';

import { connect } from 'react-redux';

import { uploadPhoto } from '../../../actions/authaction';
import { uploadDocument } from '../../../actions/docaction';

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
        if (this.state.newphoto) {
            this.props.uploadPhoto(this.state.newphoto);
        }
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
    render() {
        if (this.props.userData.user) {
            return (
                <div>
                    <div>
                        <h1>Change Photo</h1>
                        <input type='file' accept='image/*' onChange={(e) => { this.chooseNewPhoto(e) }} />
                        <button onClick={this.uploadNewPhoto.bind(this)}>Apply</button>
                    </div>
                    <div>
                        <h1>Add Documents</h1>
                        <input type='file' accept='image/*' onChange={(e) => { this.chooseDocPhoto(e) }} />
                        <input type='text' placeholder="dayFrom" required onChange={(e) => {this.setState({dayFrom: e.target.value})}}/>
                        <input type='text' placeholder="yearFrom" required onChange={(e) => {this.setState({yearFrom: e.target.value})}}/>
                        <input type='text' placeholder="monthFrom" required onChange={(e) => {this.setState({monthFrom: e.target.value})}}/>
                        <input type='text' placeholder="dayTo" required onChange={(e) => {this.setState({dayTo: e.target.value})}}/>
                        <input type='text' placeholder="yearTo" required onChange={(e) => {this.setState({yearTo: e.target.value})}}/>
                        <input type='text' placeholder="monthTo" required onChange={(e) => {this.setState({monthTo: e.target.value})}}/>
                        <button onClick={this.uploadDoc.bind(this)}>Apply</button>
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
}

const mapStateToProps = state => ({
    userData: state.userData,
    photoData: state.photoData
})

const mapDispatchtoProps = dispatch => ({
    uploadPhoto: (file) => { dispatch(uploadPhoto(file)) },
    uploadDocument: (data, file) => { dispatch(uploadDocument(data, file)) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Settings);
