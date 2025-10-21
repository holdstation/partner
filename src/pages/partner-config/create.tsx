import { PartnerType } from "@/types/partner";
import { SaveButton, useForm } from "@refinedev/antd";
import { Button, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  CanAccess,
  HttpError,
  useGo,
  useNavigation,
  useResourceParams,
  useToPath,
} from "@refinedev/core";
import { Forbidden } from "@/components/forbidden";

export function PartnerConfigCreate() {
  const { id } = useResourceParams();
  const { resource } = useResourceParams({
    resource: "partner",
  });

  const goListPath = useToPath({
    resource: resource,
    action: "show",
    meta: { id: id },
  });
  const go = useGo();

  const { formProps } = useForm<PartnerType, HttpError>({
    action: "create",
    resource: "partnerConfig",
    id: id,
    errorNotification: (error) => {
      return {
        message: `Failed to create`,
        description: error?.message,
        type: "error",
      };
    },
    successNotification: () => {
      setTimeout(() => {
        go({ to: goListPath });
      }, 100);

      return {
        message: `Successful created`,
        description: "Successful",
        type: "success",
      };
    },
  });

  const { show } = useNavigation();

  return (
    <CanAccess
      action="create"
      resource="partnerConfig"
      fallback={<Forbidden />}
    >
      <Modal
        title="Create Partner config"
        closable={{ "aria-label": "Custom Close Button" }}
        open={true}
        onCancel={() => {
          show("partner", id || "");
        }}
        footer={null}
      >
        <Form {...formProps} layout="vertical" variant="filled">
          <Form.Item
            label="Token Address"
            name="token_address"
            // rules={[{ required: true, message: "Require" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Chain Id"
            name="chain_id"
            // required
            // rules={[{ required: true, message: "Require" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Buffer Rate" required>
            <Form.List
              name="buffer_rate"
              rules={[
                {
                  message: "Require",
                  validator(_, value, callback) {
                    if (value.length === 0) {
                      callback("Require");
                    } else {
                      callback();
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => {
                return (
                  <div>
                    {fields.map((field, index) => {
                      return (
                        <Space
                          key={`buffer_rate-${index}`}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            name={[field.name, "order_type"]}
                            rules={[{ required: true, message: "Require" }]}
                          >
                            <Select placeholder="Order type">
                              <Select.Option value={1}>On-ramp</Select.Option>
                              <Select.Option value={2}>Off-ramp</Select.Option>
                            </Select>
                          </Form.Item>

                          <Form.Item
                            name={[field.name, "rate"]}
                            rules={[{ required: true, message: "Require" }]}
                          >
                            <InputNumber placeholder="Rate" />
                          </Form.Item>

                          <Form.Item name={[field.name, "partner_share"]}>
                            <InputNumber
                              type="number"
                              placeholder="Partner Share"
                            />
                          </Form.Item>

                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </Space>
                      );
                    })}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </Form.Item>

          <Form.Item label="Threshold">
            <Form.List name="threshold">
              {(fields, { add, remove }, { errors }) => {
                return (
                  <div>
                    {fields.map((field, index) => {
                      return (
                        <Space
                          key={`threshold-${index}`}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                          size={"small"}
                        >
                          <Form.Item
                            name={[field.name, "max"]}
                            rules={[{ required: true, message: "Require" }]}
                          >
                            <InputNumber placeholder="Max" />
                          </Form.Item>

                          <Form.Item
                            name={[field.name, "min"]}
                            rules={[{ required: true, message: "Require" }]}
                          >
                            <InputNumber placeholder="Min" />
                          </Form.Item>

                          <Form.Item
                            name={[field.name, "provider"]}
                            rules={[{ required: true, message: "Require" }]}
                          >
                            <InputNumber placeholder="Provider" />
                          </Form.Item>

                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </Space>
                      );
                    })}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </Form.Item>
          <Form.Item>
            <SaveButton htmlType="submit" />
          </Form.Item>
        </Form>
      </Modal>
    </CanAccess>
  );
}
