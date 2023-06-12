import { Form, Input } from 'antd'
import React from 'react'

const FormQuestionBanks = ({form}) => {
  return (
    <Form form={form} layout="vertical">
    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
      <Input placeholder="Enter name" />
    </Form.Item>
    <Form.Item label="Major" name="major" rules={[{ required: true }]}>
      <Input placeholder="Enter major" />
    </Form.Item>
    <Form.Item label="Class Grade" name="classGrade" rules={[{ required: true }, { pattern: new RegExp("^([0-9]*)$"), message: "Input must be only number" }]}>
      <Input placeholder="Enter class grade" />
    </Form.Item>
  </Form>
  )
}

export default FormQuestionBanks