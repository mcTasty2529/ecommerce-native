import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";
const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarLabel: "Home",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          headerTitle: "Collections",
          tabBarLabel: "Collections",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerTitle: "Cart",
          tabBarLabel: "Cart",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
};
export default _layout;
