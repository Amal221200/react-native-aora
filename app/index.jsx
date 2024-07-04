import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { Link, router, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
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

          <CustomButton handlePress={()=> {router.push('/sign-in')}}style={{width: '100%', marginTop: 28}}>
            <Text className="font-psemibold text-lg text-primary">
              Continue with email
            </Text>
          </CustomButton>
        </View>
      </ScrollView>
      
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
