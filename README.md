# Count-money

## Description
This is a simple program that displays the amount of cryptocurrency in dollars and euros. The program uses the API of the exchange [Binance](https://www.binance.com/en) to get the current price of the cryptocurrency.

### Installation
1. Clone the repository
```bash
git clone
```
2. Install the requirements
```bash
npm install
```

## Backend
The backend is written in [Node.js](https://nodejs.org/en/). The backend is responsible for getting the current price of the cryptocurrency from the [Binance](https://www.binance.com/en) exchange. The backend is located in the `backend` folder in the packages.

### Installation
1. Go to the backend folder
```bash
cd backend
```
2. Create environment variables and fill them in
```bash
cp .env.sample .env
```

  The backend need a database to store the data. The database is in a docker container. To start the database, run the command:
  1. Go to the `docker` folder
    ```bash
    cd docker
    ```
    2. Create environment variables and fill them in
    ```bash
    .env.sample .env
    ```
    3. Start the database
    ```bash
    docker-compose up -d
    ```
3. Update database
  3.1. In the root folder
  ```bash
  npm run prisma:push
  ```
  3.2. In the backend folder
  ```bash
  npx prisma db push
  ```
4. Start the backend
  4.1. In the root folder
  ```bash
  npm run start:back
  ```
  4.2. In the backend folder
  ```bash
  npm run dev
  ```

### TEST
1. Before push to the repository
```bash
npm run test
```

