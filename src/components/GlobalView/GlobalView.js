import React, { Component } from 'react';
import PropTypes from "prop-types";
import style from './GlobalView.css';

import closesvg from '../../assets/close.svg';

import GoogleMapReact from 'google-map-react';
import { googleapikey } from '../../appconfig';
import drivelabel from './drivelabel.svg';


import { connect } from 'react-redux';

import { close } from '../../actions/globalviewaction';

class GlobalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 13
        }
    }
    renderLabels(labels) {
        return labels.map((label, key) => {
            return (
                <Label key={key} lat={label.lat}
                    lng={label.lng}
                    text={label.text} />
            );
        })
    }
    renderGoogleMap() {
        return (
            <div className={style.globalContentMap}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleapikey }}
                    defaultCenter={this.props.global.data.center}
                    defaultZoom={this.state.zoom}>
                    {this.renderLabels(this.props.global.data.labels)}
                </GoogleMapReact>
            </div>
        );
    }
    renderGlobal() {
        if (this.props.global.show === 'map') {
            return this.renderGoogleMap();
        }
        if (this.props.global.show === 'image') {
            return (
                <img src={this.props.global.data.url} alt='image' />
            );
        }
        return null;
    }
    render() {
        if (this.props.global.show) {
            return (
                <div className={style.globalContainer}>
                    <div className={style.globalContent}>
                        <div className={style.globalClose} onClick={this.props.close}>
                            <img src={closesvg} alt='close' />
                        </div>
                        {this.renderGlobal()}
                    </div>
                </div>
            );
        }
        return null;
    }
}

class Label extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div key={this.props.key} className={style.labelContainer}>
                <div className={style.labelText}>
                    {this.props.text}
                </div>
                <img src={drivelabel} alt='label' />
            </div>
        );
    }
}


GlobalView.propTypes = {
    global: PropTypes.object,
    close: PropTypes.func
}

const mapStateToProps = state => ({
    global: state.globalviewData
})

const mapDispatchtoProps = dispatch => ({
    close: () => { dispatch(close()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(GlobalView);
