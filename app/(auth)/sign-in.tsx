import { ToastAndroid } from 'react-native'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useCallback, useContext, useState } from 'react'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/users'
import { StyledImage, StyledSafeAreaView, StyledScrollView, StyledText, StyledView } from '@/components/styledComponents'
import { SessionContext, TSessionContext } from '@/components/providers/SessionProvider'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { setIsLoggedIn, setUser } = useContext(SessionContext) as TSessionContext

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = useCallback(async () => {
    const { email, password } = formData

    if (!email || !password) {
      return ToastAndroid.showWithGravity('Please enter all the fields', 5, ToastAndroid.BOTTOM)
    }

    try {
      setIsLoading(true)
      await signIn(email, password)
      const user = await getCurrentUser()
      setIsLoggedIn(true)
      setUser(user)
      router.replace('/home')
    } catch (error) {
      ToastAndroid.showWithGravity('Something went wrong', 5, ToastAndroid.BOTTOM)
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }, [formData, setIsLoggedIn, setUser])

  return (
    <StyledSafeAreaView className="h-full bg-primary">
      <StyledScrollView>
        <StyledView className="my-6 h-full min-h-[85vh] w-full flex-1 justify-center px-4">
          <StyledImage source={images.logo} resizeMode='contain' className='h-[35px] w-[115px]' />
          <StyledText className="mt-10 font-psemibold text-2xl text-white">Login to Aora</StyledText>

          <FormField title="Email" value={formData.email} styles="mt-7" onChangeText={(value) => setFormData(current => ({ ...current, email: value }))} keyboardType={'email-address'} placeholder={'Enter your email'} />
          <FormField title="Password" value={formData.password} styles="mt-7" onChangeText={(value) => setFormData(current => ({ ...current, password: value }))} placeholder={'Enter your password'} isPassword />

          <CustomButton handlePress={handleSubmit} styles={'mt-7'} isLoading={isLoading}>
            Sign In
          </CustomButton>
          <StyledView className="flex-row justify-center gap-2 pt-5">
            <StyledText className="font-pregular text-lg text-gray-100">
              Don't have an account?
            </StyledText>
            <Link href="/sign-up" className="font-psemibold text-lg text-secondary">
              Sign Up
            </Link>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  )
}

export default SignIn