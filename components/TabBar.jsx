import { AntDesign, Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    index: (props) => (
      <AntDesign name="home" size={26} color="gray" {...props} />
    ),
    collections: (props) => (
      <Feather name="shopping-bag" size={26} color="black" {...props} />
    ),
    cart: (props) => (
      <Feather name="shopping-cart" size={26} color="black" {...props} />
    ),
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {icons[route.name]({
              color: isFocused ? "white" : "white",
            })}
            <Text
              style={{ color: isFocused ? "white" : "white", fontSize: 12 }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(125, 132, 232, 1)",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderColor: "rgba(255, 255, 255, 0.14)",
    borderWidth: 2,
    borderRadius: 25,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
