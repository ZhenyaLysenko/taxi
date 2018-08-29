import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './LazyLoad.css';
import Loading from '../Loading/Loading';

class LazyLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comp: null,
        }
    }
    componentDidMount() {
        const comp = document.getElementById('lazyload');
        window.onscroll = () => {
            let wY = window.scrollY + window.innerHeight;
            let tC = this.state.comp.getBoundingClientRect().top;
            // console.log(wY - tC, this.props.loading);
            if (wY - tC > 10 && this.props.do && !this.props.loading) {
                // console.log('Lazy');
                this.props.do();
            }
        }
        this.setState({ comp }, () => {
            window.onscroll();
        });

    }
    componentDidUpdate() {
        window.onscroll();
    }
    componentWillUnmount() {
        window.onscroll = () => { };
    }
    render() {
        return <div id="lazyload" className={style.LazyLoad}><Loading /></div>
    }
}

// Check props type
LazyLoad.propTypes = {
    do: PropTypes.func,
    loading: PropTypes.bool,
}

export default LazyLoad;
