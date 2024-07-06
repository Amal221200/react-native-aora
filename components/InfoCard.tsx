import { StyledText, StyledView } from './styledComponents'

const InfoCard = ({ title, subtitle, containerStyles, titleStyles }: { title: string, subtitle?: string, titleStyles?: string, containerStyles?: string }) => {
    return (
        <StyledView className={`${containerStyles}`}>
            <StyledText className={`text-center font-psemibold ${titleStyles} text-lg text-white`}>
                {title}
            </StyledText>
            {subtitle && (
                <StyledText className={`text-center font-pregular text-sm text-gray-100`}>
                    {subtitle}
                </StyledText>
            )}
        </StyledView>
    )
}

export default InfoCard