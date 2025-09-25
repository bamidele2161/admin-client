import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../../components/FormInput";
import Navbar from "../../../components/Navbar/Navbar";
import {
  fashionColors,
  fashionMaterials,
  fashionSizes,
  gender,
} from "../../../util";
// import ImageUpload from "../../../components/Upload/ImageUpload";
import MultipleUpload from "../../../components/Upload/MultipleUpload";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import {
  useAddProductMutation,
  useGetAllProductCategoryQuery,
} from "../../../service/product";
import Spinner from "../../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import MultiSelectDropdown from "../../../components/FormInput/MultiSelectDropDown";

const AddProduct: React.FC = () => {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { userInfo } = useAppSelector(selectAuth);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  // const [mainImage, setMainImage] = useState<string>("");
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const { data } = useGetAllProductCategoryQuery();
  const initialValues = {
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    gender: "",
    material: "",
    stock: 0,
  };

  const onSubmit = async (formData: {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    gender: string;
    material: string;
    stock: number;
  }) => {
    try {
      const requiredData = {
        name: formData.name,
        material: formData.material,
        price: formData.price,
        gender: formData.gender,
        description: formData.description,
        sizes: sizes,
        colors: colors,
        // mainImage: mainImage,
        thumbnails: thumbnails,
        stock: formData.stock,
        vendorId: userInfo?.Vendor?.id,
        categoryId: formData.categoryId,
      };
      const response = await addProduct({
        body: requiredData,
        categoryId: formData.categoryId,
      }).unwrap();
      console.log(response);
      toast.success(response?.message || "Product added successfully!");
      resetForm({ values: initialValues });
      setColors([]);
      setSizes([]);
      // setMainImage("");
      setThumbnails([]);
      window.location.reload();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Product description is required"),
    gender: Yup.string().required("Product gender is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    categoryId: Yup.string().required("Product category is required"),
    material: Yup.string(),
    stock: Yup.number().required("Stock number is required"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const subcategoryItems = data?.data
    .flatMap((category: any) => category.subCategories)
    .flatMap((subCategory: any) => subCategory.items)
    .map((item: any) => ({ id: item.id, name: item.name }));

  return (
    <div className="">
      <Navbar title="Product Management" subtitle="Manage your products here" />

      <div className="flex p-10">
        <div className="container mx-auto p-10 bg-white rounded-lg shadow-default">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <FormInput
                id="name"
                label="Product Name"
                name="name"
                placeholder="Enter product name"
                type="text"
                onChange={handleChange}
                defaultValue={values.name}
                required
                onBlur={handleBlur}
                error={touched.name ? errors.name : undefined}
              />
              <FormInput
                id="gender"
                label="Gender"
                name="gender"
                placeholder="Enter gender"
                type="cSelect"
                selectOptions={gender}
                keyPropertyName="name"
                defaultValue={values.gender}
                valuePropertyName="name"
                required
                itemPropertyName="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.gender ? errors.gender : undefined}
              />
            </div>

            <FormInput
              id="description"
              label="Product Description"
              type="textarea"
              name="description"
              required
              placeholder="Enter product description"
              onChange={handleChange}
              defaultValue={values.description}
              onBlur={handleBlur}
              error={touched.description ? errors.description : undefined}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <FormInput
                id="material"
                label="Product material"
                name="material"
                placeholder="Enter product material"
                type="cSelect"
                selectOptions={fashionMaterials}
                keyPropertyName="name"
                searchFunc
                defaultValue={values.material}
                valuePropertyName="name"
                itemPropertyName="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.material ? errors.material : undefined}
              />
              <FormInput
                id="categoryId"
                label="Product Category"
                name="categoryId"
                placeholder="Enter product category"
                type="cSelect"
                selectOptions={subcategoryItems}
                keyPropertyName="name"
                required
                searchFunc
                defaultValue={values.categoryId === 0 ? "" : values.categoryId}
                valuePropertyName="id"
                itemPropertyName="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.categoryId ? errors.categoryId : undefined}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <MultiSelectDropdown
                label="Sizes"
                options={fashionSizes}
                onChange={(values) => setSizes(values as string[])}
              />
              <MultiSelectDropdown
                label="Colors"
                options={fashionColors}
                onChange={(values) => setColors(values as string[])}
              />
            </div>
            {/* <ImageUpload
              setDocument={setMainImage}
              isBase64={true}
              title="Main Image"
            /> */}
            <div className="flex flex-col">
              <p className="font-medium text-[#15191E] text-sm flex gap-2 items-center">
                Product Images <span className="text-base text-red-500">*</span>
              </p>
              <MultipleUpload images={thumbnails} setImages={setThumbnails} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <FormInput
                id="stock"
                label="Stock"
                name="stock"
                type="number"
                required
                placeholder="Enter stock"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.stock}
                error={touched.price ? errors.price : undefined}
              />

              <FormInput
                id="price"
                label="Product Price"
                name="price"
                type="number"
                placeholder="Enter product price"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price ? errors.price : undefined}
              />
            </div>

            <button
              type="submit"
              //   disabled={isLoading}
              className=" py-2 px-4 bg-pryColor text-white font-semibold rounded-lg hover:bg-secColor transition disabled:bg-gray-300"
            >
              {isLoading ? <Spinner /> : "    Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
