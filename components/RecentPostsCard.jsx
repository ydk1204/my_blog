import React from "react";

export const RecentPostsCard = ({ post }) => {
  const { title, tag, description, img, _raw } = post;
  return <div className="w-[24rem] h-[30rem] bg-white mx-2 my-10"></div>;
};
