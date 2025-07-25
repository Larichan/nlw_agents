import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { CreateQuestionResponse } from "./types/create-question-response";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

export function useCreateQuestion(roomId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateQuestionRequest) => {
            const response = await fetch(`http://localhost:8080/rooms/${roomId}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result: CreateQuestionResponse = await response.json();

            return result;
        },
        onMutate({ question }) {
            const previousQuestionList = queryClient.getQueryData<GetRoomQuestionsResponse>(['get-room-questions', roomId]) ?? [];

            const newQuestion = {
                id: crypto.randomUUID(),
                question,
                answer: null,
                createdAt: new Date().toISOString(),
                isGeneratingAnswer: true,
            }

            queryClient.setQueryData<GetRoomQuestionsResponse>(['get-room-questions', roomId],
                [newQuestion, ...previousQuestionList])

            return { newQuestion, previousQuestionList }
        },
        onSuccess: (data, _variables, context) => {
            // queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] });
            queryClient.setQueryData<GetRoomQuestionsResponse>(
                ['get-room-questions', roomId],
                (questions) => {
                    if (!questions || !context.newQuestion)
                        return questions

                    return questions.map(question => {
                        if (question.id === context.newQuestion.id) {
                            return {
                                ...context.newQuestion,
                                id: data.questionId,
                                answer: data.answer,
                                isGeneratingAnswer: false,
                            }
                        }

                        return question
                    })
                }
            )
        },
        onError(_error, _variables, context) {
            if (context?.previousQuestionList) {
                queryClient.setQueryData<GetRoomQuestionsResponse>(['get-room-questions', roomId], context.previousQuestionList)
            }
        }
    })
}