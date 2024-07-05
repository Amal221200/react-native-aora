import { Image, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import { icons } from "../../constants"

const TabIcon = ({ icon, color, focused, name }) => {
  return (
    <View className="items-center gap-1">
      <Image source={icon}
        tintColor={color}
        className="h-5 w-5"
        resizeMode='contain'
      />
      <Text className={`text-xs ${focused ? 'font-psemibold' : 'font-pregular'}`}
        style={{ color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#ffa001',
      tabBarInactiveTintColor: '#cdcde0',
      tabBarStyle: {
        backgroundColor: '#161622',
        borderTopWidth: 1,
        borderTopColor: '#232533',
        height: 84,
      }
    }}>
      <Tabs.Screen name='home' options={{
        title: 'Home',
        tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} icon={icons.home} name="Home" />
      }} />
      <Tabs.Screen name='create'
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} icon={icons.plus} name="Create" />
        }} />
      <Tabs.Screen name='bookmark'
        options={{
          title: 'Bookmark',
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} icon={icons.bookmark} name="Bookmark" />
        }} />
      <Tabs.Screen name='profile' options={{
        title: 'Profile',
        tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} icon={icons.profile} name="Profile" />
      }} />
    </Tabs>
  )
}

export default TabsLayout