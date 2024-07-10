import 'react-native-url-polyfill/auto'
import { images } from "@/constants";
import { router, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { StyledImage, StyledSafeAreaView, StyledScrollView, StyledText, StyledView } from '@/components/styledComponents';
import useSession from '@/hooks/useSession';

export default function Index() {
  const { isLoading, user } = useSession()

  if (isLoading) {
    return null
  }
  
  if (user) {
    return <Redirect href="/home" />
  }

  return (
    <StyledSafeAreaView className="h-full bg-primary">
      <StyledScrollView contentContainerStyle={{
        height: '100%'
      }}>
        <StyledView className="w-full flex-1 items-center justify-center px-4">
          <StyledImage source={images.logo} className="h-[84px] w-[130px]" resizeMode="contain" />

          <StyledImage source={images.cards} className="h-[300px] w-full" resizeMode="contain" />

          <StyledView className="relative mt-5">
            <StyledText className="text-center text-3xl font-bold text-white">
              Discover Endless Possibilities with{' '}
              <StyledText className="text-secondary-200">Aora</StyledText>
            </StyledText>

            <StyledImage source={images.path} className="absolute -bottom-2 -right-10 h-[15px] w-[136px]" resizeMode="contain" />
          </StyledView>

          <StyledText className="mt-7 text-center font-pregular text-sm text-gray-100">
            Where creativity meets innovation: embark a journey of limitless exploration with Aora
          </StyledText>

          <CustomButton handlePress={() => { router.push('/sign-in') }} styles={'mt-7 w-full'}>
            Continue with email
          </CustomButton>
        </StyledView>
      </StyledScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </StyledSafeAreaView>
  );
}
