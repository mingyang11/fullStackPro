import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';

const namespace = 'user_model';
const workData = { '0': '在职', '1': '离职', '2': '换工作' };

const mapStateToProps = (state) => {
  const loading = state.loading.effects['user_model/getUserList'];
  const { userList } = state[namespace];
  return { userList, loading };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (param, callback) => {
      dispatch({
        type: `${namespace}/getUserList`,
        payload: param,
        callback,
      });
    },
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class UserList extends Component {
  columns = [
    {
      title: 'ID',
      dataIndex: 'user_id',
      width: 100,
      fixed: 'left',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      width: 100,
      fixed: 'left',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      width: 200,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      type: 'datetime',
      width: 200,
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      type: 'datetime',
      width: 200,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 100,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 100,
    },
    {
      title: '工作状态',
      dataIndex: 'work_status',
      width: 100,
      render: (value) => {
        return workData[value];
      },
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'left',
      width: 200,
      fixed: 'right',
      render: () => {
        return (
          <span>
            <Button type="link">编辑</Button>
            <Button type="link">删除</Button>
          </span>
        );
      },
    },
  ];
  componentDidMount() {
    const { getUserList } = this.props;
    getUserList({ reducer: 'fetchUserList' });
  }

  selectChange = (idList, dataList) => {
    console.log(idList, dataList);
  };

  render() {
    const { userList = [], loading } = this.props;
    return (
      <StandardTable
        selected
        dataSource={userList}
        columns={this.columns}
        scroll={{ x: 1350 }}
        rowkey="user_id"
        selectChange={this.selectChange}
      />
    );
  }
}

export default UserList;
