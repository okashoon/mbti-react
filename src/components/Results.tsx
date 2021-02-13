import { Card, Col, Progress, Row, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import { observer } from 'mobx-react-lite';
import React from 'react';
import QuizStore from '../Stores/QuizStore';

function DetailedResult(props:any){
    let {dimensionsDetails} = props
    const getDirection = (dimensionResult:Array<Number>, swapped:Boolean)=>{
        let [left,right] = dimensionResult 
        if(swapped){ //to handle EI as it reads IE in the UI
            [right,left] = dimensionResult
        }
        if (left >right ){ 
            return "ltr"
        }
        if (left === right){
            if (swapped){
                return "rtl"
            }
            return "ltr"
        }
        return "rtl"
    }
    let dimensions = [
        {name:"EI",left:"Introversion(I)",right:"Extraversion(E)", swapped: true},
        {name:"SN",left:"Sensing(S)",right:"Intuition(N)", swapped: false},
        {name:"TF",left:"Thinking(T)",right:"Feeling(F)", swapped: false},
        {name:"JP",left:"Judging(J)",right:"Percieving(P)", swapped: false},
    ]
    return (
        <>
            {dimensions.map((dimension) => (
                <Row key={dimension.name}>
                    <Col span={6}>
                        <span>{dimension.left}</span>
                    </Col>
                    <Col span={12}>
                        <Progress className={"mbti-progress"} percent={50} showInfo={false} strokeWidth={15} style={{ direction: getDirection(dimensionsDetails[dimension.name], dimension.swapped) }} />
                    </Col>
                    <Col span={6}>
                        <span>{dimension.right}</span>
                    </Col>
                </Row>
            )
            )}

        </>

    )
}
function Results(props: {quizStore: typeof QuizStore, routeTo:Function}) {
    if(!props.quizStore.result){
        return (<div>Should answer all questions and submit</div>)
    }
    return (
        <div>
            <Card>
                <Row>
                    <Col span={12}>
                        <Title level={4}>
                            Your Perspective

                        </Title>
                        <Title level={5}>
                            Your Perspective type is {props.quizStore.result && props.quizStore.result.finalResult}
                        </Title>
                    </Col>
                    <Col span={12}>
                        <DetailedResult dimensionsDetails={props.quizStore.result&&props.quizStore.result.dimensionsDetails}/>
                    </Col>
                </Row>
            </Card>
            <button onClick={()=>{props.routeTo("quiz")}}>Back</button>
        </div>
    );
}
export default observer(Results);