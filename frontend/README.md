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
  
  Start the backend by running command in root folder: docker-compose up -d --build

```bash
docker-compose up -d
```


### Google API Key ###
To use the google map API's, and the autocomplete, you must have your API
key installed. This key should stay private.

1. Log in at https://console.cloud.google.com/.
2. Using the 'Select a project' button in the header, create a new project.
3. On the sidebar, navigate to 'APIs & Services>Dashboard'. 
4. You may need to select the project you created. 
5. On the dashboard, at the top, select 'Enable APIs and Services'
6. From this API Library page, you can enable all the nessecary APIs you need.
7. Go to the 'Credentials' page through sidebar and create an API Key. 
8. Go the the file '.env' in the root folder and paste the following ```GOOGLE_MAPS_API_KEY={Your API Key}```.
9. You will need to setup billing on your account for this to work.

Nathan currently has Directions, Places, Geocoding and Distance Matrix APIs enabled. 

## How to run ##
Ensure you have gone through the steps in enviroment setup. 

cd into the UQ-Pool directory and run ```yarn start``` from your terminal and scan the QR code on your phone.

## Adding dependancies ###
When you use a package, ensure that it getts added to the package.json file by running ```yarn add [package-name]```. This is done in place of ```npm install``` as well. 

### Versions ###
1. Node v14.17.4 (LTS)
2. Tested on Android 11.0x86 Pixel 4