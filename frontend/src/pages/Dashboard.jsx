import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoals } from "../features/goals/goalSlice";
import { reset } from "../features/auth/authSlice";
import GoalItem from "../components/GoalItem";

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

    // If there is no User --> We want to navigate the Client to the login page
    if (!user) {
      navigate("/login");
    }

    // Fetch the goals from the backend
    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
    // Dependencies
  }, [user, dispatch, isError, message, navigate]);

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
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals </h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
