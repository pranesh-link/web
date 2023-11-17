import styled from "styled-components";
import { FlexBox, FlexBoxSection } from "../../common/Elements";
import {
  getRemainingCharacters,
  isStringBooleanRecord,
} from "../../common/Utils";
import { IFormField } from "../../store/profile/types";
import { FIELD_TYPES } from "../../common/constants";
import classNames from "classnames";
import { ChangeEvent, useContext, useMemo } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ProfileContext } from "../../store/profile/context";
import TickIcon from "../../assets/white-tick-icon.svg";
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
    isMobile,
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

  const handleCheckboxChange = (id: string) => {
    if (isStringBooleanRecord(fieldValue)) {
      updateInput(!fieldValue[id], field.name, id);
      validateField(fieldValue, field.name);
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
        <FormLabel>{field.label}</FormLabel>
        {field.type === FIELD_TYPES.TEXT && (
          <>
            <TextInput
              className={classNames({
                error: fieldValid === false,
              })}
              autoFocus={autoFocus}
              placeholder={field.placeholder}
              disabled={isFormSubmit}
              value={fieldValue as string}
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
              autoFocus={autoFocus}
              disabled={isFormSubmit}
              defaultCountry="IN"
              international
              limitMaxLength
              countryCallingCodeEditable={false}
              className={classNames("phone-input", {
                error: fieldValid === false,
              })}
              value={fieldValue as string}
              onChange={handleMobileInputChange}
            />
          </>
        )}
        {field.type === FIELD_TYPES.CHECKBOX && (
          <>
            {(field?.values || []).map(item => {
              const isChecked = isStringBooleanRecord(fieldValue)
                ? fieldValue[item.value]
                : false;
              return (
                <FlexBox
                  style={{ width: "100%", position: "relative" }}
                  alignItems="center"
                  key={item.value}
                  id={item.value}
                >
                  <CheckboxInput
                    id={item.value}
                    type="checkbox"
                    onClick={() => {
                      handleCheckboxChange(item.value);
                    }}
                    checked={isChecked}
                  />
                  {isChecked && (
                    <>
                      <CheckboxTick
                        id={item.value}
                        src={TickIcon}
                        onClick={() => {
                          handleCheckboxChange(item.value);
                        }}
                      />
                      {/* &#10003; */}
                    </>
                  )}
                  <CheckboxInputLabel>{item.label}</CheckboxInputLabel>
                </FlexBox>
              );
            })}
          </>
        )}
        {field.type === FIELD_TYPES.TEXTAREA && (
          <>
            <TextArea
              placeholder={field.placeholder}
              autoFocus={autoFocus}
              disabled={isFormSubmit}
              className={classNames({
                error: fieldValid === false,
              })}
              maxLength={field.maxLength}
              name={field.name}
              value={fieldValue as string}
              onChange={handleTextChange}
            />
          </>
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

const FormLabel = styled.label`
  flex-basis: 30%;
  font-weight: 600;
  margin-right: 10px;
`;

const FieldWrap = styled(FlexBoxSection)`
  &:not(.has-child-field) {
    margin-bottom: 20px;
  }
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
  }

  @media only screen and (max-width: 767px) {
    .phone-input {
      &.error {
        input {
          border: 1px solid #ee4b2b;
        }
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
  @media only screen and (max-width: 767px) {
    &.error {
      border: 1px solid #ee4b2b;
    }
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
  @media only screen and (max-width: 767px) {
    &.error {
      border: 1px solid #ee4b2b;
    }
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

const CheckboxInput = styled.input`
  margin: 0;
  margin-right: 10px;
  height: 20px;
  width: 20px;
  cursor: pointer;
  -webkit-appearance: none;
  background: #fff;
  border-radius: 3px;
  border: 0.5px solid #ccc;
  &:checked {
    background-color: #3f9c35;
    border: none;
    box-shadow: transparent 0 -1px 0px 1px, inset transparent 0 -1px 0px,
      #3f9c35 0 2px 20px;
    color: #99a1a7;
  }
  &:not(:checked):hover {
    border: none;
    box-shadow: transparent 0 -1px 0px 1px, inset transparent 0 -1px 0px,
      #3498db 0 2px 20px;
  }
`;

const CheckboxInputLabel = styled.label``;

const CheckboxTick = styled.img`
  position: absolute;
  left: 3px;
  bottom: 4px;
  height: 13px;
  transform: rotate(10deg);
  cursor: pointer;
`;
