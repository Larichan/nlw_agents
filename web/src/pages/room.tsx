import { CreateQuestionForm } from "@/components/create-question-form";
import { QuestionsList } from "@/components/questions-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Radio } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

type RoomParams = {
    roomId: string;
}

export function Room() {

    const { roomId } = useParams<RoomParams>()

    if (!roomId) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8">
                    <div className="mb-4 flex items-center justify-between">
                        <Link to="/">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 size-4" />
                                Voltar ao início
                            </Button>
                        </Link>
                        <Link to={`/rooms/${roomId}/audio`}>
                            <Button variant="secondary" className="flex items-center gap-2">
                                <Radio className="size-4" />
                                Gravar áudio
                            </Button>
                        </Link>
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-foreground">
                        Sala de perguntas
                    </h1>
                    <p className="text-muted-foreground">
                        Faça perguntas e receba respostas com IA.
                    </p>
                </div>

                <div className="mb-8">
                    <CreateQuestionForm roomId={roomId} />
                </div>

                <QuestionsList roomId={roomId} />
            </div>
        </div>
    )
}