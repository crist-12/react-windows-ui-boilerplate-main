describe("Pagina de Asignaciones carga exitosamente", ()=> {
    it("Asignaciones cargada exitosamente", ()=> {
        cy.visit("/")
        cy.get("#input-username").type("crist12")
        cy.get("#input-password").type("ejemplo")
        cy.get("#button-login").click()
        cy.url().should('include', '/home')
        cy.get('a[href*="/asignar"]').click({ multiple: true, force: true })
    })
})

describe("Desplegar listado de equipos", ()=> {
    it("Elementos del listado de equipos cargados", ()=> {
        cy.get("#select-equipos").should('have.length', 1)
    })
})

describe("Desplegar listado de empleados", ()=> {
    it("Elementos del listado de empleados cargados", ()=> {
        cy.get("#select-empleados").should('have.length', 1)
    })
})

describe("Se puede navegar de Asignar >> Mis grupos", ()=> {
    it("Navegar a Mis grupos", ()=> {
        cy.get('a[href*="#/grupos"]').click({ multiple: true, force: true })
        cy.url().should('include', '/grupos')
    })
})

describe("Se puede navegar de Asignar >> Mis entidades", ()=> {
    it("Navegar a Mis entidades", ()=> {
        cy.get('a[href*="#/categoria"]').click({ multiple: true, force: true })
        cy.url().should('include', '/categoria')
    })
})

describe("Se puede navegar de Asignar >> Colaboradores", ()=> {
    it("Navegar a Mis entidades", ()=> {
        cy.get('a[href*="#/empleado"]').click({ multiple: true, force: true })
        cy.url().should('include', '/empleado')
    })
})

describe("Corroborar validacion de selects MNT", ()=> {
    it("Botones deshabilitados", ()=> {
        cy.get('a[href*="#/asignar"]').click({ multiple: true, force: true })
        cy.get('#select-equipos').type("123456789 IdeaPad3 Lenovo 🟡{enter}")
        cy.get("#asi-asi").should("be.disabled")
        cy.get("#asi-rem").should("be.disabled")
        cy.get("#asi-mnt").should("be.disabled")
        cy.get("#asi-baj").should("be.disabled")
    })
})

describe("Corroborar validacion de selects SIN ASI", ()=> {
    it("Botones deshabilitados", ()=> {
        cy.get('a[href*="#/asignar"]').click({ multiple: true, force: true })
        cy.get('#select-equipos').type("123456789 Satellite Toshiba 🔵{enter}")
        cy.get("#asi-asi").should("not.be.disabled")
        cy.get("#asi-rem").should("be.disabled")
        cy.get("#asi-mnt").should("not.be.disabled")
        cy.get("#asi-baj").should("not.be.disabled")
    })
})



describe("Proceso de asignacion", ()=> {
    it("Asignacion realizada", ()=> {
        cy.get('#select-empleados').type("Empleado 1{enter}")
        cy.get("#asi-asi").click()
        cy.get("p").should("contain", "123456789 Satellite Toshiba")
        cy.get("p").should("contain", "Empleado 1")
        cy.get("#btn-cnl").click()
    })
})

describe("Modal de imagenes despliega su contenido", ()=> {
    it("Modal de imagenes despliega su contenido", ()=> {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('http://localhost:3000/');
        cy.get('#input-username').clear();
        cy.get('#input-username').type('crist12');
        cy.get('#input-password').clear();
        cy.get('#input-password').type('ejemplo');
        cy.get('#button-login').click();
        cy.get(':nth-child(5) > a > span').click();
        cy.get('.css-6j8wv5-Input').click();
        cy.get('#react-select-3-option-0').click();
        cy.get('.css-x19aeh-control > .css-319lph-ValueContainer > .css-6j8wv5-Input').click();
        cy.get('#react-select-5-option-0').click();
        cy.get('[style="background-color: rgb(238, 238, 238); margin-top: 30px; padding: 10px;"] > :nth-child(9) > a').click();
        cy.get(':nth-child(10) > .modal---modal-overlay---3D5Nr > #mdl-img > .modal---modal-footer---20LPi > :nth-child(1) > span').click();
        /* ==== End Cypress Studio ==== */
    })

    /* ==== Test Created with Cypress Studio ==== */
    it('Enviar y recibir de mantenimiento', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('http://localhost:3000/');
        cy.get('#input-username').clear();
        cy.get('#input-username').type('crist12');
        cy.get('#input-password').clear();
        cy.get('#input-password').type('ejemplo');
        cy.get('#button-login').click();
        cy.get(':nth-child(5) > a > span').click();
        cy.get('.css-6j8wv5-Input').click();
        cy.get('#react-select-3-option-0').click();
        cy.get('#asi-mnt').click();
        cy.get(':nth-child(2) > .app-label-radio-button > span').click();
        cy.get(':nth-child(2) > .app-label-radio-button > .app-radio').check();
        cy.get('.app-textarea').click();
        cy.get('.modal---modal-footer---20LPi > :nth-child(1)').click();
        cy.get(':nth-child(1) > [style="width: 450px; margin-top: 10px;"] > .css-b62m3t-container > .css-x19aeh-control > .css-319lph-ValueContainer > .css-6j8wv5-Input').click();
        cy.get(':nth-child(8) > a > span').click();
        cy.get(':nth-child(1) > [style="justify-content: center;"] > div > :nth-child(3)').click();
        cy.get('.modal---modal-footer---20LPi > :nth-child(1) > span').click();
        cy.get(':nth-child(4) > a').click();
        /* ==== End Cypress Studio ==== */
    });
})
