// Example

const API_BASE_URL = "https://api.example.com/users";

export const getUsers = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.statusText}`);
  }
  return await response.json();
};

export const getUserById = async (userId: number) => {
  const response = await fetch(`${API_BASE_URL}/${userId}`);
  if (!response.ok) {
    throw new Error(`Error fetching user by ID: ${response.statusText}`);
  }
  return await response.json();
};

export const createUser = async (userData: { name: string; email: string }) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`Error creating user: ${response.statusText}`);
  }
  return await response.json();
};
