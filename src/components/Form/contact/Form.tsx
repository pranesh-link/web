import {
  FormEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { ActionBtn, FlexBox, FlexBoxSection } from "../../../common/Elements";
import classNames from "classnames";
import {
  ContactFormData,
  ContactFormError,
  ContactFormFields,
  ContactFormValid,
} from "../../../store/profile/types";
import { FormField } from "../common/FormField";
import { EMAILJS_CONFIG, CONTACT_FORM_STATUS } from "../../../common/constants";
import { ProfileContext } from "../../../store/profile/context";
import { isNetworkOnline } from "../../../common/Utils";
import { ModalComponent } from "../../../common/Component";
import SendingAnimation from "../../../assets/loading-animation.gif";
import SuccessAnimation from "../../../assets/success-animation.gif";
import ErrorAnimation from "../../../assets/error-animation.gif";
import { AppContext } from "../../../store/app/context";
import {
  getDecryptedConfig,
  getDefaultContactFormData,
  transformMailRequest,
  validateField,
} from "../Utils";
import { isMobile } from "react-device-detect";

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

  const { statusMessages, messages, label, fields } = form;

  const defaultFormData = useMemo(
    () => getDefaultContactFormData(fields),
    [fields],
  );

  const requiredFields = useMemo(
    () => fields.filter(i => i.required),
    [fields],
  );

  const { closeModal } = props;

  const [formData, setFormData] = useState<ContactFormData>(defaultFormData);
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
  const [hasReviewedForm, setHasReviewedForm] = useState<boolean>(false);

  const resetFields = () => {
    setFormData(defaultFormData);
    setContactFormStatus(CONTACT_FORM_STATUS.FORM_FILL);
    setHasReviewedForm(false);
    setFormDisabled(true);
  };

  const formStatusIconMap = useMemo(
    () => ({
      [CONTACT_FORM_STATUS.FORM_FILL]: "",
      [CONTACT_FORM_STATUS.SENDING]: SendingAnimation,
      [CONTACT_FORM_STATUS.SUCCESS]: SuccessAnimation,
      [CONTACT_FORM_STATUS.ERROR]: ErrorAnimation,
      [CONTACT_FORM_STATUS.OFFLINE]: preloadedAssets.find(
        asset => asset.id === "offlineAnimation",
      )?.image,
      [CONTACT_FORM_STATUS.REVIEW]: "",
    }),
    [preloadedAssets],
  );

  const handleMailRequest = () => {
    setContactFormStatus(CONTACT_FORM_STATUS.SENDING);
    setAllowRetry(false);
    const [serviceId, templateId, publicKey] = getDecryptedConfig(
      [
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        EMAILJS_CONFIG.PUBLIC_KEY,
      ],
      form.key,
    );

    const transformedPaylod = transformMailRequest(
      formData,
      form.transformFields,
    );

    emailjs.send(serviceId, templateId, transformedPaylod, publicKey).then(
      () => {
        setContactFormStatus(CONTACT_FORM_STATUS.SUCCESS);
        setTimeout(() => resetFields(), 3000);
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
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (online) {
      handleMailRequest();
    } else {
      setContactFormStatus(CONTACT_FORM_STATUS.OFFLINE);
      setAllowRetry(true);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (online) {
      if (hasReviewedForm) {
        sendEmail(e);
      } else {
        setContactFormStatus(CONTACT_FORM_STATUS.REVIEW);
      }
    } else {
      setContactFormStatus(CONTACT_FORM_STATUS.OFFLINE);
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
        CONTACT_FORM_STATUS.REVIEW,
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

  const isReview = useMemo(
    () => contactFormStatus === CONTACT_FORM_STATUS.REVIEW,
    [contactFormStatus],
  );

  const updateInput = (
    value: string | boolean,
    field: string,
    valueId?: string,
  ) => {
    if (valueId) {
      setFormData({
        ...formData,
        [field as ContactFormFields]: {
          ...(formData[field as ContactFormFields] as Record<string, any>),
          [valueId]: value,
        },
      });
    } else {
      setFormData({ ...formData, [field as ContactFormFields]: value });
    }
  };

  const handleValidation = (
    value: string | Record<string, boolean>,
    field: string,
  ) => {
    const validation = validateField(
      form,
      formData,
      formError,
      formValid,
      requiredFields,
      value,
      field,
    );
    setFormError(validation.formError);
    setFormValid(validation.formValid);
    setFormDisabled(validation.formDisabled);
  };

  const handleReviewAndEdit = useCallback(() => {
    setHasReviewedForm(true);
    setContactFormStatus(CONTACT_FORM_STATUS.FORM_FILL);
  }, []);

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
        <StatusWrap direction="column">
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
          {isReview && (
            <ActionsWrap
              className={classNames({ "review-status": isReview })}
              justifyContent="center"
              alignItems="center"
            >
              <ActionBtn className="review-edit" onClick={handleReviewAndEdit}>
                {label.reviewEdit}
              </ActionBtn>
              <ActionBtn className="send" onClick={sendEmail}>
                {label.submit}
              </ActionBtn>
            </ActionsWrap>
          )}
        </StatusWrap>
      </ModalComponent>
      <Form isMobile={isMobile} onSubmit={handleFormSubmit}>
        <FormHeader>{form.header}</FormHeader>
        {fields.map((field, index) => {
          const fieldName = field.name as ContactFormFields;
          return (
            <FormField
              key={index}
              defaultMaxLength={form.defaultMaxLength}
              autoFocus={online && index === 0}
              field={field}
              fieldValue={formData[fieldName]}
              fieldValid={formValid?.[fieldName]}
              fieldError={formError?.[fieldName]}
              updateInput={updateInput}
              validateField={handleValidation}
              isFormSubmit={isFormSubmit}
            />
          );
        })}

        <ActionsWrap justifyContent="space-between" alignItems="center">
          <ActionBtn className="close" onClick={closeModal}>
            {label.close}
          </ActionBtn>
          <FormSubmit
            disabled={formDisabled || isFormSubmit}
            className={classNames({
              disabled: formDisabled || isFormSubmit,
            })}
            type="submit"
          >
            {isFormSubmit ? label.submitting : label.submit}
          </FormSubmit>
        </ActionsWrap>
      </Form>
    </>
  );
};

const Form = styled.form<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  background: #f0f0f0;
  outline: none;
  padding: 20px 30px;
  border-radius: 15px;

  @media only screen and (max-width: 767px) {
    padding: 15px 25px;
  }
`;

const StatusWrap = styled(FlexBox)`
  border-radius: min(50px, (480px - 400px + 1px) * 9999);
  background: #f0f0f0;
  padding: 5px 15px;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

const StatusMessage = styled(FlexBox)`
  background: #f0f0f0;
  border-radius: 15px;
  &.error {
    padding: 5px 15px;
  }
  &.high-border {
    border-radius: 30px;
    padding: 5px 0;
  }
`;

const ActionsWrap = styled(FlexBoxSection)`
  margin: 20px 0 0px;
  &.review-status {
    margin: 10px 0 5px;
  }

  .close,
  .review-edit,
  .send {
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
  .review-edit,
  .send {
    padding: 5px 15px;
  }

  .review-edit {
    margin-right: 10px;
    background: #b21807;
  }

  .send {
    background: #3fc935;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  font-weight: 600;
`;

const FormHeader = styled.h2`
  text-align: center;
  margin: 0px;
  padding-bottom: 25px;
`;
