import { useState } from 'react'
import { icons } from '../constants'
import { StyledImage, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from './styledComponents'
import { TextInputProps } from 'react-native'

interface FormFieldProps extends TextInputProps {
    title: string,
    value: string,
    styles?: string,
    isPassword?: boolean
}

const FormField = ({ title, value, styles, isPassword, ...props }: FormFieldProps) => {
    const [secured, setSecured] = useState(isPassword)

    return (
        <StyledView className={`space-y-2 ${styles}`}>
            <StyledText className="text-base text-gray-200">
                {title}
            </StyledText>
            <StyledView className="h-16 w-full flex-row items-center rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
                <StyledTextInput value={value} className="w-full flex-1 font-psemibold text-white" placeholderTextColor="#7b7b8b" secureTextEntry={secured} {...props} />

                {
                    isPassword && (
                        <StyledTouchableOpacity className="z-10" onPress={() => setSecured(current => !current)}>
                            <StyledImage source={secured ? icons.eye : icons.eyeHide} className="h-7 w-7" />
                        </StyledTouchableOpacity>
                    )
                }
            </StyledView>
        </StyledView>
    )
}

export default FormField