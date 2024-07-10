import { createPost, } from "@/lib/posts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import useSession from "../useSession"
import { formDataProps } from "@/app/(tabs)/create"

export default function () {
    const queryClient = useQueryClient()
    const { user } = useSession()

    const fetcher = useCallback(async (data: formDataProps) => {
        return createPost({ ...data, creator: user?.$id ?? '' })
    }, [user])

    const { mutateAsync, isPending, } = useMutation({
        mutationKey: ['create_post'],
        mutationFn: fetcher,
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['all_posts'] })
            await queryClient.invalidateQueries({ queryKey: ['latest_posts'] })
            await queryClient.invalidateQueries({ queryKey: ['user_posts', user?.$id ?? ''] })
        }
    }, queryClient)

    return {
        createPost: mutateAsync,
        isPending
    }
}