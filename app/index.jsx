import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../helpers/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Homepage = () => {
  const navigation = useNavigation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products (limiting to 5 items)
    fetch("https://fakestoreapi.com/products?limit=5")
      .then((response) => response.json())
      .then((data) => setFeaturedProducts(data));

    // Fetch recent products (limiting to 4 items)
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((response) => response.json())
      .then((data) => setRecentProducts(data));
  }, []);

  const categories = [
    {
      id: 1,
      name: "Electronics",
      icon: "laptop",
      color: "rgba(125, 132, 232, 0.15)",
    },
    {
      id: 2,
      name: "Jewelry",
      icon: "diamond-stone",
      color: "rgba(139, 231, 122, 0.15)",
    },
    {
      id: 3,
      name: "Men's",
      icon: "tshirt-crew",
      color: "rgba(255, 183, 77, 0.15)",
    },
    {
      id: 4,
      name: "Women's",
      icon: "hanger",
      color: "rgba(240, 98, 146, 0.15)",
    },
  ];

  const renderFeaturedItem = (item) => (
    <Pressable
      key={item.id.toString()}
      style={({ pressed }) => [
        styles.featuredCard,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.featuredImage}
        resizeMode="contain"
      />
      <View style={styles.featuredTextContainer}>
        <Text numberOfLines={2} style={styles.featuredTitle}>
          {item.title}
        </Text>
        <Text style={styles.featuredPrice}>${item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.headerTitle}>Find your style</Text>
          </View>
          <Pressable style={styles.cartButton}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={24}
              color="rgba(125, 132, 232, 1)"
            />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
          >
            {featuredProducts.map((item) => renderFeaturedItem(item))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <Pressable
                key={category.id.toString()}
                style={[
                  styles.categoryCard,
                  { backgroundColor: category.color },
                ]}
              >
                <MaterialCommunityIcons
                  name={category.icon}
                  size={32}
                  color="rgba(125, 132, 232, 1)"
                />
                <Text style={styles.categoryText}>{category.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.recentSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Products</Text>
            <Pressable onPress={() => navigation.navigate("collections")}>
              <Text style={styles.seeAllText}>See All</Text>
            </Pressable>
          </View>
          <View style={styles.recentGrid}>
            {recentProducts.map((item) => (
              <Pressable key={item.id.toString()} style={styles.recentCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.recentImage}
                  resizeMode="contain"
                />
                <Text numberOfLines={1} style={styles.recentTitle}>
                  {item.title}
                </Text>
                <Text style={styles.recentPrice}>${item.price}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  cartButton: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  featuredContainer: {
    paddingRight: 20,
  },
  featuredCard: {
    width: width * 0.7,
    height: hp(25),
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 16,
    overflow: "hidden",
  },
  featuredImage: {
    width: "100%",
    height: "65%",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  featuredTextContainer: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(125, 132, 232, 1)",
    marginTop: 4,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    aspectRatio: 1.5,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: "rgba(125, 132, 232, 1)",
    fontWeight: "600",
  },
  recentSection: {
    marginBottom: 24,
  },
  recentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recentCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
  },
  recentImage: {
    width: "100%",
    height: 120,
    marginBottom: 8,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  recentPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(125, 132, 232, 1)",
    marginTop: 4,
  },
});

export default Homepage;
