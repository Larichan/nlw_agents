import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface Question {
    id: string;
    question: string;
    answer: string;
    createdAt: string;
}

interface QuestionItemProps {
    question: Question;
}

export function QuestionItem({ question }: QuestionItemProps) {
    const isGenerating = !question.answer;

    return (
        <Card>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center rounded-full bg-primary/10 size-8">
                                <MessageSquare className="size-4 text-primary" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="mb-1 font-medium text-foreground">
                                Pergunta
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}