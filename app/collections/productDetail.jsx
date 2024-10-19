import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { hp } from "../../helpers/common";
const { width } = Dimensions.get("window");

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${route.params.id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [route.params.id]);

  if (!product) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => navigation.goBack()}
    >
      <View style={styles.modalContainer}>
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Pressable
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons name="close" size={24} color="#333" />
            </Pressable>
            <Pressable style={styles.favoriteButton}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={24}
                color="rgba(125, 132, 232, 1)"
              />
            </Pressable>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>

            <Text style={styles.titleText}>{product.title}</Text>

            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>
                {product.rating.rate} ({product.rating.count} reviews)
              </Text>
            </View>

            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>

            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity</Text>
              <View style={styles.quantityControls}>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <MaterialCommunityIcons name="minus" size={20} color="#333" />
                </Pressable>
                <Text style={styles.quantityText}>{quantity}</Text>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <MaterialCommunityIcons name="plus" size={20} color="#333" />
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text style={styles.priceText}>
              ${(product.price * quantity).toFixed(2)}
            </Text>
          </View>
          <Pressable style={styles.addToCartButton}>
            <MaterialCommunityIcons name="cart" size={24} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  closeButton: {
    padding: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
  },
  favoriteButton: {
    padding: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
  },
  imageContainer: {
    width: width,
    height: hp(40),
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "80%",
    height: "80%",
  },
  infoContainer: {
    padding: 20,
  },
  categoryBadge: {
    backgroundColor: "rgba(125, 132, 232, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  categoryText: {
    color: "rgba(125, 132, 232, 1)",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 20,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addToCartButton: {
    flexDirection: "row",
    backgroundColor: "rgba(125, 132, 232, 1)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default ProductDetail;
