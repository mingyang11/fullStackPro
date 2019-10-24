import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { connect } from 'dva'
import Table from '../../components/Table'

const namespace = 'user_model'

const mapStateToProps = state => {
  const loading = state.loading.effects['user_model/getUserList']
  const { userList } = state[namespace]
  return { userList, loading }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserList: (param, callback) => {
      dispatch({
        type: `${namespace}/getUserList`,
        payload: param,
        callback
      })
    }
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class UserList extends Component {
  columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '用户名', dataIndex: 'username' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '手机号', dataIndex: 'mobile' },
    { title: '创建时间', dataIndex: 'created_at' },
    { title: '更新时间', dataIndex: 'updated_at' },
    { title: '性别', dataIndex: 'sex' },
    {
      title: '操作',
      dataIndex: 'operate',
      render: () => {
        return <Button>删除</Button>
      }
    }
  ]
  componentDidMount() {
    const { getUserList } = this.props
    getUserList({ reducer: 'fetchUserList' })
  }
  render() {
    const { userList = [], loading } = this.props
    return (
      <Card bordered={false}>
        <Table columns={this.columns} dataSource={userList} loading={loading} />
      </Card>
    )
  }
}

export default UserList
