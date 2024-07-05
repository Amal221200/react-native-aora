import { View, Text, Image } from 'react-native'
import { images } from '../constants'
import CustomButton from "../components/CustomButton"
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="items-center justify-center px-4">
            <Image source={images.empty} resizeMode='contain' className="h-[215px] w-[270px]" />
            <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
            <Text className="mt-2 font-psemibold text-xl text-white">{title}</Text>

            <CustomButton handlePress={() => { router.push('/create') }} styles="w-full my-5">
                Create a video
            </CustomButton>
        </View>
    )
}

export default EmptyState