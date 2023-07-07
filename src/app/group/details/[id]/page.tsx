import GroupDetails from "@/components/Group/GroupDetails";
import React from "react";

function page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div>
      <GroupDetails id={id} />
    </div>
  );
}

export default page;
