const elem = require('./elementos').ELEMENTS;
require('cypress-xpath');

class logout{

    deslogarPagina(){
    cy.get(elem.usuario).click()
    cy.get(elem.sair).click()
    cy.get(elem.usuarioLogin).should('be.visible');
    }

    preencheLogin(value){
        const campoLogin = cy.get('#username')
        campoLogin.type(value)
        
    }
    btnLogin(){
        cy.get(elem.login).click()
    }

    btnEntrar(){
        cy.get(elem.entrar).click()
    }

    estaVisivel(xpath){
        const visivel = cy.get(xpath)
        return visivel.should('be.visible')
    }

    contemElemento(xpath, value){
        cy.get(xpath).contains(value)
    }

    inputSenha(value){
        cy.get('#password').type(value)
    }
}
export default new logout();