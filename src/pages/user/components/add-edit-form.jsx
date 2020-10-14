import React, { useEffect } from 'react'
import { Form, Input, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'

const Item = Form.Item
const Option = Select.Option

function AddUpdForm(props) {
  const [form] = useForm()

  // 获取传过来的角色
  const { roles, setForm, user } = props
  const userInfo = user || {}
  useEffect(() => {
    setForm(form)
  })

  // 绘制表格
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  }
  return (
    <Form {...layout} form={form}>
      <Item label="用户名" name="username" initialValue={userInfo.username} rules={[
        { required: true, message: "请输入用户名" }
      ]}>
        <Input />
      </Item>
      {
        userInfo._id ? null : (
          <Item label="密码" name="password" initialValue={userInfo.password} rules={[
            { required: true, message: "请输入密码" }
          ]}>
            <Input type="password" />
          </Item>
        )
      }

      <Item label="邮箱" name="email" initialValue={userInfo.email} rules={[
        { required: true, message: "请输入邮箱" }
      ]}>
        <Input />
      </Item>
      <Item label="手机号" name="phone" initialValue={userInfo.phone} rules={[
        { required: true, message: "请输入手机号" }
      ]}>
        <Input />
      </Item>
      <Item label="角色" name="role_id" initialValue={userInfo.role_id} rules={[
        { required: true, message: "请选择角色" }
      ]}>
        <Select>
          {
            roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
          }
        </Select>
      </Item>
    </Form>
  )
}

export default AddUpdForm