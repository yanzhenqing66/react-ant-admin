import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';

const AddForm = ({ categorys, setForm }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    setForm(form)
  })
  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
    >
      <Form.Item
        name="parentId"
        label="请选择分类："
        initialValue="0"
        rules={[{ required: true, message: '请选择分类', }]}
      >
        <Select>
          <Select.Option key="0" value="0">一级分类</Select.Option>
          {
            categorys.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
          }
        </Select>
      </Form.Item>
      <Form.Item
        name="categoryName"
        label="分类名称："
        rules={[
          {
            required: true,
            message: '请输入分类名称',
          },
        ]}
      >
        <Input placeholder="请输入分类名称" />
      </Form.Item>
    </Form>
  )
}
export default AddForm