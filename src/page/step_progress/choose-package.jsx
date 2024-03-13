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
  }
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
      <Row>
        <Col span={5}>
          <Image width={150} height={150} src={data.picture} />
        </Col>
        <Col span={19}>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <strong>Price: {data.price} VND</strong>

          <ul>
            {services.map((item) => (
              <li>
                <strong> {item.name} </strong>- Price: ${item.price}
                <Col span={8}>
                  {/* <Image width={150} height={150} src={item.picture} /> */}
                </Col>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePackage;
