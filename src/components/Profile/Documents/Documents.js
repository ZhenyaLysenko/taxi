import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Documents.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import defaultphoto from '../../../assets/default-license.png';

import { connect } from 'react-redux';

import { getDocument, getDocPhoto } from '../../../actions/docaction';
import { clearErrors } from '../../../actions/authaction';

class Documents extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.docData.doc) {
            console.log(this.props.docData.doc);
            this.props.getDoc();
        }
    }
    renderPhoto() {
        if (this.props.docData.url) {
            return <img src={this.props.docData.url} alt='photo' />;
        }
        if (this.props.docData.loadphoto) {
            return <Loading />
        }
        if (this.props.docData.errorphoto) {
            return <Alert local={true} message='Photo dont load' click={this.props.getDocPhoto} />
        }
        return <img src={defaultphoto} alt='photo' />;
    }
    render() {
        if (this.props.docData.loaddoc) {
            return <Loading />
        }
        if (this.props.docData.doc) {
            return (
                <div className="container">
                    <h1>Documents</h1>
                    <div className={style.docPhoto}>
                        {this.renderPhoto()}
                    </div>
                    <p>Licensed from: {this.props.docData.doc.licensedFrom}</p>
                    <p>Licensed to: {this.props.docData.doc.licensedTo}</p>
                </div>
            );
        }
        if (this.props.docData.errordoc) {
            return (
                <div className="container">
                    {/* <Alert global={true} error={this.props.docData.errordoc} click={this.props.clearErrors} /> */}
                    <Alert local={true} message='Data dont load' click={this.props.getDoc} />
                </div>
            );
        }
        return null;
    }
}

// Check props type
Documents.propTypes = {
    docData: PropTypes.object,
    getDoc: PropTypes.func,
    clearErrors: PropTypes.func,
    getDocPhoto: PropTypes.func,
}

const mapStateToProps = state => ({
    docData: state.docData,
})

const mapDispatchtoProps = dispatch => ({
    getDoc: () => { dispatch(getDocument()) },
    clearErrors: () => { dispatch(clearErrors()) },
    getDocPhoto: () => { dispatch(getDocPhoto()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Documents);
