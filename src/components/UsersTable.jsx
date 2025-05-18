import React, { useState, useEffect, useRef, createContext } from "react";
import { Table, Button, message, Popconfirm, Avatar, Input, Select, Form, Modal } from "antd";
import MainLayout from "../components/layout/MainLayout";
import { TweenOneGroup } from "rc-tween-one";
import { httpInterceptedServices } from "../services/httpRequests";
const { Option } = Select;

const TableContext = createContext(false);
const enterAnim = [{ opacity: 0, x: 30, backgroundColor: "#fffeee", duration: 0 }, { height: 0, duration: 200, type: "from", delay: 250, ease: "easeOutQuad", onComplete: (e) => { e.target.style.height = "auto"; } }, { opacity: 1, x: 0, duration: 250, ease: "easeOutQuad" }, { delay: 1000, backgroundColor: "#fff" }];
const leaveAnim = [{ duration: 250, opacity: 0 }, { height: 0, duration: 200, ease: "easeOutQuad" }];
const pageEnterAnim = [{ opacity: 0, duration: 0 }, { height: 0, duration: 150, type: "from", delay: 150, ease: "easeOutQuad", onComplete: (e) => { e.target.style.height = "auto"; } }, { opacity: 1, duration: 150, ease: "easeOutQuad" }];
const pageLeaveAnim = [{ duration: 150, opacity: 0 }, { height: 0, duration: 150, ease: "easeOutQuad" }];
const AnimTBody = (props) => (
  <TableContext.Consumer>
    {(isPage) => (
      <TweenOneGroup component="tbody" enter={isPage ? pageEnterAnim : enterAnim} leave={isPage ? pageLeaveAnim : leaveAnim} appear={false} exclusive {...props} />
    )}
  </TableContext.Consumer>
);

const EditableCell = ({ editing, dataIndex, title, inputType, children, ...restProps }) => {
  const inputNode = inputType === "select" ? (
    <Select>
      <Option value="admin">admin</Option>
      <Option value="user">user</Option>
    </Select>
  ) : (
    <Input />
  );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }} rules={[{ required: true, message: `Please Input ${title}!` }]}> {inputNode} </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UsersTable = ({ className = "table-enter-leave-demo" }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPageTween, setIsPage] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const isEditing = (record) => record.id === editingKey;

  const columns = [
    { title: "Avatar", dataIndex: "image", key: "image",    render: (src) => <Avatar src={src} /> },
    { title: "First Name", dataIndex: "fName", key: "fName", editable: true },
    { title: "Last Name", dataIndex: "lName", key: "lName", editable: true },
    { title: "Email", dataIndex: "email", key: "email", editable: true },
    { title: "Mobile", dataIndex: "mobile", key: "mobile", editable: true },
    { title: "Title", dataIndex: "title", key: "title", editable: true },
    { title: "Role", dataIndex: "role", key: "role", editable: true, inputType: "select" },
    { title: "Skills", dataIndex: "skills", key: "skills", editable: true },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="link" onClick={() => save(record.id)} style={{ marginRight: 8 }}>Save</Button>
            <Popconfirm title="Cancel changes?" onConfirm={cancel}><Button type="link">Cancel</Button></Popconfirm>
          </span>
        ) : (
          <>
            <Button type="link" disabled={editingKey !== ""} onClick={() => edit(record)}>Edit</Button>
            <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record.id)}>
              <Button type="link" danger disabled={editingKey !== ""}>Delete</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return { ...col, onCell: (record) => ({ record, inputType: col.inputType || "text", dataIndex: col.dataIndex, title: col.title, editing: isEditing(record) }) };
  });

  const fetchUsers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const { data: res } = await httpInterceptedServices(`/users?page=${page}&limit=${pageSize}`, { method: "GET" });
console.log({res})
      setData(res.map((u) => ({ ...u, key: u.id })));
      setPagination((prev) => ({ ...prev, current: page, pageSize, total: res.total }));
    } catch (err) {
      message.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      await httpInterceptedServices(`/users/${id}`, { method: "PUT", data: row });
      fetchUsers(pagination.current, pagination.pageSize);
      setEditingKey("");
      message.success("User updated");
    } catch (err) {
      message.error(err.message || "Update failed");
    }
  };
  const edit = (record) => { form.setFieldsValue({ ...record }); setEditingKey(record.id); };
  const cancel = () => setEditingKey("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [addForm] = Form.useForm();

  const openAddModal = () => {
    addForm.resetFields();
    setAddModalOpen(true);
  };
  const handleAdd = async () => {
    // console.log({addForm})

    try {
      const values = await addForm.validateFields();
    //   console.log({values})
      await httpInterceptedServices("/users", { method: "POST", data: values });
      message.success("User added");
      setAddModalOpen(false);
      fetchUsers(1, pagination.pageSize);
    } catch (err) {
      if (err?.errorFields) return; // validation failed
      message.error(err.message || "Add failed");
    }
  };
  const handleDelete = async (id) => { try { await httpInterceptedServices(`/users/${id}`, { method: "DELETE" }); message.success("User deleted"); fetchUsers(pagination.current, pagination.pageSize); } catch (err) { message.error(err.message || "Delete failed"); } };

  const handleTableChange = (pag) => {
    setIsPage(true);
    fetchUsers(pag.current, pag.pageSize);
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <MainLayout>
      <div className={`${className}-table-wrapper w-full`} style={{ width: "100%" }}>
        <div className={`${className}-action-bar`}>
          <Button type="primary" onClick={openAddModal} disabled={editingKey !== ""}>Add</Button>
        </div>
        <Form form={form} component={false}>
          <TableContext.Provider value={isPageTween}>
            <Table rowKey="id" style={{ width: "100%" }}
              components={{ body: { wrapper: AnimTBody, cell: EditableCell } }} 
              columns={mergedColumns}
              dataSource={data}
              loading={loading}
              pagination={pagination}
            //   onChange={(e)=>handleTableChange(e)}
              className={`${className}-table`}
              scroll={{ x: 1200 }}
            />
          </TableContext.Provider>
        </Form>
      </div>
          <Modal title="Add User" open={isAddModalOpen} onOk={handleAdd} onCancel={() => setAddModalOpen(false)} okText="Create"

           destroyOnClose >
        <Form form={addForm} layout="vertical" onFinish={handleAdd} preserve={true} >
          <Form.Item name="fName" label="First Name" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="lName" label="Last Name" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}> <Input /> </Form.Item>
          <Form.Item name="mobile" label="Mobile" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="title" label="Title"> <Input /> </Form.Item>
          <Form.Item name="role" label="Role" initialValue="user"> <Select><Option value="admin">admin</Option><Option value="user">user</Option></Select> </Form.Item>
          <Form.Item name="skills" label="Skills"> <Input /> </Form.Item>
          <Form.Item name="image" label="Avatar URL"> <Input /> </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
};

export default UsersTable;
