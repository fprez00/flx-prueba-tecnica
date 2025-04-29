// src/components/UserModalForm.jsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button, Divider} from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

/**
 * Modal con formulario para crear o editar un usuario usando CSS Grid
 * @param {boolean} open    - Indica si el modal está abierto
 * @param {object|null} user - Datos del usuario a editar (null para creación)
 * @param {(data: object) => void} onSave - Callback al guardar el formulario
 * @param {() => void} onClose - Callback para cerrar el modal
 */
export default function UserModalForm({ open, user, onSave, onClose }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (user) {
        form.setFieldsValue({
          username: user.username,
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          status: user.status,
          age: user.age,
        });
      }
    }
  }, [open, user, form]);

  return (
    <Modal
      open={open}
      title={user ? 'Editar usuario' : 'Agregar usuario'}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
    >
        <Divider/>

      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: 'active' }}
        onFinish={onSave}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridAutoRows: 'auto',
          gap: '16px',
        }}
      >
        {/* Row 2 */}
        <Form.Item
          name="username"
          label="Usuario"
          rules={[{ required: true, message: 'Por favor ingresa el nombre de usuario' }]}
          style={{ gridColumn: '1 / 2' }}
        >
          <Input placeholder="Nombre de usuario" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Por favor ingresa el email' },
            { type: 'email', message: 'Ingresa un email válido' }
          ]}
          style={{ gridColumn: '2 / 3' }}
        >
          <Input placeholder="correo@ejemplo.com" />
        </Form.Item>

        {/* Row 3 */}
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
          style={{ gridColumn: '1 / 2' }}
        >
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Apellido"
          rules={[{ required: true, message: 'Por favor ingresa el apellido' }]}
          style={{ gridColumn: '2 / 3' }}
        >
          <Input placeholder="Apellido" />
        </Form.Item>

        {/* Row 4 */}
        <Form.Item
          name="status"
          label="Estado"
          rules={[{ required: true, message: 'Selecciona el estado' }]}
          style={{ gridColumn: '1 / 2' }}
        >
          <Select>
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="age"
          label="Edad"
          rules={[
            { required: true, message: 'Por favor ingresa la edad' },
            { type: 'number', min: 0, message: 'Edad debe ser un número positivo' }
          ]}
          style={{ gridColumn: '2 / 3' }}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Edad" />
        </Form.Item>
        
        <Divider/>
        <Divider/>

        {/* Row 5: Botón */}
        <Form.Item style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            {user ? 'Guardar cambios' : 'Agregar'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

UserModalForm.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

UserModalForm.defaultProps = {
  user: null,
};
