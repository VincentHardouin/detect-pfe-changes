# Detect PFE Changes

This project notifies the status or stage updates of PFE project website.

## Getting-started

### Run project to get notify

1. Prepare `.env` file
```shell
cp sample.env .env 
```

2. Fill `.env`

3. Run container
```shell
docker build -t detect-pfe-changes . && docker run -it detect-pfe-changes 
```

### Run project for development 

1. Install packages
```shell
npm ci
```

2. Prepare `.env` file
```shell
cp sample.env .env 
```

3. Fill `.env`

4. Run app
```shell
npm start
```
