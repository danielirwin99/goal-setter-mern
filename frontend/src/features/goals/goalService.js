
const API_URL = "/api/goals/";

// Create New Goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorisation: `Bearer ${token}`,
    },
  };
};
