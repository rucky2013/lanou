import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'
import { Avatar } from 'antd'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '你确定要删除这个用户吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '头像',
      width: 64,
      render: text => <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />,
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <Link to={`users/${record.id}`}>{text}</Link>,
    }, {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '权限',
      dataIndex: 'roles',
      key: 'roles',
      render: text => <div>{text.map(i => <div>{i}</div>)}</div>,

    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'female',
      key: 'female',
      render: text => (<span>{text
        ? '女'
        : '男'}</span>),
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '注册时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return (<DropOption
          onMenuClick={e => handleMenuClick(record, e)}
          menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]}
        />)
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => {
    return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body
  }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 800 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
