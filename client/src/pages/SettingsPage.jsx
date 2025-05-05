import React, { useState } from "react";

const TrelloSettings = () => {
  const [frequency, setFrequency] = useState("Periodically");
  const [notifications, setNotifications] = useState({
    comments: true,
    dueDates: true,
    removedFromCard: true,
    attachmentsAdded: true,
    cardsCreated: true,
    cardsMoved: true,
    cardsArchived: true,
  });

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectAll = () => {
    setNotifications({
      comments: true,
      dueDates: true,
      removedFromCard: true,
      attachmentsAdded: true,
      cardsCreated: true,
      cardsMoved: true,
      cardsArchived: true,
    });
  };

  const selectNone = () => {
    setNotifications({
      comments: false,
      dueDates: false,
      removedFromCard: false,
      attachmentsAdded: false,
      cardsCreated: false,
      cardsMoved: false,
      cardsArchived: false,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold mr-3">
          KM
        </div>
        <div>
          <h1 className="text-xl font-bold">John Smith</h1>
          <p className="text-gray-500">@johnsmith</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b mb-6">
        <nav className="flex">
          <a className="px-4 py-2 text-gray-600 hover:text-blue-600" href="#">
            Profile and visibility
          </a>
          <a className="px-4 py-2 text-gray-600 hover:text-blue-600" href="#">
            Activity
          </a>
          <a className="px-4 py-2 text-gray-600 hover:text-blue-600" href="#">
            Cards
          </a>
          <a
            className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-medium"
            href="#"
          >
            Settings
          </a>
        </nav>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 p-4 rounded mb-6 border border-blue-100">
        <div className="flex items-start">
          <div className="mr-2 text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div>
            <p className="text-gray-700">Some settings can only be changed from your Atlassian account.</p>
            <p className="text-sm mt-1">
              To make changes,{" "}
              <a href="#" className="text-blue-600 hover:underline">
                go to your Atlassian account
              </a>{" "}
              <span className="text-blue-600">↗</span>
            </p>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="mb-6">
        <div className="bg-gray-100 px-4 py-2 font-medium mb-3">
          Account settings
        </div>
        <div className="px-4 py-2">
          <a href="#" className="text-blue-600 hover:underline flex items-center">
            Change language
            <span className="ml-1 text-blue-600">↗</span>
          </a>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="mb-6">
        <div className="bg-gray-100 px-4 py-2 font-medium mb-3">
          Email notifications
        </div>
        <div className="px-4 py-3">
          <div className="flex items-start mb-3">
            <div className="mr-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <p className="font-medium mb-1">Email frequency</p>
              <p className="text-gray-600 text-sm mb-2">
                Email notifications can be sent 'Instantly' (as soon as they occur) or 'Periodically' (hourly). If you'd like to opt-out of all
                notification emails, set the frequency as 'Never'.
              </p>
              <div className="mt-2">
                <select 
                  className="border rounded px-3 py-2 w-64"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="Periodically">Periodically</option>
                  <option value="Instantly">Instantly</option>
                  <option value="Never">Never</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Notification Preferences */}
      <div className="mb-6">
        <div className="px-4 py-3">
          <div className="flex items-start mb-3">
            <div className="mr-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className="w-full">
              <p className="font-medium mb-1">Email notification preferences</p>
              <p className="text-gray-600 text-sm mb-3">
                These preferences only apply to email notifications for boards, lists, and cards you're watching. Select which notifications you'd
                like to receive via email.
              </p>
              <p className="text-gray-600 text-sm mb-3">
                Note: You'll always get emails for invites, direct mentions, when you're added to a card, and more.
              </p>
              
              <div className="flex space-x-3 mb-3">
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={selectAll}
                >
                  Select all
                </button>
                <span>|</span>
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={selectNone}
                >
                  Select none
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-2" 
                    checked={notifications.comments}
                    onChange={() => handleNotificationChange("comments")}
                  />
                  <div>
                    <p>Comments</p>
                    <p className="text-gray-500 text-sm">New comments added on cards you're watching</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-2" 
                    checked={notifications.dueDates}
                    onChange={() => handleNotificationChange("dueDates")}
                  />
                  <div>
                    <p>Due dates</p>
                    <p className="text-gray-500 text-sm">Due dates are added, changed, or approaching on a card you're watching</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-2" 
                    checked={notifications.removedFromCard}
                    onChange={() => handleNotificationChange("removedFromCard")}
                  />
                  <div>
                    <p>You're removed from a card</p>
                    <p className="text-gray-500 text-sm">Someone removes you as a member from a card</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-2" 
                    checked={notifications.attachmentsAdded}
                    onChange={() => handleNotificationChange("attachmentsAdded")}
                  />
                  <div>
                    <p>Attachments added</p>
                    <p className="text-gray-500 text-sm">Files or links added to cards you're watching</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-2" 
                    checked={notifications.cardsCreated}
                    onChange={() => handleNotificationChange("cardsCreated")}
                  />
                  <div>
                    <p>Cards created</p>
                    <p className="text-gray-500 text-sm">New cards created on boards you're watching</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-2" 
                    checked={notifications.cardsMoved}
                    onChange={() => handleNotificationChange("cardsMoved")}
                  />
                  <div>
                    <p>Cards moved</p>
                    <p className="text-gray-500 text-sm">Cards you're watching are moved between lists or boards</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-2" 
                    checked={notifications.cardsArchived}
                    onChange={() => handleNotificationChange("cardsArchived")}
                  />
                  <div>
                    <p>Cards archived</p>
                    <p className="text-gray-500 text-sm">Cards you're watching are archived (or unarchived)</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded hover:bg-blue-100">
                  Allow desktop notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mb-6">
        <div className="bg-gray-100 px-4 py-2 font-medium mb-3">
          Suggestions
        </div>
        <div className="px-4 py-2">
          <button className="text-blue-600 hover:underline">
            Disable suggestions
          </button>
        </div>
      </div>

      {/* Marketing Emails */}
      <div className="mb-6">
        <div className="bg-gray-100 px-4 py-2 font-medium mb-3">
          Marketing emails
        </div>
        <div className="px-4 py-2">
          <a href="#" className="text-blue-600 hover:underline flex items-center">
            Manage email preferences
            <span className="ml-1 text-blue-600">↗</span>
          </a>
        </div>
      </div>

      {/* Cookie Preferences */}
      <div className="mb-6">
        <div className="bg-gray-100 px-4 py-2 font-medium mb-3">
          Cookie preferences
        </div>
        <div className="px-4 py-2">
          <button className="text-blue-600 hover:underline">
            Manage cookie preferences
          </button>
        </div>
      </div>

      {/* Accessibility */}
      <div className="mb-6">
        <div className="bg-gray-100 px-4 py-2 font-medium mb-3">
          Accessibility
        </div>
        <div className="px-4 py-2">
          <button className="text-blue-600 hover:underline">
            Enable color blind friendly mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrelloSettings;