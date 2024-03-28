import { Col, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./package.css";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { updatePackage } from "../../redux/features/bookingSlice";
import { useParams } from "react-router-dom";

export const ChoosePackage = () => {
  const [packages, setPackages] = useState([]);
  const selectedPackages = useSelector((store) => store?.booking);
  // const selectedPackages = useSelector((store) => store?.booking.package.packageID);

  const params = useParams();
  const fetchPackages = async () => {
    const response = await api.get(`/api/packages/packages-of-host/${params.accountID}`);
    // const response = await api.get(`/api/packages/packages-of-host/${selectedPackages}`);
    console.log(response);
    setPackages(response.data);
  };

  const handleLogRedux = (redux) => {
    console.log("reduxbooking", selectedPackages);
  };
  useEffect(() => {
    fetchPackages();
    handleLogRedux(selectedPackages);
  }, []);

  return (
    <>
      {packages.map((item) => (
        <Package data={item} isSelected={item?.packageID === selectedPackages?.package?.packageID} />
      ))}
    </>
  );
};

const Package = ({ isSelected, data }) => {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    const response = await api.get(`/api/services/package/${data.packageID}`);
    setServices(response.data);
    console.log(response);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSelectPackage = () => {
    dispatch(updatePackage(data));
  };

  return (
    <div className={`package ${isSelected ? "select" : ""}`} onClick={handleSelectPackage}>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <Image width={150} height={150} src={data.picture} />
        </Col>
        <Col span={19}>
          <div style={{ padding: "0 20px" }}>
            <h1 style={{ fontSize: 40, color: "#4d88ff" }}>{data.name}</h1>
            <p style={{ fontSize: 16 }}>
              <strong>Maximum Slot:</strong> {data.maximumSlot}
            </p>
            <p style={{ fontSize: 16 }}>
              <strong>Description:</strong> {data.description}
            </p>
            <p style={{ fontSize: 20, color: "#000066" }}>
              <strong>Price:</strong> {data.price.toLocaleString("vi-VN")} VND
            </p>
            <br />
            <br />
            <br />

            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <h3 style={{ fontSize: 20, color: "#669900" }}>Services of Package:</h3>
                {services.map((item) => (
                  <div key={item.name} style={{ marginBottom: 20 }}>
                    Service Name: <strong style={{ fontSize: 16 }}>{item.name}</strong>
                    <br />
                    <p style={{ fontSize: 15, color: "#000066" }}>
                      <strong>Price:</strong> {item.price.toLocaleString("vi-VN")} VND
                    </p>
                    <br />
                    <Image width={150} height={150} src={item.picture} />
                  </div>
                ))}
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePackage;
