import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Profile.css';
import Header from '../Header/Header';
// import Loading from '../Loading/Loading';
import ProfileMain from './ProfileMain/ProfileMain';
import Settings from './Settings/Settings';
import Documents from './Documents/Documents';
import Vehicle from './Vehicle/Vehicle';
import Statistic from './Statistic/Statistic';
import ResponseList from './ResponseList/ResponseList';

import { connect } from 'react-redux';

// import { uploadPhoto, logout } from '../../actions/authaction';

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
        if (!this.props.userData.user && !this.props.userData.loading) {
            this.props.history.replace('/sign-in');
        }
        // window.addEventListener('scroll', this.scrollToolBar);
    }
    componentDidUpdate() {
        if (!this.props.userData.user && !this.props.userData.loading) {
            this.props.history.replace('/sign-in');
        }
    }
    componentWillUnmount() {
        // window.removeEventListener('scroll', this.scrollToolBar);
    }
    scrollToolBar() {
        // console.log('Scroll');
        const toolbar = document.getElementById("toolbar");
        if (toolbar) {
            const Y = toolbar.offsetTop;
            const WY = window.pageYOffset;
            console.log(WY , Y);
            if (WY > Y) {
                console.log(true);
                if (!toolbar.classList.contains(`${style.Toolbarfixed}`)) {
                    toolbar.classList.add(`${style.Toolbarfixed}`);
                    console.log('Fixed');
                } 
            }
            
            /* if (WY < Y) {
                console.log(false);
                if (toolbar.classList.contains(`${style.Toolbarfixed}`)) {
                    toolbar.classList.remove(`${style.Toolbarfixed}`);
                    console.log('Remove');
                }
            } */
        }
    }
    renderMain() {
        switch (this.state.show) {
            case 'main': return <ProfileMain />;
            case 'documents': return <Documents />;
            case 'vehicle': return <Vehicle />;
            case 'statistic': return <Statistic />;
            case 'settings': return <Settings />;
            case 'response': return <ResponseList />;
            default: return null;
        }
    }
    renderToolBar() {
        if (this.props.userData.user.role === 'admin') {
            return (
                <div className={`${style.profileToolbarMain} ${style.Toolbarfixed}`}>
                    <Link to='/admin'><div className={`${style.profileToolItem}`}>Admin Panel</div></Link>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'main' }) }}>Main</div>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'response' }) }}>Your responses</div>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'settings' }) }}>Settings</div>
                </div>
            );
        }
        if (this.props.userData.user.role === 'customer') {
            return (
                <div className={`${style.profileToolbarMain} ${style.Toolbarfixed}`}>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'main' }) }}>Main</div>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'statistic' }) }}>Statistic</div>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'response' }) }}>Your responses</div>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'settings' }) }}>Settings</div>
                </div>
            );
        }
        if (this.props.userData.user.role === 'driver') {
            return (
                <div className={`${style.profileToolbarMain} ${style.Toolbarfixed}`}>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'main' }) }}>Main</div>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'documents' }) }}>Documents</div>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'vehicle' }) }}>Vehicle</div>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'statistic' }) }}>Statistic</div>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'response' }) }}>Your responses</div>
                    <div className={`${style.profileToolItem}`} onClick={() => { this.setState({ show: 'settings' }) }}>Settings</div>
                </div>
            );
        }
        return null;
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
                            {this.renderToolBar()}
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
