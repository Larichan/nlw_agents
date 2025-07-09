import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom";

type GetRoomsAPIResponse = Array<{
    id: string;
    name: string;
}>

export function CreateRoom() {
    const { data, isLoading } = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch('https://localhost:8080/rooms');
            const result: GetRoomsAPIResponse = await response.json();

            return result;
        }
    });

    return (
        <div>
            <div>Create Room</div>

            {isLoading ? <div>Loading...</div> :

                <div className="flex flex-col gap-1">
                    {data?.map(room => (
                        <Link to={`/room/${room.id}`} key={room.id}>
                            {room.name}
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}