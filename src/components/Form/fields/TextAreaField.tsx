import classNames from "classnames";
import { IFormField } from "../../../store/profile/types";
import { TextArea } from "../common/Elements";

interface ITextAreaFieldProps {
  fieldValid?: boolean;
  autoFocus: boolean;
  field: IFormField;
  isFormSubmit: boolean;
  fieldValue: string | Record<string, boolean>;
  handleTextChange: (value: string) => void;
}
export const TextAreaField = (props: ITextAreaFieldProps) => {
  const {
    autoFocus,
    field,
    fieldValid,
    fieldValue,
    handleTextChange,
    isFormSubmit,
  } = props;

  return (
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
      onChange={e => handleTextChange(e.target.value)}
    />
  );
};
