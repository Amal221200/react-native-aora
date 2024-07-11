import { images } from '../constants'
import CustomButton from "./CustomButton"
import { StyledImage, StyledText, StyledView } from './styledComponents'

const EmptyState = ({ title, subtitle, text, action }: { title: string, subtitle: string, text: string, action: ()=> void }) => {
    return (
        <StyledView className="items-center justify-center px-4">
            <StyledImage source={images.empty} resizeMode='contain' className="h-[215px] w-[270px]" />
            <StyledText className="font-pmedium text-sm text-gray-100">{subtitle}</StyledText>
            <StyledText className="mt-2 font-psemibold text-xl text-white">{title}</StyledText>

            <CustomButton handlePress={action} styles="w-full my-5">
               {text}
            </CustomButton>
        </StyledView>
    )
}

export default EmptyState