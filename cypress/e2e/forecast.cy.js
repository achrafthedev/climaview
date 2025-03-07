describe("🌦️ Tests des Prévisions Météo (Forecast)", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
      cy.wait(1000); // Attendre que la page charge
    });
  
    it("✅ Affiche les prévisions météo après une recherche valide", () => {
      cy.get("input").type("Paris");
      cy.get('[data-testid="search-button"]').click();
      cy.wait(2000);
  
      // Vérifier que le titre "Prévisions Météo" est bien affiché
      cy.contains("🔮 Prévisions Météo").should("be.visible");
  
      // Vérifier qu'il y a au moins 2 jours de prévisions affichés
      cy.get('[data-testid="forecast-day"]').should("have.length.at.least", 2);
    });
  
    it("✅ Vérifie que chaque jour affiche une température et une description", () => {
      cy.get("input").type("Londres");
      cy.get('[data-testid="search-button"]').click();
      cy.wait(2000);
  
      // Vérifier que chaque carte de prévision contient une température et une description
      cy.get('[data-testid="forecast-day"]').each(($el) => {
        cy.wrap($el).within(() => {
          cy.get('[data-testid="forecast-temp"]').should("be.visible");
          cy.get('[data-testid="forecast-description"]').should("be.visible");
          cy.get('[data-testid="forecast-humidity"]').should("be.visible");
        });
      });
    });
  
    it("⚠️ Gère l'absence de données de prévision", () => {
      cy.get("input").type("VilleInconnue123");
      cy.get('[data-testid="search-button"]').click();
      cy.wait(2000);
  
      // Vérifier que le message d'erreur s'affiche
      cy.contains("Aucune prévision disponible").should("be.visible");
    });
  });
  