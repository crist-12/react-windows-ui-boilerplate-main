describe("Renderizar la pagina de login", ()=> {
    it("renderizado correctamente", ()=> {
        cy.visit("/")
        cy.get("#login-screen").should("be.visible")
    })
})

describe("Carga todos los controles", ()=> {
    it("Los controles han cargado exitosamente", ()=> {
        cy.visit("/")
        cy.get("#input-username").should("be.visible")
        cy.get("#input-password").should("be.visible")
        cy.get("#button-login").should("be.visible")
    })
})

describe("Evita pasar sin datos ingresados", ()=> {
    it("Campos validados exitosamente", ()=> {
        cy.visit("/")
        cy.get("#button-login").should("be.visible")
        cy.get("#button-login").click()
        cy.get(".app-alert-modal").should("be.visible")
    })
})

describe("Ingresa con las credenciales", ()=> {
    it("Campos validados exitosamente", ()=> {
        cy.visit("/")
        cy.get("#input-username").type("crist12")
        cy.get("#input-password").type("ejemplo")
        cy.get(".app-alert-modal").should("not.be.visible")
        cy.get("#button-login").click()
        cy.visit("/home")
    })
})

