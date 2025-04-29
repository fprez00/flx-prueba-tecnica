// src/pages/UsersListPage.jsx
import React, { useState } from 'react';
import { Button, Spin, Breadcrumb } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UsersFilter from '../components/UsersFilter.jsx';
import UsersTable from '../components/UsersTable.jsx';
import UserModalForm from '../components/UserModalForm.jsx';
import { useUsers } from '../context/UserContext.jsx';
const UsersListPage = () => {
  const {
    list,
    total,
    loading,
    filters,
    pagination,
    setFilters,
    setPagination,
    addUser,
    editUser,
    removeUser
  } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const openCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = async (userData) => {
    if (editingUser) {
      await editUser(editingUser.id, userData);
    } else {
      await addUser(userData);
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    await removeUser(id);
  };

  return (
    <>  
      {/* Breadcrumb */}
      <Breadcrumb style={{ marginBottom: 16, color: 'rgba(0,0,0,0.45)' }}>
        <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        <Breadcrumb.Item>Listado de usuarios</Breadcrumb.Item>
      </Breadcrumb>

      {/* Filtros y botón */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <UsersFilter filters={filters} onFilter={setFilters} />
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
          Agregar usuario
        </Button>
      </div>

      {/* Tabla o Loader */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0' }}><Spin size="large" /></div>
      ) : (
        <UsersTable
          dataSource={list}
          total={total}
          pagination={pagination}
          onChangePagination={setPagination}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      {/* Modal Formulario */}
      <UserModalForm
        open={isModalOpen}
        user={editingUser}
        onSave={handleSave}
        onClose={closeModal}
      />
    </>
  );
};

export default UsersListPage;