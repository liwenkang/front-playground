## 从一个 antd-design issue 开始

在 antd-design 的 [issue](https://github.com/ant-design/ant-design/issues/37202)
里发现的关于 Form.List 的问题

bug 复现步骤: 当 `Form` 上 `preserve={false}` 且不传入 `isListField` 时: 先新增
N 项, 然后填上数值,删除第 M 项,则 M~N 的数值被清空.

[链接](https://codesandbox.io/s/ltqr15),把 `demo.js` 中替换为下面的代码即可

```js
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

const App = () => {
  return (
    <Form
      name='dynamic_form_nest_item'
      preserve={false}
      autoComplete='off'
    >
      <Form.List name='users'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align='baseline'
              >
                {JSON.stringify(restField)}
                {/* "isListField":true,"fieldKey":8 */}
                <Form.Item
                  // {...restField}
                  // isListField={true} // 注释 1
                  name={[name, 'first']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing first name',
                    },
                  ]}
                >
                  <Input placeholder='First Name' />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
```

是否可以考虑将 isListField, 固定写在
ant-design/components/form/FormItem/index.tsx 239 行,也就是不从 props 取值呢?

```js
  return (
    <Field
      {...props}
      isListField
      messageVariables={variables}
      trigger={trigger}
      validateTrigger={mergedValidateTrigger}
      onMetaChange={onMetaChange}
    >)
```

从结果来看,确实解决了问题,也就是说,在使用 `Form` 表单, `preserve` 设置了 false
时, 使用`Form.List`, `Form.Item` 要按照官方的示例,将 `restField` 传入
`Form.Item`, 也就是把 `isListField={true}` 传进去 ,接下来我们来看看为什么会这样.

触发这个问题的条件有两个

```
1. <Form preserve={false} />
2. 不给 <Form.Item /> 传递 isListField
```

在查看 antd 源码时,可以看到 Form 是基于
[rc-field-form](https://github.com/react-component/field-form) 实现的

那么在 rc-field-form 内部,是如何存储已经输入的值? `preserve` 和 `isListField` 属
性又是如何影响存储的呢?

在 field-form/src/Field.tsx 文件下 623 行附近,我们可以看到这么一段

```js
function WrapperField<Values = any>({
  name,
  ...restProps
}: FieldProps<Values>) {
  const fieldContext = React.useContext(FieldContext);

  const namePath = name !== undefined ? getNamePath(name) : undefined;

  let key: string = 'keep';
  if (!restProps.isListField) {
    key = `_${(namePath || []).join('_')}`;
  }

  // 未完...
}
```

也就是说,当我们传了 `isListField` 时, key 的值将会维持为 `'keep'`, 当传入
`isListField` 时, `key` 将会根据 `namePath` 生成

为了方便演示,我们改造了一下 `field-form/docs/examples/basic.tsx` 这个文件为

```tsx
import Form, { Field } from 'rc-field-form';
import React from 'react';
import Input from './components/Input';
import { Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default () => {
  return (
    <Form
      name='dynamic_form_nest_item'
      preserve={false}
      autoComplete='off'
    >
      <Form.List name='users'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align='baseline'
              >
                {JSON.stringify(restField)}
                {/* "isListField":true */}
                <Field
                  // {...restField}
                  isListField={true} // 注释 1
                  name={[name, 'first']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing first name',
                    },
                  ]}
                >
                  <Input placeholder='First Name' />
                </Field>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Field>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Field>
          </>
        )}
      </Form.List>
      <Field>
        <Button
          type='primary'
          htmlType='submit'
        >
          Submit
        </Button>
      </Field>
    </Form>
  );
};
```

这时, `WrapperField` 中,传入的 `name` 就是 [0, 'first'], `namePath` 就是 [0,
'first'], `key` 在不传入 `isListField` 时,生成的 key 就变成了 `_0_first`,
`_1_first`, 此时也就没有了保留数据的功能,那么为什么 `key` 为 `keep` 的时候,会记
忆数据呢?

在 `Field` 的 `render` 方法中,我们发现传入 `isListField` 时,当删除一条数据时,只
会发生一次重新 `render` 而不传入 `isListField` 时,会触发两次 `render`, 且第一次
`render` 时,还可以从 `returnChildNode.props.value` 上看到之前填入的数据,第二次就
清空了

```js
  public render() {
    const { resetCount } = this.state;
    const { children } = this.props;

    const { child, isFunction } = this.getOnlyChild(children);

    // Not need to `cloneElement` since user can handle this in render function self
    let returnChildNode: React.ReactNode;
    if (isFunction) {
      returnChildNode = child;
    } else if (React.isValidElement(child)) {
      returnChildNode = React.cloneElement(
        child as React.ReactElement,
        this.getControlled((child as React.ReactElement).props),
      );
    } else {
      warning(!child, '`children` of Field is not validate ReactElement.');
      returnChildNode = child;
    }

    return <React.Fragment key={resetCount}>{returnChildNode}</React.Fragment>;
  }
```

接下来我们看下,点击 删除 后,代码究竟做了什么?

(PS: 在 `field-form/src/Field.tsx` 文件下 ,我发现有一段注释,表达了 preserve =
false 时, 如果存在相互依赖展示的 field(A,B,C), 那么如果删一个 A,就要清空 B,C, 所
以回到 antd 最初的这个 issue ,这里的清空数据,也存在它适用的场景,但是我暂时不清楚
如何在 Form.List 搞出 互相依赖的 Field)

(PPS: 所以这不是一个 bug,而是一个 feature)

```js
switch (info.type) {
  // ...

  /**
   * In case field with `preserve = false` nest deps like:
   * - A = 1 => show B
   * - B = 1 => show C
   * - Reset A, need clean B, C
   */
  case 'remove': {
    if (shouldUpdate) {
      this.reRender();
      return;
    }
    break;
  }

  // ...
}
```
