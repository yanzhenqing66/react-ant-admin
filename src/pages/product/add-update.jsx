import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Button, Form, Input, Cascader } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import PicturesWall from './components/pictures-wall'

const Item = Form.Item
const { TextArea } = Input

const AddUpdate = () => {
  const uploadRef = useRef()
  const [form] = Form.useForm()
  let [options] = useState([])
  const history = useHistory()
  // 级联选项
  options = [
    {
      value: '0',
      label: '家用电器',
      isLeaf: false,
      children: [
        {
          label: `电脑`,
          value: '001',
          isLeaf: true
        },
        {
          label: `电视`,
          value: '002',
          isLeaf: true
        }
      ]
    },
    {
      value: '1',
      label: '生活用品',
      isLeaf: true,
    },
  ]

  // 头部
  const title = (
    <span>
      <Button type="link"><ArrowLeftOutlined style={{ fontSize: 20 }} onClick={() => history.push('/product')} /></Button>
      <span style={{ fontSize: 20 }}>添加商品</span>
    </span>
  )
  // 表单布局
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  }
  // 商品价格验证
  const valiPrice = async (rule, value) => {
    if (value * 1 > 0) {
      return Promise.resolve()
    } else {
      return Promise.reject('商品价格必须大于0')
    }
  }
  // 提交表单
  const submit = () => {
    form.validateFields().then(values => {
      console.log(values)
      const imgs = uploadRef.current.getImgs()
      console.log(imgs);
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Card title={title}>
      <Form {...formItemLayout} form={form}>
        <Item name="name" label="商品名称" rules={[
          { required: true, message: "必须输入商品名称" }
        ]} >
          <Input placeholder="请输入商品名称" />
        </Item>
        <Item name="desc" label="商品描述" rules={[
          { required: true, message: '必须输入商品描述' }
        ]}>
          <TextArea autoSize placeholder="请输入商品描述" />
        </Item>
        <Item name="price" label="商品价格" rules={[
          { required: true, message: '必须输入商品价格' },
          { validator: valiPrice }
        ]}>
          <Input addonAfter="元" placeholder="请输入商品价格" />
        </Item>
        <Item name="categoryIds" label="商品分类" rules={[
          { required: true, message: '请指定商品分类' }
        ]}>
          <Cascader
            placeholder="请指定商品分类"
            options={options}
          />
        </Item>
        <Item label="商品图片">
          <PicturesWall ref={uploadRef} />
        </Item>
        <Item label="商品详情">
        </Item>
        <Button type="primary" style={{ marginLeft: 100 }} onClick={submit}>提交</Button>
      </Form>
    </Card>
  )
}

export default AddUpdate