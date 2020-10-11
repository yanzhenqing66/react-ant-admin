import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, List, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const Item = List.Item

const Detail = (props) => {
  const history = useHistory()
  const { name, desc, price, imgs } = props.location.state.product
  // 头部
  const title = (
    <span>
      <Button type="link"><ArrowLeftOutlined style={{ fontSize: 20 }} onClick={() => history.push('/product')} /></Button>
      <span style={{ fontSize: 20 }}>查看商品</span>
    </span>
  )
  return (
    <Card title={title}>
      <List bordered>
        <Item>
          <span style={{ fontSize: 18, fontWeight: "bold", color: '#666' }}>商品名称：</span>
          <span>{name}</span>
        </Item>
        <Item>
          <span style={{ fontSize: 18, fontWeight: "bold", color: '#666' }}>商品描述：</span>
          <span>{desc}</span>
        </Item>
        <Item>
          <span style={{ fontSize: 18, fontWeight: "bold", color: '#666' }}>商品价格：</span>
          <span>{price}</span>
        </Item>
        <Item>
          <span style={{ fontSize: 18, fontWeight: "bold", color: '#666' }}>商品分类：</span>
          <span>生活用品 --> 毛巾</span>
        </Item>
        <Item>
          <span style={{ fontSize: 18, fontWeight: "bold", color: '#666' }}>商品图片：</span>
          <span>
            {
              imgs.map(img => (
                <img
                  style={{ width: 120, height: 120, marginRight: 15 }}
                  key={img}
                  src={'http://localhost:5000/manage/img/upload/' + img}
                  alt="img"
                />
              ))
            }
          </span>
        </Item>
      </List>
    </Card>
  )
}

export default Detail