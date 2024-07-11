# Clustered Express Server

This is a simple example of a clustered Express server using the Node.js `cluster` module. The server utilizes multiple worker processes to handle incoming requests, improving performance and scalability.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm start
    ```

5. Open your browser and visit `http://localhost:3000` to see the "Hello World!" message.

## Configuration

The server is configured to utilize all available CPU cores on your machine. If you want to limit cpu core usage you can hardcorde totalCPUs variable in the index.js file.

```javascript 

## API Endpoints

- `/` - Returns a "Hello World!" message.
- `/fibonacci/:num` - Calculates the fibonacci of numbers from 0 to `num` and returns the result.
