import React from 'react';
import {Form, Input, Button} from 'antd';
import { observer } from 'mobx-react-lite';

function SubmitQuiz(props:any){
    const [form] = Form.useForm();
    const onFinish = (e:any)=>{
        let email = form.getFieldValue("email")
        props.quizStore.submit(email)
        .then((res:any)=>{
            props.routeTo("results")
        })
        .catch((err:any)=>{
            console.log(err)
        })
    }
    const onFinishFailed = (e:any)=>{
        console.log(e)

    }
    return (
        <Form
            form={form}
            labelCol= {{ span: 24} }
            wrapperCol= {{span: 24}}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            
            >
            <Form.Item
                style={{width:"100%"}}
                label={<div style={{textAlign:"center", width:"100%"}}>Email</div>}
                name="email"
                rules={[{ required: true, message: 'Please input your Email!', type:"email" }]}
            >
                <Input />
            </Form.Item>


            <Form.Item >
                <Button onClick={form.submit}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default observer(SubmitQuiz)