import React, { Component } from 'react';
import { Table, Card } from 'antd';

class StandardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  selectChange = (indexList, dataList) => {
    const { selectChange } = this.props;
    selectChange(indexList, dataList);
  };

  render() {
    const { dataSource, columns, rowkey, scroll, selected } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.selectChange(selectedRowKeys, selectedRows);
      },
    };
    return (
      <Card bordered={false}>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={rowkey}
          scroll={scroll}
          rowSelection={selected ? rowSelection : null}
        />
      </Card>
    );
  }
}

export default StandardTable;
