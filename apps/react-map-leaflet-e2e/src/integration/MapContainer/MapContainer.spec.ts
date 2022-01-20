describe('react-map-leaflet: MapContainer component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=mapcontainer--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to MapContainer!');
    });
});
