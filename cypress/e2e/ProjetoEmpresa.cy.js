import page from '../support/pages'
const elem = require('../support/pages/elementos').XPATHS;

describe('template spec', () => {

  const password = Cypress.env('password');
  
beforeEach(()=>{
  cy.visit('http://mantis-prova.base2.com.br')
});


  it('Validar sistema', () => {
    cy.url().should('be.equal','https://mantis-prova.base2.com.br/login_page.php')
    page.estaVisivel('input[id="username"]')
  })

  it('Pedir uma nova conta', () => {
    page.estaVisivel('.back-to-login-link').click()
    cy.get('*.header').contains(' Criar Conta ');
  })

  it('Perdeu sua chave', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    cy.get('a.pull-right').contains('Perdeu a sua senha?').click();
    cy.get('.header').contains(' Reajuste de Senha ')
  })

  it('Reposição da palavra-chave', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    cy.get('a.pull-right').contains('Perdeu a sua senha?').click();
    cy.get('.header').contains(' Reajuste de Senha ')
    cy.get('#email-field').type('Eduardonoli@gmail.com')
    cy.get('input[value="Enviar"]').click()
    page.estaVisivel('input[id="username"]')
  })

  it('Login efetuado com sucesso', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.estaVisivel('input[placeholder="Senha"]')
  })

  it('Funcionalidade "Sair"', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')

    cy.get('.user-info').click()
    cy.get('.user-menu > :nth-child(4) > a').click()
    page.estaVisivel('input[id="username"]')
  })


  it('Login "Palavra Chave" (Mantis Bug Tracker)', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')

    page.deslogarPagina()
  })

  it('Manter - me Autenticado', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.estaVisivel('input[placeholder="Senha"]')
    cy.get(':nth-child(4) > .inline > .lbl').click();
  })
  
  it('Permitir a sessão apenas deste endereço IP', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.estaVisivel('input[placeholder="Senha"]')
    cy.get(':nth-child(5) > .inline > .lbl').click();
  })

  it('Minha visão', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')

    page.contemElemento(elem.unassigned(),'Não Atribuídos')
    page.contemElemento(elem.reported(),'Relatados por Mim')
    page.contemElemento(elem.resolved(),'Resolvidos')
    page.contemElemento(elem.recent_mod(),'Modificados Recentemente (30 Dias)')
    page.contemElemento(elem.monitored(),'Monitorados por Mim')

    page.deslogarPagina()
  })

  it('Ver problema', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')
    cy.get(':nth-child(2) > a > .menu-text').click()
    cy.get('#reporter_id_filter').contains('Relator')
    cy.get('.form-inline > .btn').contains('Aplicar Filtro')

    page.deslogarPagina()
  })

  it('Funcionalidade "Registro de Alterações"', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')
    cy.get(':nth-child(3) > a > .menu-text').click()

    cy.get('.table > :nth-child(1) > :nth-child(1) > .category > label').contains('Categoria')
    cy.get('.table > :nth-child(1) > :nth-child(3) > .category > label').contains('Gravidade')

    page.deslogarPagina()
  })

  it('Relatar problema', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')
    cy.get(':nth-child(4) > a > .menu-text').click()

    cy.get('.lead').contains('Não há informações disponíveis sobre registros de mudanças')
    
    page.deslogarPagina()
  })

  it('Funcionalidade "Roadmap"', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')
    cy.get(':nth-child(5) > a > .menu-text').click()

    cy.get('.lead').contains('Nenhuma informação disponível Roadmap')
    
    page.deslogarPagina()
  })
  
  it('Funcionalidade "Problema (lupa)"', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')
    page.estaVisivel('.nav-search-input')
    cy.get(':nth-child(3) > a > .menu-text').click()
    page.estaVisivel('.nav-search-input')
    cy.get(':nth-child(4) > a > .menu-text').click()
    page.estaVisivel('.nav-search-input')
    cy.get(':nth-child(5) > a > .menu-text').click()
    page.estaVisivel('.nav-search-input')

    page.deslogarPagina()

  })

  it('Funcionalidade "Conta Pessoal"', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')
    cy.get('.user-info').click()
    cy.get('.user-menu > :nth-child(1) > a').click()
    page.estaVisivel('#email-field')
    page.estaVisivel('#realname')

    page.deslogarPagina()
  })

  it('Funcionalidade Aba "Preferências"', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')
    cy.get('.user-info').click()
    cy.get('.user-menu > :nth-child(1) > a').click()
    cy.get('.row > .nav > :nth-child(2) > a').click()

    page.estaVisivel('#default-project-id')
    page.estaVisivel('#timezone')

    page.deslogarPagina()
  })


  it('Funcionalidade Aba "Gerir Colunas"', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')
    cy.get('.user-info').click()
    cy.get('.user-menu > :nth-child(1) > a').click()
    cy.get('.row > .nav > :nth-child(3) > a').click()

    page.estaVisivel('#view-issues-columns')
    page.estaVisivel('#print-issues-columns')
    page.estaVisivel('#all-columns')
    page.estaVisivel('#excel-columns')

    page.deslogarPagina()
  })

  it('Funcionalidade Aba "Perfis"', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')
    cy.get('.user-info').click()
    cy.get('.user-menu > :nth-child(1) > a').click()
    cy.get('.row > .nav > :nth-child(4) > a').click()

    page.estaVisivel('#platform')
    page.estaVisivel('#os')
    page.estaVisivel('#os-version')
    page.estaVisivel('#description')

    page.deslogarPagina()
  })

  it('Funcionalidade Aba "Chaves API"', () => {
    page.preencheLogin('Eduardo_noli')
    page.btnLogin()
    page.inputSenha(password);
    page.btnEntrar()
    cy.get('.smaller-75',{ timeout: 10000 }).contains(' MantisBT ')
    cy.get('.user-info').click()
    cy.get('.user-menu > :nth-child(1) > a').click()
    cy.get('.row > .nav > :nth-child(5) > a').click()

    page.estaVisivel('#token_name')

    page.deslogarPagina()
  })


})