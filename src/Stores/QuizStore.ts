import { makeAutoObservable, action } from "mobx"

class QuizStore{
    constructor() {
        makeAutoObservable(this)
    }
    loadQuestions(){
        //better be in a separate api module but put it here just for simplicity
        fetch('http://localhost:3000/questions')
        .then(res=>res.json())
        .then(action("success",res=>{
            this.questions = res.map((q:Question)=>new Question(q))
        }))
    }
    questions:Array<Question> = []
    result:QuizResult | null= null
    touched:Boolean = false
    touch(){
        this.touched = true;
        this.questions.forEach(q=>{q.touch()})
    }
    get questionsCount(){
        return this.questions.length
    }
    addQuestion(q:Question){
        this.questions.push(q)
    }
    get answered(){
        return this.questions.filter(question=>question.answered).length + "/" + this.questionsCount
    }
    submit(email:string){
        this.touch()
        let questions = this.questions.map(q=>({id:q.id,answer:q.answer}))
        let userEmail = email;
        let promise = new Promise((resolve,reject)=>{
            //not in a separate file just for simplicity
            fetch('http://localhost:3000/submissions',{
                method:"POST",
                body:JSON.stringify({questions,userEmail}),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res=>{
                if (res.status != 200){
                    resolve("error")
                }
                return res.json();
            })
            .then(action("success",res=>{
                this.result = {dimensionsDetails: res.result.dimensions_details, finalResult: res.result.final_result}
                resolve("success")
            }))
            .catch(err=>{
                reject(err)
            })

        })
        return promise
    }
}
export class Question{
    constructor(questionData:Question) {
        makeAutoObservable(this);
        Object.assign(this,questionData)
    }
    touched:Boolean = false
    id=''
    answered = false
    text = ""
    dimension = "EI"
    direction = 1
    meaning = "I"
    answer:Number = 0
    setAnswer(answer:Number){
        this.answer = answer
        this.answered = true
    }
    touch(){
        this.touched = true
    }
}

interface QuizResult{
    finalResult:String,
    dimensionsDetails: DimensionsDetails
}
interface DimensionsDetails{
    EI:Array<Number>,
    SN:Array<Number>,
    TF:Array<Number>,
    JP:Array<Number>
}
export default new QuizStore()