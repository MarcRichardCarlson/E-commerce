import { addDoc, collection, getDocs, doc, deleteDoc, 
updateDoc, arrayUnion, arrayRemove, getDoc, query, where,} from "firebase/firestore";

import { Auth, UserCredential, createUserWithEmailAndPassword, 
signInWithEmailAndPassword, User } from "firebase/auth";

import { auth } from '../firebase/config';
import { db } from "../firebase/config";
import 'firebase/auth';



/*Register User*/
const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth as Auth, email, password);

    const user = userCredential.user;
    console.log('User registered:', user);
    return userCredential;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};



/*Login User*/
const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth as Auth, email, password);

    const user = userCredential.user;
    console.log('User logged in:', user);
    return userCredential;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};



/*Create Products*/
async function createProduct(productData: Product): Promise<void> {
    try {
      const productsCollectionRef = collection(db, "products");
      await addDoc(productsCollectionRef, productData);
      console.log("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
}
  


/*Get Products*/
const getProducts = async (): Promise<Product[]> => {
    try {
      const productsCollectionRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsCollectionRef);
  
      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        const product = doc.data() as Product;
        productsData.push(product);
      });
  
      return productsData;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
};


/*Get Product By Id*/
const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const productDocRef = doc(db, 'products', productId);
    const productDocSnapshot = await getDoc(productDocRef);

    if (productDocSnapshot.exists()) {
      const productData = productDocSnapshot.data() as Product;
      return productData;
    } else {
      // Product with the given ID does not exist
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};


/*Delete Product*/
async function deleteProduct(productId: string): Promise<void> {
    try {
      const productDocRef = doc(db, 'products', productId);
      await deleteDoc(productDocRef);
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
}

/*Price formater*/
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD", style: "currency"})
function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number)
}




const productsService = {
  getProducts,
  getProductById,
  createProduct,
  loginUser,
  registerUser,
  formatCurrency,
  deleteProduct,
};

export default productsService;