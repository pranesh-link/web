import styled from "styled-components";
import { FlexBoxSection, FlexBox } from "../../../common/Elements";

const FieldLabel = styled.label<{ isMobile: boolean }>`
  flex-basis: 30%;
  font-weight: 600;
  margin-right: 10px;

  @media only screen and (max-width: 767px) {
    flex-basis: 35%;
  }
`;

const FieldWrap = styled(FlexBoxSection)`
  &:not(.has-child-field) {
    margin-bottom: 20px;
  }
  .required-asterisk {
    color: #ee4b2b;
    padding-left: 5px;
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
  font-weight: 600;
  letter-spacing: 0.4px;
  .remaining-characters {
    padding-right: 1.5px;
  }
  .lesser-to-no-characters {
    color: #ee4b2b;
  }
  .less-characters {
    color: #ffa500;
  }
  .field-maxlength {
    padding-left: 1.5px;
  }
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

const CheckboxInputLabel = styled.label`
  font-size: 13px;
  letter-spacing: 0.5px;
  &.checked {
    font-weight: 600;
  }
`;

const CheckboxTick = styled.img`
  position: absolute;
  left: 3px;
  bottom: 4px;
  height: 13px;
  transform: rotate(10deg);
  cursor: pointer;
`;

const CheckboxInputWrap = styled(FlexBox)`
  width: 100%;
  position: relative;
`;

export {
  CheckboxTick,
  Error,
  FieldLabel,
  FieldWrap,
  InputWrap,
  RemainingCharacters,
  TextArea,
  TextInput,
  CheckboxInput,
  CheckboxInputLabel,
  CheckboxInputWrap,
};
