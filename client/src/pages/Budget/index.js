import React, { Component } from 'react'
import { Button, Card } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import Table from '@/components/Table'

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
class DecorateBudget extends Component {
  columns = [
    { title: 'ID', dataIndex: 'id', sorter: true },
    { title: '用户名', dataIndex: 'username' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '手机号', dataIndex: 'mobile' },
    {
      title: '创建时间',
      dataIndex: 'created_at',

      type: 'datetime'
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',

      type: 'datetime'
    },
    { title: '性别', dataIndex: 'sex' },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      render: () => {
        return (
          <span>
            <Button type="link">编辑</Button>
            <Button type="link">删除</Button>
          </span>
        )
      }
    }
  ]
  componentDidMount() {
    const { getUserList } = this.props
    getUserList({ reducer: 'fetchUserList' })
  }

  search = param => {
    const { getUserList } = this.props
    getUserList({ reducer: 'fetchUserList', ...param })
  }

  render() {
    const { userList = [], loading } = this.props
    console.log(userList, 'userList')
    return (
      <Card bordered={false} extra={<Link to={`/budget_add`}>添加预算</Link>}>
        <Table
          bordered
          columns={this.columns}
          dataSource={userList}
          loading={loading}
        />
      </Card>
    )
  }
}

export default DecorateBudget
