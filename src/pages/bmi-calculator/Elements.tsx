import styled from "styled-components";
import { Elements, Form } from "react-profile-component";
const { Grid, FlexBox } = Elements;

const BMICalculatorForm = styled(Form)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  padding-bottom: 30px;
  overflow-y: scroll;
  background: #faf9f6;
  padding: 30px 15px;
  align-items: center;
  input {
    border: 2px solid rgba(62, 62, 62, 0.45);
    max-width: 200px;
    padding: 5px 10px;
    &:focus {
      border-color: #3498db;
    }
  }
  .text-group {
    text {
      fill: #3e3e3e !important;
      font-weight: 600;
    }
  }
  .bmi-result-wrap {
    margin: 0 auto;
    margin-top: 15px;
  }
  .reset-button {
    align-self: flex-end;
    &.hidden {
      visibility: hidden;
    }
  }

  .weight-suggestion,
  .ideal-weight-range {
    margin-top: 15px;
    line-height: 1.5;
    font-weight: 600;
  }

  .weight-suggestion {
    .weight-direction,
    .weight-to-adjust,
    .ideal-weight,
    .healthy-bmi {
      font-weight: 700;
      font-style: italic;
      font-size: 16px;
    }
    .ideal-weight,
    .healthy-bmi {
      color: #3fc935;
    }

    &.gain {
      .weight-direction,
      .weight-to-adjust {
        color: #3fc935;
      }
    }
    &.reduce {
      .weight-direction,
      .weight-to-adjust {
        color: #ee4b2b;
      }
    }
  }

  .ideal-weight-range {
    .min,
    .max {
      font-weight: 700;
      font-style: italic;
      color: #3fc935;
      font-size: 16px;
    }
  }

  @media only screen and (max-width: 992px) {
    input {
      border-width: 1.5px;
    }
    padding: 30px 25px;
  }

  @media only screen and (max-width: 767px) {
    align-items: normal;
  }
`;

const FieldsWrap = styled(FlexBox)`
  @media only screen and (min-width: 992px) {
    max-width: 50%;
    margin: 0 auto;
  }
`;

const BMIRangeInfo = styled(Grid)<{ colorCode: string }>`
  margin-bottom: 5px;
  padding: 10px 0;
  gap: 15px;
  .color {
    width: 30px;
    height: 20px;
    background: ${(props) => props.colorCode};
  }
  .range {
    font-weight: 600;
  }
  label {
    font-weight: bold;
  }
  &.is-current-bmi-range {
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 0px 1px,
      rgb(48, 71, 1) 0px -1px 0px inset, rgb(63, 156, 53) 0px 2px 12px;
  }
`;
const BMIChart = styled(Grid)`
  margin-top: 30px;
`;

export { BMICalculatorForm, BMIChart, BMIRangeInfo, FieldsWrap };
