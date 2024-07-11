import { getBookmarked } from "@/lib/bookmark";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import useSession from "../useSession";

export default function (videoId: string) {
    const queryClient = useQueryClient()
    const { user } = useSession()
    const fetcher = useCallback(async () => {
        return getBookmarked(user?.$id! ?? '', videoId)
    }, [user, videoId])

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['bookmark', user?.$id ?? '', videoId],
        queryFn: fetcher,
    }, queryClient)

    return {
        bookmarked: data,
        isLoading,
        isError,
        refetch
    }
}