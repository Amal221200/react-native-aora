import { View, Text, ScrollView, Image, ToastAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useCallback, useState } from 'react'
import { Link, router } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = useCallback(async () => {
    const { email, password } = formData
    console.log(email, password, "Helo");
    if (!email || !password) {
      return ToastAndroid.showWithGravity('Please enter all the fields', 5, ToastAndroid.BOTTOM)
    }
    try {
      setIsLoading(true)
      const result = await signIn(email, password)

      router.replace('/home')
    } catch (error) {
      ToastAndroid.showWithGravity('Something went wrong', 5, ToastAndroid.BOTTOM)
      console.log(error);
    } finally {
      setIsLoading(false)
    }
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