import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {

  return (
    <View
      className="flex-1 items-center justify-center"
    >
      <Text className="font-pblack text-4xl">
        Aora
      </Text>
      <Link href="/home">
        Home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
