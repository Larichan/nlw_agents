import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

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

    const form = useForm<CreateQuestionFormData>({
        resolver: zodResolver(createQuestionSchema),
        defaultValues: {
            question: "",
        }
    })

    function handleCreateQuestion(data: CreateQuestionFormData) {
        //TODO: Implement question creation logic
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Fazer uma pergunta</CardTitle>
                <CardDescription>Digite sua pergunta abaixo para receber uma resposta gerada por IA</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleCreateQuestion)}>
                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sua pergunta</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="min-h-[100px]"
                                            placeholder="O que gostaria de saber?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Enviar pergunta</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}