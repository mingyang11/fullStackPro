import React, { Component } from 'react'
import { Table as AntdTabel, Spin } from 'antd'
import moment from 'moment'

class Table extends Component {
  onChange(page, filters, sorter) {
    this.props.search({
      ...this.props.searchParams,
      pageNo: page.current,
      pageSize: page.pageSize,
      columnKey: sorter.columnKey,
      order: sorter.order
    })
  }
  shapeColumns(columns) {
    const { sorter = {}, valueName = 'id', displayName = 'label' } = this.props
    const timeMap = {
      datetime: 'YYYY-MM-DD HH:mm',
      datetimeRange: 'YYYY-MM-DD HH:mm',
      date: 'YYYY-MM-DD',
      dateRange: 'YYYY-MM-DD'
    }
    return columns.map(col => {
      const column = { ...col }
      if ('align' in column) {
        column.className = `${column.className || ''} table-column-${
          column.align
        }`
      }
      if ('label' in column) {
        column.title = column.label
      }
      if ('name' in column) {
        column.key = column.name
        column.dataIndex = column.name
      }
      if ('sorter' in column && !('sortOrder' in column)) {
        column.sortOrder = sorter.columnKey === column.name && sorter.order
      }
      if (column.type in timeMap) {
        column.render = text => {
          let resText = text
          if (`${text}`.length === 13) {
            resText = +text
          }
          return (resText || '') && moment(resText).format(timeMap[column.type])
        }
      }
      if (column.type === 'select' && !('render' in column)) {
        if (Object.prototype.toString.call(column.data) === '[object Array]') {
          const dict = {}
          column.data.forEach(item => {
            dict[item[valueName]] = item[displayName]
            column.render = text => dict[text]
          })
        } else {
          column.render = text => column.data[text]
        }
      }
      return column
    })
  }
  render() {
    const {
      rowKey = 'id',
      loading = false,
      columns = [],
      title = undefined,
      dataSource = [],
      pagination = false,
      searchParams = {},
      onChange = undefined,
      bordered = false,
      defaultExpandAllRows = false,
      expandedRowKeys = [],
      expandedRowRender = undefined,
      xScroll = undefined,
      yScroll = undefined,
      size = 'default',
      radio = undefined,
      checkbox = undefined,
      showTotal = (total, range) =>
        `显示第 ${range[0]} 到第 ${range[1]} 条记录，总共 ${total} 条记录`
    } = this.props
    let { rowSelection = undefined, onRowClick = undefined } = this.props
    const shapedColumns = this.shapeColumns(columns)
    if (radio) {
      rowSelection = {
        type: 'radio',
        selectedRowKeys: radio.selectedRowKeys,
        onSelect: record => {
          radio.selectRow(record)
        }
      }
      onRowClick = record => {
        radio.selectRow(record)
      }
    }
    if (checkbox) {
      rowSelection = {
        type: 'checkbox',
        selectedRowKeys: checkbox.selectedRowKeys,
        onSelect: (record, selected) => {
          checkbox.selectRows([record], selected)
        },
        onSelectAll: (selected, selectedRows, changedRows) => {
          checkbox.selectRows(changedRows, selected)
        },
        getCheckboxProps: checkbox.getCheckboxProps
      }
    }
    return (
      <Spin spinning={loading}>
        <AntdTabel
          title={title ? () => title : null}
          columns={shapedColumns}
          dataSource={dataSource}
          bordered={bordered}
          size={size}
          pagination={
            pagination
              ? {
                  pageSize: 10,
                  ...pagination,
                  showTotal
                }
              : false
          }
          searchParams={searchParams}
          onChange={onChange || this.onChange}
          rowKey={rowKey}
          rowSelection={rowSelection}
          expandedRowKeys={defaultExpandAllRows ? undefined : expandedRowKeys}
          expandedRowRender={expandedRowRender}
          defaultExpandAllRows={defaultExpandAllRows}
          scroll={{ x: xScroll, y: yScroll }}
          onRowClick={onRowClick}
        />
      </Spin>
    )
  }
}

export default Table
