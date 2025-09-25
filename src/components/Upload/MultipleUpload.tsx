import React, { useEffect, useState } from "react";
import { type ImagePreviewerProps } from "../../interfaces/Global";
import { MdDeleteOutline } from "react-icons/md";
import { UploadIcon } from "../../assets/svg/Sidebar";

const MultipleUpload: React.FC<ImagePreviewerProps> = ({
  images,
  setImages,
}) => {
  const removeImage = (index: string) => {
    setImages(images.filter((image: string) => image !== index));
  };

  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImages((prevImages: string) => [...prevImages, base64String]);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    setSelectedImage(images?.slice(-1)[0] as string);
  }, [images]);

  return (
    <div>
      {images?.length >= 1 && (
        <div className="justify-end flex">
          <button
            type="button"
            className={`bg-negative text-white p-2 text-sm ${"cursor-pointer"} rounded-full z-100`}
            onClick={() => removeImage(selectedImage)}
          >
            <MdDeleteOutline />
          </button>
        </div>
      )}

      <label
        htmlFor="file-upload"
        className={`mt-4 flex h-40 w-full relative  flex-col items-center justify-center rounded-lg border border-dashed border-primary`}
      >
        <div className="w-[44px] h-[44px] flex justify-center items-center rounded-full">
          <UploadIcon />
        </div>
        <span className="mt-3 text-gray-500">
          {images?.length >= 1 ? (
            <div className="">
              <img
                src={
                  images?.length === 1 ? (images[0] as string) : selectedImage
                }
                className="w-full h-full absolute top-0 right-0 object-cover"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <p>
                <span className="text-primary font-bold text-sm">
                  {" "}
                  Click to upload front page
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-sm">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          )}
        </span>
        <input
          id="file-upload"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <div className="flex justify-between mt-4">
        {" "}
        <p className="items text-[12px]">
          Recommended image size: 2160 x 1080px
        </p>
        <p className="items text-[12px]">Maximum file size: 10MB</p>
        <p className="items text-[12px]">
          Supported images files size: JPEG, PNG
        </p>
      </div>
      {images?.length > 0 && (
        <div className="flex items-center gap-6">
          {images?.map((data: string, index: number) => (
            <div
              key={index}
              className="relative border-red-500 flex gap-4 cursor-pointer"
              onClick={() => setSelectedImage(data)}
            >
              {" "}
              <img
                src={data}
                className={`w-[140px] rounded-md h-[48px] object-cover ${
                  selectedImage === data && "border-primary border-2"
                } `}
              />
            </div>
          ))}
          <label
            className={`first-line:font-bold bg-[#ebf4f3] text-primary border text-[10px] rounded-md py-[15px] px-[16px] font-bold border-dashed border-primary`}
          >
            + Add New Image
            <input
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default MultipleUpload;
