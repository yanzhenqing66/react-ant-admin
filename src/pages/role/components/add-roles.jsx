import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'

function AddRoles({ setForm }) {
  const [form] = useForm()
  useEffect(() => {
    setForm(form || {})
  })
  return (
    <Form form={form}>
      <Form.Item name="name" label="角色名称" rules={[
        { required: true, message: '请输入角色名称' }
      ]}>
        <Input />
      </Form.Item>
    </Form>
  )
}

export default AddRoles