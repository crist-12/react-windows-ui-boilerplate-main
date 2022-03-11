
  const addRecordLog = async (action, modulo) => {
    try {
      setLoading(true)
      const response = await fetch(process.env.REACT_APP_HOME + "bitacora", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "Accion": action, "Modulo": modulo })
      })
      setCategoria("")
      await getItems()
      setShowModal(false)
      setLoading(false)
      alert("La categoria se guardo exitosamente")
    } catch (error) {
      alert("Ocurrio un error al guardar la categoria")
    }
  }


  export default addRecordLog;