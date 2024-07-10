import {  StyledText, StyledView } from './styledComponents'

const BookmarkHeader = () => {

    return (
        <StyledView className="my-6 space-y-6 px-4">
            <StyledView className="mb-6 flex-row items-start justify-between gap-1">
                <StyledText className='font-psemibold text-3xl text-white'>
                    Saved Videos
                </StyledText>
            </StyledView>
        </StyledView>
    )
}

export default BookmarkHeader