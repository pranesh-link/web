import { FlexBox } from "../../../common/Elements";
import {
  getRemainingCharacters,
  isStringBooleanRecord,
} from "../../../common/Utils";
import { IFormField } from "../../../store/profile/types";
import { FIELD_TYPES } from "../../../common/constants";
import classNames from "classnames";
import { useContext, useMemo } from "react";
import "react-phone-number-input/style.css";
import "react-phone-number-input/style.css";
import { ProfileContext } from "../../../store/profile/context";
import { isMobile } from "react-device-detect";
import {
  FieldWrap,
  InputWrap,
  FieldLabel,
  RemainingCharacters,
  Error,
} from "./Elements";
import { TextField } from "../fields/TextField";
import { TextAreaField } from "../fields/TextAreaField";
import { MobileField } from "../fields/MobileField";
import { CheckboxField } from "../fields/CheckboxField";
import { getErrorMessage } from "../Utils";

interface IFormFieldProps {
  field: IFormField;
  fieldValid?: boolean;
  fieldError?: string;
  fieldValue: string | Record<string, boolean>;
  isFormSubmit: boolean;
  autoFocus: boolean;
  defaultMaxLength: number;
  updateInput: (
    value: string | boolean,
    field: string,
    valueId?: string,
  ) => void;
  validateField: (
    value: string | Record<string, boolean>,
    field: string,
  ) => void;
}
export const FormField = (props: IFormFieldProps) => {
  const {
    field,
    fieldValid,
    fieldValue,
    fieldError,
    isFormSubmit,
    autoFocus,
    defaultMaxLength,
    updateInput,
    validateField,
  } = props;
  const {
    data: {
      forms: { contactForm: form },
    },
  } = useContext(ProfileContext);
  const { messages } = form;

  const handleTextChange = (value: string) => {
    updateInput(value, field.name);
    validateField(value, field.name);
  };

  const handleMobileInputChange = (value: any) => {
    if (value) {
      updateInput(value, field.name);
      validateField(value, field.name);
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (isStringBooleanRecord(fieldValue)) {
      updateInput(!fieldValue[id], field.name, id);
      validateField(fieldValue, field.name);
    }
  };

  const errorMessage = useMemo(
    () => getErrorMessage(messages, field?.messages, fieldError),
    [field.messages, fieldError, messages],
  );

  const remainingCharacters = useMemo(
    () =>
      getRemainingCharacters(
        fieldValue as string,
        field.maxLength || defaultMaxLength,
      ),
    [field.maxLength, fieldValue, defaultMaxLength],
  );

  const showRemainingCharacters = useMemo(
    () =>
      [FIELD_TYPES.TEXT, FIELD_TYPES.TEXTAREA, FIELD_TYPES.MOBILE].some(
        item => field.type === item,
      ),
    [field.type],
  );

  return (
    <FieldWrap
      direction="column"
      className={classNames({ "has-child-field": field?.childFields?.length })}
    >
      <InputWrap alignItems="center">
        <FieldLabel isMobile={isMobile}>
          {field.label}
          {field.required && <strong className="required-asterisk">*</strong>}
        </FieldLabel>
        {field.type === FIELD_TYPES.TEXT && (
          <TextField
            autoFocus={autoFocus}
            field={field}
            fieldValid={fieldValid}
            fieldValue={fieldValue}
            handleTextChange={handleTextChange}
            isFormSubmit={isFormSubmit}
          />
        )}
        {field.type === FIELD_TYPES.MOBILE && (
          <MobileField
            autoFocus={autoFocus}
            fieldValid={fieldValid}
            fieldValue={fieldValue}
            handleMobileInputChange={handleMobileInputChange}
            isFormSubmit={isFormSubmit}
          />
        )}
        {field.type === FIELD_TYPES.CHECKBOX && (
          <CheckboxField
            field={field}
            fieldValue={fieldValue}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
        {field.type === FIELD_TYPES.TEXTAREA && (
          <TextAreaField
            autoFocus={autoFocus}
            field={field}
            fieldValid={fieldValid}
            fieldValue={fieldValue}
            handleTextChange={handleTextChange}
            isFormSubmit={isFormSubmit}
          />
        )}
      </InputWrap>
      <FlexBox justifyContent="flex-end" alignItems="center">
        {!isMobile && fieldError && <Error>{errorMessage}</Error>}
        {showRemainingCharacters && (
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
        )}
      </FlexBox>
    </FieldWrap>
  );
};
