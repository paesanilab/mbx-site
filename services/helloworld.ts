const dbConnection = null // Pretend database connection

export async function getHelloWorld() {
    if (dbConnection !== null)
        return "Database is connected and says hello (this shouldn't happen)"
    else
        return "Hello world!"
}