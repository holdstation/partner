import { Notfound } from "@/components/not-found";
import { Roles } from "@/types/permission";
import {
  CanAccess,
  useNavigation,
  useOne,
  useResourceParams,
  useUpdate,
} from "@refinedev/core";
import { Flex, Modal, Spin, Tag } from "antd";

function getColorByRole(role: Roles) {
  if (role === "admin") {
    return "red";
  }

  if (role === "order_editor") {
    return "cyan";
  }
  if (role === "order_viewer") {
    return "blue";
  }
  if (role === "partner_editor") {
    return "lime";
  }
  if (role === "partner_viewer") {
    return "green";
  }
  if (role === "user_editor") {
    return "purple";
  }
  if (role === "user_viewer") {
    return "geekblue";
  }
}

export function RemoveRole() {
  const { id } = useResourceParams();
  const { list } = useNavigation();

  const {
    result,
    query: { isLoading },
  } = useOne<{ roles: Roles[] }>({
    resource: "roles",
    id: id,
  });
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

  const handleClose = (role: Roles) => {
    mutate({ values: { role: role, type: "remove" } });
  };

  return (
    <CanAccess action="edit" resource="roles" fallback={<Notfound />}>
      <Modal
        open={true}
        onCancel={() => {
          list("roles");
        }}
        title="Remove Role"
        footer={null}
      >
        {isLoading ? (
          <Spin />
        ) : (
          <Flex align="center" gap={8} wrap style={{ marginTop: 16 }}>
            {result?.roles?.map((item) => {
              return (
                <Tag
                  key={item}
                  closable
                  onClose={() => handleClose(item)}
                  style={{ textTransform: "capitalize" }}
                  color={getColorByRole(item)}
                >
                  {item.split("_").join(" ")}
                </Tag>
              );
            })}
          </Flex>
        )}
      </Modal>
    </CanAccess>
  );
}
