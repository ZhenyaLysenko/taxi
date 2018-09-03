import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';

import { getEthBalance, getTaxiBalance, depositToTaxiBalance, clearChange } from '../../../actions/ethaction';

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deposit: 0
        }
    }
    componentDidMount() {
        if (!this.props.balance.ethbalance) {
            this.props.getEthBalance();
        }
        if (!this.props.balance.taxibalance) {
            this.props.getTaxiBalance();
        }
    }
    renderEthbalance() {
        if (this.props.balance.ethbalload) {
            return <Loading />
        }
        if (this.props.balance.ethbalerror) {
            return <Alert local={true} message={this.props.balance.ethbalerror} click={this.props.getEthBalance} />
        }
        if (this.props.balance.ethbalance) {
            return <div>{this.props.balance.ethbalance}</div>
        }
        return 0;
    }
    renderTaxiBalance() {
        if (this.props.balance.taxibalload) {
            return <Loading />
        }
        if (this.props.balance.taxibalerror) {
            return <Alert local={true} message={this.props.balance.taxibalerror} click={this.props.getTaxiBalance} />
        }
        if (this.props.balance.taxibalance) {
            return <div>{this.props.balance.taxibalance}</div>
        }
        return 0;
    }
    renderUpdateInfo() {
        if (this.props.balance.changebalload) {
            return <Loading global={true}/>
        }
        if (this.props.balance.changebalsuccess) {
            return (
                <Alert global={true} success={this.props.balance.changebalsuccess} click={this.props.clearChange} />
            );
        }
        if (this.props.balance.changebalerror) {
            return (
                <Alert global={true} error={this.props.balance.changebalerror} click={this.props.clearChange} />
            );
        }
        return null;
    }
    render() {
        if (this.props.balance) {
            return (
                <div>
                    {this.renderUpdateInfo()}
                    <div>
                        <span>Your Ethereum Balance:</span> {this.renderEthbalance()}
                    </div>
                    <div>
                        <span>Your TaxiCoin Balance</span> {this.renderTaxiBalance()}
                    </div>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <h3>Deposit to TaxiCoin</h3>
                        <input type="number" placeholder="Your deposit" onChange={(e) => {this.setState({deposit: e.target.value})}}/>
                        <input type="submit" value="Submit" onClick={() => {this.props.deposit(this.state.deposit)}}/>
                    </form>
                </div>
            );
        }
        return null;
    }
}

// Check props type
Balance.propTypes = {
    balance: PropTypes.object,
    getEthBalance: PropTypes.func,
    getTaxiBalance: PropTypes.func,
    deposit: PropTypes.func,
    clearChange: PropTypes.func,
}

const mapStateToProps = state => ({
    balance: state.balanceData,
})

const mapDispatchtoProps = dispatch => ({
    getEthBalance: () => { dispatch(getEthBalance()) },
    getTaxiBalance: () => { dispatch(getTaxiBalance()) },
    deposit: (value) => { dispatch(depositToTaxiBalance(value)) },
    clearChange: () => { dispatch(clearChange()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(Balance);
