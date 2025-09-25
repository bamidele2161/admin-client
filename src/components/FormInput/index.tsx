import { type IFormInputProps } from "../../interfaces/Global";
import Select from "../Select/Select";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const FormInput = ({
  className,
  label,
  type,
  id,
  name,
  onChange,
  onBlur,
  shortP,
  icon,
  placeholder,
  required,
  disabled,
  defaultValue,
  error,
  // sublabel,
  selectOptions,
  keyPropertyName,
  itemPropertyName,
  valuePropertyName,
  searchFunc,
  onlyCountries,
  defaultCountry,
  telValue,
}: IFormInputProps) => {
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleShowPassword = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTelChange = (value: string) => {
    if (onChange)
      onChange({
        target: {
          name: name,
          value: value,
        },
      });
  };

  return (
    <div className={`${error ? "" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="labelClassName font-inter">
          <span>{label}</span>
          {required ? <span className="required"> * </span> : ""}{" "}
          {/* <span>{sublabel}</span> */}
        </label>
      )}

      <div className="input">
        {icon && <span>{icon}</span>}
        {type === "cSelect" ? (
          <Select
            id={id}
            options={selectOptions}
            selectedOption={defaultValue}
            setSelectedOption={(option: any) =>
              onChange &&
              onChange({
                target: {
                  name: id,
                  value: option,
                },
              })
            }
            errors={error}
            placeholder={placeholder}
            searchFunc={searchFunc}
            keyPropertyName={keyPropertyName}
            itemPropertyName={itemPropertyName}
            valuePropertyName={valuePropertyName}
          />
        ) : type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            rows={2}
            onChange={onChange}
            onBlur={onBlur}
            className={error ? "errors form-controls" : "form-controls"}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
          ></textarea>
        ) : type === "tel" ? (
          <PhoneInput
            country={defaultCountry || "us"}
            value={telValue}
            onChange={handleTelChange}
            inputProps={{
              name: name,
              required: required,
            }}
            containerStyle={{ borderRadius: "10px !important" }}
            inputClass={
              error
                ? "errors  form-controls  !pl-[48px]"
                : " form-controls !rounded-md !pl-[48px]"
            }
            // containerClass={
            //   error
            //     ? 'errors  form-controls !px-0 '
            //     : ' form-controls !px-0 '
            // }
            buttonClass="bg-[transparent]"
            onBlur={onBlur}
            onlyCountries={onlyCountries}
            disabled={disabled}
          />
        ) : type === "password" ? (
          <div className="relative">
            <input
              id={id}
              name={name}
              type={showPassword[id] ? "text" : "password"}
              onChange={onChange}
              onBlur={onBlur}
              className={error ? "errors form-controls" : "form-controls"}
              placeholder={placeholder}
              disabled={disabled}
              defaultValue={defaultValue}
            />{" "}
            <span
              className="absolute right-6 top-[35%] cursor-pointer"
              onClick={() => handleShowPassword(id)}
            >
              {showPassword[id] ? (
                <BsFillEyeSlashFill color="var(--Grey2)" />
              ) : (
                <BsFillEyeFill color="var(--Grey2)" />
              )}
            </span>
          </div>
        ) : (
          <>
            <input
              id={id}
              name={name}
              type={type}
              onChange={onChange}
              onBlur={onBlur}
              className="form-controls"
              placeholder={placeholder}
              disabled={disabled}
              defaultValue={defaultValue}
            />
          </>
        )}
      </div>
      {error && <p className="errorMsg">{error}</p>}
      {shortP && <p className="shortP">{shortP}</p>}
    </div>
  );
};

export default FormInput;
