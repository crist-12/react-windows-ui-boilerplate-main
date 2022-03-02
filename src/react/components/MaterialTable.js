import React from 'react';
import MaterialTable from 'material-table'

const MaterialTableComponent = (columnas, dataList, title, name) => {
    return (
        <MaterialTable
            columns={columnas}
            data={dataList}
            title={title}
            style={{ boxShadow: 'none', marginRight: '30px' }}
            localization={{
                header: {
                    actions: 'Acciones'
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsSelect: 'filas',
                    labelRowsPerPage: 'Filas por página',
                    firstAriaLabel: 'Primera página',
                    firstTooltip: 'Primera página',
                    previousAriaLabel: 'Página anterior',
                    previousTooltip: 'Página anterior',
                    nextAriaLabel: 'Siguiente página',
                    nextTooltip: 'Siguiente página',
                    lastAriaLabel: 'Última página',
                    lastTooltip: 'Última página'
                },
                toolbar: {
                    nRowsSelected: '{0} fila(s) seleccionada(s)',
                    searchTooltip: 'Buscar...',
                    searchPlaceholder: 'Buscar...',
                    exportTitle: {name},
                    exportPDFName: 'Exportar como PDF',
                    exportCSVName: 'Exportar como CSV'
                },
                body: {
                    emptyDataSourceMessage: 'No hay datos para mostrar',
                    filterRow: {
                        searchTooltip: 'Buscar...'
                    }
                }
            }}
            options={{
                actionsColumnIndex: -1,
                exportButton: true,
                draggable: true
            }}
            actions={
                [
                    {
                        icon: 'edit',
                        tooltip: 'Editar categoria',
                        onClick: (event, rowData) => alert("Has presionado la categoria: " + rowData.categoria)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar categoria',
                        onClick: (event, rowData) => alert("Has presionado la categoria: " + rowData.categoria)
                    }
                ]
            }

        />
    )
};

export default MaterialTableComponent;