import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends Component {

  getOption = () => {
    return {
      title: {
        text: '搜索榜',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['衬衫', '牛仔裤', '皮鞋', '领带', '羽绒服']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '衬衫' },
            { value: 310, name: '牛仔裤' },
            { value: 234, name: '皮鞋' },
            { value: 135, name: '领带' },
            { value: 1548, name: '羽绒服' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  render() {
    return (
      <>
        <Card style={{height: 500}}>
          <ReactEcharts option={this.getOption()} />
        </Card>
      </>

    )
  }
}
