import React, {Component} from 'react';
import Link from 'umi/link';
import logo from '../assets/logo.svg';

class UserLayout extends Component {
    render() {
        const {children} = this.props;
        return (
            <div>
                <div>
                    <div>
                    <div>
                        <Link to="/">
                        <img alt="logo" src={logo} />
                        <span>Ant Design</span>
                        </Link>
                    </div>
                    <div>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
                    </div>
                    {children}
                </div>
            </div>
        );
        
    }
}

export default UserLayout;