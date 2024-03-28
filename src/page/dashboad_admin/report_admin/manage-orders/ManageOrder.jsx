import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Breadcrumb } from "antd";
import React from "react";
import DataTable from "./DataTable";

const ManageOrder = () => {
    return (
        <>
            <Breadcrumb
                style={{ margin: "16px 0" }}
                items={[
                    {
                        href: "",
                        title: (
                            <>
                                <UserOutlined />
                                <span>Admin</span>
                            </>
                        ),
                    },
                    {
                        title: "Manange Order",
                    },
                ]}
            />
            <Flex justifyContent="space-between">
                <Text fontSize="3xl" mb={5}>
                    Manage Orders
                </Text>
                <Box>{/* <AddButton /> */}</Box>
            </Flex>
            <DataTable></DataTable>
        </>
    );
};

export default ManageOrder;
