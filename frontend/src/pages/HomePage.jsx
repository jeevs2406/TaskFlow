import Navigation from "../components/Navigation";
import axios from "axios";
import { useState } from "react";
import { useEffect} from "react";
import TaskCard from "../components/TaskCard";

const HomePage = () => {

  const[tasks, setTasks] = useState([]);
  const [loading, setLoading] =useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/taskflow");
      console.log(res.data);
      setTasks(res.data)

    } catch (error) {
      console.log("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, []);



  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 mt-6">
      {loading && <div className="text-center text-primary py-10">Loading task...</div>}

      {!loading && tasks.length === 0 && (
        <div className="text-center text-base-content/70 py-10 text-lg">
          No tasks available!
        </div>
      )}
      
      {tasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
    </div> 
  )
};

export default HomePage
