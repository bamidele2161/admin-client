import React, { type Dispatch, type SetStateAction, useState } from "react";
import { UploadIcon } from "../../assets/svg/Sidebar";

interface ImageUploadProps {
  title?: string;
  required?: boolean;
  setDocument: Dispatch<SetStateAction<any>>;
  isBase64: boolean;
  bulkUpload?: boolean;
  name?: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  title,
  required,
  setDocument,
  isBase64,
  bulkUpload,
  name,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      if (isBase64) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result as string;
          setDocument(base64String);
        };

        reader.readAsDataURL(selectedFile);
      } else {
        setFile(selectedFile);
        setDocument(selectedFile);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {bulkUpload ? (
        <></>
      ) : (
        <div className="flex justify-between items-center">
          <p className="font-medium text-[#15191E] text-sm flex gap-2 items-center">
            {title}
            {required ? <em className="required text-xl"> * </em> : ""}{" "}
          </p>
        </div>
      )}

      <label
        htmlFor={name}
        className="mt-4 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-dashed border-primary border-2"
      >
        <div className="flex justify-center flex-col items-center ">
          <UploadIcon />

          <span className="mt-3 text-greyColr items-center flex flex-col gap-2">
            {file?.name ? (
              file?.name
            ) : (
              <>
                <p className="font-medium text-lightGreyColor text-sm">
                  Drag & drop files or
                  <span className="underline text-secColor"> Browse</span>{" "}
                </p>
                <p className="font-normal text-xs text-lightGreyColor">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </>
            )}
          </span>
        </div>
        <input
          id={name}
          type="file"
          accept="*"
          name={name}
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
