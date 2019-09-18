import React, { Component } from 'react'
import { Layout } from 'antd'
import Link from 'umi/link'
import styles from './userLayout.less'
// import logo from '../assets/logo.svg'

const { Header, Content, Footer } = Layout

class UserLayout extends Component {
  render() {
    const { children } = this.props
    return (
      <div className={styles.userContaier}>
        <div className={styles.userHeader}>niohao</div>
        <div className={styles.userContent}>{children}</div>
        <div className={styles.footer}>
          Ant Design 是西湖区最具影响力的 Web 设计规范
        </div>
      </div>
    )
  }
}

export default UserLayout
