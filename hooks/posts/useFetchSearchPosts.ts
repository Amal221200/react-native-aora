import { getQueryPosts } from "@/lib/posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export default function (searchQuery: string) {
    const queryClient = useQueryClient()
    const fetcher = useCallback(async () => {
        return getQueryPosts(searchQuery)
    }, [searchQuery])

    const { data, isLoading, isError,refetch } = useQuery({
        queryKey: ['search_posts', searchQuery],
        queryFn: fetcher,
    }, queryClient)

    return {
        posts: data,
        isLoading,
        isError,
        refetch
    }
}