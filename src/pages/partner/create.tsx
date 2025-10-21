import { PartnerType } from "@/types/partner";
import { Breadcrumb, Create, useForm } from "@refinedev/antd";
import { Button, Form, Input, Select, Space, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { CanAccess } from "@refinedev/core";
import { Notfound } from "@/components/not-found";

export function PartnerCreate() {
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<PartnerType>({
    errorNotification: (error) => {
      return {
        message: `Failed to create`,
        description: error?.message,
        type: "error",
      };
    },
  });

  return (
    <CanAccess action="create" resource="partner" fallback={<Notfound />}>
      <Create
        resource="partner"
        {...queryResult}
        breadcrumb={<Breadcrumb hideIcons={true} showHome={true} />}
        title={
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            Partner Info
          </Typography.Title>
        }
        saveButtonProps={saveButtonProps}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true, message: "Require" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            required
            rules={[{ required: true, message: "Require" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Buffer Rate"
            name="buffer_rate"
            required
            rules={[{ required: true, message: "Require" }]}
          >
            <Input type="number" />
          </Form.Item>
          {/* <Form.Item
            label="Purpose"
            name="purpose"
            required
            rules={[{ required: true, message: "Require" }]}
          >
            <Input type="number" />
          </Form.Item> */}
          <Form.Item label="Limit">
            <Form.List name="limit">
              {(fields, { add, remove }, { errors }) => {
                return (
                  <div>
                    {fields.map((field, index) => {
                      return (
                        <Space
                          key={`limit-${index}`}
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
                            name={[field.name, "max"]}
                            rules={[{ required: true, message: "Require" }]}
                          >
                            <Input type="number" placeholder="Max" />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "min"]}
                            rules={[{ required: true, message: "Require" }]}
                          >
                            <Input type="number" placeholder="Min" />
                          </Form.Item>
                          {/* <Form.Item
                            name={[field.name, "order_type"]}
                            rules={[{ required: true, message: "Require" }]}
                          >
                            <Input placeholder="Order type" />
                          </Form.Item> */}
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
        </Form>
      </Create>
    </CanAccess>
  );
}
