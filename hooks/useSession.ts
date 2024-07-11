import { getCurrentUser } from "@/lib/users"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { useCallback } from "react"

export default function (){
    const queryClient = useQueryClient()

    const fetcher = useCallback(async () => {
        return getCurrentUser()
    }, [])

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['session'],
        queryFn: fetcher,
    }, queryClient)

    if(!isLoading && !isError && !data?.$id){
        router.replace('/sign-in')
        return {
            user: null,
            isLoading,
            isError,
            refetch
        }
    }

    return {
        user: data,
        isLoading,
        isError,
        refetch
    }
}