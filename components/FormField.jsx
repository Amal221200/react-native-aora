import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { icons } from '../constants'

const FormField = ({ title, value, styles, isPassword, ...props }) => {
    const [secured, setSecured] = useState(isPassword)

    return (
        <View className={`space-y-2 ${styles}`}>
            <Text className="text-base text-gray-200">
                {title}
            </Text>
            <View className="h-16 w-full flex-row items-center rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
                <TextInput value={value} className="w-full flex-1 font-psemibold text-white" placeholderTextColor="#7b7b8b" secureTextEntry={secured} {...props} />

                {
                    isPassword && (
                        <TouchableOpacity className="z-10" onPress={() => setSecured(current => !current)}>
                            <Image source={secured ? icons.eye : icons.eyeHide} className="h-7 w-7" />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

export default FormField