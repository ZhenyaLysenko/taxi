import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Settings.css';

import { connect } from 'react-redux';

import { uploadDocument } from '../../../../actions/docaction';

class ChangeDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docphoto: null,
            docphotourl: null,
            dayFrom: "",
            yearFrom: "",
            monthFrom: "",
            dayTo: "",
            yearTo: "",
            monthTo: "",
            fileName: "Choose file",
        }
        this.chooseDocPhoto = this.chooseDocPhoto.bind(this);
    }
    chooseDocPhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ docphotourl: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({ docphoto: file,
                            fileName: file.name, });
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
                    <h1>Add Documents</h1>
                    <input type='file' id="pfotoloader" className={style.pfotoinput} accept='image/*' onChange={(e) => { this.chooseDocPhoto(e) }} />
                    <label for="pfotoloader" ><span><strong>{this.state.fileName}</strong></span></label>
                    <div className={style.docForm}>
                        <h1 className={style.Label}>Lending date</h1>
                        <input type='text' placeholder=" dayFrom" required onChange={(e) => { this.setState({ dayFrom: e.target.value }) }} />
                        <input type='text' placeholder=" yearFrom" required onChange={(e) => { this.setState({ yearFrom: e.target.value }) }} />
                        <input type='text' placeholder=" monthFrom" required onChange={(e) => { this.setState({ monthFrom: e.target.value }) }} />
                        <h1 className={style.Label}>Fit to</h1>
                        <input type='text' placeholder=" dayTo" required onChange={(e) => { this.setState({ dayTo: e.target.value }) }} />
                        <input type='text' placeholder=" yearTo" required onChange={(e) => { this.setState({ yearTo: e.target.value }) }} />
                        <input type='text' placeholder=" monthTo" required onChange={(e) => { this.setState({ monthTo: e.target.value }) }} />
                    </div>
                    <button className={style.Button} onClick={this.uploadDoc.bind(this)}>confirm</button>
                </div>
            );
        }
        return null;
    }
}

// Check props type
ChangeDoc.propTypes = {
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    userData: state.userData
})

const mapDispatchtoProps = dispatch => ({
    uploadDocument: (data, file) => { dispatch(uploadDocument(data, file)) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(ChangeDoc);
