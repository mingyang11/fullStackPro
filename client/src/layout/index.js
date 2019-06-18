import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
import routeConfig from './config';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu; 

class BasicLayout extends Component {
    constructor(props) {
        super(props);
        this.state={
            current: ['helloWorld'],
            collapsed: false,
        }
    }
    componentDidMount() {
        
    }
    renderMenu = (data) => {
        return data.map((element) => {
            if(element.children) {
                return (
                    <SubMenu title={<span><Icon type="user" />{element.title}</span>} key={element.key}>
                        {this.renderMenu(element.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={element.key} title={element.title}>
                <Link to={element.path}><Icon type="user" />{element.title}</Link>
            </Menu.Item>
        })
    }
    handleClick = (e) => {
        this.setState({
            current: e.keyPath
        })
    }
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }
    render() {
        const { current } = this.state;
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div style={{height: 100}} />
                    <Menu
                        onClick={this.handleClick}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={current}
                    >
                        {
                            this.renderMenu(routeConfig)
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            style={{marginLeft: 20}}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: window.innerHeight,
                        }}
                    >
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{this.props.children}</div>
                    </Content>
                </Layout>
            </Layout>
            
        )
    }
}

export default BasicLayout;