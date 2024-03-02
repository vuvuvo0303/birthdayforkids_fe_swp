import React from "react";
import { Space, Table, Tag } from "antd";
import { Button, Flex } from "antd";
export const OrderHistory = () => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "Cancel") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Flex gap="small" wrap="wrap">
                        <Button>
                            <a>Detail</a>
                        </Button>
                    </Flex>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: "1",
            name: "John Brown",
            quantity: 32,
            address: "New York No. 1 Lake Park",
            tags: ["Done"],
        },
        {
            key: "2",
            name: "Jim Green",
            quantity: 42,
            address: "London No. 1 Lake Park",
            tags: ["Cancel"],
        },
        {
            key: "3",
            name: "Joe Black",
            quantity: 32,
            address: "Sydney No. 1 Lake Park",
            tags: ["Done"],
        },
    ];
    return (
        <div className="table-orderHistory">
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
