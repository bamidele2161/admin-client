import React, { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import {
  useAddCategoryMutation,
  useAddSubCategoryMutation,
  useAddSubCategoryItemsMutation,
  useEditCategoryMutation,
  useEditSubCategoryMutation,
  useEditSubCategoryItemsMutation,
  useGetAllProductCategoryQuery,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
  useDeleteSubCategoryItemsMutation,
} from "../../../service/product";
import { toast } from "react-toastify";

// Sample data - in a real app, this would come from your Redux/API
// const categories = [
//   {
//     id: 1,
//     name: "Clothing",
//     description: "Apparel and fashion items",
//     subCategories: [
//       {
//         id: 1,
//         name: "Men's Clothing",
//         items: [
//           { id: 1, name: "T-Shirts" },
//           { id: 2, name: "Shirts" },
//           { id: 3, name: "Pants" },
//           { id: 4, name: "Jackets" },
//         ],
//       },
//       {
//         id: 2,
//         name: "Women's Clothing",
//         items: [
//           { id: 5, name: "Dresses" },
//           { id: 6, name: "Tops" },
//           { id: 7, name: "Skirts" },
//           { id: 8, name: "Jeans" },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Kids",
//     description: "Electronic devices and accessories",
//     subCategories: [
//       {
//         id: 3,
//         name: "Computers",
//         items: [
//           { id: 9, name: "Laptops" },
//           { id: 10, name: "Desktops" },
//           { id: 11, name: "Tablets" },
//         ],
//       },
//       {
//         id: 4,
//         name: "Phones",
//         items: [
//           { id: 12, name: "Smartphones" },
//           { id: 13, name: "Cases" },
//           { id: 14, name: "Chargers" },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Women",
//     description: "Items for home and kitchen use",
//     subCategories: [
//       {
//         id: 5,
//         name: "Kitchen",
//         items: [
//           { id: 15, name: "Cookware" },
//           { id: 16, name: "Utensils" },
//           { id: 17, name: "Appliances" },
//         ],
//       },
//       {
//         id: 6,
//         name: "Furniture",
//         items: [
//           { id: 18, name: "Sofas" },
//           { id: 19, name: "Tables" },
//           { id: 20, name: "Beds" },
//         ],
//       },
//     ],
//   },
// ];

const CategoryManagement = () => {
  const { data } = useGetAllProductCategoryQuery();
  const [addCategory] = useAddCategoryMutation();
  const [addSubCategory] = useAddSubCategoryMutation();
  const [addSubCategoryItem] = useAddSubCategoryItemsMutation();
  const [editCategory] = useEditCategoryMutation();
  const [editSubCategory] = useEditSubCategoryMutation();
  const [editSubCategoryItem] = useEditSubCategoryItemsMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const [deleteSubCategoryItem] = useDeleteSubCategoryItemsMutation();
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState<{
    categoryId: number;
    subCategoryId: number;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalLevel, setModalLevel] = useState("");
  const [categoryId, setCategoryid] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState(0);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState<{
    name: string;
    description?: string;
  }>({
    name: "",
    description: "",
  });

  const transformCategories = (data: any[]) => {
    return data?.map((category) => ({
      id: category?.id,
      name: category?.name,
      description: category?.description,
      subCategories: category?.subCategories?.map((sub: any) => ({
        id: sub?.id,
        name: sub?.name,
        items: sub?.items?.map((item: any) => ({
          id: item?.id,
          name: item?.name,
        })),
      })),
    }));
  };

  const categories = transformCategories(data?.data);

  const handleAddCategory = () => {
    setModalType("add");
    setModalLevel("category");
    setFormData({ name: "", description: "" });
    setShowModal(true);
  };

  const handleAddSubCategory = async (categoryId: number) => {
    setModalType("add");
    setModalLevel("subcategory");
    setEditItem({ categoryId });
    setCategoryid(categoryId);

    // const response = await addSubCategory({
    //   categoryId: categoryId,
    //   body: formData,
    // }).unwrap();
    // toast.success(response?.data?.message);
    // refetch();
    setFormData({ name: "", description: "" });
    setShowModal(true);
  };

  const handleAddItem = async (categoryId: number, subCategoryId: number) => {
    setModalType("add");
    setModalLevel("item");
    setEditItem({ categoryId, subCategoryId });
    setSubCategoryId(subCategoryId);
    // const response = await addSubCategoryItem({
    //   subCategoryId: subCategoryId,
    //   body: formData,
    // }).unwrap();
    // toast.success(response?.data?.message);
    // refetch();
    setFormData({ name: "", description: "" });
    setShowModal(true);
  };

  const handleEdit = (level: string, item: any) => {
    setModalType("edit");
    setModalLevel(level);
    setEditItem(item);

    if (level === "category") {
      setFormData({
        name: item.name,
        description: item.description,
      });
    } else if (level === "subcategory") {
      setFormData({
        name: item.name,
      });
    } else {
      setFormData({
        name: item.name,
      });
    }

    setShowModal(true);
  };

  const handleDelete = (level: string, item: any) => {
    setModalType("delete");
    setModalLevel(level);
    setEditItem(item);
    setShowModal(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalAction = async () => {
    console.log(
      `${
        modalType === "add"
          ? "Adding"
          : modalType === "edit"
          ? "Editing"
          : "Deleting"
      } ${modalLevel}`
    );

    try {
      let response;
      const requiredData = {
        name: formData.name,
        description: formData.description as string,
      };
      if (modalType === "add" && modalLevel === "category") {
        response = await addCategory(requiredData).unwrap();
      } else if (modalType === "add" && modalLevel === "subcategory") {
        response = await addSubCategory({
          categoryId: categoryId,
          body: formData,
        }).unwrap();
      } else if (modalType === "add" && modalLevel === "item") {
        response = await addSubCategoryItem({
          subCategoryId: subCategoryId,
          body: formData,
        }).unwrap();
      } else if (modalType === "edit" && modalLevel === "category") {
        response = await editCategory({
          id: editItem.id,
          body: requiredData,
        }).unwrap();
      } else if (modalType === "edit" && modalLevel === "subcategory") {
        response = await editSubCategory({
          subCategoryId: editItem.id,
          body: formData,
        }).unwrap();
      } else if (modalType === "edit" && modalLevel === "item") {
        response = await editSubCategoryItem({
          subCategoryItemId: editItem.id,
          body: formData,
        }).unwrap();
      } else if (modalType === "delete" && modalLevel === "category") {
        response = await deleteCategory(editItem.id).unwrap();
      } else if (modalType === "delete" && modalLevel === "subcategory") {
        response = await deleteSubCategory(editItem.id).unwrap();
      } else if (modalType === "delete" && modalLevel === "item") {
        response = await deleteSubCategoryItem(editItem.id).unwrap();
      }

      if (response?.error) {
        toast.error(response?.message);
      } else {
        toast.success(response?.message);
        // refetch();
      }

      setShowModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedSubCategory(null);
  };

  const toggleSubCategory = (categoryId: number, subCategoryId: number) => {
    if (
      expandedSubCategory &&
      expandedSubCategory.categoryId === categoryId &&
      expandedSubCategory.subCategoryId === subCategoryId
    ) {
      setExpandedSubCategory(null);
    } else {
      setExpandedSubCategory({ categoryId, subCategoryId });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-default">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-greyColr">
          Category Management
        </h2>
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-pryColor text-white rounded-md flex items-center hover:bg-opacity-90"
        >
          <Plus size={16} className="mr-2" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="space-y-4">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center">
                {expandedCategory === category.id ? (
                  <ChevronDown size={20} className="text-pryColor mr-2" />
                ) : (
                  <ChevronRight
                    size={20}
                    className="text-lightGreyColor mr-2"
                  />
                )}
                <span className="font-semibold text-greyColr">
                  {category.name}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddSubCategory(category.id);
                  }}
                  className="p-1 rounded text-pryColor hover:bg-pryColor-Light"
                  title="Add Subcategory"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit("category", category);
                  }}
                  className="p-1 rounded text-secColor hover:bg-secColor-Light"
                  title="Edit Category"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete("category", category);
                  }}
                  className="p-1 rounded text-negative hover:bg-negative-Light"
                  title="Delete Category"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {expandedCategory === category.id && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-sm text-lightGreyColor mb-4">
                  {category.description}
                </p>

                <div className="ml-6 space-y-3">
                  {category?.subCategories?.map((subCategory: any) => (
                    <div
                      key={subCategory.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div
                        className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                        onClick={() =>
                          toggleSubCategory(category.id, subCategory.id)
                        }
                      >
                        <div className="flex items-center">
                          {expandedSubCategory &&
                          expandedSubCategory.categoryId === category.id &&
                          expandedSubCategory.subCategoryId ===
                            subCategory.id ? (
                            <ChevronDown
                              size={18}
                              className="text-secColor mr-2"
                            />
                          ) : (
                            <ChevronRight
                              size={18}
                              className="text-lightGreyColor mr-2"
                            />
                          )}
                          <span className="font-medium text-greyColr">
                            {subCategory.name}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddItem(category.id, subCategory.id);
                            }}
                            className="p-1 rounded text-pryColor hover:bg-pryColor-Light"
                            title="Add Item"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit("subcategory", {
                                ...subCategory,
                                categoryId: category.id,
                              });
                            }}
                            className="p-1 rounded text-secColor hover:bg-secColor-Light"
                            title="Edit Subcategory"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete("subcategory", {
                                ...subCategory,
                                categoryId: category.id,
                              });
                            }}
                            className="p-1 rounded text-negative hover:bg-negative-Light"
                            title="Delete Subcategory"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {expandedSubCategory &&
                        expandedSubCategory.categoryId === category.id &&
                        expandedSubCategory.subCategoryId ===
                          subCategory.id && (
                          <div className="p-3 border-t border-gray-200 bg-gray-50">
                            <ul className="ml-6 space-y-2">
                              {subCategory?.items?.map((item: any) => (
                                <li
                                  key={item.id}
                                  className="flex justify-between items-center p-2 bg-white rounded-md"
                                >
                                  <span className="text-sm text-greyColr">
                                    {item.name}
                                  </span>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() =>
                                        handleEdit("item", {
                                          ...item,
                                          categoryId: category.id,
                                          subCategoryId: subCategory.id,
                                        })
                                      }
                                      className="p-1 rounded text-secColor hover:bg-secColor-Light"
                                      title="Edit Item"
                                    >
                                      <Edit size={14} />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDelete("item", {
                                          ...item,
                                          categoryId: category.id,
                                          subCategoryId: subCategory.id,
                                        })
                                      }
                                      className="p-1 rounded text-negative hover:bg-negative-Light"
                                      title="Delete Item"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-greyColr">
              {modalType === "add"
                ? `Add ${modalLevel}`
                : modalType === "edit"
                ? `Edit ${modalLevel}`
                : `Delete ${modalLevel}`}
            </h3>

            {modalType !== "delete" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-lightGreyColor mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                    placeholder={`Enter ${modalLevel} name`}
                  />
                </div>

                {modalLevel === "category" && (
                  <div>
                    <label className="block text-sm font-medium text-lightGreyColor mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                      placeholder="Enter category description"
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="mb-6 text-sm text-lightGreyColor">
                Are you sure you want to delete this {modalLevel}?
                {modalLevel === "category"
                  ? " This will also delete all subcategories and items within it."
                  : modalLevel === "subcategory"
                  ? " This will also delete all items within it."
                  : ""}
              </p>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleModalAction}
                className={`px-4 py-2 rounded-md text-white ${
                  modalType === "delete"
                    ? "bg-negative hover:bg-opacity-90"
                    : "bg-pryColor hover:bg-opacity-90"
                }`}
                disabled={modalType !== "delete" && !formData.name.trim()}
              >
                {modalType === "add"
                  ? "Add"
                  : modalType === "edit"
                  ? "Save Changes"
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
