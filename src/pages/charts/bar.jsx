import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {

  state = {
    sales: [10, 20, 36, 10, 10, 20],  // 销量
    store: [10, 12, 30, 15, 5, 15]   // 库存
  }

  updateDate = () => {
    this.setState(() => ({
      sales: this.state.sales.map(sale => sale + 1),
      store: this.state.store.map(item => item - 1)
    }))
  }

  getOption = (sales, store) => {
    return {
      title: {
        text: '销量和库存'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: sales
        },
        {
          name: '库存',
          type: 'bar',
          data: store
        },
      ]
    }
  }

  render() {
    const title = <Button type="primary" onClick={this.updateDate}>更新</Button>
    const { sales, store } = this.state
    return (
      <>
        <Card title={title}>
          <ReactEcharts option={this.getOption(sales, store)} />
        </Card>
      </>

    )
  }
}
