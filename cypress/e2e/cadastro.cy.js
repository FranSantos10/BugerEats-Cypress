describe('Cadastro', () =>{
    it('Usuario deve ser um entregador', () =>{
        cy.viewport(1440,900)
        cy.visit('https://buger-eats.vercel.app')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

        var dadosEntregador = {
            nome: 'Franciele Santos',
            cpf: '12345678911',
            email: 'fran@gmail.com',
            whatsapp: '51985183333',
            endereco:{
                cep: '94170280',
                rua: 'Rua Júlio Peixoto',
                numero: '243',
                complemento: 'n/a',
                bairro: 'Santa Cruz',
                cidade_uf: 'Gravataí/RS'
            },
            metodo_entrega: 'Moto',
            cnh: 'CNH-Digital_M.jpg'
        }
        cy.get('input[name="name"]').type(dadosEntregador.nome)
        cy.get('input[name="cpf"]').type(dadosEntregador.cpf)
        cy.get('input[name="email"]').type(dadosEntregador.email)
        cy.get('input[name="whatsapp"]').type(dadosEntregador.whatsapp)

        cy.get('input[name="postalcode"]').type(dadosEntregador.endereco.cep)
        cy.get('input[type="button"][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(dadosEntregador.endereco.numero)
        cy.get('input[name="address-details"]').type(dadosEntregador.endereco.complemento)
        
        //validação do campos preenchidos automaticamente
        cy.get('input[name="address"]').should('have.value', dadosEntregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', dadosEntregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', dadosEntregador.endereco.cidade_uf)

        cy.contains('.delivery-method li', dadosEntregador.metodo_entrega).click()
        cy.get('input[accept^="image"]').attachFile(dadosEntregador.cnh)
    })
})