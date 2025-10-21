import { Notfound } from "@/components/not-found";
import { useRoles } from "@/stores/useRoles";
import {
  CanAccess,
  useNavigation,
  useResourceParams,
  useUpdate,
} from "@refinedev/core";
import { Button, Flex, Form, Modal, Select } from "antd";
import { useMemo } from "react";

export function AssignRole() {
  const { id } = useResourceParams();
  const { list } = useNavigation();
  const [form] = Form.useForm();
  const { mutate } = useUpdate({
    resource: "roles",
    id: id,
    mutationOptions: {
      onSuccess: () => {
        list("roles");
      },
    },
    successNotification() {
      return {
        message: `Successful updated`,
        description: "Successful",
        type: "success",
      };
    },
    errorNotification: (error) => {
      return {
        message: `Failed to create`,
        description: error?.message,
        type: "error",
      };
    },
  });

  const { data } = useRoles();
  const options = useMemo(() => {
    return (data || []).map((item) => {
      return {
        value: item,
        label: item.split("_").join(" "),
      };
    });
  }, [data]);

  return (
    <CanAccess action="edit" resource="roles" fallback={<Notfound />}>
      <Modal
        open={true}
        onCancel={() => {
          list("roles");
        }}
        title="Assign Role"
        footer={null}
      >
        <Form
          form={form}
          style={{
            marginTop:16
          }}
          onFinish={(values) => {
            console.log(values);
            mutate({ values: { ...values, type: 'assign' } });
          }}
        >
          <Form.Item
            label="Role"
            name="role"
            required
            rules={[{ required: true, message: "Require" }]}
            labelCol={{ span: 4 }}
          >
            <Select
              labelRender={(e) => {
                return <span className="capitalize">{e.label}</span>;
              }}
              options={options}
            ></Select>
          </Form.Item>

          <Flex justify="end" gap={16}>
            <Button
              htmlType="button"
              onClick={() => {
                list("roles");
              }}
            >
              Close
            </Button>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Flex>
        </Form>
      </Modal>
    </CanAccess>
  );
}
