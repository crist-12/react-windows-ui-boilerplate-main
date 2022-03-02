import React from "react"
import { LinkCompound, NavPageContainerRight } from "react-windows-ui"

const RightMenu =() => {
    return <NavPageContainerRight style={{ marginTop: "30px" }}>
      <h4>Mas acciones</h4>
      <LinkCompound
        to="/grupos"
        title="Mis grupos"
        subtitle="Gestiona tus grupos de productos"
        icon={<i className="icons10-outdent color-primary"></i>}
        focused
        style={{ marginBottom: "10px", width: "90%" }} />
      <LinkCompound
        to="/categoria"
        title="Mis entidades"
        subtitle="Añade nuevos productos personalizados"
        icon={<i className="icons10-puzzle color-primary"></i>}
        focused
        style={{ marginBottom: "10px", width: "90%" }} />
      <LinkCompound
        to="/empleado"
        title="Colaboradores"
        subtitle="Registra colaboradores"
        icon={<i className="icons10-user-group color-primary"></i>}
        focused
        style={{ marginBottom: "10px", width: "90%" }} />
    </NavPageContainerRight>
  }

  export default RightMenu;