import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { icons } from '../constants'

const SearchInput = ({ title, value, ...props }) => {

    return (
        <View className={`h-16 w-full flex-row items-center rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary space-x-4`}>
            <TextInput value={value} className="mt-0.5 flex-1 font-pregular text-base text-white" placeholderTextColor="#7b7b8b" placeholder='Search for a video' />
            <TouchableOpacity className="z-10">
                <Image source={icons.search} resizeMode='contain' className="h-5 w-5"/>
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput