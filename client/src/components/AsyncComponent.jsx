import React from 'react'

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    state = { component: null }

    async componentDidMount() {
      const { default: component } = await importComponent()

      this.setState({
        component
      })
    }

    render() {
      const C = this.state.component

      return C ? <C {...this.props} /> : null
    }
  }

  return AsyncComponent
}
