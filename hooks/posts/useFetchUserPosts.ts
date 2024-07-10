import { getUserPosts } from "@/lib/posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import useSession from "../useSession";

export default function () {
    const queryClient = useQueryClient()
    const { user } = useSession()

    const fetcher = useCallback(async () => {
        return getUserPosts(user?.$id ?? '')
    }, [user])

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['user_posts', user?.$id?? ''],
        queryFn: fetcher,
    }, queryClient)

    return {
        posts: data,
        isLoading,
        isError,
        refetch
    }
}