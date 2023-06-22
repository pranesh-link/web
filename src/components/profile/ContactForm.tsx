import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { ActionBtn, FlexBox, FlexBoxSection } from "../../common/Elements";
import { AppContext } from "../../store/profile/context";
import { getRemainingCharacters } from "../../common/Utils";
import classNames from "classnames";
import { IFormField, IFormInfo } from "../../store/profile/types";
import { FIELD_TYPES } from "../../common/constants";
import { validateLength, validateRegex } from "../../common/FormUtils";

interface IContactFormProps {
  form: IFormInfo;
}

type ContactFormFields = "userName" | "userMobile" | "userEmail" | "message";
type ContactFormData = {
  [key in ContactFormFields]: string;
};

type ContactFormValid = Record<string, boolean>;

const DEFAULT_FORM_DATA = {
  userName: "",
  userMobile: "",
  userEmail: "",
  message: "",
};

export const ContactForm = (props: IContactFormProps) => {
  const { form } = props;
  const [formData, setFormData] = useState<ContactFormData>(DEFAULT_FORM_DATA);
  const [formValid, setFormValid] = useState<ContactFormValid | null>(null);
  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  const { userName, userMobile, userEmail, message } = formData;

  const templateParams = {
    userName,
    userEmail,
    message,
    userMobile,
  };

  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("send email");
    // emailjs
    //   .send(
    //     "service_h7f2fbh",
    //     "template_ccivvus",
    //     templateParams,
    //     "YM2FkZ24YRF2W_Vgl"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
  };

  const updateInput = (value: string, field: string) => {
    setFormData({ ...formData, [field as ContactFormFields]: value });
  };

  const validateField = (field: string, value: string) => {
    const { regex } = form.fields.find(
      (formField) => formField.name === field
    ) as IFormField;
    const fieldValue = value.trim();
    let isValid = false;
    isValid = validateLength(fieldValue);
    isValid = regex ? validateRegex(fieldValue, regex) : isValid;

    const fieldValidity = { ...(formValid || {}), [field]: isValid };

    const currentFormDisabled =
      Object.values(fieldValidity).some((valid) => valid === false) ||
      Object.keys(fieldValidity).length !== Object.keys(formData).length;
    console.log("curr", fieldValidity, formData, currentFormDisabled);
    setFormValid(fieldValidity);
    setFormDisabled(currentFormDisabled);
    return isValid;
  };

  // const validateFields = (currentFieldValue: string, currentField: string) => {
  //   const fields = form.fields;
  //   let fieldValidity = formValid ?? {};
  //   fields.forEach((field) => {
  //     const fieldValue =
  //       currentField === field.name
  //         ? currentFieldValue
  //         : formData[field.name as ContactFormFields];
  //     const isValid = validateField(field.name, fieldValue);

  //     fieldValidity[field.name as ContactFormFields] = isValid;
  //   });

  //   const currentFormDisabled =
  //     Object.values(fieldValidity).some((valid) => valid === false) &&
  //     Object.keys(fieldValidity) !== Object.keys(formData);
  //   console.log("curr", fieldValidity);

  //   setFormValid(fieldValidity);
  //   setFormDisabled(currentFormDisabled);
  // };

  return (
    <Form onSubmit={sendEmail}>
      {form.fields.map((field) => {
        const fieldName = field.name as ContactFormFields;
        return (
          <FieldWrap>
            <FormLabel>{field.label}</FormLabel>
            <InputWrap direction="column">
              {field.type === FIELD_TYPES.TEXT && (
                <>
                  <TextInput
                    className={classNames({
                      error: formValid?.[fieldName] === false,
                    })}
                    value={formData[fieldName]}
                    maxLength={field.maxLength}
                    type={field.subType ? field.subType : "text"}
                    name={field.name}
                    onChange={(e) => {
                      updateInput(e.target.value, field.name);
                      validateField(field.name, e.target.value);
                    }}
                  />
                  <RemainingCharacters>
                    {getRemainingCharacters(
                      formData[fieldName],
                      field.maxLength
                    )}
                    /{field.maxLength}
                  </RemainingCharacters>
                </>
              )}
              {field.type === FIELD_TYPES.TEXTAREA && (
                <>
                  <TextArea
                    className={classNames({
                      error: formValid?.[fieldName] === false,
                    })}
                    maxLength={field.maxLength}
                    name={field.name}
                    value={formData[fieldName]}
                    onChange={(e) => {
                      updateInput(e.target.value, field.name);
                      validateField(field.name, e.target.value);
                    }}
                  />
                  <RemainingCharacters>
                    {getRemainingCharacters(
                      formData[fieldName],
                      field.maxLength
                    )}
                    /{field.maxLength}
                  </RemainingCharacters>
                </>
              )}
            </InputWrap>
          </FieldWrap>
        );
      })}
      <FieldWrap justifyContent="space-around">
        <FormSubmit
          disabled={formDisabled}
          className={classNames({ disabled: formDisabled })}
          type="submit"
        >
          {form.submitLabel}
        </FormSubmit>
      </FieldWrap>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: #f0f0f0;
  outline: none;
  padding: 45px 30px 20px;
  border-radius: 15px;
`;

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

const FormSubmit = styled(ActionBtn)`
  background: #3498db;
  color: #f0f0f0;
  font-size: 15px;
  letter-spacing: 0.5px;
  border-color: transparent;
  border-radius: 20px;
  padding: 10px 25px;
  margin-top: 20px;
  width: 20%;
  font-family: Open Sans, sans-serif !important;

  &.disabled {
    background: #8a8982;
  }

  @media only screen and (max-width: 767px) {
    width: 30%;
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
