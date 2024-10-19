import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenWrapper = ({ children }) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? 10 : 20;
  return (
    <View style={{ flex: 1, paddingTop, backgroundColor: "white" }}>
      {children}
    </View>
  );
};
export default ScreenWrapper;
