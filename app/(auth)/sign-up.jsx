import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useCallback, useState } from 'react'
import { Link } from 'expo-router'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = useCallback(() => {

  }, [])

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-6 h-full min-h-[85vh] w-full flex-1 justify-center px-4">
          <Image source={images.logo} resizeMode='contain' className='h-[35px] w-[115px]' />
          <Text className="mt-10 font-psemibold text-2xl text-white">Create your account</Text>

          <FormField title="Username" value={formData.username} styles="mt-10" onChangeText={(value) => setFormData(current => ({ ...current, username: value }))} placeholder={'Enter your username'} />
            
          <FormField title="Email" value={formData.email} styles="mt-7" onChangeText={(value) => setFormData(current => ({ ...current, email: value }))} keyboardType={'email-address'} placeholder={'Enter your email'} />
            
          <FormField title="Password" value={formData.password} styles="mt-7" onChangeText={(value) => setFormData(current => ({ ...current, password: value }))} placeholder={'Enter your password'} isPassword />

          <CustomButton handlePress={handleSubmit} styles={'mt-7'} isLoading={isLoading}>
            Sign Up
          </CustomButton>
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">Already have an account?</Text>
            <Link href="/sign-in" className="font-psemibold text-lg text-secondary">Log In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp