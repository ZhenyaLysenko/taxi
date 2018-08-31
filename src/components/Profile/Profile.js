import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Profile.css';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import ProfileMain from './ProfileMain/ProfileMain';
import Settings from './Settings/Settings';
import Documents from './Documents/Documents';
import Vehicle from './Vehicle/Vehicle';
import Statistic from './Statistic/Statistic';
import ResponseList from './ResponseList/ResponseList';

import { connect } from 'react-redux';

import defaultphoto from '../../assets/default-user.png';

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
    renderPhoto() {
        if (this.props.photoData.url) {
            return <img src={this.props.photoData.url} alt='photo' />;
        }
        if (this.props.photoData.loading) {
            return <Loading />
        }
        if (this.props.photoData.error) {
            return <Alert local={true} message='Photo dont load' click={this.props.getPhoto} />
        }
        return <img src={defaultphoto} className={style.profilePhoto} alt='photo' />;
    }
    render() {
        if (this.props.userData.user) {
            return (
                <div>
                    <Header></Header>
                    <div className={`${style.profileContainer}`}>
                        <div className={`${style.profileToolbar}`}>
                            <div className={style.photoName}>
                                <div className={style.profilePhoto}>
                                    {this.renderPhoto()}
                                </div>
                                <h3 className={style.profileName}>{this.props.userData.user.firstName} {this.props.userData.user.lastName}</h3>
                            </div>
                            {this.renderToolBar()}
                        </div>
                        <div className={`${style.profileMain}`}>
                            {this.renderMain()}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

ProfileMain.propTypes = {
    userData: PropTypes.object,
    photoData: PropTypes.object,
    getPhoto: PropTypes.func
}

const mapStateToProps = state => ({
    userData: state.userData,
    photoData: state.photoData
})

const mapDispatchtoProps = dispatch => ({
    getPhoto: () => { dispatch(getPhoto()) },
})
// Check props type
Profile.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchtoProps)(Profile);
