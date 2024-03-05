import React, { useState, useContext } from "react";
import { Button, message, Steps, ConfigProvider, Form, Input } from "antd";
import { HeaderLogin } from "../../component/HeaderLogin";

import "./checkout.css";
import Checkout from "./Checkout";
import Payment from "./payment";
import FillInformation from "./fill-information";
import ChoosePackage from "./choose-package";
import ChooseServices from "./choose-services";

const { Step } = Steps;
const { Item } = Form;

const StepProgress = () => {
  const [current, setCurrent] = useState(0);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls("steps", "ant-steps");
  const [form] = Form.useForm();

  const steps = [
    {
      title: "Package",
      content: <ChoosePackage />,
    },
    {
      title: "Services",
      content: <ChooseServices />,
    },
    {
      title: "Fill information",
      content: <FillInformation form={form} setCurrent={setCurrent} current={current} />,
    },
    {
      title: "Checkout",
      content: <Checkout />,
    },
    {
      title: "Payment",
      content: <Payment />,
    },
  ];
  const next = () => {
    if (current === 2) {
      form.submit();
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <HeaderLogin />
      <div className="container container-progress">
        <Steps current={current} className={prefixCls}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className={`${prefixCls}-content`}>
          {typeof steps[current].content === "function" ? steps[current].content() : steps[current].content}
        </div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success("Processing complete!")}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
