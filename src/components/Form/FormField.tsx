import styled from "styled-components";
import { FlexBox, FlexBoxSection } from "../../common/Elements";
import { getRemainingCharacters } from "../../common/Utils";
import { IFormField } from "../../store/profile/types";
import { FIELD_TYPES } from "../../common/constants";
import classNames from "classnames";
import { ChangeEvent } from "react";

interface IFormFieldProps {
  field: IFormField;
  fieldValid?: boolean;
  fieldValue: string;
  updateInput: (value: string, field: string) => void;
  validateField: (value: string, field: string) => void;
}
export const FormField = (props: IFormFieldProps) => {
  const { field, fieldValid, fieldValue, updateInput, validateField } = props;

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateInput(e.target.value, field.name);
    validateField(e.target.value, field.name);
  };

  return (
    <FieldWrap>
      <FormLabel>{field.label}</FormLabel>
      <InputWrap direction="column">
        {field.type === FIELD_TYPES.TEXT && (
          <>
            <TextInput
              className={classNames({
                error: fieldValid === false,
              })}
              value={fieldValue}
              maxLength={field.maxLength}
              type={field.subType ? field.subType : "text"}
              name={field.name}
              onChange={handleOnChange}
            />
            <RemainingCharacters>
              {getRemainingCharacters(fieldValue, field.maxLength)}/
              {field.maxLength}
            </RemainingCharacters>
          </>
        )}
        {field.type === FIELD_TYPES.TEXTAREA && (
          <>
            <TextArea
              className={classNames({
                error: fieldValid === false,
              })}
              maxLength={field.maxLength}
              name={field.name}
              value={fieldValue}
              onChange={handleOnChange}
            />
            <RemainingCharacters>
              {getRemainingCharacters(fieldValue, field.maxLength)}/
              {field.maxLength}
            </RemainingCharacters>
          </>
        )}
      </InputWrap>
    </FieldWrap>
  );
};

const FormLabel = styled.label`
  flex-basis: 30%;
  font-weight: 600;
`;

const FieldWrap = styled(FlexBoxSection)`
  margin-bottom: 20px;
`;

const TextInput = styled.input`
  width: 100%;
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
  resize: none;
  width: 100%;
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
