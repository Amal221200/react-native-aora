import { getBookmarkedPosts } from "@/lib/bookmark";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import useSession from "../useSession";

export default function () {
    const queryClient = useQueryClient()
    const { user } = useSession()
    const fetcher = useCallback(async () => {
        return getBookmarkedPosts(user?.$id! ?? '')
    }, [user])

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['bookmarks', user?.$id ?? ''],
        queryFn: fetcher,
    }, queryClient)
    
    return {
        bookmarks: data,
        isLoading,
        isError,
        refetch
    }
}