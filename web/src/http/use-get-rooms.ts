import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/get-rooms-response";

export function useGetRooms() {
    return useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8080/rooms');
            const result: GetRoomsResponse = await response.json();

            return result;
        }
    })
}