import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useCallback, useState } from 'react'
import { Link } from 'expo-router'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = useCallback(() => {

  }, [])

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-6 h-full min-h-[85vh] w-full flex-1 justify-center px-4">
          <Image source={images.logo} resizeMode='contain' className='h-[35px] w-[115px]' />
          <Text className="mt-10 font-psemibold text-2xl text-white">Login to Aora</Text>

          <FormField title="Email" value={formData.email} styles="mt-7" onChangeText={(value) => setFormData(current => ({ ...current, email: value }))} keyboardType={'email-address'} placeholder={'Enter your email'} />
          <FormField title="Password" value={formData.password} styles="mt-7" onChangeText={(value) => setFormData(current => ({ ...current, password: value }))} placeholder={'Enter your password'} isPassword />

          <CustomButton handlePress={handleSubmit} styles={'mt-7'} isLoading={isLoading}>
            Sign In
          </CustomButton>
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">Don't have an account?</Text>
            <Link href="/sign-up" className="font-psemibold text-lg text-secondary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn