

// import { revalidatePath } from "next/cache";
import { deleteAllProductFromCart, deleteProductFromCart, UpdateCartCount } from "./cartAction";

export async function updateCartCountAction(id: string, count: number) {
    // revalidatePath("/cart");
  return await UpdateCartCount(id, Number(count) );
}

export async function deleteItemAction(id: string) {
    // revalidatePath("/cart");
     const data = await deleteProductFromCart(id)

  return data;
}

export async function deleteItemActionAll() {
    // revalidatePath("/cart");
     const data = await deleteAllProductFromCart()

  return data;
}