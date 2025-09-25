import { type FC, useEffect, useRef, useState } from "react";
import "./style.css";
import { ArrowDownIcon } from "../../assets/svg/CustomSVGs";
interface SelectProps {
  id: string;
  label?: string;
  options?: any[];
  selectedOption?: string | number;
  setSelectedOption: (option: string) => void;
  errors?: any;
  required?: boolean;
  labelClassName?: string;
  keyPropertyName?: string | number;
  itemPropertyName?: string | number;
  valuePropertyName?: string | number;
  placeholder?: string;
  searchFunc?: boolean;
}

const Select: FC<SelectProps> = ({
  id,
  options,
  selectedOption,
  setSelectedOption,
  keyPropertyName,
  placeholder,
  itemPropertyName,
  valuePropertyName,
  searchFunc,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const dynamicSelectedOption = options?.find((item) =>
    valuePropertyName ? item?.[valuePropertyName] === selectedOption : null
  );

  const filteredOptions = options?.filter((option) =>
    option?.[itemPropertyName as any]
      ?.toLowerCase()
      ?.includes(searchTerm.toLowerCase())
  );

  return (
    <div id={id} className="customSelect" ref={popupRef}>
      <p
        className={`selectText ${isOpen ? "focused" : ""}`}
        onClick={toggleDropdown}
      >
        {selectedOption !== undefined &&
        selectedOption !== null &&
        selectedOption !== "" ? (
          <span className="text-Grey1">
            {dynamicSelectedOption
              ? dynamicSelectedOption[itemPropertyName as any]
              : selectedOption}
          </span>
        ) : (
          <span className="placeholder"> {placeholder}</span>
        )}
        <ArrowDownIcon />
      </p>
      {isOpen && (
        <>
          {searchFunc ? (
            <ul className="options">
              <div className="flex px-4 mb-6">
                <input
                  placeholder="🔍 Search"
                  className="w-full border px-2 py-1 rounded"
                  value={searchTerm}
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                />
              </div>

              <>
                {filteredOptions !== undefined &&
                filteredOptions?.length >= 1 ? (
                  <>
                    {" "}
                    {filteredOptions?.map((option) => (
                      <li
                        key={option?.[keyPropertyName as any] || option}
                        className="option"
                        onClick={() =>
                          handleOptionClick(
                            option?.[valuePropertyName as any] ?? option
                          )
                        }
                      >
                        {option?.[itemPropertyName as any] || option}
                      </li>
                    ))}
                  </>
                ) : (
                  <div className="flex justify-center items-center font-workSans text-sm pb-4">
                    Not found
                  </div>
                )}
              </>
            </ul>
          ) : (
            <ul className="options">
              {options?.map((option) => (
                <li
                  key={option?.[keyPropertyName as any] || option}
                  className="option"
                  onClick={() =>
                    handleOptionClick(
                      option?.[valuePropertyName as any] ?? option
                    )
                  }
                >
                  {option?.[itemPropertyName as any] || option}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Select;
