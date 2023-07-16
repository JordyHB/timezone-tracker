# InstallatieHandleiding Timezone Tracker

## Inleiding

Timezone Tracker is een webapplicatie die het mogelijk maakt om groepen aan te maken en hierin de tijdzones van je vrienden te volgen De applicatie is gemaakt met React en Firebase en de bron code is te vinden op [Github](https://github.com/JordyHB/timezone-tracker).

## Benodigdheden

Om de applicatie te kunnen draaien is het nodig om de volgende software te installeren:

- [Node.js](https://nodejs.org/en/)
- NPM (wordt automatisch geïnstalleerd met Node.js)
- React scripts (wordt automatisch geïnstalleerd met Node.js)
- API key van [Google Firebase](https://firebase.google.com/) (mee geleverd in de code te vinden in `src/firebaseConfig.js`)
- API key van [ipregistry](https://ipregistry.co/) (voor het nakijken is deze meegeleverd in de Readme)

## Installatie

1. Download de bron code van de [Github](https://github.com/JordyHB/timezone-tracker) repository.
2. Open de bron code in een IDE naar keuze.
3. Met de bron code open in de IDE open een terminal en voer het volgende commando uit: `npm install`
4. wanneer de installatie klaar is ga naar de het bestand .env.dist en verander de naam naar .env
5. Open het bestand .env en verander het volgende variabel met de API key van ipregistry.
    - REACT_APP_GEOLOCATE_API_KEY=`JOUW API KEY VAN IPREGISTRY`
6.  **Optioneel:** verander de API key van Google Firebase in het bestand `src/firebaseConfig.js`
    - ga naar [Google Firebase](https://firebase.google.com/) en maak een account aan.
    - maak een nieuw project aan en ga naar de project instellingen.
    - maak een webapplicatie aan en kopieer de code die je krijgt.
    - plak de code in het bestand `src/firebaseConfig.js` en verander de variabelen met de juiste gegevens.
7. Herstart de IDE zodat de .env file nu met de juiste gegevens wordt ingeladen.
8. Ga terug naar een terminal en voer het volgende commando uit: `npm start`
9. De applicatie is nu te vinden op [http://localhost:3000](http://localhost:3000)

## Gegevens

### API key van ipregistry

De API key van [ipregistry](https://ipregistry.co/) is op het moment van nakijken meegeleverd. Deze zal later verwijderd en vervangen worden door een nieuwe API key. De API key is `nucsk174rjwb80np`

### Dummy account

Om de applicatie te testen is er een dummy account aangemaakt. De gegevens van dit account zijn:

- Email: `tester@novi.nl`
- Wachtwoord `tester123`

## Commando's

In de project directory, kun je het volgende commando uitvoeren:

### `npm start`

Hiermee start je de applicatie in development mode.\
Open [http://localhost:3000](http://localhost:3000) om de applicatie in de browser te bekijken.

voor meer informatie over de commando's zie de [Create React App documentatie](https://facebook.github.io/create-react-app/docs/getting-started).



### `npm run build`

Hiermee bouw je de applicatie voor productie in de `build` folder.\
dit zorgt ervoor dat de applicatie geoptimaliseerd wordt voor de beste performance.

De build kan nu worden gedeployed.
voor meer informatie over deployment zie de [Create React App documentatie](https://facebook.github.io/create-react-app/docs/deployment).


### `npm run eject`

**Opmerking: dit is een eenmalige actie. Zodra je dit hebt gedaan kun je niet meer terug!**

Als je niet tevreden bent met de ingebouwde tools van de create-react-app, dan kun je `eject` uitvoeren. Hiermee verwijder je create-react-app uit het project en krijg je toegang tot alle configuratie bestanden. Hiermee kun je zelf je build configureren.

**Je hoeft dit niet te doen. De ingebouwde tools zijn voldoende voor de meeste gebruikers.**

