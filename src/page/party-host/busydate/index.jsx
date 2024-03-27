import { Breadcrumb, Button, DatePicker, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { HomeOutlined, MoreOutlined } from "@ant-design/icons";
import { Box, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { format } from "date-fns";

import { useSelector } from "react-redux";
import api from "../../../config/axios";
const BusyDate = () => {
  const [schedules, setSchedules] = useState([]);
  const loggedUser = useSelector((store) => store.user);

  const [newDate, setNewDate] = useState(null);
  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this schedule?")) {
      try {
        await api.delete(`/api/schedulebusy/deleteBusySchedule/${id}`);
        setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
        toast.success("Delete schedule successfully!");
        fetchData();
      } catch (error) {
        console.error("Error deleting schedule:", error);
        toast.error("Failed to delete schedule");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/schedulebusy/getAllBusySchedule/${loggedUser.accountID}`);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("Failed to fetch schedules");
    }
  };
  const handleAdd = async (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (selectedDate < currentDate) {
      toast.error("You cannot add schedules in the past!");
      return;
    }

    if (schedules.find((item) => item.date === date)) {
      toast.error("Schedule already exists!");
    } else {
      setSchedules((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          date: date,
        },
      ]);
      toast.success("Add new schedule successfully!");
    }
  };
  const Row = ({ id, date }) => {
    console.log(date);
    const formattedDate = format(new Date(date), "dd/MM/yyyy");
    return (
      <Tr>
        <Td>{formattedDate}</Td>
        <Td textAlign="right">
          <Menu>
            <MenuButton as="span" cursor="pointer">
              <Button shape="circle">
                <MoreOutlined />
              </Button>
            </MenuButton>
            <MenuList p={0}>
              <MenuItem p={5} color="red" onClick={() => handleDelete(id)}>
                Delete
              </MenuItem>
              <MenuItem p={5} color="Green" onClick={() => handleEdit(id)}>
                Edit
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
    );
  };

  const AddButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newDate, setNewDate] = useState(null);

    const handleAddClick = async () => {
      try {
        const formattedDate = format(new Date(newDate), "yyyy-MM-dd");
        const response = await api.post(`/api/schedulebusy/addBusySchedule`, {
          date: formattedDate,
          accountId: loggedUser.accountID,
        });
        setSchedules((prev) => [
          ...prev,
          {
            id: response.data.id,
            date: response.data.date,
          },
        ]);
        toast.success("Add new Busy Date successfully!");
        fetchData();
        onClose();
      } catch (error) {
        console.error("Error adding new Busy Date:", error);
        toast.error("Failed to add new Busy Date");
      }
    };

    return (
      <>
        <Button type="primary" onClick={onOpen}>
          Add
        </Button>
        <Modal
          title="Add new schedule"
          visible={isOpen}
          onCancel={onClose}
          footer={[
            <Button key="cancel" danger onClick={onClose}>
              Cancel
            </Button>,
            <Button key="add" type="primary" onClick={handleAddClick}>
              Add
            </Button>,
          ]}
        >
          <DatePicker onChange={(date) => setNewDate(date)} />
        </Modal>
      </>
    );
  };

  return (
    <div>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { href: "/homepage", title: <HomeOutlined /> },
          { href: "", title: "Hosts" },
          { title: "Schedule" },
          { title: "Manage Busy Date" },
        ]}
      />
      <Flex justifyContent="space-between">
        <Text fontSize="3xl" mb={5}>
          Manage Schedules
        </Text>
        <Box>
          <AddButton />
        </Box>
      </Flex>

      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th textAlign="right">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {schedules.map((schedule, index) => {
              return <Row key={`schedule-${index}`} id={schedule.id} date={schedule.date} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BusyDate;
