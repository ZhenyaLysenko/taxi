import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import style from './Admin.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import AdminUserItem from '../AdminUserItem/AdminUserItem';

import { connect } from 'react-redux';
import { getUserList, changeClearError } from '../../../actions/adminaction';


class AdminUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 10,
            search: ""
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
        this.props.getUserList(null, null);
    }
    renderList(list) {
        return list.map((item, index) => {
            return <li key={index}><AdminUserItem data={item} /></li>
        });
    }
    renderAlert() {
        if (this.props.changeData.loading) {
            return <Loading global={true} />
        }
        if (this.props.changeData.error) {
            return <Alert global={true} error={this.props.changeData.error} click={this.props.changeClearError} />
        }
        if (this.props.changeData.success) {
            return <Alert global={true} success={this.props.changeData.error} click={this.props.changeClearError} />
        }
        return null;
    }

    searchInList() {
        if (this.state.search) {
            this.props.getUserList(null, null, this.state.search)
        } else {
            this.props.getUserList(null, null);
        }
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
                    {this.renderAlert()}
                    <h3>User List</h3>
                    <button onClick={() => {this.state.page++; this.getList(this.state.page, this.state.size)}}>Get More Users</button>
                    <input type="text" value={this.state.search} placeholder="Search" onChange={(e) => {this.setState({search: e.target.value})}}/>
                    <button onClick={this.searchInList.bind(this)}>Seach</button>
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
    changeData: PropTypes.object,
    changeClearError: PropTypes.func
}

const mapStateToProps = state => ({
    listData: state.userlistData,
    changeData: state.adminChangeData
})

const mapDispatchtoProps = dispatch => ({
    getUserList: (page, size, option) => { dispatch(getUserList(page, size, option)) },
    changeClearError: () => { dispatch(changeClearError()) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(AdminUserList);
