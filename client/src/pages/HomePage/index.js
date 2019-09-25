import React, { Component, Fragment } from 'react'
import { Table, Button } from 'antd'

const data = [{ name: '杨明', age: '27' }]

class HomePage extends Component {
  columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 150,
      render: () => {
        return (
          <span>
            <Button size="small" type="primary">
              编辑
            </Button>
            &nbsp;&nbsp;
            <Button size="small">删除</Button>
          </span>
        )
      }
    }
  ]

  constructor(props) {
    super(props)
    this.state = {
      content: 'dddd'
    }
  }
  render() {
    const { content } = this.state
    return (
      <Fragment>
        <Table columns={this.columns} dataSource={data} />
      </Fragment>
    )
  }
}

export default HomePage
