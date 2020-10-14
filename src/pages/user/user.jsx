import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { formateDate } from '../../utils/dateUtil'
import { reqUserList, reqAddUser, reqDelUser, reqEditUser } from '../../api'
import AddUpdForm from './components/add-edit-form'

class User extends Component {

  state = {
    users: [],  // 用户
    roles: [],  // 角色
    showVisible: false, // 展示对话框
  }
  // 表格表头
  initColums = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleName[role_id]
        // render: (role_id) => this.state.roles.find(role => role._id === role_id).name
      },
      {
        title: '操作',
        render: user => (
          <>
            <Button type="link" onClick={() => this.showEdit(user)}>修改</Button>
            <Button type="link" onClick={() => this.delUser(user)}>删除</Button>
          </>
        )
      },
    ]
  }

  // 获取列表数据
  getUserList = async () => {
    const res = await reqUserList()
    if (res.status === 0) {
      const { roles, users } = res.data
      this.initRoleName(roles)
      this.setState({ roles, users })
    }
  }

  // 根绝角色id,获取角色名称
  initRoleName = (roles) => {
    this.roleName = roles.reduce((pre, item) => {
      pre[item._id] = item.name
      return pre
    }, {})
  }

  // 确定添加或者修改
  handleAddUpdOk = () => {
    if (this.user && this.user._id) {
      this.editForm()
    } else {
      this.addForm()
    }
  }
  addForm = () => {
    this.form.validateFields().then(async value => {
      const res = await reqAddUser(value)
      if (res.status === 0) {
        this.getUserList()
        this.setState({ showVisible: false })
        this.form.resetFields()
        message.success('添加用户成功')
      } else {
        message.error('添加用户失败')
      }
    }).catch(err => {
      console.log(err)
    })
  }
  editForm = () => {
    this.form.validateFields().then(async value => {
      const { username, phone, email, role_id } = value
      const { _id } = this.user
      const res = await reqEditUser({
        _id, username, phone, email, role_id
      })
      console.log(res);
      if (res.status === 0) {
        this.getUserList()
        this.setState({ showVisible: false })
        this.form.resetFields()
        message.success(`修改用户成功`)
      } else {
        message.error('修改用户失败')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // 添加用户
  showAddUser = () => {
    this.user = null
    this.setState({ showVisible: true })
  }

  // 删除用户
  delUser = async (user) => {
    const res = await reqDelUser({ userId: user._id })
    if (res.status === 0) {
      this.getUserList()
      message.success('用户删除成功')
    } else {
      message.error('用户删除失败')
    }
  }

  // 修改用户
  showEdit = (user) => {
    this.user = user
    this.setState({ showVisible: true })
  }

  componentWillMount() {
    this.initColums()
  }
  componentDidMount() {
    this.getUserList()
  }
  render() {
    const { users, roles } = this.state
    const title = (
      <Button type="primary" onClick={() => this.showAddUser()}>创建用户</Button>
    )
    return (
      <>
        <Card title={title}>
          <Table bordered dataSource={users} rowKey='_id' columns={this.columns} pagination={{ defaultCurrent: 1, defaultPageSize: 5 }} />
        </Card>
        <Modal
          title={this.user ? '修改用户' : '添加用户'}
          visible={this.state.showVisible}
          onOk={this.handleAddUpdOk}
          destroyOnClose={true}
          onCancel={() => this.setState({ showVisible: false })}
        >
          <AddUpdForm roles={roles} user={this.user} setForm={user => this.form = user} />
        </Modal>
      </>

    )
  }
}

export default User