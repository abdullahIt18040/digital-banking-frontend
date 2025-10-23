"use client";
import React from "react";

const BasicInformation = () => <p>Basic Information Component</p>;
const Organizers = () => <p>Organizers Component</p>;
const CoOrganizers = () => <p>Co-Organizers Component</p>;
const Moderator = () => <p>Moderator Component</p>;
const Speakers = () => <p>Speakers Component</p>;

const pages = [
  <BasicInformation />,
  <Organizers />,
  <CoOrganizers />,
  <Moderator />,
  <Speakers />,
];

interface ContentAreaProps {
  myIndex: number;
}

const ContentArea: React.FC<ContentAreaProps> = ({ myIndex }) => {
  return <div className="p-6">{pages[myIndex]}</div>;
};

export default ContentArea;
