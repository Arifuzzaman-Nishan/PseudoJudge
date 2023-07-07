"use client";

import {
  useCreateGroupMutation,
  useGetGroupsQuery,
} from "@/features/groups/groupsApi";
import { Modal, Table } from "antd";
import React, { FC, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import Input from "../Shared/Input";
import Button, { ButtonSize } from "../Shared/Button";
import { useRouter } from "next/navigation";

const columns = [
  {
    title: "S.No",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Group Name",
    dataIndex: "groupName",
    key: "groupName",
  },
  {
    title: "Group Url",
    dataIndex: "groupUrl",
    key: "groupUrl",
  },
  {
    title: "Enrollment Key",
    dataIndex: "enrollmentKey",
    key: "enrollmentKey",
  },
  {
    title: "Total Members",
    dataIndex: "totalMembers",
    key: "totalMembers",
  },
];

const Groups = () => {
  const router = useRouter();

  const handleRowClick = (rowData: any) => {
    console.log("rowData is ", rowData);
    router.push(`/group/details/${rowData._id}`);
  };

  const {
    data: groupsData,
    isLoading,
    isError,
    isSuccess,
  } = useGetGroupsQuery();

  let dataSources = [];

  if (isLoading) {
    console.log("loading...");
  }

  if (isSuccess) {
    console.log("groupsData is ", groupsData);
    dataSources = groupsData?.map((group: any, index: number) => {
      return {
        key: group._id,
        index: index + 1,
        ...group,
      };
    });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-9">
      <div className="cursor-pointer">
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-blue-200 p-2 rounded focus:ring-2 focus:ring-blue-300 mb-2"
        >
          <MdOutlineAdd className="bg-primary text-2xl text-white rounded" />
        </button>
        <ModalFC isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: () => handleRowClick(record), // click row
            className: "cursor-pointer",
          };
        }}
        columns={columns}
        dataSource={dataSources}
        pagination={false}
      />
    </div>
  );
};

export default Groups;

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalOptionsData = [
  {
    key: 1,
    label: "Group Name",
    name: "groupName",
    type: "text",
    placeholder: "Enter the group name",
    required: true,
  },
];

type InputFieldType = {
  groupName: string;
};

const ModalFC: FC<ModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [modalFormData, setModalFormData] = useState({
    groupName: "",
    groupUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | null,
    type: string,
    field: string | null,
    value: string | null
  ) => {
    if (type === "text") {
      const { name, value } = e?.target as HTMLInputElement;

      setModalFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { mutate } = useCreateGroupMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const groupUrl = `${window.location.origin}/group/enrollment/${modalFormData.groupName}`;

    modalFormData.groupUrl = groupUrl;

    console.log("modalForm data is ", modalFormData);

    mutate(modalFormData);
  };

  return (
    <Modal
      title="Create Group"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <form action="" onSubmit={handleSubmit}>
        {modalOptionsData.map((option) => {
          const { type, label, name, key, placeholder, required } = option;
          if (type === "text") {
            return (
              <div
                className={`inline-block w-full ${key > 1 && "mt-5"}`}
                key={key}
              >
                <span
                  className={` ${
                    required &&
                    "after:content-['*'] after:ml-0.5 after:text-red-500"
                  }  block text-sm font-medium text-slate-700 capitalize`}
                >
                  {required ? label : label + " (optional)"}
                </span>
                <Input
                  placeholder={placeholder}
                  type={type}
                  value={modalFormData[name as keyof InputFieldType]}
                  required={required}
                  name={name}
                  onChange={(e) => handleChange(e, type, null, null)}
                  className="!py-2 !px-3  !font-normal"
                />
              </div>
            );
          }
        })}
        <div className="mt-5 flex justify-center">
          <Button
            className="bg-blue-500 hover:bg-blue-700 focus:ring-blue-200 !px-6 !py-3"
            type="submit"
            btnSize={ButtonSize.SMALL}
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};
