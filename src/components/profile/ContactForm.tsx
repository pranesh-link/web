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
import {
  ActionBtn,
  FlexBox,
  FlexBoxSection,
  LoaderImg,
} from "../../common/Elements";
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
import OfflineAnimation from "../../assets/offline-animation.gif";
import { AppContext } from "../../store/app/context";

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

function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = img.onabort = function () {
      reject(src);
    };
    img.src = src;
  });
}

const preloadSrcList: Record<string, string> = {
  sending: SendingAnimation,
  success: SuccessAnimation,
  error: ErrorAnimation,
  offline: OfflineAnimation,
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
    data: {
      currentDevice: { isMobile },
    },
  } = useContext(AppContext);
  const { statusMessages, messages } = form;
  const { closeModal } = props;
  const [formData, setFormData] = useState<ContactFormData>(DEFAULT_FORM_DATA);
  const [formValid, setFormValid] = useState<ContactFormValid | null>(null);
  const [formError, setFormError] = useState<ContactFormError | null>(null);
  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  const [contactFormStatus, setContactFormStatus] = useState(
    CONTACT_FORM_STATUS.FORM_FILL,
  );
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);
  const [assetImages, setAssetImages] = useState<any>([]);

  const resetFields = () => {
    setFormData(DEFAULT_FORM_DATA);
    setFormDisabled(true);
  };

  const formStatusIconMap = useMemo(() => {
    return {
      [CONTACT_FORM_STATUS.FORM_FILL]: "",
      [CONTACT_FORM_STATUS.SENDING]: assetImages?.[0]?.currentSrc,
      [CONTACT_FORM_STATUS.SUCCESS]: assetImages?.[1]?.currentSrc,
      [CONTACT_FORM_STATUS.ERROR]: assetImages?.[2]?.currentSrc,
      [CONTACT_FORM_STATUS.OFFLINE]: assetImages?.[3]?.currentSrc,
    };
  }, [assetImages]);

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
        },
      );
  };

  const sendEmail = (
    e:
      | FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    isNetworkOnline()
      ? handleMailRequest()
      : setContactFormStatus(CONTACT_FORM_STATUS.OFFLINE);
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

  const hasErrorStatusOrOffline = useMemo(
    () =>
      [CONTACT_FORM_STATUS.ERROR, CONTACT_FORM_STATUS.OFFLINE].some(
        item => contactFormStatus === item,
      ),
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
    const retryMessage = hasErrorStatusOrOffline ? messages.retry : "";

    return { icon, message, retryMessage };
  }, [
    formStatusIconMap,
    contactFormStatus,
    statusMessages,
    messages.retry,
    hasErrorStatusOrOffline,
  ]);

  const StatusIcon = memo(() => {
    return (
      <img
        className="form-status-image"
        alt="Form status"
        height="35px"
        src={displayStatusInfo.icon}
        loading="lazy"
      />
    );
  });

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      if (isCancelled) {
        return;
      }

      const imagesPromiseList: Promise<any>[] = [];
      for (const i in preloadSrcList) {
        imagesPromiseList.push(preloadImage(preloadSrcList[i as string]));
      }

      const images = await Promise.all(imagesPromiseList);
      setAssetImages(images);
      if (isCancelled) {
        return;
      }
      setAssetsLoaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      {assetsLoaded ? (
        <>
          <ModalComponent
            isOpen={displayStatus}
            className="contact-form-status-modal-content"
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => {
              if (hasErrorStatusOrOffline) {
                setContactFormStatus(CONTACT_FORM_STATUS.FORM_FILL);
              }
            }}
          >
            <StatusMessage justifyContent="space-evenly" alignItems="center">
              <StatusIcon />
              <ProgressMessage>{displayStatusInfo.message}</ProgressMessage>
              <Retry
                href=""
                className={classNames({
                  hide: !displayStatusInfo.retryMessage,
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
      ) : (
        <LoaderImg isMobile={isMobile} />
      )}
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
  flex-basis: 15%;
`;

const ProgressMessage = styled.p`
  margin-left: 10px;
  font-weight: 600;
`;
