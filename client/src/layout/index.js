import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import Link from 'umi/link'
import routeConfig from './config'

const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu

class BasicLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: ['helloWorld'],
      collapsed: false
    }
  }
  componentDidMount() {}

  renderMenu = data => {
    return data.map(element => {
      if (element.children) {
        return (
          <SubMenu
            title={
              <span>
                <Icon type={element.icon} />
                {element.title}
              </span>
            }
            key={element.key}
          >
            {this.renderMenu(element.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={element.key} title={element.title}>
          <Link to={element.path}>
            <Icon type={element.icon} />
            {element.title}
          </Link>
        </Menu.Item>
      )
    })
  }
  handleClick = e => {
    this.setState({
      current: e.keyPath
    })
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    const { children } = this.props
    const { current } = this.state
    return (
      <Layout>
        <Sider>
          <div style={{ height: 100 }} />
          <Menu
            onClick={this.handleClick}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={current}
          >
            {this.renderMenu(routeConfig)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: window.innerHeight
            }}
          >
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout
