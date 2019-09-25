import React, { Component } from 'react'
import styles from './userLayout.less'

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
