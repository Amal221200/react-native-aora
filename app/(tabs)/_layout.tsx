import { ImageSourcePropType, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import { icons } from "../../constants"
import { StyledImage, StyledText, StyledView } from '@/components/styledComponents'

const TabIcon = ({ icon, color, focused, name }: { icon: ImageSourcePropType, color: string, focused?: boolean, name: string }) => {
  return (
    <StyledView className="items-center gap-1">
      <StyledImage source={icon}
        tintColor={color}
        className="h-5 w-5"
        resizeMode='contain'
      />
      <StyledText className={`text-xs ${focused ? 'font-psemibold' : 'font-pregular'}`}
        style={{ color }}>
        {name}
      </StyledText>
    </StyledView>
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