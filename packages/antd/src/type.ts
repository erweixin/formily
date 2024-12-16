import {
  IGeneralFieldState,
  GeneralField,
  FormPathPattern,
} from '@formily/core'
import { InputProps, ModalProps, SelectProps } from 'antd'
import { ReactPropsWithChildren } from 'packages/reactive-react/esm'
import Select from './select'
import FormItem from './form-item'
export type SchemaEnum<Message> = Array<
  | string
  | number
  | boolean
  | { label?: Message; value?: any; [key: string]: any }
  | { key?: any; title?: Message; [key: string]: any }
>

export type SchemaTypes =
  | 'string'
  | 'object'
  | 'array'
  | 'number'
  | 'boolean'
  | 'void'
  | 'date'
  | 'datetime'
  | (string & {})

export type SchemaProperties<
  Decorator extends DecoratorNames,
  Component extends ComponentNames,
  Pattern,
  Display,
  Validator,
  Message
> = Record<
  string,
  ISchema<Decorator, Component, Pattern, Display, Validator, Message>
>

export type SchemaPatch = (schema: ISchema) => ISchema

export type SchemaKey = string | number

export type SchemaEffectTypes =
  | 'onFieldInit'
  | 'onFieldMount'
  | 'onFieldUnmount'
  | 'onFieldValueChange'
  | 'onFieldInputValueChange'
  | 'onFieldInitialValueChange'
  | 'onFieldValidateStart'
  | 'onFieldValidateEnd'
  | 'onFieldValidateFailed'
  | 'onFieldValidateSuccess'

export type SchemaReaction<Field = any> =
  | {
      dependencies?:
        | Array<
            | string
            | {
                name?: string
                type?: string
                source?: string
                property?: string
              }
          >
        | Record<string, string>
      when?: string | boolean
      target?: string
      effects?: (SchemaEffectTypes | (string & {}))[]
      fulfill?: {
        state?: Stringify<IGeneralFieldState>
        schema?: ISchema
        run?: string
      }
      otherwise?: {
        state?: Stringify<IGeneralFieldState>
        schema?: ISchema
        run?: string
      }
      [key: string]: any
    }
  | ((field: Field, scope: IScopeContext) => void)

export type SchemaReactions<Field = any> =
  | SchemaReaction<Field>
  | SchemaReaction<Field>[]

export type SchemaItems<Pattern, Display, Validator, Message> =
  | Convert<
      DecoratorNames,
      ComponentNames,
      Pattern,
      Display,
      Validator,
      Message
    >
  | Convert<
      DecoratorNames,
      ComponentNames,
      Pattern,
      Display,
      Validator,
      Message
    >[]

export type SchemaComponents = Record<string, any>

export interface ISchemaFieldUpdateRequest {
  state?: Stringify<IGeneralFieldState>
  schema?: ISchema
  run?: string
}

export interface IScopeContext {
  [key: string]: any
}

export interface IFieldStateSetterOptions {
  field: GeneralField
  target?: FormPathPattern
  request: ISchemaFieldUpdateRequest
  runner?: string
  scope?: IScopeContext
}

export interface ISchemaTransformerOptions {
  scope?: IScopeContext
}

export type Stringify<P extends { [key: string]: any }> = {
  /**
   * Use `string & {}` instead of string to keep Literal Type for ISchema#component and ISchema#decorator
   */
  [key in keyof P]?: P[key]
}

export type ComponentPropsMap = {
  Input: InputProps
  Select: SelectProps
  'ArrayCards.Addition': {
    title?: string
  }
}

export type DecoratorPropsMap = {
  // Modal: ModalProps
  FormItem: GetProps<typeof FormItem>
}

export type ComponentNames = keyof ComponentPropsMap
export type DecoratorNames = keyof DecoratorPropsMap

export type ISchema<
  Decorator extends DecoratorNames = DecoratorNames,
  Component extends ComponentNames = ComponentNames,
  Pattern = any,
  Display = any,
  Validator = any,
  Message = any,
  ReactionField = any
