import React from 'react';
import { observer } from "mobx-react-lite"
import QuestionView from './Question';
import QuizStore from '../Stores/QuizStore'
import { Card, List, Typography } from 'antd';
import SubmitQuiz from './SubmitQuiz'

interface Props{
    quizStore:typeof QuizStore,
    routeTo:Function
}

const QuizView = (props:Props) => {
    // const addQuestion = ()=>{
    //     quiz.addQuestion(new Question())
    // }

    return (
        <>
            <div >
                <Typography style={{textAlign:"start"}}>
                    <Typography.Title>Discover Your Perspective</Typography.Title>
                    <Typography.Paragraph>Complete the 7 min test and get a detailed report of your lenses on the world.
                    </Typography.Paragraph>

                </Typography>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
                <List
                    itemLayout="horizontal"
                    dataSource={props.quizStore.questions}
                    renderItem={item => (
                        <List.Item >
                            <QuestionView question={item} key={item.id}/>
                        </List.Item>
                    )}
                >
                    <List.Item >
                        <Card style={{ width: "100%" }}>
                            <SubmitQuiz quizStore={props.quizStore} routeTo={props.routeTo}/>
                        </Card>
                    </List.Item>
                </List>
            </div>
            <div>{props.quizStore.answered}</div>
        </>
    );
}
export default observer(QuizView);
