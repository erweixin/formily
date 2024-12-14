import React from 'react'
import { connect, mapReadPretty, mapProps, ReactFC } from '@formily/react'
import { Cascader as AntdCascader } from 'antd'
import { BaseOptionType, CascaderProps } from 'antd/lib/cascader'
import { PreviewText } from '../preview-text'
import { LoadingOutlined } from '@ant-design/icons'

export const Cascader: ReactFC<CascaderProps<BaseOptionType>> = connect(
  AntdCascader,
  mapProps(
    {
      dataSource: 'options',
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
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