> = Stringify<{
  version?: string
  name?: SchemaKey
  title?: Message
  description?: Message
  default?: any
  readOnly?: boolean
  writeOnly?: boolean
  type?: SchemaTypes
  enum?: SchemaEnum<Message>
  const?: any
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
  maxLength?: number
  minLength?: number
  pattern?: string | RegExp
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  required?: string[] | boolean | string
  format?: string
  $ref?: string
  $namespace?: string
  /** nested json schema spec **/
  definitions?: ConvertSchemaProperties<
    DecoratorNames,
    ComponentNames,
    Pattern,
    Display,
    Validator,
    Message
  >
  properties?: ConvertSchemaProperties<
    DecoratorNames,
    ComponentNames,
    Pattern,
    Display,
    Validator,
    Message
  >
  items?: SchemaItems<Pattern, Display, Validator, Message>
  additionalItems?: Convert<
    DecoratorNames,
    ComponentNames,
    Pattern,
    Display,
    Validator,
    Message,
    ReactionField
  >
  patternProperties?: SchemaProperties<
    Decorator,
    Component,
    Pattern,
    Display,
    Validator,
    Message
  >
  additionalProperties?: Convert<
    DecoratorNames,
    ComponentNames,
    Pattern,
    Display,
    Validator,
    Message,
    ReactionField
  >

  ['x-value']?: any

  //顺序描述
  ['x-index']?: number
  //交互模式
  ['x-pattern']?: Pattern
  //展示状态
  ['x-display']?: Display
  //校验器
  ['x-validator']?: Validator
  //装饰器
  ['x-decorator']?: Decorator
  //装饰器属性
  ['x-decorator-props']?: DecoratorPropsMap[Decorator]
  //组件
  ['x-component']?: Component
  //组件属性
  ['x-component-props']?: ComponentPropsMap[Component]
  //组件响应器
  ['x-reactions']?: SchemaReactions<ReactionField>
  //内容
  ['x-content']?: any

  ['x-data']?: any

  ['x-visible']?: boolean

  ['x-hidden']?: boolean

  ['x-disabled']?: boolean

  ['x-editable']?: boolean

  ['x-read-only']?: boolean

  ['x-read-pretty']?: boolean

  ['x-compile-omitted']?: string[]

  [key: `x-${string | number}` | symbol]: any
}>

type Convert<
  Decorator extends DecoratorNames,
  Component extends ComponentNames,
  Pattern,
  Display,
  Validator,
  Message,
  ReactionField = any
> = Component extends any
  ? Decorator extends any
    ? ISchema<
        Decorator,
        Component,
        Pattern,
        Display,
        Validator,
        Message,
        ReactionField
      >
    : never
  : never

type ConvertSchemaProperties<
  Decorator extends DecoratorNames,
  T extends ComponentNames,
  Pattern,
  Display,
  Validator,
  Message
> = T extends any
  ? Decorator extends any
    ? SchemaProperties<Decorator, T, Pattern, Display, Validator, Message>
    : never
  : never

type MyISchema<
  Pattern = any,
  Display = any,
  Validator = any,
  Message = any,
  ReactionField = any
> = Convert<
  DecoratorNames,
  ComponentNames,
  Pattern,
  Display,
  Validator,
  Message,
  ReactionField
>

const test: MyISchema = {
  'x-component': 'Input',
  'x-component-props': {
    placeholder: '',
  },
  'x-decorator': 'FormItem',
  'x-decorator-props': {
    colon: true,
  },
  properties: {
    a: {
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '',
      },
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        bordered: true,
      },
      items: {
        type: 'void',
        properties: {
          a: {
            'x-component': 'ArrayCards.Addition',
            'x-component-props': {
              title: 'add',
            },
          },
        },
      },
      properties: {
        s: {
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            // options: [],
            placeholder: '',
          },
        },
      },
    },
  },
}

// eslint-disable-next-line no-console
console.log(test)

type GetProps<T> = T extends React.FC<ReactPropsWithChildren<infer P>>
  ? P
  : never

type A = GetProps<typeof Select>

const t: A = {
  options: [],
}
