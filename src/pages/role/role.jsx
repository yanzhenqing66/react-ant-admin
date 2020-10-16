import React, { useState, useEffect, createRef } from 'react'
import { Button, Card, Table, Modal, message } from 'antd'
import { connect } from 'react-redux'

import { logout } from '../../store/actions'
import { reqGetRoles, reqAddRoles, reqUpdRoles } from '../../api'
import AddRoles from './components/add-roles'
import { formateDate } from '../../utils/dateUtil'
import AuthRoles from './components/auth-roles'


const Role = (props) => {
  const [roles, setRoles] = useState([]) // 角色列表
  const [role, setRole] = useState({})   // 选中的角色
  const [addRolesVisible, setAddRolesVisible] = useState(false)
  const [setRolesVisible, setSetRolesVisible] = useState(false)
  const [addForm, setAddForm] = useState({})  // 传入的添加角色
  const ref = createRef()

  const { user, logout } = props

  // 表格表头
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (create_time) => <span>{formateDate(create_time)}</span>
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: (auth_time) => <span>{formateDate(auth_time)}</span>
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    },
  ]

  // 获取角色列表
  const getRoles = async () => {
    const res = await reqGetRoles()
    setRoles(res.data)
  }
  // 异步加载角色列表
  useEffect(() => {
    getRoles()
  }, [])


  // 确定添加
  const handleAddOk = () => {
    addForm.validateFields().then(async values => {
      const { name } = values
      addForm.resetFields()
      const res = await reqAddRoles({ roleName: name })
      if (res.status === 0) {
        const { roles } = res.data
        setRoles(roles)
        setAddRolesVisible(false)
        getRoles()
        message.success('角色添加成功')
      } else {
        message.error('角色添加失败')
      }
    }).catch(err => {
      console.log(err);
    })
  }
  // 取消添加
  const handleCancel = () => {
    setAddRolesVisible(false)
    setSetRolesVisible(false)
  }

  // 选择某行
  const onRow = (role) => {
    return {
      onClick: event => { // 点击行
        setRole(role)
      },
    }
  }
  // 确定修改
  const handleSetOk = async () => {
    const authTree = ref.current.getAuthTree()
    role.menus = authTree
    role.auth_time = Date.now()
    role.auth_name = user.username
    const res = await reqUpdRoles(role)
    if (res.status === 0) {
      // 修改登录用户的角色权限时，退出登录
      if (role._id === user.role_id) {
        logout()
        message.info('权限修改，请重新登录')
      } else {
        setSetRolesVisible(false)
        getRoles()
        message.success('权限设置成功')
      }
    } else {
      message.error('权限设置失败')
    }
  }

  // 头部列表
  const title = (
    <span>
      <Button type="primary" onClick={() => setAddRolesVisible(true)}>创建角色</Button> &nbsp;&nbsp;
      <Button type="primary" disabled={!role._id} onClick={() => setSetRolesVisible(true)}>设置角色权限</Button>
    </span>
  )

  return (
    <>
      <Card title={title}>
        <Table
          bordered
          dataSource={roles}
          columns={columns}
          rowKey="_id"
          rowSelection={{ type: 'radio', selectedRowKeys: [role._id], onSelect: (role) => setRole(role) }}
          onRow={onRow}
          pagination={{ defaultCurrent: 1, defaultPageSize: 5 }}
        />
      </Card>
      <Modal
        title="创建角色"
        visible={addRolesVisible}
        onOk={handleAddOk}
        onCancel={handleCancel}
      >
        <AddRoles setForm={form => setAddForm(form)} />
      </Modal>
      <Modal
        title="设置角色权限"
        visible={setRolesVisible}
        onOk={handleSetOk}
        onCancel={handleCancel}
      >
        <AuthRoles role={role} ref={ref} />
      </Modal>
    </>
  )
}

export default connect(
  state => ({ user: state.user }),
  { logout }
)(Role)
