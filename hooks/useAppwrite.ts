import { useCallback, useEffect, useState } from "react"

export default <T>(fetcher: () => Promise<T>) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T | null>(null)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        try {
            const posts = await fetcher()
            setData(posts)
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = useCallback(() => {
        fetchData()
    }, [])

    return {
        data,
        isLoading,
        refetch
    }
}