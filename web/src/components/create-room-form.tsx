import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function CreateRoomForm() {
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
                <form action="" className="flex flex-col gap-4">

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Criar Sala
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}