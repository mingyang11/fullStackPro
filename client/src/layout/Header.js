import React, { Component } from 'react';
import styles from './Header.less';

class HeaderComponent extends Component {
  render() {
    return (
      <div className={styles.headerContainer}>
        <div className="language">语言</div>
        <div className="userInfo">账号信息</div>
        <div className="message">信息提示</div>
        <div className="documentLink">文档链接</div>
        <div className="search">搜索</div>
      </div>
    );
  }
}

export default HeaderComponent;
