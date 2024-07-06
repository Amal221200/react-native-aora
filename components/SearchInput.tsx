import { router, usePathname } from 'expo-router'
import { icons } from '../constants'
import { StyledImage, StyledTextInput, StyledTouchableOpacity, StyledView } from './styledComponents'
import { useState } from 'react'
import { ToastAndroid } from 'react-native'

const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery ?? '');

    return (
        <StyledView className={`h-16 w-full flex-row items-center space-x-4 rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary`}>
            <StyledTextInput value={query} className="mt-0.5 flex-1 font-pregular text-base text-white" placeholderTextColor="#cdcde0" placeholder='Search for a video' onChangeText={(value) => setQuery(value)} />
            <StyledTouchableOpacity className="z-10" onPress={() => {
                if (!query) {
                    return ToastAndroid.showWithGravity('Please input something to search results across database', 3, ToastAndroid.TOP)
                }

                if (pathname.startsWith('/search/')) {
                    router.setParams({ query })
                } else {
                    router.push(`/search/${query}`)
                }
            }}>
                <StyledImage source={icons.search} resizeMode='contain' className="h-5 w-5" />
            </StyledTouchableOpacity>
        </StyledView>
    )
}

export default SearchInput