import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Link from 'umi/link';
import routeConfig from './config';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu; 

class BasicLayout extends Component {
    constructor(props) {
        super(props);
        this.state={
            current: ['helloWorld'],
        }
    }
    componentDidMount() {
        
    }
    renderMenu = (data) => {
        return data.map((element) => {
            if(element.children) {
                return (
                    <SubMenu title={element.title} key={element.key}>
                        {this.renderMenu(element.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={element.key} title={element.title}>
                <Link to={element.path}>{element.path}</Link>
            </Menu.Item>
        })
    }
    handleClick = (e) => {
        this.setState({
            current: e.keyPath
        })
    }
    render() {
        const { current } = this.state;
        return (
            <Layout>
                <Header>
                    <Menu
                        onClick={this.handleClick}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={current}
                        style={{ lineHeight: '64px' }}
                    >
                        {
                            this.renderMenu(routeConfig)
                        }
                    </Menu>
                </Header>

                <Content style={{ padding: '0 20px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{this.props.children}</div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        )
    }
}

export default BasicLayout;