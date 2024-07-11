import { images } from '@/constants'
import { StyledImage, StyledText, StyledView } from './styledComponents'
import SearchInput from './SearchInput'
import Trending from './Trending'
import useSession from '@/hooks/useSession'
import { router, usePathname } from 'expo-router'
import { ToastAndroid } from 'react-native'
import { useCallback } from 'react'

const HomeHeader = () => {
    const pathname = usePathname()
    const { user } = useSession()
    
    const handleSearch = useCallback((query: string) => {
        if (!query) {
            return ToastAndroid.showWithGravity('Please input something to search results across database', 3, ToastAndroid.TOP)
        }
        if (pathname.startsWith('/search/')) {
            router.setParams({ query })
        } else {
            router.push(`/search/${query}`)
        }
    }, [pathname])
    
    return (
        <StyledView className="my-6 space-y-6 px-4">
            <StyledView className="mb-6 flex-row items-start justify-between gap-1">
                <StyledView>
                    <StyledText className="font-pmedium text-sm text-gray-100">Welcome Back</StyledText>
                    <StyledText className="font-psemibold text-2xl text-white">
                        {user?.username}
                    </StyledText>
                </StyledView>
                <StyledView className='mt-1.5'>
                    <StyledImage source={images.logoSmall} className="h-10 w-9" resizeMode='contain' />
                </StyledView>
            </StyledView>

            <SearchInput onSearch={handleSearch} />
            <StyledView className="w-full flex-1 pb-8 pt-5">
                <StyledText className="mb-3 font-pregular text-lg text-gray-100">
                    Latest Videos
                </StyledText>
            </StyledView>

            <Trending />
        </StyledView>
    )
}

export default HomeHeader