import 'react-native-url-polyfill/auto'
import { images } from "@/constants";
import { router, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useContext } from 'react';
import { SessionContext } from '@/components/providers/SessionProvider';

export default function Index() {
  const session = useContext(SessionContext)

  if(session.isLoading){
    return null
  }

  if(session.isLoggedIn){
    return <Redirect href="/home" /> 
  }
  
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{
        height: '100%'
      }}>
        <View className="w-full flex-1 items-center justify-center px-4">
          <Image source={images.logo} className="h-[84px] w-[130px]" resizeMode="contain" />

          <Image source={images.cards} className="h-[300px] w-full" resizeMode="contain" />

          <View className="relative mt-5">
            <Text className="text-center text-3xl font-bold text-white">
              Discover Endless Possibilities with{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image source={images.path} className="absolute -bottom-2 -right-10 h-[15px] w-[136px]" resizeMode="contain" />
          </View>

          <Text className="mt-7 text-center font-pregular text-sm text-gray-100">
            Where creativity meets innovation: embark a journey of limitless exploration with Aora
          </Text>

          <CustomButton handlePress={() => { router.push('/sign-in') }} styles={'mt-7 w-full'}>
            Continue with email
          </CustomButton>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
