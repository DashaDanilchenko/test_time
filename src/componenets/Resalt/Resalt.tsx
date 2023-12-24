import { PropsAccordion } from "../../interface"

interface PropsResalt {
    exercise: PropsAccordion
}

export const Resalt = ({exercise}: PropsResalt) => {

const {time, answerUser, task} = exercise

    return (
        <div>
<p>{task.context}
<span>
    {answerUser
    ? '+'
    : '-'
}</span>
</p>
<p>{time}</p>
        </div>
    )
}