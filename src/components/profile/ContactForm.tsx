import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { ActionBtn, FlexBox, FlexBoxSection } from "../../common/Elements";
import classNames from "classnames";
import { IFormField } from "../../store/profile/types";
import { validateLength, validateRegex } from "../../common/FormUtils";
import { FormField } from "../Form/FormField";
import {
  EMAILJS_CONFIG,
  FIELD_TYPES,
  LABEL_TEXT,
  CONTACT_FORM_STATUS,
} from "../../common/constants";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { ProfileContext } from "../../store/profile/context";
import { getIconUrl } from "../../common/Utils";
import { ModalComponent } from "../../common/Component";

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

interface IContactFormProps {
  closeModal: () => void;
}

export const ContactForm = (props: IContactFormProps) => {
  const {
    data: {
      forms: { contactForm: form },
    },
  } = useContext(ProfileContext);
  const { statusMessages, messages, icons } = form;
  const { closeModal } = props;
  const [formData, setFormData] = useState<ContactFormData>(DEFAULT_FORM_DATA);
  const [formValid, setFormValid] = useState<ContactFormValid | null>(null);
  const [formEmpty, setFormEmpty] = useState<ContactFormValid | null>(null);
  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  const [contactFormStatus, setContactFormStatus] = useState(
    CONTACT_FORM_STATUS.FORM_FILL,
  );

  const resetFields = () => {
    setFormData(DEFAULT_FORM_DATA);
    setFormDisabled(true);
  };

  const handleMailRequest = () => {
    setContactFormStatus(CONTACT_FORM_STATUS.SENDING);

    emailjs
      .send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formData,
        EMAILJS_CONFIG.PUBLIC_KEY,
      )
      .then(
        result => {
          setContactFormStatus(CONTACT_FORM_STATUS.SUCCESS);
          resetFields();
          setTimeout(
            () => setContactFormStatus(CONTACT_FORM_STATUS.FORM_FILL),
            3000,
          );
        },
        error => {
          setContactFormStatus(CONTACT_FORM_STATUS.ERROR);
        },
      );
  };

  const retryEmail = () => {
    handleMailRequest();
  };
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleMailRequest();
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  const isFormSubmit = useMemo(
    () => contactFormStatus === CONTACT_FORM_STATUS.SENDING,
    [contactFormStatus],
  );

  const displayStatus = useMemo(
    () =>
      [
        CONTACT_FORM_STATUS.SUCCESS,
        CONTACT_FORM_STATUS.ERROR,
        CONTACT_FORM_STATUS.SENDING,
      ].indexOf(contactFormStatus) > -1,
    [contactFormStatus],
  );

  const updateInput = (value: string, field: string) =>
    setFormData({ ...formData, [field as ContactFormFields]: value });

  const handleSpecialValidations = (
    type: string,
    fieldValue: string,
    isValid: boolean,
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
      formField => formField.name === field,
    ) as IFormField;
    const fieldValue = value.trim();
    let isValid = false;
    isValid = validateLength(fieldValue);
    setFormEmpty({ ...(formEmpty || {}), [field]: !isValid });
    isValid = regex ? validateRegex(fieldValue, regex) : isValid;
    isValid = handleSpecialValidations(type, fieldValue, isValid);
    const fieldValidity = { ...(formValid || {}), [field]: isValid };
    const currentFormDisabled =
      Object.values(fieldValidity).some(valid => valid === false) ||
      Object.keys(fieldValidity).length !== Object.keys(formData).length;
    setFormValid(fieldValidity);
    setFormDisabled(currentFormDisabled);
  };

  const displayStatusInfo = useMemo(() => {
    const icon = icons[contactFormStatus];
    const message = statusMessages[contactFormStatus];
    const retryMessage =
      contactFormStatus === CONTACT_FORM_STATUS.ERROR ? messages.retry : "";

    return { icon, message, retryMessage };
  }, [icons, contactFormStatus, statusMessages, messages.retry]);
  return (
    <>
      <ModalComponent
        isOpen={displayStatus}
        className="contact-form-status-modal-content"
      >
        <StatusMessage justifyContent="space-evenly" alignItems="center">
          <img
            className="form-status-image"
            alt="Form status"
            height="35px"
            src={getIconUrl(displayStatusInfo.icon)}
            loading="lazy"
          />
          <ProgressMessage>{displayStatusInfo.message}</ProgressMessage>
          {contactFormStatus === CONTACT_FORM_STATUS.ERROR && (
            <Retry href="" onClick={retryEmail}>
              {displayStatusInfo.retryMessage}
            </Retry>
          )}
        </StatusMessage>
      </ModalComponent>
      <Form onSubmit={sendEmail}>
        {form.fields.map((field, index) => {
          const fieldName = field.name as ContactFormFields;
          return (
            <FormField
              key={index}
              field={field}
              fieldValue={formData[fieldName]}
              fieldValid={formValid?.[fieldName]}
              fieldEmpty={formEmpty?.[fieldName]}
              updateInput={updateInput}
              validateField={validateField}
              isFormSubmit={isFormSubmit}
            />
          );
        })}

        <FieldWrap justifyContent="space-between" alignItems="center">
          <ActionBtn className="close" onClick={closeModal}>
            {LABEL_TEXT.close}
          </ActionBtn>
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
    </>
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

const StatusMessage = styled(FlexBox)`
  background: #f0f0f0;
  border-radius: 30px;
  padding: 5px 20px;
`;

const FieldWrap = styled(FlexBoxSection)`
  margin-bottom: 20px;
  .close {
    font-size: 15px;
    padding: 10px 25px;
    background: #ee4b2b;
    opacity: 0.85;
    border-radius: 20px;
    color: #f0f0f0;
    &:hover {
      opacity: 1;
    }
    @media only screen and (max-width: 767px) {
      opacity: 1;
    }
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
  font-family: Open Sans, sans-serif !important;
  opacity: 0.85;
  &:not(.disabled):hover {
    opacity: 1;
  }
  &.disabled {
    background: #8a8982;
    cursor: default;
  }

  @media only screen and (max-width: 767px) {
    opacity: 1;
  }
`;

const Retry = styled.a`
  margin-left: 10px;
  font-weight: bold;
  color: #3fc935;
  letter-spacing: 0.3px;
`;

const ProgressMessage = styled.p`
  margin-left: 10px;
  font-weight: 600;
`;
