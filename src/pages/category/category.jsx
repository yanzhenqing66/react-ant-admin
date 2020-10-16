import React, { Component } from 'react'
import { Card, Table, message, Button, Modal } from 'antd'
import { reqCategorys, reqAddcate } from '../../api'
import { PlusOutlined } from '@ant-design/icons'
import AddForm from './components/add-form'


export default class Category extends Component {

  state = {
    categorys: [],   // 一级分类列表
    subCategorys: [],  // 二级分类列表
    parentId: '0',  // 父分类id
    parentName: '', // 父分类名称
    addCateVisible: false
  }
  // 初始化表头
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: '_id',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <div>
            {/* 传参的话需要使用匿名函数，因为render时，回调函数也会被调用，会把参数都传过去 */}
            {
              this.state.parentId === '0' ? <Button type="link" onClick={() => this.showSubCategory(category)}>查看子分类</Button> : '暂无下一级分类'
            }
          </div>
        )
      },
    ]
  }
  // 获取一级分类列表数据
  getCategorys = async () => {
    const { parentId } = this.state
    const res = await reqCategorys({ parentId })
    if (res.status === 0) {
      const categorys = res.data
      if (parentId === '0') {
        // 渲染一级分类列表
        this.setState({ categorys })
      } else {
        // 渲染二级分类列表
        this.setState({
          subCategorys: categorys
        })
      }
    } else {
      message.error('获取分类列表失败')
    }
  }
  // 点击查看二级分类
  showSubCategory = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
      this.getCategorys()
    })
  }
  // 返回一级列表分类
  handleBackCate = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }
  // 确定添加分类, 请求数据
  onAddCategoryOK = () => {
    this.form.validateFields()
      .then(async (values) => {
        this.form.resetFields()
        const { parentId, categoryName } = values
        const res = await reqAddcate({ parentId, categoryName })
        if (res.status === 0) {
          this.getCategorys()
          this.setState({ addCateVisible: false })
          message.success('分类添加成功')
        } else {
          message.error('添加失败')
        }
      })
  }
  // 取消添加分类
  onCancel = () => {
    this.setState({ addCateVisible: false })
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getCategorys()
  }
  render() {
    const { categorys, parentId, subCategorys, addCateVisible } = this.state
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <Button type="link" onClick={this.handleBackCate}>一级分类列表</Button>
        <span>子分类</span>
      </span>
    )

    const addBtn = (
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => this.setState({ addCateVisible: true })}
      >
        添加
      </Button>
    )
    return (
      <div>
        <Card title={title} extra={addBtn}>
          <Table
            dataSource={parentId === '0' ? categorys : subCategorys}
            columns={this.columns}
            rowKey="_id"
            bordered
            pagination={{ defaultCurrent: 1, defaultPageSize: 5, showQuickJumper: true }}
          />
        </Card>
        <Modal
          visible={addCateVisible}
          title="添加分类"
          okText="确定"
          cancelText="取消"
          onCancel={this.onCancel}
          onOk={this.onAddCategoryOK}
        >
          <AddForm
            categorys={categorys}
            setForm={form => this.form = form}
          />
        </Modal>
      </div>
    )
  }
}
