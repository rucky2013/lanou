import React from 'react'
import {Table, Modal, Radio} from 'antd'
import styles from './List.less'
import {DropOption} from '../../components'
import PropTypes from 'prop-types'
import {Avatar} from 'antd'

const confirm = Modal.confirm
const RadioGroup = Radio.Group

const List = ({...tableProps}) => {
  const {onEditItem, onDeleteItem, type} = tableProps

  /**
   * 选择题展示
   * @param text
   * @returns {XML}
   */
  const selectRowRender = (text) => {
    if (type == 2) {
      //选择题
      return (
        <div>
          <div>题干：{text.question}</div>
          <div>
            <RadioGroup>
              <Radio value="A">A.{text.answer.A}</Radio>
              <Radio value="B">B.{text.answer.B}</Radio>
              <Radio value="C">C.{text.answer.C}</Radio>
              <Radio value="D">D.{text.answer.D}</Radio>
            </RadioGroup>
          </div>
        </div>
      )
    } else {
      //问答题
      return (<div>{text}</div>)
    }
  }
  /**
   * 操作选项
   * @param record
   * @param e
   */
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(type, record)
    } else if (e.key === '2') {
      confirm({
        title: '你确定要删除这个用户吗?',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '图标',
      width: 64,
      render: text => <Avatar style={{backgroundColor: '#7f93d0'}} icon="database"/>,
    },
    {
      title: '试题分类',
      dataIndex: 'subject',
      className: 'subject-type',
      render: text => text,
    },
    {
      title: '题目与选项',
      dataIndex: 'question',
      render: selectRowRender,
    },
    {
      title: '参考答案',
      dataIndex: 'answer',
      render: text => text,
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return (<DropOption
          onMenuClick={e => handleMenuClick(record, e)}
          menuOptions={[{key: '1', name: '修改'}, {key: '2', name: '删除'}]}
        />)
      },
    },
  ]

  return (
    <div>
      <Table
        bordered
        simple
        {...tableProps}
        scroll={{x: 600}}
        columns={columns}
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}
List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
}
export default List
