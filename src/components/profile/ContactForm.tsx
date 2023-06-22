import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { ActionBtn, FlexBoxSection } from "../../common/Elements";
import classNames from "classnames";
import { IFormField, IFormInfo } from "../../store/profile/types";
import { validateLength, validateRegex } from "../../common/FormUtils";
import { FormField } from "../Form/FormField";
import { FIELD_TYPES, MAIL_STATUS } from "../../common/constants";
import { isPossiblePhoneNumber } from "react-phone-number-input";

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
  const [mailStatus, setMailStatus] = useState(MAIL_STATUS.FORM_FILL);
  const { userName, userMobile, userEmail, message } = formData;

  const templateParams = {
    userName,
    userEmail,
    message,
    userMobile,
  };
  const resetFields = () => {
    setFormData(DEFAULT_FORM_DATA);
    setFormDisabled(true);
  };
  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMailStatus(MAIL_STATUS.SENDING);
    setTimeout(() => {
      setMailStatus(MAIL_STATUS.SUCCESS);
      resetFields();
    }, 2000);
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
    // setMailStatus(MAIL_STATUS.SUCCESS);
    //     },
    //     (error) => {
    //       console.log(error.text);
    // setMailStatus(MAIL_STATUS.ERROR);
    //     }
    //   );
  };

  const isFormSubmit = useMemo(
    () => mailStatus === MAIL_STATUS.SENDING,
    [mailStatus]
  );

  const updateInput = (value: string, field: string) =>
    setFormData({ ...formData, [field as ContactFormFields]: value });

  const handleSpecialValidations = (
    type: string,
    fieldValue: string,
    isValid: boolean
  ) => {
    switch (type) {
      case FIELD_TYPES.MOBILE:
        isValid = isPossiblePhoneNumber(fieldValue);
        break;
    }
    return isValid;
  };
  const validateField = (value: string, field: string) => {
    const { regex, type } = form.fields.find(
      (formField) => formField.name === field
    ) as IFormField;
    const fieldValue = value.trim();
    let isValid = false;
    isValid = validateLength(fieldValue);
    isValid = regex ? validateRegex(fieldValue, regex) : isValid;
    isValid = handleSpecialValidations(type, fieldValue, isValid);
    const fieldValidity = { ...(formValid || {}), [field]: isValid };
    const currentFormDisabled =
      Object.values(fieldValidity).some((valid) => valid === false) ||
      Object.keys(fieldValidity).length !== Object.keys(formData).length;
    setFormValid(fieldValidity);
    setFormDisabled(currentFormDisabled);
  };

  return (
    <Form onSubmit={sendEmail}>
      {form.fields.map((field) => {
        const fieldName = field.name as ContactFormFields;
        return (
          <FormField
            field={field}
            fieldValue={formData[fieldName]}
            fieldValid={formValid?.[fieldName]}
            updateInput={updateInput}
            validateField={validateField}
            isFormSubmit={isFormSubmit}
          />
        );
      })}
      <FieldWrap justifyContent="space-around">
        <FormSubmit
          disabled={formDisabled || isFormSubmit}
          className={classNames({
            disabled: formDisabled || isFormSubmit,
          })}
          type="submit"
        >
          {isFormSubmit ? form.submittingLabel : form.submitLabel}
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

const FieldWrap = styled(FlexBoxSection)`
  margin-bottom: 20px;
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
