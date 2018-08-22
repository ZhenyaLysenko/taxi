import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Profile.css';
import Header from '../Header/Header';
// import Loading from '../Loading/Loading';
import ProfileMain from './ProfileMain/ProfileMain';
import Settings from './Settings/Settings';
import Documents from './Documents/Documents';

import { connect } from 'react-redux';

import { uploadPhoto, logout } from '../../actions/authaction';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newphoto: null,
            newphotourl: null,
            show: 'main',
        }
        // this.chooseNewPhoto = this.chooseNewPhoto.bind(this);
    }
    componentDidMount() {
        if (!this.props.userData.user) {
            this.props.history.replace('/sign-in');
        }
    }
    componentDidUpdate() {
        if (!this.props.userData.user) {
            this.props.history.replace('/sign-in');
        }
    }
    renderMain() {
        switch (this.state.show) {
            case 'main': return <ProfileMain />;
            case 'documents': return <Documents />;
            case 'vehicle': return <b>Vehicle</b>;F
            case 'statistic': return <b>Statistic</b>;
            case 'settings': return <Settings />;
            default: return null;
        }
    }
    render() {
        if (this.props.userData.user) {
            return (
                <div>
                    <Header></Header>
                    <div className={`${style.profileContainer}`}>
                        <div className={`${style.profileMain}`}>
                            {this.renderMain()}
                        </div>
                        <div className={`${style.profileToolbar}`}>
                            <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'main' }) }}>Main</div>
                            <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'documents' }) }}>Documents</div>
                            <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'vehicle' }) }}>Vehicle</div>
                            <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'statistic' }) }}>Statistic</div>
                            <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'settings' }) }}>Settings</div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

// Check props type
Profile.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
    // uploadPhoto: PropTypes.func,
    // logout: PropTypes.func,
    // photoData: PropTypes.object,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
    // photoData: state.photoData
})

const mapDispatchtoProps = dispatch => ({
    // uploadPhoto: (file) => { dispatch(uploadPhoto(file)) },
    // logout: () => { dispatch(logout()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Profile);
