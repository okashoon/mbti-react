import React from 'react';
// import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import { Card, Radio } from 'antd';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';


const  QuestionView = (props: any)=>{
    return (
        <Card style={{ width: "100%",borderColor:  props.question.touched && !props.question.answered ? "red":"" }} bordered>
            <Title level={5}>{props.question.text}</Title>
            <Text type="danger">Disagree</Text>
            <Radio.Group onChange={(e)=>{props.question.setAnswer(e.target.value)}} value={props.question.answer}>
                {[1,2,3,4,5,6,7].map(n=><Radio style={{marginLeft:20, marginRight:20}} value={n} key={n}></Radio>)}

            </Radio.Group>
            <Text type="success">Agree</Text>
        </Card>
    );
}
export default observer(QuestionView);
