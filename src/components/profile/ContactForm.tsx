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
  MAIL_STATUS,
} from "../../common/constants";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { AppContext } from "../../store/profile/context";
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
  } = useContext(AppContext);
  const { messages, icons } = form;
  const { closeModal } = props;
  const [formData, setFormData] = useState<ContactFormData>(DEFAULT_FORM_DATA);
  const [formValid, setFormValid] = useState<ContactFormValid | null>(null);
  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  const [mailStatus, setMailStatus] = useState(MAIL_STATUS.SENDING);

  const resetFields = () => {
    setFormData(DEFAULT_FORM_DATA);
    setFormDisabled(true);
  };
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMailStatus(MAIL_STATUS.SENDING);

    emailjs
      .send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formData,
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setMailStatus(MAIL_STATUS.SUCCESS);
          resetFields();
          setTimeout(() => setMailStatus(MAIL_STATUS.FORM_FILL), 3000);
        },
        (error) => {
          console.log(error.text);
          setMailStatus(MAIL_STATUS.ERROR);
        }
      );
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  const isFormSubmit = useMemo(
    () => mailStatus === MAIL_STATUS.SENDING,
    [mailStatus]
  );

  const displayStatus = useMemo(
    () =>
      [MAIL_STATUS.SUCCESS, MAIL_STATUS.ERROR, MAIL_STATUS.SENDING].indexOf(
        mailStatus
      ) > -1,
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

  const displayStatusInfo = useMemo(() => {
    const icon = icons[mailStatus];
    const message = messages[mailStatus];

    return { icon, message };
  }, [icons, mailStatus, messages]);
  return (
    <>
      <ModalComponent isOpen className="contact-form-status-modal-content">
        <StatusMessage justifyContent="space-evenly" alignItems="center">
          {displayStatus && (
            <>
              <img
                className="form-status-image"
                alt="Form status"
                height="45px"
                src={getIconUrl(displayStatusInfo.icon)}
                loading="lazy"
              />
              <p>{displayStatusInfo.message}</p>
            </>
          )}
        </StatusMessage>
      </ModalComponent>
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
  border-radius: 20px;
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
