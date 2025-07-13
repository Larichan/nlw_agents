import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCreateQuestion } from "@/http/use-create-question";

const createQuestionSchema = z.object({
    question: z.string().min(1, "Pergunta é obrigatória")
        .min(10, "Pergunta deve ter pelo menos 10 caracteres")
        .max(500, "Pergunta deve ter no máximo 500 caracteres"),
})

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

type QuestionFormProps = {
    roomId: string;
};

export function CreateQuestionForm({ roomId }: QuestionFormProps) {

    const { mutateAsync: createQuestion } = useCreateQuestion(roomId);

    const createQuestionForm = useForm<CreateQuestionFormData>({
        resolver: zodResolver(createQuestionSchema),
        defaultValues: {
            question: "",
        }
    })

    async function handleCreateQuestion(data: CreateQuestionFormData) {
        await createQuestion(data)
        createQuestionForm.reset();
    }

    const { isSubmitting } = createQuestionForm.formState

    return (
        <Card>
            <CardHeader>
                <CardTitle>Fazer uma pergunta</CardTitle>
                <CardDescription>Digite sua pergunta abaixo para receber uma resposta gerada por IA</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createQuestionForm}>
                    <form className="flex flex-col gap-4" onSubmit={createQuestionForm.handleSubmit(handleCreateQuestion)}>
                        <FormField
                            control={createQuestionForm.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sua pergunta</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            className="min-h-[100px]"
                                            placeholder="O que gostaria de saber?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isSubmitting} type="submit">Enviar pergunta</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}