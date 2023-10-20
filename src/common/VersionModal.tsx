import { useContext } from "react";
import { ModalComponent } from "./Component";
import { FlexBox } from "./Elements";
import { AppContext } from "../store/app/context";

interface IVersionModalProps {
  displayVersionModal: boolean;
  setDisplayVersionModal: (display: boolean) => void;
}
export const VersionModal = (props: IVersionModalProps) => {
  const {
    data: { version },
  } = useContext(AppContext);
  return (
    <ModalComponent
      isOpen={props.displayVersionModal}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => {
        props.setDisplayVersionModal(false);
      }}
      className="version-modal"
    >
      <FlexBox justifyContent="center">
        <p>
          App version: <span>v{version}</span>
        </p>
      </FlexBox>
    </ModalComponent>
  );
};
