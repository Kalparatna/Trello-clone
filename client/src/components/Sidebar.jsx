import { Link } from 'react-router-dom';
import {
  HomeIcon,
  StarIcon,
  ViewColumnsIcon,
  Cog8ToothIcon,
  SquaresPlusIcon,
  UserGroupIcon,
  CogIcon,
  FlagIcon // Replaced TargetIcon with FlagIcon for Goals
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-16 h-full w-16 bg-white dark:bg-gray-800 shadow-md z-10 flex flex-col items-center">
      {/* Sidebar Items */}
      <nav className="w-full mt-4 flex flex-col items-center space-y-6">
        {/* Home */}
        <Link to="/home" className="flex flex-col items-center w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <HomeIcon className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">Home</span>
        </Link>

        {/* Jira-like */}
        <Link to="/board" className="flex flex-col items-center w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
          <div className="bg-blue-500 p-2 rounded">
            <ViewColumnsIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs mt-1">Jira</span>
        </Link>

        {/* Trello */}
        <Link to="/boardhome" className="flex flex-col items-center w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
          <div className="bg-blue-400 p-2 rounded">
            <SquaresPlusIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs mt-1">Trello</span>
        </Link>

        {/* Goals */}
        <Link to="/goals" className="flex flex-col items-center w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <FlagIcon className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">Goals</span>
        </Link>

        {/* Teams */}
        <Link to="/teams" className="flex flex-col items-center w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <UserGroupIcon className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">Teams</span>
        </Link>

        {/* Settings */}
        <Link to="/settings" className="flex flex-col items-center w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors mt-auto">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <CogIcon className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </nav>
    </div>
  );
}