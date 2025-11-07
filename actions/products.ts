"use server";
import db from "@/lib/db";
import { ProductResponse2, ProductTypes2 } from "@/types";
import { Product } from "./product-server";
export interface ProductResponse {
  data: ProductTypes[];
  nextCursor?: string | null;
  hasMore: boolean;
}
export interface ProductTypes {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  productPrice: number;
  salePrice: number;
  tags: string[];
}

export async function getAllProducts() {
  try {
    const products = await db.product.findMany({
      where:{
        isActive:true
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subCategory: true,
        category: true,
      },
    });
   
    const filterPrdts=products.filter((prdt)=>prdt.productStock > 1)
    return filterPrdts;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function searchFetch() {
  try {
    const products = await db.product.findMany({
      where:{
        isActive:true
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subCategory: true,
        category: true,
      },
    });
       return products;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProducts() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subCategory: true,
        category: true,
      },
    });
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// export async function createProduct(data:any) {
//   try {
//     const {
//       barcode,
//       categoryId,
//       description,
//       subCategoryId,
//       isActive,
//       isWholesale,
//       productCode,
//       productPrice,
//       salePrice,
//       sku,
//       slug,
//       tags,
//       title,
//       type,
//       unit,
//       wholesalePrice,
//       wholesaleQty,
//       productStock,
//       qty,
//       productImages,
//     } = data;
//     //Check if this product already exists in the db
//     const existingProduct = await db.product.findUnique({
//       where: {
//         slug,
//       },
//     });
//     if (existingProduct) {
//       return {
//         data: null,
//         message: `Product ( ${title})  already exists in the Database`,
//         status: 409,
//       };
//     }
//     const newProduct = await db.product.create({
//       data: {
//         barcode,
//         categoryId,
//         description,
//         subCategoryId,
//         productImages,
//         imageUrl: productImages[0],
//         isActive,
//         isWholesale,
//         productCode,
//         productPrice: parseFloat(productPrice),
//         salePrice: parseFloat(salePrice),
//         sku,
//         slug,
//         tags,
//         title,
//         type,
//         unit,
//         wholesalePrice: parseFloat(wholesalePrice),
//         wholesaleQty: parseInt(wholesaleQty),
//         productStock: parseInt(productStock),
//         qty: parseInt(qty),
//         // category: {
//         //   connect: { id: categoryId },
//         // },
//         // user: {
//         //   connect: { id: farmerId },
//         // },
//       },
//     });
//     // console.log(newProduct);
//     return newProduct;
//   } catch (error) {
//     console.log(error);
//   }
// }

interface SearchResults {
  products: Product[]
  categories: {
    title: string
    slug: string
    imageUrl: string
  }[]
}

export async function searchItems(query: string): Promise<SearchResults> {
  if (!query) {
    return {
      products: [],
      categories: []
    }
  }

  try {
    // Search products
    const products = await db.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ],
        isActive: true,

        productStock: {
          gt: 1, 
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        productPrice: true,
        salePrice: true,
        category: {
          select: {
            title: true
          }
        }
      },
      take: 8
    })

    // Search categories
    const categories = await db.category.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive'
        }
      },
      select: {
        title: true,
        slug: true,
        imageUrl: true
      },
      take: 4
    })

    return {
      products: products.map(product => ({
        ...product,
        category: product.category?.title
      })),
      categories
    }
  } catch (error) {
    console.error('Search error:', error)
    return {
      products: [],
      categories: []
    }
  }
}

export async function updateExistingProducts() {
  try {
    const products = await db.product.findMany();
    const results = {
      success: 0,
      failed: 0,
      errors: [] as { id: string; error: string }[]
    };

    for (const product of products) {
      try {
        // Validate prices
        if (typeof product.productPrice !== 'number' || typeof product.salePrice !== 'number') {
          throw new Error('Invalid price values');
        }

        const hasDiscount = product.productPrice > product.salePrice;
        const discount = hasDiscount 
          ? Number(((product.productPrice - product.salePrice) / product.productPrice * 100).toFixed(2))
          : null;

        await db.product.update({
          where: { id: product.id },
          data: {
            isDiscount: hasDiscount,
            discount: discount
          }
        });
        
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          id: product.id,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      }
    }

    // Log results for monitoring
    console.log('Update Results:', {
      totalProcessed: products.length,
      ...results
    });

    if (results.failed > 0) {
      throw new Error(`Failed to update ${results.failed} products. Check logs for details.`);
    }

    return results;
  } catch (error) {
    console.error('Error updating products:', error);
    throw error;
  }
}