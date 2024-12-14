import React from 'react'
import { connect, mapReadPretty, mapProps, ReactFC } from '@formily/react'
import { TreeSelect as AntdTreeSelect, type TreeSelectProps } from 'antd'
import { PreviewText } from '../preview-text'
import { LoadingOutlined } from '@ant-design/icons'
export const TreeSelect: ReactFC<TreeSelectProps> = connect(
  AntdTreeSelect,
  mapProps(
    {
      dataSource: 'treeData',
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            props.suffixIcon
          ),
      }
    }
  ),
  mapReadPretty(PreviewText.TreeSelect)
)

export default TreeSelect
