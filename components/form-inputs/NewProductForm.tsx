"use client";
import { generateSlug } from "@/lib/generateSlug";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import ToggleInput from "./ToggleInput";
import SubmitButton from "./SubmitButton";
import TextareaInput from "./TextAreaInput";
import SelectInput from "./SelectInput";
import ArrayItemsInput from "./ArrayItemsInput";
import ImageUploader from "./ImageUploader";
import FormSelectInput from "./FormSelectInput";
import { ICategory } from "@/actions/category";
import { toast } from "sonner";
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-products";
import { IProduct } from "@/actions/product-server";
import { Option } from "react-tailwindcss-select/dist/components/type";
import { updateExistingProducts } from "@/actions/products";
import DiscountToggle from "./discount-toogle";

interface ProductFormProps {
  categories: ICategory[];
  subCategories: any[];
  departments: any[];
  updateData?: Partial<IProduct>;
}

export default function ProductForm({
  categories,
  subCategories,
  updateData,
  departments
}: ProductFormProps) {
  const router = useRouter();
  const { createProduct, isCreating } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();
  const [productImages, setProductImages] = useState<string[]>(
    updateData?.productImages ?? []
  );
  const [tags, setTags] = useState<string[]>(updateData?.tags ?? []);
  const [hasDiscount, setHasDiscount] = useState<boolean>(
    updateData ? updateData.isDiscount ?? false : false
  );

  // States for filtered options
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // New states for FormSelectInput
  const [selectedMainCategory, setSelectedMainCategory] = useState<Option | null>(
    updateData?.departmentId 
      ? { 
          value: updateData.departmentId.toString(), 
          label: departments.find(d => d.id === updateData.departmentId)?.title || '' 
        } 
      : null
  );

  const [selectedCategory, setSelectedCategory] = useState<Option | null>(
    updateData?.categoryId
      ? { 
          value: updateData.categoryId.toString(), 
          label: categories.find(c => c.id === updateData.categoryId)?.title || '' 
        } 
      : null
  );

  const [selectedSubCategory, setSelectedSubCategory] = useState<Option | null>(
    updateData?.subCategoryId
      ? { 
          value: updateData.subCategoryId.toString(), 
          label: subCategories.find(sc => sc.id === updateData.subCategoryId)?.title || '' 
        } 
      : null
  );
  const validateSalePrice = (value: number) => {
    const productPrice = watch('productPrice');
    if (hasDiscount && value >= productPrice) {
      return "Sale price must be less than product price";
    }
    return true;
  };
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      isWholesale: false,
      productPrice: updateData?.productPrice || 0,
      salePrice: updateData?.salePrice || 0,
      ...updateData,
    },
  });
  const isWholesale = watch("isWholesale");
  const productTypeOptions = [
    { id: "topdeals", title: "Top Deals" },
    // { id: "featured", title: "Featured" },
    // { id: "flash", title: "Flash" },
  ];
  // Modify department change effect
  useEffect(() => {
    if (selectedMainCategory?.value) {
      const deptCategories = categories.filter(
        category => category.departmentId === selectedMainCategory.value
      );
      setFilteredCategories(deptCategories);
      
      // Reset category and subcategory selections only in create mode
      if (!updateData) {
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setFilteredSubCategories([]);
      }
    }
  }, [selectedMainCategory, categories, updateData]);

  // Handle category change effect
  useEffect(() => {
    if (selectedCategory?.value) {
      const catSubCategories = subCategories.filter(
        subCategory => subCategory.categoryId === selectedCategory.value
      );
      setFilteredSubCategories(catSubCategories);
      
      if (!updateData) {
        setSelectedSubCategory(null);
      }
    }
  }, [selectedCategory, subCategories, updateData]);

  async function onSubmit(data: any) {
    try {
      // Validate selections
      if (!selectedMainCategory?.value) {
        toast.error("Please select a department");
        return;
      }
  
      if (!selectedCategory?.value) {
        toast.error("Please select a category");
        return;
      }
  
      if (filteredSubCategories.length > 0 && !selectedSubCategory?.value) {
        toast.error("Please select a subcategory");
        return;
      }
  
      // Validate prices
      const productPrice = Number(data.productPrice);
      const salePrice = hasDiscount ? Number(data.salePrice) : productPrice;
  
      if (isNaN(productPrice) || productPrice <= 0) {
        toast.error("Invalid product price");
        return;
      }
  
      if (hasDiscount) {
        if (isNaN(salePrice) || salePrice <= 0) {
          toast.error("Invalid sale price");
          return;
        }
        if (salePrice >= productPrice) {
          toast.error("Sale price must be less than product price");
          return;
        }
      }
  
      // Calculate discount
      const discount = hasDiscount 
        ? Number(((productPrice - salePrice) / productPrice * 100).toFixed(2))
        : null;
  
      const productData = {
        ...data,
        slug: generateSlug(data.title),
        productCode: generateUserCode("LLP", data.title),
        isDiscount: hasDiscount,
        discount,
        salePrice,
        productPrice,
        productStock: Number(data.productStock),
        imageUrl: productImages[0] || "https://utfs.io/f/aa568418-002c-40a1-b13f-a0fd7eef1353-9w6i5v.svg",
        productImages: productImages.length > 0 
          ? productImages 
          : ["https://utfs.io/f/aa568418-002c-40a1-b13f-a0fd7eef1353-9w6i5v.svg"],
        tags,
        qty: 1,
        departmentId: selectedMainCategory.value,
        categoryId: selectedCategory.value,
        subCategoryId: selectedSubCategory?.value || null,
      };
  
      if (updateData?.id) {
        const { id, ...updateFields } = productData;
        await updateProduct({ id: updateData.id, product: updateFields });
      } else {
        await createProduct(productData);
       }
  
      reset();
      setProductImages([]);
      setTags([]);
      router.push("/dashboard/products");
      router.refresh();
  
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } 
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'
    >
      <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
        <TextInput
          label='Product Title'
          name='title'
          register={register}
          errors={errors}
            className='w-full'
        />
         <SelectInput
          label='Product Type'
          name='type'
          register={register}
          errors={errors}
          className='w-full'
          options={productTypeOptions}
        />

         <DiscountToggle
  label='Enable Discount'
  name='isDiscount'
  trueTitle='Enabled'
  falseTitle='Disabled'
  checked={hasDiscount}
  onChange={(e) => {
    setHasDiscount(e.target.checked);
    if (!e.target.checked) {
      setValue('salePrice', watch('productPrice'));
    } else {
      setValue('salePrice', 0); 
    }
  }}
/>
        <TextInput
          label='Product Price (Before Discount)'
          name='productPrice'
          type='number'
          register={register}
          errors={errors}
          className='w-full'
        />
        {hasDiscount && (
  <TextInput
    label='Sale Price (Discounted)'
    name='salePrice'
    register={register}
    rules={{
      required: "Sale price is required when discount is enabled",
      min: { value: 0, message: "Sale price cannot be negative" },
      validate: validateSalePrice
    }}
    errors={errors}
    type='number'
    className='w-full'
  />
)}
        {/* <TextInput
          label='Product Sale Price(Discounted)'
          name='salePrice'
          register={register}
          errors={errors}
          type='number'
          className='w-full'
        /> */}
 
        <TextInput
          label='Product Stock'
          name='productStock'
          register={register}
          errors={errors}
          type='number'
          className='w-full'
        />
        <TextInput
          label='Unit of Measurement(eg Kilograms)'
          name='unit'
          register={register}
          errors={errors}
          className='w-full'
        />
     
      <FormSelectInput
     label="Main Departments"
     options={departments
      .filter(dept => dept && dept.id && dept.title)
      .map(dept => ({
        value: dept.id.toString(), 
        label: dept.title || ''
      }))
    }
     option={selectedMainCategory}
     setOption={setSelectedMainCategory}
     toolTipText="Select Department"
     href="/dashboard/departments/new"
       />
           {(filteredCategories.length > 0 || updateData) && (
          <FormSelectInput
            label="Categories"
            options={
              (filteredCategories.length > 0 
                ? filteredCategories 
                : categories
              )
              .filter(cat => cat && cat.id && cat.title)
              .map(cat => ({
                value: cat.id.toString(),
                label: cat.title || ''
              }))
            }
            
            option={selectedCategory}
            setOption={setSelectedCategory}
            toolTipText="Select Category"
            href="/dashboard/categories/new"
            labelShown={true}
          />
        )}
 {(filteredSubCategories.length > 0 || updateData) && (
          <FormSelectInput
            label="Subcategories"
            options={
              (filteredSubCategories.length > 0 
                ? filteredSubCategories 
                : subCategories
              )
              .filter(subCat => subCat && subCat.id && subCat.title)
              .map(subCat => ({
                value: subCat.id.toString(),
                label: subCat.title || ''
              }))
            }
            
            option={selectedSubCategory}
            setOption={setSelectedSubCategory}
            toolTipText="Select Subcategory"
            href="/dashboard/sub-categories/new"
            labelShown={true}
          />
        )}
    
        <ToggleInput
          label='Supports Wholesale Selling'
          name='isWholesale'
          trueTitle='Supported'
          falseTitle='Not Supported'
          register={register}
        />
      
        {isWholesale && (
          <>
            <TextInput
              label='Wholesale Price'
              name='wholesalePrice'
              register={register}
              errors={errors}
              type='number'
              className='w-full'
            />
            <TextInput
              label='Minimum Wholesale Qty'
              name='wholesaleQty'
              register={register}
              errors={errors}
              type='number'
              className='w-full'
            />
          </>
        )}

       
       <ImageUploader
          imageUrls={productImages}
          setImageUrls={setProductImages}
          endpoint='multipleProductsUploader'
          label='Product Images'
        />
        <ArrayItemsInput setItems={setTags} items={tags} itemTitle='Tag' />

        <TextareaInput
          label='Product Description'
          name='description'
          register={register}
          errors={errors}
        />
        <ToggleInput
          label='Publish your Product'
          name='isActive'
          trueTitle='Active'
          falseTitle='Draft'
          register={register}
        />
      </div>

      <div className="mt-6">
         <SubmitButton
          isLoading={isCreating || isUpdating}
          buttonTitle={updateData?.id ? "Update Product" : "Create Product"}
          loadingButtonTitle={`${updateData?.id ? "Updating" : "Creating"} Product...`}
        />
      </div>
    </form>
  );
}