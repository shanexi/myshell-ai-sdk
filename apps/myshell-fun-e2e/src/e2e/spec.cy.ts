export {};
declare global {
  interface Window {
    _get_app_builder_model_refs: () => any;
  }
}

describe('template spec', () => {
  it('passes', () => {
    cy.visit(
      'http://localhost:3000/app/detail?id=0ec12a92-9a92-11ef-b5ea-9ebb585eaf7d'
    );

    const state_1 =
      '//*[@id="workflow"]/div/div[3]/div/div[2]/div[1]/div/div/div[2]/div[2]';
    cy.xpath(state_1).click();

    const msg_txt =
      '//*[@id="workflow"]/div/div[3]/div/div[2]/div[3]/div[2]/div/div/div/div[2]/form/div/div/div[4]/div[2]/div[1]/div/div/div[2]';
    cy.xpath(msg_txt).click();

    const c1 = '/html/body/div[4]/div/div';
    cy.xpath(c1).click();
    const c2 = '/html/body/div[5]';
    cy.xpath(c2).click();
    cy.window().then((win) => {
      expect(win._get_app_builder_model_refs()).to.eql({
        state_1: {
          'render.text': {
            ref: '{{ context.test_a }}',
          },
        },
      });

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)

      const t_mode =
        '/html/body/div[2]/main/div/main/div/div[3]/div/div[2]/div[3]/div[2]/div/div/div/div[2]/form/div/div/div[4]/div[2]/div[1]/div/div/div[3]/button[1]';
      cy.xpath(t_mode).click();

      const ui_mode = '/html/body/div[4]/div/div[1]';
      cy.xpath(ui_mode).click();


      cy.window().then((win) => {
        expect(win._get_app_builder_model_refs()).to.eql({});
      });
    });
  });
});
