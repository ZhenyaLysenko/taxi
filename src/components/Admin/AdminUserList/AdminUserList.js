import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import style from './Admin.css';
import Loading  from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';
import { getUserList } from '../../../actions/adminaction';


class AdminUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 10
        }
    }
    componentDidMount() {
        if (this.props.listData.list.length === 0) {
            this.getList();
        }
    }
    componentDidUpdate() {
    }
    getList() {
        this.props.getUserList(this.state.page, this.state.size);
    }
    renderList(list) {
        return list.map((item) => {
            return <UserListItem item={item}/>
        });
    }
    render() {
        if (this.props.listData.loading) {
            return <Loading />
        }
        if (this.props.listData.error) {
            return <Alert local={true} message={`Data dont load (${this.props.listData.error})`} click={this.getList} />
        }
        if (this.props.listData.list) {
            return (
                <div>
                    <h3>User List</h3>
                    <ol>
                        {this.renderList(this.props.listData.list)}
                    </ol>
                </div>);
        }
        return null;
    }
}

// Check props type
AdminUserList.propTypes = {
    listData: PropTypes.object,
    getUserList: PropTypes.func,
}

const mapStateToProps = state => ({
    listData: state.userlistData,
})

const mapDispatchtoProps = dispatch => ({
    getUserList: (page, size, option) => { dispatch(getUserList(page,size,option)) }
})

const UserListItem = (props) => {
    return (
        <li>
            <p>ID: {props.item.id}</p>
            <p>ROLE: {props.item.roles[0]}</p>
            <p>Name: {props.item.firstName} {props.item.lastName}</p>
            <p>Email: {props.item.email}</p>
            <p>EmailConfirmed: {(props.item.emailConfirmed) ? 'Yes': 'No'}</p>
            <p>Phone: {props.item.phoneNumber}</p>
        </li>
    );
}

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserList);
