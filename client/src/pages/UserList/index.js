import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { connect } from 'dva'
import Table from '@/components/Table'
import ListPage from '@/components/ListPage'

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
    { title: 'ID', dataIndex: 'id', sorter: true, search: true },
    { title: '用户名', dataIndex: 'username', search: true },
    { title: '邮箱', dataIndex: 'email', search: true },
    { title: '手机号', dataIndex: 'mobile', search: true },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      search: true,
      type: 'datetime'
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      search: true,
      type: 'datetime'
    },
    { title: '性别', dataIndex: 'sex', search: true },
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
    const { userList = [], loading, getUserList } = this.props
    return (
      <Card bordered={false}>
        <ListPage
          searchParams={{}}
          columns={this.columns}
          data={userList}
          loading={loading}
          search={() => getUserList({ reducer: 'fetchUserList' })}
        />
      </Card>
    )
  }
}

export default UserList
