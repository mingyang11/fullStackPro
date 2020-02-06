import React, { Fragment } from 'react'
import { Card } from 'antd'

const { Grid } = Card

const StandardGrid = props => {
  const { data = [], title } = props
  return (
    <Fragment>
      <Card title={title} size="small">
        {data.map((item = {}) => {
          return (
            <Grid
              key={item.title}
              style={{ width: item.width, textAlign: item.textAlign }}
            >
              <div>{item.value}</div>
              <div>{item.title}</div>
            </Grid>
          )
        })}
      </Card>
    </Fragment>
  )
}
export default StandardGrid
