import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { reqAddcate } from '../../../api'

const AddForm = ({ visible, onCreate, onCancel,categorys }) => {
  const [form] = Form.useForm();
  const onOK = () => {
    form.validateFields()
      .then((values) => {
        form.resetFields()
        onCreate(values)
      })
  }
  return (
    <Modal
      visible={visible}
      title="添加分类"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={onOK}
    >
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
    </Modal>
  );
};

const AddFormBtn = ({categorys, onSendCate}) => {
  const [visible, setVisible] = useState(false)

  const onCreate = async (values) => {
    // console.log(values);
    // onSendCate(values)
    const { parentId, categoryName } = values
    const res = await reqAddcate({ parentId, categoryName })
    if (res.status === 0) {
      message.success('分类添加成功')
    }
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setVisible(true);
        }}
      >
        添加
      </Button>
      <AddForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
        categorys={categorys}
      />
    </div>
  );
}
export default AddFormBtn