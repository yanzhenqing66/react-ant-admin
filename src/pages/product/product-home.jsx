import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { Card, Select, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqProducts, reqSearchproducts } from '../../api'

const Option = Select.Option

const ProductHome = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [searchType, setsearchType] = useState('productName')
  const [searchName, setSearchName] = useState('')

  const history = useHistory()

  // 列表标题
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price) => '￥' + price
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => (
        <span>
          <Button type="primary">下架</Button>
          <span>在售</span>
        </span>
      )
    },
    {
      title: '操作',
      width: 100,
      render: (product) => (
        <span>
          <Button type="link">详情</Button>
          <Button type="link">修改</Button>
        </span>
      )
    },
  ]
  // 获取商品列表数据
  const productData = async (pageNum = 1) => {
    const res = await reqProducts({ pageNum, pageSize: 5 })
    if (res.status === 0) {
      const { list, total } = res.data
      setProducts(list)
      setTotal(total)
    }
  }
  useEffect(() => {
    productData()
  }, [])

  // 搜索
  const handleSearch = async (pageNum) => {
    const res = await reqSearchproducts({ pageNum, pageSize: 5, [searchType]: searchName })
    if (res.status === 0) {
      const { list, total } = res.data
      setProducts(list)
      setTotal(total)
    }
  }


  const title = (
    <div>
      <Select
        value={searchType}
        style={{ width: 150 }}
        onChange={value => setsearchType(value)}
      >
        <Option value="productName">按名称搜索</Option>
        <Option value="productDesc">按描述搜索</Option>
      </Select>
      <input
        placeholder="请输入"
        style={{ width: 250, margin: '0 15px' }}
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
      />
      <Button type="primary" onClick={() => handleSearch(1)}>搜索</Button>
    </div>
  )
  const extra = (
    <Button type="primary" icon={<PlusOutlined />} onClick={() => { history.push('/product/addupdate') }}>添加</Button>
  )
  return (
    <Card title={title} extra={extra}>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        pagination={{ defaultCurrent: 1, defaultPageSize: 5, showQuickJumper: true, total: total, onChange: (pageNum) => this.productData(pageNum) }}
      />
    </Card>
  )
}

export default ProductHome