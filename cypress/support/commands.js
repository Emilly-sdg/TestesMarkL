Cypress.Commands.add('createTask', (taskName = '') => {
    //abrir o site
    cy.visit('/')

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')

    if (taskName !== '') {
        //acessar o campo de inserir tarefa e digitar a tarefa
        cy.get('@inputTask')
            .type(taskName)
    }

    //clicar no botão "Create"
    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('isRequired', (targetMessage) => {
    cy.get('@inputTask')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(
                targetMessage
            ).to.eq(text)

        })

})



Cypress.Commands.add('removeTaskByName', (taskName) => {
    //deletar a tarefa "x" pela API
    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE',
        body: { name: taskName }
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('postTask', (task) => {
    //adicionar tarefa "x" pela API
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})