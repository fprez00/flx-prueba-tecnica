// src/components/UsersTable.jsx
import React, { useState } from 'react';
import { Table, Tag, Space, Button, Modal, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

/**
 * Tabla de usuarios con paginación y acciones de editar/eliminar usando un Modal personalizado
 */
export default function UsersTable({ dataSource, total, pagination, onChangePagination, onEdit, onDelete }) {
  const { limit, offset } = pagination;
  const current = Math.floor(offset / limit) + 1;

  // Estado para mostrar modal de eliminación
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const openDeleteModal = (record) => {
    setUserToDelete(record);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await onDelete(userToDelete.id);
    }
    setDeleteModalVisible(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setUserToDelete(null);
  };

  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Activo' : 'Inactivo'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => openDeleteModal(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current,
          pageSize: limit,
          total,
          showSizeChanger: false,
        }}
        onChange={pag => onChangePagination({ offset: (pag.current - 1) * pag.pageSize })}
      />

      <Modal
        open={deleteModalVisible}
        title="Eliminar usuario"
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Eliminar"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
        centered
        destroyOnClose
      >
        <p>¿Está seguro que quiere eliminar el usuario <span style={{ color: 'red' }}>@{userToDelete?.username}</span>?</p>
      </Modal>
    </>
  );
}

UsersTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  pagination: PropTypes.shape({
    limit: PropTypes.number,
    offset: PropTypes.number,
  }).isRequired,
  onChangePagination: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

UsersTable.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};
