import { useGetRoomQuestions } from "@/http/use-get-room-questions";
import { QuestionItem } from "./question-item";

interface QuestionListProps {
    roomId: string;
}

export function QuestionsList({ roomId }: QuestionListProps) {
    const { data, isLoading } = useGetRoomQuestions(roomId);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                    Perguntas e Respostas
                </h2>
            </div>

            {isLoading && <div className="text-center text-muted-foreground">Carregando...</div>}

            {data?.map(question => {
                return (
                    <QuestionItem
                        key={question.id}
                        question={question}
                    />
                )
            })}

        </div>
    )
}