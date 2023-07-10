"use client";

import {
  useGroupDetailsQuery,
  useUserAddedMutation,
  useUserRemovedMutation,
} from "@/features/group/groupApi";
import { Descriptions, Divider, Radio, Space, Table } from "antd";
import React, { FC, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { MdOutlineAdd } from "react-icons/md";
import Button, { ButtonSize } from "@/components/Shared/Button";
import { Modal } from "antd";
import { useUsersQuery } from "@/features/user/userApi";

interface Props {
  id: string;
}

const GroupDetails: FC<Props> = ({ id }) => {
  console.log("group Id is ", id);

  const {
    data: groupDetailsData,
    isSuccess,
    isLoading,
    isError,
  } = useGroupDetailsQuery(id);

  if (isLoading) {
    console.log("loading...");
  }

  let content = null;
  if (isSuccess) {
    content = (
      <div className="max-w-[70%] m-auto">
        <Descriptions
          column={1}
          className="text-center"
          title="Group Details"
          size="middle"
        >
          <Descriptions.Item label="GroupName">
            {groupDetailsData.groupName}
          </Descriptions.Item>
          <Descriptions.Item label="EnrollmentKey">
            {groupDetailsData.enrollmentKey}
          </Descriptions.Item>
          <br />
          <Descriptions.Item label="GroupUrl">
            {groupDetailsData.groupUrl}
          </Descriptions.Item>
          <Descriptions.Item label="TotalMembers">
            {groupDetailsData.totalMembers}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Group Members`,
      children: <UsersTable groupId={id} />,
    },
    {
      key: "2",
      label: `Group Problems`,
      children: `Content of Tab Pane 2`,
    },
  ];

  return (
    <div>
      {content}
      <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default GroupDetails;

interface UsersTableProps {
  groupId: string;
}

const UsersTable: FC<UsersTableProps> = ({ groupId }) => {
  const { mutate } = useUserRemovedMutation();

  const handleUserRemoved = ({
    groupId,
    userId,
  }: {
    groupId: string;
    userId: string;
  }) => {
    console.log("user removed ", groupId, userId);
    mutate({ groupId, userId });
  };

  const usersInColumns = [
    {
      title: "S.No",
      dataIndex: "index",
    },
    {
      title: "UserName",
      dataIndex: "username",
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => <h1 className="cursor-pointer">Remove</h1>,
      onCell: (record: any, rowIndex: number) => ({
        onClick: () =>
          handleUserRemoved({
            groupId,
            userId: record._id,
          }),
      }),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: usersInGroupData,
    isSuccess,
    isLoading,
  } = useUsersQuery("in", groupId);

  let content = null;

  if (isSuccess) {
    console.log("user data ", usersInGroupData);

    content = (
      <Table
        columns={usersInColumns as any}
        dataSource={usersInGroupData?.map((user: any, index: number) => ({
          index: index + 1,
          key: user._id,
          ...user,
        }))}
      />
    );
  }

  return (
    <div className="max-w-[80%] m-auto">
      <div className="cursor-pointer">
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-blue-200 p-2 rounded focus:ring-2 focus:ring-blue-300 mb-2"
        >
          <MdOutlineAdd className="bg-primary text-2xl text-white rounded" />
        </button>
        <ModalFC
          groupId={groupId}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      {content}
    </div>
  );
};

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  groupId: string;
}

const usersNotInGroupColumns = [
  {
    title: "S.No",
    dataIndex: "index",
  },
  {
    title: "UserName",
    dataIndex: "username",
  },
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

const ModalFC: FC<ModalProps> = ({ isModalOpen, setIsModalOpen, groupId }) => {
  const {
    data: usersNotInGroup,
    isSuccess,
    isLoading,
  } = useUsersQuery("notIn");

  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      selectedRows.forEach(function (part: any, index: number, theArray: any) {
        delete theArray[index].index;
        delete theArray[index].key;
      });

      setSelectedRows(selectedRows);
    },
  };

  let content = null;
  if (isSuccess) {
    content = (
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={usersNotInGroupColumns}
        dataSource={usersNotInGroup?.map((user: any, index: number) => ({
          index: index + 1,
          key: user._id,
          ...user,
        }))}
      />
    );
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { mutate } = useUserAddedMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userInfo = {
      users: selectedRows,
      groupId: groupId,
    };

    console.log(userInfo);
    mutate(userInfo);
  };

  return (
    <Modal
      title="Add Members"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <form action="" onSubmit={handleSubmit}>
        {content}
        <div className="mt-5 flex justify-center">
          <Button
            className="bg-blue-500 hover:bg-blue-700 focus:ring-blue-200 !px-6 !py-3"
            type="submit"
            btnSize={ButtonSize.SMALL}
          >
            Add Group
          </Button>
        </div>
      </form>
    </Modal>
  );
};
