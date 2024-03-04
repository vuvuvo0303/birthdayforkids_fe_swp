import { Col, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./package.css";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { updatePackage } from "../../redux/features/bookingSlice";

export const ChoosePackage = () => {
  const [packages, setPackages] = useState([]);
  const selectedPackages = useSelector((store) => store?.booking?.package);

  const fetchPackages = async () => {
    const response = await api.get(`/api/packages/packages-of-host/${68}`);
    setPackages(response.data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <>
      {packages.map((item) => (
        <Package data={item} isSelected={item.packageID === selectedPackages.packageID} />
      ))}
    </>
  );
};

const Package = ({ isSelected, data }) => {
  const dispatch = useDispatch();

  const handleSelectPackage = () => {
    dispatch(updatePackage(data));
  };

  return (
    <div className={`package ${isSelected ? "select" : ""}`} onClick={handleSelectPackage}>
      <Row>
        <Col span={5}>
          <Image
            width={200}
            src="https://parade.com/.image/t_share/MjAzMzU3NzQxMzU4NTIzOTgz/happy-birthday-wishes-messages.jpg"
          />
        </Col>
        <Col span={19}>
          <h1>Package name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, quo! Labore deserunt illum cupiditate
            doloremque ducimus, assumenda suscipit adipisci provident!
          </p>

          <ul>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePackage;
