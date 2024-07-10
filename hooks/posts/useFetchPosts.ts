import { getAllPosts } from "@/lib/posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export default function () {
    const queryClient = useQueryClient()
    const fetcher = useCallback(async () => {
        return getAllPosts()
    }, [])

    const { data, isLoading, isError,refetch } = useQuery({
        queryKey: ['all_posts'],
        queryFn: fetcher,
    }, queryClient)

    return {
        posts: data,
        isLoading,
        isError,
        refetch
    }
}