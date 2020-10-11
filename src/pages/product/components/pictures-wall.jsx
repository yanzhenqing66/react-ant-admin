import React from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqDelPic } from '../../../api'


export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  // 获取上传图片的name
  getImgs = () => {
    return this.state.fileList.map(file => {
      return file.name
    })
  }


  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async (file) => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }

  handleChange = async ({ file, fileList }) => {
    if (file.status === 'done') {
      const res = file.response
      if (res.status === 0) {
        message.success('图片上传成功')
        const { name, url } = res.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('图片上传失败')
      }
    } else if (file.status === 'removed') {
      const resDel = file.response
      if (resDel.status === 0) {
        const { name } = file.response.data
        const resSuc = await reqDelPic({ name })
        if (resSuc.status === 0) {
          message.success('删除成功')
        } else {
          message.error('删除失败')
        }
      }
    }
    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          accept="image/*"
          name="image"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}