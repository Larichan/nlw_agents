import { z } from "zod/v4";

const createQuestionSchema = z.object({
    question: z.string().min(1, "Pergunta é obrigatória")
        .min(10, "Pergunta deve ter pelo menos 10 caracteres")
        .max(500, "Pergunta deve ter no máximo 500 caracteres"),
})

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

type QuestionFormProps = {
    roomId: string;
};

export function QuestionForm({ roomId }: QuestionFormProps) {
    return (
        <div>Question Form</div>
    )
}