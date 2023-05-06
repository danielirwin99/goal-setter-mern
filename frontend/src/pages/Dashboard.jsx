import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting the user from the Auth State
  const { user } = useSelector((state) => state.auth);

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    // If there is an error --> display it
    if (isError) {
      console.log(message);
    }

    // Fetch the goals from the backend
    dispatch(getGoals());

    // Resets the form after we fire it
    return () => {
      dispatch(reset());
    };

    // If there is no User --> We want to navigate the Client to the login page
    if (!user) {
      navigate("/login");
    }
    // Dependencies
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
    </>
  );
};

export default Dashboard;
