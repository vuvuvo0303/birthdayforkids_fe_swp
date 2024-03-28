import { Breadcrumb, Button } from "antd";
import React, { useEffect, useState } from "react";
import { CheckOutlined, HomeOutlined, MoreOutlined } from "@ant-design/icons";
import { Box, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import api from "../../../config/axios";

import { useSelector } from "react-redux";
const ManageSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [renderKey, setRenderKey] = useState(0);
  const loggedUser = useSelector((store) => store.user);
  const rerender = () => {
    setRenderKey(renderKey + 1);
  };
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you want to delete this schedule?")) {
        await api.delete(`/api/schedules/${id}`);
        setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
        toast.success("Delete schedule successfully!");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error("Failed to delete schedule");
    }
  };

  useEffect(() => {
    fetchData();
  }, [renderKey]);

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/schedules/${loggedUser.accountID}`);
      // const response = await api.get(`/api/schedules/${loggedUser.accountID}`);
      setSchedules(response.data);
      // console.log(schedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("Failed to fetch schedules");
    }
  };

  const handleAdd = async (time) => {
    if (schedules.find((item) => item.time === time)) {
      toast.error("Schedule already exist!");
    } else {
      const response = await api.post(`/api/schedules`, {
        time: `${time}:00`,
      });
      console.log(response.data);
      setSchedules((prev) => {
        return [
          ...prev,
          {
            id: prev.length + 1,
            time: time,
          },
        ];
      });
      toast.success("Add new schedule successfully!");
      rerender();
    }
  };
  const handleEdit = async (id, time) => {
    try {
      if (schedules.find((item) => item.time === time)) {
        toast.error("Schedule already exists!");
      } else {
        await api.put(`/api/schedules/${id}`, { time: `${time}:00` });
        setSchedules((prev) =>
          prev.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                time: time,
              };
            }
            return item;
          })
        );
        toast.success("Update schedule successfully!");
      }
    } catch (error) {
      console.error("Error editing schedule:", error);
      toast.error("Failed to edit schedule");
    }
  };

  const Row = ({ id, time }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [currentTime, setCurrentTime] = useState(time);

    const handleSave = () => {
      handleEdit(id, currentTime);
      setIsEdit(false);
    };

    return (
      <Tr>
        <Td>
          {isEdit ? (
            <Input
              type="time"
              value={currentTime}
              w="120px"
              h="40px"
              fontSize="lg"
              onChange={(e) => setCurrentTime(e.target.value)}
            />
          ) : (
            time
          )}
        </Td>
        <Td textAlign="right">
          {isEdit ? (
            <Button shape="circle" onClick={handleSave}>
              <CheckOutlined />
            </Button>
          ) : (
            <Menu>
              <MenuButton as="span" cursor="pointer">
                <Button shape="circle">
                  <MoreOutlined />
                </Button>
              </MenuButton>
              <MenuList p={0}>
                <MenuItem p={5} onClick={() => setIsEdit(!isEdit)}>
                  Edit
                </MenuItem>
                <MenuItem p={5} color="red" onClick={() => handleDelete(id)}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Td>
      </Tr>
    );
  };

  const AddButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newTime, setNewTime] = useState("12:00");

    return (
      <>
        <Button type="primary" onClick={onOpen}>
          Add
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new schedule</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justifyContent="center" mt={10} flexDir="column" alignItems="center" gap={5}>
                <Input
                  placeholder="Select time"
                  type="time"
                  w="120px"
                  h="40px"
                  fontSize="lg"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </Flex>
            </ModalBody>

            <ModalFooter display="flex" gap={5}>
              <Button type="primary" danger onClick={onClose}>
                Cancel
              </Button>
              <Button type="primary" onClick={() => handleAdd(newTime)}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <div>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { href: "/", title: <HomeOutlined /> },
          { href: "", title: "Hosts" },
          { title: "Schedule" },
          { title: "Manage" },
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
              <Th>Time</Th>
              <Th textAlign="right">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {schedules.map((schedule, index) => {
              return <Row key={`schedule-${index}`} id={schedule.id} time={schedule.time} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageSchedule;
