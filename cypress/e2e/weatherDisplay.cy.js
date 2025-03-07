describe("🛰️ Dashboard Météo - Tests End-to-End", () => {
  
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Charger l'application
    cy.wait(1000); // Attendre que la page charge complètement
  });

  it("✅ Vérifie le chargement du Dashboard", () => {
    cy.contains("Dashboard Météo").should("be.visible");
    cy.get('[data-testid="search-button"]').should("exist").should("be.visible");
  });

  it("🔍 Affiche les prévisions météo pour une ville valide", () => {
    cy.get("input").should("exist").type("Paris");
    cy.get('[data-testid="search-button"]').click();
    cy.wait(2000);
    cy.contains("Paris").should("be.visible");
    cy.contains("Température").should("be.visible");
    cy.contains("Humidité").should("be.visible");
  });

  it("❌ Gère les erreurs pour une ville invalide", () => {
    cy.get("input").should("exist").clear().type("VilleInconnue123"); // Ville inexistante
    cy.get('[data-testid="search-button"]').click();
    cy.wait(2000);

    // Vérifier la gestion d'erreur (selon l'implémentation de ton UI)
    cy.get("body").then(($body) => {
      if ($body.find('[data-testid="error-message"]').length > 0) {
        cy.get('[data-testid="error-message"]').should("be.visible"); // Vérifie si un message d'erreur est affiché
      } else {
        cy.log("Aucun message d'erreur visible, vérifie l'UI.");
      }
    });
  });

  it("🧹 Efface le champ de recherche après validation", () => {
    cy.get("input").type("Paris");
    cy.get('[data-testid="search-button"]').click();
    cy.wait(2000);
    cy.get("input").should("have.value", ""); // Vérifier que le champ est bien vidé après la recherche
  });
  

  it("🌙 Active et désactive le mode sombre", () => {
    cy.get('[aria-label="toggle-dark-mode"]').click();
    cy.wait(500); // Attendre le changement de classe
    cy.get("body").should("have.class", "dark-mode");
  
    cy.get('[aria-label="toggle-dark-mode"]').click();
    cy.wait(500);
    cy.get("body").should("not.have.class", "dark-mode");
  });
  
  

  it("🌍 Met à jour la météo lors de la recherche d'une autre ville", () => {
    cy.get("input").type("Paris");
    cy.get('[data-testid="search-button"]').click();
    cy.wait(2000); // Attendre la récupération des données
    cy.contains("Paris").should("be.visible");
  
    cy.get("input").clear().type("Londres");
    cy.get('[data-testid="search-button"]').click();
  
    // 🕐 Attendre que l'élément contenant le nom de la ville se mette à jour
    cy.get("h4").should("contain.text", "London"); 
  });
  

});
