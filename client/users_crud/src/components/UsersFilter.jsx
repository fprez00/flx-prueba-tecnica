import React from 'react';
import { Input, Select, Space } from 'antd';

const { Search } = Input;
const { Option } = Select;

/**
 * Componente de filtros: búsqueda por texto y filtro por estado
 * @param {{ search: string, status: string }} filters
 * @param {(filters: { search: string, status: string }) => void} onFilter
 */
export default function UsersFilter({ filters, onFilter }) {
  const handleSearch = (value) => {
    onFilter({ ...filters, search: value });
  };

  const handleStatusChange = (value) => {
    onFilter({ ...filters, status: value || '' });
  };

  return (
    <Space size="middle">
      <Search
        placeholder="Buscar por nombre o apellido"
        allowClear
        defaultValue={filters.search}
        onSearch={handleSearch}
        style={{ width: 240 }}
      />
      <Select
        placeholder="Filtrar por estado"
        allowClear
        value={filters.status || undefined}
        onChange={handleStatusChange}
        style={{ width: 160 }}
      >
        <Option value="active">Activo</Option>
        <Option value="inactive">Inactivo</Option>
      </Select>
    </Space>
  );
}
