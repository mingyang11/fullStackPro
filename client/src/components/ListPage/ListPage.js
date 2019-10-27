import React, { Component } from 'react'
import { Row, Col, Button, Breadcrumb } from 'antd'
import Link from 'umi/link'
import PropTypes from 'prop-types'
import Table from '../Table'
import SearchForm from '../SearchForm'
import ModalForm from '../ModalForm'
// import './style.less'

const LinkWrapper = props => {
  const Com = props.to ? Link : 'a'
  return <Com {...props}>{props.children}</Com>
}

export default class ListPage extends Component {
  static propTypes = {
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    title: PropTypes.string,
    name: PropTypes.string,
    loading: PropTypes.bool,
    confirmDisabled: PropTypes.bool,
    confirmLoading: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    fields: PropTypes.array,
    data: PropTypes.array,
    search: PropTypes.func,
    save: PropTypes.func,
    record: PropTypes.object,
    modalVisible: PropTypes.bool,
    cancel: PropTypes.func,
    tableOpts: PropTypes.object,
    changeRecord: PropTypes.func,
    changeSearch: PropTypes.func,
    searchParams: PropTypes.object,
    resetSearch: PropTypes.func,
    aboveSearch: PropTypes.object,
    sorter: PropTypes.object,
    xScroll: PropTypes.number,
    validateDisabled: PropTypes.bool,
    breadcrumb: PropTypes.array,
    page: PropTypes.object,
    radio: PropTypes.object,
    checkbox: PropTypes.object,
    tableTitle: PropTypes.string
  }

  static defaultProps = {
    rowKey: 'id',
    title: '',
    name: '',
    loading: false,
    confirmDisabled: false,
    confirmLoading: false,
    fields: undefined,
    data: [],
    search: undefined,
    save: undefined,
    record: {},
    modalVisible: false,
    cancel: undefined,
    tableOpts: {},
    changeRecord: undefined,
    searchParams: undefined,
    aboveSearch: undefined,
    sorter: {},
    xScroll: 800,
    validateDisabled: false,
    breadcrumb: [],
    page: undefined,
    radio: undefined,
    checkbox: undefined,
    tableTitle: undefined
  }

  save(values) {
    const isAdd = !values.id
    this.props.save(values).then(isSuccess => {
      const pageNo = isAdd
        ? '1'
        : (this.props.page && this.props.page.pageNo) || '1'
      const pageSize = (this.props.page && this.props.page.pageSize) || '10'
      isSuccess &&
        this.props.search &&
        this.props.search({
          ...this.props.searchParams,
          pageNo,
          pageSize
        })
    })
  }

  render() {
    const createButton = btnOpts =>
      btnOpts.map(item => {
        if (!item.hidden) {
          return (
            <Button
              key={`button${item.label}`}
              type={item.type || 'primary'}
              onClick={item.onClick.bind(this)}
              disabled={item.disabled}
            >
              {item.label}
            </Button>
          )
        }
        return undefined
      })

    const {
      rowKey,
      title,
      name,
      loading = false,
      confirmDisabled,
      confirmLoading,
      columns,
      data,
      search,
      cancel,
      record,
      fields = [],
      modalVisible,
      tableOpts,
      changeSearch,
      searchParams,
      page,
      buttons = [],
      searchFields,
      style,
      cusTitle,
      formWidth,
      children,
      changeRecord,
      expandedRowRender,
      resetSearch,
      aboveSearch,
      sorter,
      xScroll,
      validateDisabled,
      breadcrumb,
      checkbox,
      tableTitle
    } = this.props

    return (
      <div style={{ padding: 16, flex: '1', width: '100%', ...style }}>
        {(breadcrumb.length > 0 || title || buttons.length > 0) && (
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            style={{ marginBottom: '16px', height: 28 }}
          >
            <Col style={{ display: 'flex' }}>
              {breadcrumb.length > 0 && (
                <Breadcrumb>
                  {breadcrumb.map(item => (
                    <Breadcrumb.Item key={item.id}>
                      {!item.href && item.name}
                      {item.href && (
                        <LinkWrapper to={item.href}>{item.name}</LinkWrapper>
                      )}
                    </Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              )}
              <div className="ant-page-title">{title}</div>
            </Col>
            <Col>
              {checkbox && checkbox.selectedRowKeys.length > 0 && (
                <span className="listpage-selected-wrapper">
                  已选择
                  <span className="listpage-selected-num">
                    {checkbox.selectedRowKeys.length}
                  </span>
                  项，
                  <a
                    role="button"
                    tabIndex="-1"
                    onClick={checkbox.clearSelectedKeys}
                  >
                    清空
                  </a>
                </span>
              )}
              {createButton(buttons)}
            </Col>
          </Row>
        )}
        {aboveSearch}
        {!this.props.noSearch && (
          <SearchForm
            fields={searchFields || columns.filter(item => !!item.search)}
            search={search}
            changeRecord={changeSearch}
            values={searchParams}
            page={page}
            reset={resetSearch}
            sorter={sorter}
            style={{ marginBottom: 16 }}
          />
        )}
        <Table
          {...this.props}
          {...tableOpts}
          title={tableTitle}
          rowKey={rowKey}
          columns={columns.filter(item => !item.hidden)}
          dataSource={data}
          loading={loading}
          search={search}
          expandedRowRender={expandedRowRender}
          pagination={
            page
              ? {
                  current: page.pageNo,
                  total: page.total,
                  pageSize: page.pageSize || 10
                }
              : null
          }
          sorter={sorter}
          xScroll={xScroll}
        />
        <ModalForm
          visible={modalVisible}
          onCancel={() => cancel()}
          confirmDisabled={confirmDisabled}
          confirmLoading={confirmLoading}
          onCreate={this.save.bind(this)}
          title={name}
          cusTitle={cusTitle}
          values={record}
          fields={fields}
          formWidth={formWidth}
          changeRecord={changeRecord}
          validateDisabled={validateDisabled}
        />
        {children}
      </div>
    )
  }
}
