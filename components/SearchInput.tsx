import { icons } from '../constants'
import { StyledImage, StyledTextInput, StyledTouchableOpacity, StyledView } from './styledComponents'

const SearchInput = ({ value }: {  value: string }) => {

    return (
        <StyledView className={`h-16 w-full flex-row items-center space-x-4 rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary`}>
            <StyledTextInput value={value} className="mt-0.5 flex-1 font-pregular text-base text-white" placeholderTextColor="#7b7b8b" placeholder='Search for a video' />
            <StyledTouchableOpacity className="z-10">
                <StyledImage source={icons.search} resizeMode='contain' className="h-5 w-5" />
            </StyledTouchableOpacity>
        </StyledView>
    )
}

export default SearchInput