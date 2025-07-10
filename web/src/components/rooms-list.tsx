import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { formatRelative } from "@/utils/format-date"
import { ArrowRight } from "lucide-react"
import { useGetRooms } from "@/http/use-get-rooms"

export function RoomList() {
    const { data, isLoading } = useGetRooms();

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Salas recentes
                </CardTitle>
                <CardDescription>
                    Acesso rápido para as salas criadas recentemente
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">

                {isLoading && <div className="text-center text-muted-foreground">Carregando...</div>}

                {data?.map(room => {
                    return <Link to={`/rooms/${room.id}`} key={room.id} className="flex items-center gap-3 justify-between p-3 rounded-lg border hover:bg-accent/50">
                        <div className="flex-1 flex flex-col gap-1">
                            <h3 className="font-medium">{room.name}</h3>

                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">{formatRelative(room.createdAt)}</Badge>
                                <Badge variant="secondary" className="text-xs">{room.questionsCount} pergunta(s)</Badge>
                            </div>
                        </div>

                        <span className="flex items-center gap-1 text-sm">
                            Entrar
                            <ArrowRight className="size-3" />
                        </span>
                    </Link>
                })}
            </CardContent>
        </Card>
    )
}