<<<<<<< HEAD
# assistr #
A web-app to help volunteers and organisations find each other

## Backend Requirements
  * [Docker](https://www.docker.com/).
  * [Docker Compose](https://docs.docker.com/compose/install/).

## Frontend Requirements ##

Node v14.17.4 (best to use NVM to manage node version)  
Yarn  

If you havent used react before. I highly reccomend going through these docs: https://beta.reactjs.org/
Once you have the correct version of node running, run ```yarn install``` to install the package dependanices.

## Backend Development ##
  
  Start the backend by running command in root folder: 
```bash
docker-compose up -d --build
```
  You can now open the browser and interact with the api documentation at: http://localhost:8000/docs

## Frontend Development ##

  Enter the `frontend` directory, install the NPM packages and start the live server using the `yarn` scripts:

```bash
cd frontend
yarn run start
```

  This will launch the app in your default web browser at http://localhost:3000

### Google API Key ###
This app requires the use of Google API Key for the following API's:
  * Places API
  * Geocoding API 

1. Log in at https://console.cloud.google.com/.
2. Using the 'Select a project' button in the header, create a new project.
3. On the sidebar, navigate to 'APIs & Services>Dashboard'. 
4. You may need to select the project you created. 
5. On the dashboard, at the top, select 'Enable APIs and Services'
6. From this API Library page, you can enable all the nessecary APIs you need.
7. Go to the 'Credentials' page through sidebar and create an API Key. 
8. Go the the file '.env' in the './frontend' folder and paste the following ```REACT_APP_GOOGLE_API_KEY={Your API Key}```.
9. You will need to setup billing on your account for this to work.

### Testing ###
1. Tested on Google Chrome, Firefox, Safari, Edge.
=======
# assistr
>>>>>>> 88d31a7a759ef081925a6b74348547a3b94c14aa
