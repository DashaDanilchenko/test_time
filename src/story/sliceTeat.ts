import { createSlice } from "@reduxjs/toolkit";
import { exercises } from "../data";


const exercisesSlice = createSlice({
    name: 'exercises',
    initialState: {
        exercises: exercises,

    },
    
    reducers: {

        stateAnswer: (state, action) => { 
           
            state.exercises
             = state.exercises.map(exercise => {
                if (exercise.id !== action.payload.id) {
                  return exercise;
                }
                return { ...exercise,
                  answerUser: action.payload.correct,
                  task: {
                  ...exercise.task , answers: exercise.task.answers.map(answer => {
                    return answer.answer_id === action.payload.id_from_answer
                      ? {...answer, done: !action.payload.done, correct: action.payload.correct}  
                      : {...answer, done: false} 
                  })
                }
            }
                
              })
          
        },

        stateTimeAnswer(state, action) {
            state.exercises = state.exercises.map(exercise => {
                          if (exercise.id !== action.payload.id) {
                            return exercise;
                          }
                          return { ...exercise, 
                            time: 
                            `${action.payload.time.h} : 
                            ${action.payload.time.m} : 
                            ${action.payload.time.s}
                            `, create: true
                          }
                        })
        },
        
    }
})

export const {stateAnswer, stateTimeAnswer} = exercisesSlice.actions

export default exercisesSlice.reducer