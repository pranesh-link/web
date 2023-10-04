import styled from "styled-components";
import { FlexBox, FlexBoxSection } from "../../common/Elements";
import { getRemainingCharacters } from "../../common/Utils";
import { IFormField } from "../../store/profile/types";
import { FIELD_TYPES } from "../../common/constants";
import classNames from "classnames";
import { ChangeEvent, useContext, useMemo } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ProfileContext } from "../../store/profile/context";

interface IFormFieldProps {
  field: IFormField;
  fieldValid?: boolean;
  fieldError?: string;
  fieldValue: string;
  isFormSubmit: boolean;
  updateInput: (value: string, field: string) => void;
  validateField: (value: string, field: string) => void;
}
export const FormField = (props: IFormFieldProps) => {
  const {
    field,
    fieldValid,
    fieldValue,
    fieldError,
    isFormSubmit,
    updateInput,
    validateField,
  } = props;
  const {
    data: {
      forms: { contactForm: form },
    },
  } = useContext(ProfileContext);
  const { messages } = form;

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateInput(e.target.value, field.name);
    validateField(e.target.value, field.name);
  };

  const handleMobileInputChange = (value: any) => {
    if (value) {
      updateInput(value, field.name);
      validateField(value, field.name);
    }
  };

  const errorMessage = useMemo(() => {
    let errorMessage;
    switch (fieldError) {
      case "mandatoryError":
        errorMessage = messages.mandatoryError;
        break;
      case "regexError":
      case "fieldError":
        errorMessage = field?.messages?.[fieldError] || "";
        break;
      default:
        errorMessage = "";
        break;
    }
    return errorMessage;
  }, [field.messages, fieldError, messages.mandatoryError]);

  const remainingCharacters = useMemo(
    () => getRemainingCharacters(fieldValue, field.maxLength),
    [field.maxLength, fieldValue],
  );

  console.log("fieldError", field.label, fieldError, errorMessage);
  return (
    <FieldWrap direction="column">
      <InputWrap alignItems="center">
        <FormLabel>{field.label}</FormLabel>
        {field.type === FIELD_TYPES.TEXT && (
          <>
            <TextInput
              className={classNames({
                error: fieldValid === false,
              })}
              placeholder={field.placeholder}
              disabled={isFormSubmit}
              value={fieldValue}
              maxLength={field.maxLength}
              type={field.subType ? field.subType : "text"}
              name={field.name}
              onChange={handleTextChange}
            />
          </>
        )}
        {field.type === FIELD_TYPES.MOBILE && (
          <>
            <PhoneInput
              placeholder="place holder"
              disabled={isFormSubmit}
              defaultCountry="IN"
              international
              limitMaxLength
              countryCallingCodeEditable={false}
              className={classNames("phone-input", {
                error: fieldValid === false,
              })}
              value={fieldValue}
              onChange={handleMobileInputChange}
            />
          </>
        )}
        {field.type === FIELD_TYPES.TEXTAREA && (
          <>
            <TextArea
              placeholder={field.placeholder}
              disabled={isFormSubmit}
              className={classNames({
                error: fieldValid === false,
              })}
              maxLength={field.maxLength}
              name={field.name}
              value={fieldValue}
              onChange={handleTextChange}
            />
          </>
        )}
      </InputWrap>
      <FlexBox justifyContent="flex-end" alignItems="center">
        {fieldError && <Error>{errorMessage}</Error>}
        <RemainingCharacters>
          <span
            className={classNames({
              "empty-characters": remainingCharacters === 0,
            })}
          >
            {remainingCharacters}
          </span>
          /{field.maxLength}
        </RemainingCharacters>
      </FlexBox>
    </FieldWrap>
  );
};

const FormLabel = styled.label`
  flex-basis: 30%;
  font-weight: 600;
`;

const FieldWrap = styled(FlexBoxSection)`
  margin-bottom: 20px;
  input,
  textarea {
    padding-left: 7px;
  }
  .phone-input {
    width: 100%;
    font-family: Open Sans, sans-serif !important;
    input {
      border-color: transparent;
      font-family: Open Sans, sans-serif !important;
      outline: none;
      border-radius: 5px;
      height: 25px;
      width: 100%;
      padding-left: 5px;
    }
    &.error {
      input {
      }
    }
  }
`;

const TextInput = styled.input`
  width: 100%;
  height: 25px;
  border-radius: 5px;
  border-color: transparent;
  outline: none;
  font-family: Open Sans, sans-serif !important;
  font-size: 14px;
  &.error {
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  border-radius: 5px;
  border-color: transparent;
  outline: none;
  min-height: 100px;
  font-family: Open Sans, sans-serif !important;
  font-size: 14px;
  &.error {
  }
`;

const RemainingCharacters = styled.span`
  margin-top: 5px;
  font-size: 12px;
`;

const InputWrap = styled(FlexBox)`
  width: 100%;
`;

const Error = styled.span`
  margin-top: 5px;
  font-size: 12px;
  color: #ee4b2b;
  margin-right: 10px;
  font-style: italic;
  font-weight: 600;
`;
