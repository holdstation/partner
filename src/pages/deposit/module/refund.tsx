import { Modal, Input, Typography } from "antd";

// const validationSchema = Yup.object().shape({
//   reason_evidence: Yup.string().required("Reason & Evidence is required"),
// });

export function Refund(props: { isOpen: boolean; onClose: () => void }) {
  const { isOpen, onClose } = props;

  return (
    <Modal title="Refund" open={isOpen} onCancel={onClose}>
      <div className="flex flex-col">
        <Typography.Text>Confirm refund for this order?</Typography.Text>

        <Input.TextArea placeholder="Enter your reason & evidence" />
      </div>
    </Modal>
  );
}
