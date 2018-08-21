import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Documents.css';
import Loading from '../../Loading/Loading';


import { connect } from 'react-redux';

import { getDocument } from '../../../actions/docaction';

class Documents extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.docData.doc) {
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
            return "Error";
        }
        return null;
    }
    render() {
        if (this.props.docData.loaddoc) {
            return <Loading />
        }
        if (this.props.docData.doc) {
            return (
                <div>
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
                <div>
                    <h1>Documents</h1>
                    Error
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
}

const mapStateToProps = state => ({
    docData: state.docData,
})

const mapDispatchtoProps = dispatch => ({
    getDoc: () => { dispatch(getDocument()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Documents);
