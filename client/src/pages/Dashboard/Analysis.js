import React, { Fragment } from 'react'
import ModalCard from '@/components/ModalCard'
import StandardGrid from '@/components/StandardGrid'

class Analysis extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  checkbodChange = value => {
    this.setState({
      checkboxValue: value
    })
  }

  render() {
    const data = [
      {
        title: 'test1',
        value: 'yangming1',
        width: '20%',
        textAlign: 'center'
      },
      {
        title: 'test2',
        value: 'yangming1',
        width: '20%',
        textAlign: 'center'
      },
      {
        title: 'test3',
        value: 'yangming1',
        width: '20%',
        textAlign: 'center'
      },
      {
        title: 'test4',
        value: 'yangming1',
        width: '20%',
        textAlign: 'center'
      },
      {
        title: 'test5',
        value: 'yangming1',
        width: '20%',
        textAlign: 'center'
      }
    ]
    return (
      <Fragment>
        <ModalCard title="测试使用" />
        <br />
        <StandardGrid data={data} title="数据汇总" />
      </Fragment>
    )
  }
}
export default Analysis
