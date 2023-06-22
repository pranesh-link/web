import styled from "styled-components";
import { FlexBox, FlexBoxSection } from "../../common/Elements";
import { getRemainingCharacters } from "../../common/Utils";
import { IFormField } from "../../store/profile/types";
import { FIELD_TYPES } from "../../common/constants";
import classNames from "classnames";
import { ChangeEvent } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface IFormFieldProps {
  field: IFormField;
  fieldValid?: boolean;
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
    isFormSubmit,
    updateInput,
    validateField,
  } = props;

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      <RemainingCharacters>
        {getRemainingCharacters(fieldValue, field.maxLength)}/{field.maxLength}
      </RemainingCharacters>
    </FieldWrap>
  );
};

const FormLabel = styled.label`
  flex-basis: 30%;
  font-weight: 600;
`;

const FieldWrap = styled(FlexBoxSection)`
  margin-bottom: 20px;
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
        border: 1px solid #ee4b2b;
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
    border: 1px solid #ee4b2b;
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
    border: 1px solid #ee4b2b;
  }
`;

const RemainingCharacters = styled.span`
  margin-top: 5px;
  font-size: 12px;
  align-self: self-end;
`;

const InputWrap = styled(FlexBox)`
  width: 100%;
`;
