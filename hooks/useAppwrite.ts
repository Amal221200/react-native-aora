import { useCallback, useEffect, useState } from "react"

export default <T>(fetcher: (...args: Array<any>) => Promise<T>) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T | null>(null)

    const fetchData = useCallback(async (...args: Array<any>) => {
        setIsLoading(true)
        try {
            const posts = await fetcher(...args)
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

    const refetch = useCallback(async (...args: Array<any>) => {
        await fetchData(...args)
    }, [])

    return {
        data,
        isLoading,
        refetch
    }
}