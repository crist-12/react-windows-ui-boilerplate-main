describe("Renderizar la pagina de home", ()=> {
    it("Renderizado correctamente", ()=> {
        cy.visit("/")
        cy.get("#input-username").type("crist12")
        cy.get("#input-password").type("ejemplo")
        cy.get("#button-login").click()
        cy.url().should('include', '/home')
        cy.get('h3').should('contain', 'crist12')
    })
})

describe("Ha cargado el grafico correctamente", ()=> {
    it("Grafico cargado exitosamente", ()=> {
        cy.get("svg").should("be.visible")
    })
})