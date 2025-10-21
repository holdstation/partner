import { SortNumericIcon } from "@/icons";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { CanAccess, HttpError } from "@refinedev/core";
import {
  Form,
  Input,
  message,
  Upload,
  Grid,
  Switch,
  DatePicker,
  InputNumber,
  Button,
  Card,
  Flex,
  Typography,
  Row,
  Col,
  Checkbox,
  CheckboxProps,
  Divider,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
const { useBreakpoint } = Grid;

const formItemLayout = {
  labelCol: { md: 6 },
  wrapperCol: { md: 14 },
};

const formItemTask = {
  labelCol: { md: 6 },
  wrapperCol: { md: 18 },
};

export function TaskCenterCreate() {
  const { md } = useBreakpoint();

  const [renderBanner, setRenderBanner] = useState(Math.random());
  const [showLocation, setShowLocation] = useState(true);
  const onChange: CheckboxProps["onChange"] = (e) => {
    setShowLocation(e.target.checked);
  };
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
    form,
  } = useForm<any, HttpError>({
    action: "create",
    resource: "taskCenter",
    defaultFormValues: {
      is_active: true,
      priority: 1,
    },
    errorNotification: (error) => {
      return {
        message: `Failed to create`,
        description: error?.message,
        type: "error",
      };
    },
    successNotification: () => {
      return {
        message: `Successful created`,
        description: "Successful",
        type: "success",
      };
    },
  });

  return (
    <CanAccess action="create" resource="taskCenter">
      <Create
        {...queryResult}
        resource="taskCenter"
        title="Create Task"
        saveButtonProps={saveButtonProps}
      >
        <Form
          {...formProps}
          {...formItemLayout}
          layout={md ? "horizontal" : "vertical"}
          variant="filled"
        >
          <Form.Item
            key={renderBanner.toString()}
            name="banner_url"
            getValueFromEvent={(value) => {
              return value?.file?.response?.url;
            }}
            required={true}
            rules={[{ required: true, message: "Require" }]}
            wrapperCol={{ span: 24 }}
          >
            <Upload.Dragger
              name="files"
              action="/"
              customRequest={(re) => {
                const url = URL.createObjectURL(re.file as File);
                re.onSuccess?.({
                  uid: new Date().toISOString(),
                  url: url,
                  thumbUrl: url,
                  status: "done",
                  percent: 100,
                  name: (re.file as File).name,
                });
                setTimeout(() => {
                  setRenderBanner(Math.random());
                }, 100);
              }}
              onChange={(info) => {
                const { status } = info.file;
                if (status === "done") {
                  message.success(
                    `${info.file.name} file uploaded successfully.`
                  );
                } else if (status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
              multiple={false}
            >
              {(form?.getFieldsValue() as { banner_url?: string })
                ?.banner_url ? (
                <img
                  src={
                    (
                      form.getFieldsValue() as {
                        banner_url?: string;
                      }
                    ).banner_url
                  }
                  className="max-h-64"
                />
              ) : (
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload banner
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single upload. (.jpg .jpeg .png .webp)
                  </p>
                </>
              )}
            </Upload.Dragger>
          </Form.Item>

          <Form.Item
            label="Name"
            required
          >
            <Row gutter={24}>
              <Col span={16}>
                <Form.Item
                  name={["name", "en"]}
                  required={true}
                  rules={[{ required: true, message: "Require" }]}
                  noStyle={!showLocation}
                >
                  <Input placeholder="Name" addonBefore={"🇬🇧 EN"}/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Checkbox checked={showLocation} onChange={onChange}>
                  Location
                </Checkbox>
              </Col>
            </Row>
            <Card hidden={!showLocation}>
              <Form.Item
                name={["name", "es"]}
                required={true}
                rules={[{ required: true, message: "Require" }]}
              >
                <Input placeholder="Name" addonBefore="🇪🇸 ES" />
              </Form.Item>
              <Form.Item
                name={["name", "fil"]}
                required={true}
                rules={[{ required: true, message: "Require" }]}
              >
                <Input placeholder="Name" addonBefore="🇵🇭 FIL" />
              </Form.Item>
              <Form.Item
                name={["name", "hi"]}
                required={true}
                rules={[{ required: true, message: "Require" }]}
              >
                <Input placeholder="Name" addonBefore="🇮🇳 HI" />
              </Form.Item>
              <Form.Item
                name={["name", "id"]}
                required={true}
                rules={[{ required: true, message: "Require" }]}
              >
                <Input placeholder="Name" addonBefore="🇮🇩 ID" />
              </Form.Item>
              <Form.Item
                name={["name", "ms"]}
                required={true}
                rules={[{ required: true, message: "Require" }]}
              >
                <Input placeholder="Name" addonBefore="🇲🇾 MS" />
              </Form.Item>
              <Form.Item
                name={["name", "pt"]}
                required={true}
                rules={[{ required: true, message: "Require" }]}
              >
                <Input placeholder="Name" addonBefore="🇵🇹 PT" />
              </Form.Item>
              <Form.Item
                name={["name", "sw"]}
                required={true}
                rules={[{ required: true, message: "Require" }]}
              >
                <Input placeholder="Name" addonBefore="🌍 SW" />
              </Form.Item>
              <Form.Item
                name={["name", "th"]}
                required={true}
                rules={[{ required: true, message: "Require" }]}
                noStyle
              >
                <Input placeholder="Name" addonBefore="🇹🇭 TH" />
              </Form.Item>
            </Card>
          </Form.Item>

          <Form.Item
            name={"title"}
            label="Title"
            required={true}
            rules={[{ required: true, message: "Require" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name={"description"}
            label="Description"
            required={true}
            rules={[{ required: true, message: "Require" }]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item
            name={"priority"}
            label="Priority"
            rules={[{ required: true, message: "Require" }]}
          >
            <InputNumber
              placeholder="Priority"
              addonBefore={<SortNumericIcon className="w-4 h-4" />}
              style={{ width: "100%", maxWidth: 320 }}
            />
          </Form.Item>
          <Form.Item
            name={"is_active"}
            label="Active"
            required={true}
            valuePropName="checked"
            rules={[{ required: true, message: "Require" }]}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name={"reward_pools"}
            label="Reward pool"
            required={true}
            rules={[{ required: true, message: "Require" }]}
          >
            <Input placeholder="Reward pool" />
          </Form.Item>

          <Form.Item
            name={"start_time"}
            label="Star Time"
            required={true}
            rules={[{ required: true, message: "Require" }]}
            getValueFromEvent={(e: ReturnType<typeof dayjs>) => {
              return e ? e.toISOString() : e;
            }}
            getValueProps={(e) => {
              return e;
            }}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name={"end_time"}
            label="End Time"
            required={true}
            rules={[{ required: true, message: "Require" }]}
            getValueFromEvent={(e: ReturnType<typeof dayjs>) => {
              return e ? e.toISOString() : e;
            }}
            getValueProps={(e) => {
              return e;
            }}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item name={"notes"} label="Notes">
            <Input.TextArea placeholder="Notes" />
          </Form.Item>

          <Form.Item name={"instruction"} label="Instruction">
            <Input placeholder="Instruction" />
          </Form.Item>

          <Divider />
          {/* <Typography.Title level={4}>Task</Typography.Title> */}
          <Form.Item label="Task">
            <Form.List name={"tasks"}>
              {(fields, { add, remove }, { errors }) => {
                return (
                  <Flex vertical={true} gap={16}>
                    {fields.map((field, index) => {
                      return (
                        <Card key={`tasks-${index + 1}`}>
                          <Flex vertical={true}>
                            <Flex
                              style={{ marginBottom: 16 }}
                              justify="space-between"
                              align="center"
                            >
                              <Typography.Title
                                level={5}
                                style={{ marginBottom: 0 }}
                              >
                                {`Task ${index + 1}`}
                              </Typography.Title>
                              {fields.length > 1 ? (
                                <Button
                                  type="dashed"
                                  danger
                                  onClick={() => remove(field.name)}
                                  icon={
                                    <MinusCircleOutlined className="dynamic-delete-button" />
                                  }
                                >
                                  Remote
                                </Button>
                              ) : null}
                            </Flex>
                            <Form.Item
                              name={[field.name, "title"]}
                              rules={[{ required: true, message: "Require" }]}
                              label={"Title"}
                              {...formItemTask}
                            >
                              <Input placeholder="Title" />
                            </Form.Item>
                            <Form.Item
                              {...formItemTask}
                              name={[field.name, "subtext"]}
                              rules={[{ required: true, message: "Require" }]}
                              label={"Subtext"}
                            >
                              <Input.TextArea placeholder="Subtext" />
                            </Form.Item>
                            <Form.Item
                              {...formItemTask}
                              name={[field.name, "description"]}
                              rules={[{ required: true, message: "Require" }]}
                              label={"Description"}
                            >
                              <Input.TextArea placeholder="Description" />
                            </Form.Item>

                            <Form.Item
                              {...formItemTask}
                              name={[field.name, "button_text"]}
                              rules={[{ required: true, message: "Require" }]}
                              label={"Button text"}
                            >
                              <Input placeholder="Button text" />
                            </Form.Item>

                            <Form.Item
                              {...formItemTask}
                              name={[field.name, "headline"]}
                              rules={[{ required: true, message: "Require" }]}
                              label={"Headline"}
                            >
                              <Input placeholder="Headline" />
                            </Form.Item>
                            <Form.Item
                              {...formItemTask}
                              name={[field.name, "priority"]}
                              rules={[{ required: true, message: "Require" }]}
                              label={"Priority"}
                            >
                              <Input placeholder="Priority" />
                            </Form.Item>
                          </Flex>
                        </Card>
                      );
                    })}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add({ priority: 1 })}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </Flex>
                );
              }}
            </Form.List>
          </Form.Item>
        </Form>
      </Create>
    </CanAccess>
  );
}
