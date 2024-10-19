import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import { hp, wp } from "../../helpers/common";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const Collections = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const renderProduct = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.productCard,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
      onPress={() => navigation.navigate("productDetail", { id: item.id })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <Pressable style={styles.favoriteButton}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={20}
            color="rgba(125, 132, 232, 1)"
          />
        </Pressable>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category.split(" ")[0]}</Text>
        </View>
        <Text numberOfLines={2} style={styles.titleText}>
          {item.title}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>${item.price}</Text>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {item.rating.rate} ({item.rating.count})
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Collections</Text>
            <Text style={styles.headerSubtitle}>
              {filteredProducts.length} items
            </Text>
          </View>
          <Pressable style={styles.filterButton}>
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="rgba(125, 132, 232, 1)"
            />
          </Pressable>
        </View>

        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.productsRow}
        />
      </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  filterButton: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  productsList: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  productsRow: {
    justifyContent: "space-between",
  },
  productCard: {
    width: (width - 48) / 2,
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 4,
    marginVertical: 8,
    overflow: "hidden",
    elevation: 3,
  },
  imageContainer: {
    height: hp(18),
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
  detailsContainer: {
    padding: 12,
  },
  categoryBadge: {
    backgroundColor: "rgba(125, 132, 232, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  categoryText: {
    color: "rgba(125, 132, 232, 1)",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  titleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(125, 132, 232, 1)",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
});

export default Collections;
