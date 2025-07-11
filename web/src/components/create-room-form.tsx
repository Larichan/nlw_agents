import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useCreateRoom } from "@/http/use-create-room";

const createRoomSchema = z.object({
    name: z.string().min(3, { message: "Inclua no mínimo 3 caracteres" }),
    description: z.string(),
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {

    const { mutateAsync: createRoom } = useCreateRoom();

    const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    async function handleCreateRoom(data: CreateRoomFormData) {
        const { name, description } = data
        await createRoom({ name, description });
        createRoomForm.reset();
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="mb-4">
                <CardTitle>
                    Criar sala
                </CardTitle>
                <CardDescription>
                    Crie uma nova sala para começar a fazer perguntas e receber respostas.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
                        <FormField
                            control={createRoomForm.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Nome da sala</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite um nome para a sala" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={createRoomForm.control}
                            name="description"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Descrição da sala</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Criar Sala
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}