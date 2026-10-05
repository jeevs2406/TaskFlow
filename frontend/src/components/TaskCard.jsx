import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";


const TaskCard = ({ task }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/taskflow/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id)); // get rid of the deleted one
      
    } catch (error) {
      console.log("Error in handleDelete", error);
     
    }
  };

  return (
    <Link
      to={`/taskflow/${task._id}`}
      className="card bg-base-100 border-t-4 border-b-4 border-solid border-[#752316]
     hover:bg-[#320c05] hover:scale-[1.02] hover:shadow-xl
      transition-all duration-300"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{task.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{task.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(task.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default TaskCard;