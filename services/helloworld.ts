const dbConnection = null; // Pretend database connection

// eslint-disable-next-line @typescript-eslint/require-await
export async function getHelloWorld() {
  if (dbConnection !== null) return "Database is connected and says hello (this shouldn't happen)";
  else return "Hello world!";
}
