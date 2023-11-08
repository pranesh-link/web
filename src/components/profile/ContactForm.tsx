import {
  FormEvent,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { isNetworkOnline } from "../../common/Utils";
import { ModalComponent } from "../../common/Component";
import SendingAnimation from "../../assets/loading-animation.gif";
import SuccessAnimation from "../../assets/success-animation.gif";
import ErrorAnimation from "../../assets/error-animation.gif";
import { AppContext } from "../../store/app/context";
import CryptoJS from "crypto-js";

type ContactFormFields = "userName" | "userMobile" | "userEmail" | "message";
type ContactFormData = {
  [key in ContactFormFields]: string;
};

type ContactFormValid = Record<string, boolean>;
type ContactFormError = Record<string, string>;

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
  const {
    data: { preloadedAssets },
  } = useContext(AppContext);
  const { statusMessages, messages } = form;
  const { closeModal } = props;
  const [formData, setFormData] = useState<ContactFormData>(DEFAULT_FORM_DATA);
  const [formValid, setFormValid] = useState<ContactFormValid | null>(null);
  const [formError, setFormError] = useState<ContactFormError | null>(null);
  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  const [contactFormStatus, setContactFormStatus] = useState(
    isNetworkOnline()
      ? CONTACT_FORM_STATUS.FORM_FILL
      : CONTACT_FORM_STATUS.OFFLINE,
  );
  const [online, setOnline] = useState(isNetworkOnline());
  const [allowRetry, setAllowRetry] = useState(false);

  const resetFields = () => {
    setFormData(DEFAULT_FORM_DATA);
    setFormDisabled(true);
  };

  const formStatusIconMap = useMemo(() => {
    return {
      [CONTACT_FORM_STATUS.FORM_FILL]: "",
      [CONTACT_FORM_STATUS.SENDING]: SendingAnimation,
      [CONTACT_FORM_STATUS.SUCCESS]: SuccessAnimation,
      [CONTACT_FORM_STATUS.ERROR]: ErrorAnimation,
      [CONTACT_FORM_STATUS.OFFLINE]: preloadedAssets.find(
        asset => asset.id === "offlineAnimation",
      )?.image,
    };
  }, [preloadedAssets]);

  const { decrypt } = CryptoJS.AES;

  const getDecryptedConfig = (config: string[]) =>
    config.map(item => decrypt(item, form.key).toString(CryptoJS.enc.Utf8));

  const handleMailRequest = () => {
    setContactFormStatus(CONTACT_FORM_STATUS.SENDING);
    setAllowRetry(false);
    const [serviceId, templateId, publicKey] = getDecryptedConfig([
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      EMAILJS_CONFIG.PUBLIC_KEY,
    ]);

    emailjs.send(serviceId, templateId, formData, publicKey).then(
      () => {
        setContactFormStatus(CONTACT_FORM_STATUS.SUCCESS);
        resetFields();
        setTimeout(
          () => setContactFormStatus(CONTACT_FORM_STATUS.FORM_FILL),
          3000,
        );
      },
      () => {
        setContactFormStatus(CONTACT_FORM_STATUS.ERROR);
        setAllowRetry(true);
      },
    );
  };

  const sendEmail = (
    e:
      | FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (online) {
      handleMailRequest();
    } else {
      setContactFormStatus(CONTACT_FORM_STATUS.OFFLINE);
      setAllowRetry(true);
    }
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
        CONTACT_FORM_STATUS.OFFLINE,
      ].indexOf(contactFormStatus) > -1,
    [contactFormStatus],
  );

  const isSending = useMemo(
    () => contactFormStatus === CONTACT_FORM_STATUS.SENDING,
    [contactFormStatus],
  );

  const isSuccess = useMemo(
    () => contactFormStatus === CONTACT_FORM_STATUS.SUCCESS,
    [contactFormStatus],
  );

  const isError = useMemo(
    () => contactFormStatus === CONTACT_FORM_STATUS.ERROR,
    [contactFormStatus],
  );

  const isOffline = useMemo(
    () => contactFormStatus === CONTACT_FORM_STATUS.OFFLINE,
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

  const getErrorPriority = (
    mandatoryError: boolean,
    regexError: boolean,
    fieldError: boolean,
  ) => {
    let error = "";
    switch (true) {
      case mandatoryError:
        error = "mandatoryError";
        break;
      case regexError:
        error = "regexError";
        break;
      case fieldError:
        error = "fieldError";
        break;
    }
    return error;
  };

  const validateField = (value: string, field: string) => {
    const { regex, type } = form.fields.find(
      formField => formField.name === field,
    ) as IFormField;
    const fieldValue = value.trim();
    let isValid = false;
    isValid = validateLength(fieldValue);
    const mandatoryError = !validateLength(fieldValue);
    const regexError = !validateRegex(fieldValue, regex, isValid);
    const fieldError = !handleSpecialValidations(type, fieldValue, isValid);
    isValid = !mandatoryError && !regexError && !fieldError;
    let error = "";
    if (mandatoryError || regexError || fieldError) {
      error = getErrorPriority(mandatoryError, regexError, fieldError);
    }
    setFormError({ ...(formError || {}), [field]: error });

    const fieldValidity = { ...(formValid || {}), [field]: isValid };
    const currentFormDisabled =
      Object.values(fieldValidity).some(valid => valid === false) ||
      Object.keys(fieldValidity).length !== Object.keys(formData).length;
    setFormValid(fieldValidity);
    setFormDisabled(currentFormDisabled);
  };

  const displayStatusInfo = useMemo(() => {
    const icon = formStatusIconMap[contactFormStatus];
    const message = statusMessages[contactFormStatus];
    const retryMessage = isError || isOffline ? messages.retry : "";

    return { icon, message, retryMessage };
  }, [
    formStatusIconMap,
    contactFormStatus,
    statusMessages,
    messages.retry,
    isError,
    isOffline,
  ]);

  const StatusIcon = () => {
    return (
      <>
        {displayStatusInfo.icon && (
          <img
            className="form-status-image"
            alt="Form status"
            height="35px"
            src={displayStatusInfo.icon}
          />
        )}
      </>
    );
  };

  useEffect(() => {
    if (online && contactFormStatus === CONTACT_FORM_STATUS.OFFLINE) {
      setContactFormStatus(CONTACT_FORM_STATUS.FORM_FILL);
    }
  }, [online, contactFormStatus]);

  useEffect(() => {
    window.addEventListener("online", () => setOnline(true));
    window.addEventListener("offline", () => setOnline(false));

    return () => {
      window.addEventListener("online", () => setOnline(true));
      window.addEventListener("offline", () => setOnline(false));
    };
  }, []);

  const IconMessage = memo(() => {
    return (
      <>
        <StatusIcon />
        <ProgressMessage
          dangerouslySetInnerHTML={{ __html: displayStatusInfo.message }}
        />
      </>
    );
  });

  return (
    <>
      <ModalComponent
        isOpen={displayStatus}
        className="contact-form-status-modal-content"
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          if (isError || isOffline) {
            setContactFormStatus(CONTACT_FORM_STATUS.FORM_FILL);
          }
        }}
      >
        <StatusMessage
          direction={isError || isOffline ? "column" : "row"}
          justifyContent="space-evenly"
          alignItems="center"
          className={classNames(contactFormStatus, {
            "high-border": isSending || isSuccess,
          })}
        >
          {isError || isOffline ? (
            <FlexBox alignItems="center">
              <IconMessage />
            </FlexBox>
          ) : (
            <IconMessage />
          )}

          <Retry
            href=""
            className={classNames({
              hide: !allowRetry,
            })}
            onClick={sendEmail}
          >
            {displayStatusInfo.retryMessage}
          </Retry>
        </StatusMessage>
      </ModalComponent>
      <Form onSubmit={sendEmail}>
        {form.fields.map((field, index) => {
          const fieldName = field.name as ContactFormFields;
          return (
            <FormField
              key={index}
              autoFocus={index === 0 && online}
              field={field}
              fieldValue={formData[fieldName]}
              fieldValid={formValid?.[fieldName]}
              fieldError={formError?.[fieldName]}
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
  border-radius: 15px;
  padding: 15px 15px;
  margin: 0 10px;
  &.error {
    padding: 15px 25px;
  }
  &.high-border {
    border-radius: 30px;
    padding: 5px 20px;
  }
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
  margin-top: 10px;
  font-weight: bold;
  color: #3fc935;
  letter-spacing: 0.3px;
  flex-basis: 15%;
`;

const ProgressMessage = styled.p`
  margin-left: 10px;
  font-weight: 600;
`;
