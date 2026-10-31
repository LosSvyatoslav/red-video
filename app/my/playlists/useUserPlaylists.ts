import { playlistService } from "@/services/playlist.service copy";
import { useQuery } from "@tanstack/react-query";

export function useUserPlaylists() {
    return useQuery({
        queryKey: ['playlists'],
        queryFn: () => playlistService.getUserPlaylists()
    })

}