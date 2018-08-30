import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';
import { resolveRequest } from "../../../actions/adminaction";

class AdminRefundItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'close',
            message: ""
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }
    submit() {
        this.props.resolveRequest(this.props.data.id, this.state.message);
    }
    renderResolveMain() {
        if (this.state.show === 'resolve') {
            return (
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <h3>Resolve it</h3>
                    <input type="text" onChange={(e) => { this.setState({ message: e.target.value }) }} />
                    <input type="submit" value="Submit" onClick={this.submit.bind(this)} />
                </form>
            );
        }
        return null;
    }
    renderResolveBtn() {
        if (this.state.show === 'resolve') {
            return <button onClick={() => { this.setState({ show: 'close' }) }}>Close</button>
        }
        if (this.state.show === 'close') {
            return <button onClick={() => { this.setState({ show: 'resolve' }) }}>Resolve it</button>
        }
        return null;
    }
    render() {
        if (this.props.data) {
            return (
                <div>
                    <p>Id: {this.props.data.id}</p>
                    <p>Identity Id: {this.props.data.identityId}</p>
                    <p>CustomerId: {this.props.data.customerId}</p>
                    <p>TripHistoryId : {this.props.data.tripHistoryId}</p>
                    <p>CreationTime: {this.props.data.creationTime}</p>
                    <p>Message: {this.props.data.message}</p>
                    <p>Solved: {(this.props.data.solved) ? 'Yes' : 'No'}</p>
                    {this.renderResolveBtn()}
                    {this.renderResolveMain()}
                </div>
            );
        }
        return null;
    }
}

// Check props type
AdminRefundItem.propTypes = {
    resolveRequest: PropTypes.func
}

const mapStateToProps = state => ({

});

const mapDispatchtoProps = dispatch => ({
    resolveRequest: (id, message) => { dispatch(resolveRequest(id, message)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(AdminRefundItem);
