export const ELEMENTS = {
    usuario: '.user-info',
    sair: '.user-menu > :nth-child(4) > a',
    usuarioLogin:'input[id="username"]',
    login: 'input[value="Login"]',
    entrar: 'input[value="Entrar"]'
}

export const XPATHS = {
    unassigned:() => '#unassigned > .widget-header > .widget-title > .white',

    reported:() => '#reported > .widget-header > .widget-title > .white',
    resolved:() => '#resolved > .widget-header > .widget-title > .white',
    recent_mod:() => '#recent_mod > .widget-header > .widget-title > .white',
    monitored:() => '#monitored > .widget-header > .widget-title > .white'
}