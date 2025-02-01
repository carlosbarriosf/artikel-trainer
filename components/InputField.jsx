import React, { forwardRef } from "react";
import { FaCircleInfo } from "react-icons/fa6";

const InputField = forwardRef((props, ref) => {
  const {
    name,
    value,
    required = false,
    placeholder,
    minLength,
    maxLength,
    onChange,
    onBlur,
    setIsInfoHovered,
    isInfoHovered,
    infoText,
    formStatus,
  } = props;

  const inputRef = ref || React.createRef();

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <label
        htmlFor="article"
        className="justify-self-center self-center md:justify-self-end capitalize"
      >
        {name}
      </label>
      <div className="w-3/4 max-w-md relative">
        <div className="flex items-center gap-2">
          <input
            type="text"
            name={name}
            required={required}
            ref={inputRef}
            placeholder={placeholder}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            className="justify-self-start rounded-md border border-indigo-500 px-2 py-1 text-sm w-full max-w-64 bg-white"
            onChange={onChange}
            onBlur={onBlur}
          />
          <div
            className="relative text-indigo-500 cursor-pointer"
            onMouseEnter={() => {
              setIsInfoHovered((prevState) => ({
                ...prevState,
                [name]: true,
              }));
            }}
            onMouseLeave={() => {
              setIsInfoHovered((prevState) => ({
                ...prevState,
                [name]: false,
              }));
            }}
          >
            <FaCircleInfo />
            {isInfoHovered[name] && (
              <p
                className={`'appear absolute text-xs w-48 sm:w-64 bg-gray-700 text-white p-2 right-0 bottom-8 z-10 rounded-lg bg-opacity-95`}
              >
                {infoText}
              </p>
            )}
          </div>
        </div>
        {formStatus[name] === false && (
          <p className={`text-red-500 absolute text-xs mt-1`}>
            Does not fit the format
          </p>
        )}
      </div>
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
