import BellIcon from "../../../../public/ReactIcons/BellIcon";

function SellerMobileRightBellUser({
  isSeller,
  notifications = [],
  unreadCount = 0,
  popoverVisible,
  setPopoverVisible,
  wrapperRef,
  formatNotificationTime,
  onMarkAllAsRead,
}) {
  return (
    <div className="flex lg:hidden items-center gap-3">
      {/* Mobile Notification Bell - Only for Sellers */}
      {isSeller && (
        <div className="relative cursor-pointer" ref={wrapperRef}>
          <BellIcon
            className="w-5 h-5 text-gray-600 mr-2.5"
            onClick={() => setPopoverVisible(!popoverVisible)}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 right-2 lg:-right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}

          {/* Mobile Notifications Popover */}
          {popoverVisible && (
            <div className="absolute -right-16 lg:right-0 mt-2 w-[294px] lg:w-80 bg-white border border-gray-300 rounded-lg shadow-xl z-50 flex flex-col max-h-[260px]">
              {/* Notifications list */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div key={notification.id}>
                        <div className="py-2">
                          <div className="font-semibold text-sm text-gray-800">
                            {notification.title}
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-600 flex-1 mr-2">
                              {notification.message}
                            </span>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {formatNotificationTime(notification.created_at)}
                            </span>
                          </div>
                        </div>
                        {index < notifications.length - 1 && (
                          <hr className="my-2 border-gray-200" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-4 text-sm">
                      No new notifications
                    </div>
                  )}
                </div>
              </div>

              {/* Mark all as read (ALWAYS VISIBLE) */}
              {notifications.length > 0 && (
                <div className="border-t border-gray-200 p-3 bg-gray-50">
                  <button
                    onClick={() => {
                      onMarkAllAsRead();
                      setPopoverVisible(false);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 ml-auto block"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile User Dropdown */}
    </div>
  );
}

export default SellerMobileRightBellUser;
