import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
    url: 'https://51.250.22.141/auth',
    realm: 'master',
    clientId: 'local',
});


export default keycloak;