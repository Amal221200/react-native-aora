import { useCallback, useEffect, useState } from "react"

export default <T>(fetcher: (...args: any[]) => Promise<T>) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T | null>(null)

    const fetchData = useCallback(async (...args: any[]) => {
        setIsLoading(true)
        try {
            const posts = await fetcher(...args)
            
            setData(posts)
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }, [fetcher])

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const refetch = useCallback(async (...args: any[]) => {
        await fetchData(...args)
    }, [fetchData])

    return {
        data,
        isLoading,
        refetch
    }
}