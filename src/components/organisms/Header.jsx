import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { clearUser } from "@/store/userSlice";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProgressRing from "@/components/molecules/ProgressRing";

const Header = ({ totalTasks, completedTasks, onClearCompleted }) => {
  const dispatch = useDispatch();
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  const today = format(new Date(), 'EEEE, MMMM d, yyyy');
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <header className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-gray-600">{today}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {completedTasks} completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {totalTasks - completedTasks} remaining
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Target" size={16} className="text-primary-500" />
              <span className="text-sm font-medium text-primary-600">
                {completionRate}% complete
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {completedTasks > 0 && (
            <Button
              variant="secondary"
              onClick={onClearCompleted}
              size="sm"
            >
              <ApperIcon name="Trash2" size={16} className="mr-2" />
              Clear Completed
            </Button>
          )}
          
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              {totalTasks}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Total Tasks
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;