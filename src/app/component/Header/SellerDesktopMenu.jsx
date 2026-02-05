import React from "react";
import { usePathname, useRouter } from "next/navigation";
import BellIcon from "../../../../public/ReactIcons/BellIcon";

function SellerDesktopMenu({
  isSeller,
  sellerLinks = [],
  notifications = [],
  unreadCount = 0,
  popoverVisible,
  setPopoverVisible,
  wrapperRef,
  onMarkAllAsRead,
  formatNotificationTime,
}) {
    const router = useRouter();
  const pathname = usePathname();
    return (
    <>
      {isSeller && (
        <div className="hidden xl:flex items-center justify-end gap-2.5">
          {sellerLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                router.push(link.href);
              }}
              className={`cursor-pointer text-gray-700 text-base font-medium px-[15px] py-2.5 transition-colors ${
                pathname === link.href
                  ? "text-[#00aef3]"
                  : "hover:text-[#00aef3]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* Desktop Right Side - Notification Bell + User Dropdown (hidden on mobile) */}
      <div className="hidden xl:flex items-center gap-5 pl-2.5">
        {/* Notifications - Only for Sellers */}
        {isSeller && (
          <div className="relative cursor-pointer mr-2" ref={wrapperRef}>
            <BellIcon
              className="w-5 h-5 text-gray-600"
              onClick={() => setPopoverVisible(!popoverVisible)}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}

            {/* Notifications Popover */}
            {popoverVisible && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-xl z-50">
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4">
                    {notifications.length > 0 ? (
                      <>
                        {notifications.map((notification, index) => (
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
                                  {formatNotificationTime(
                                    notification.created_at,
                                  )}
                                </span>
                              </div>
                            </div>
                            {index < notifications.length - 1 && (
                              <hr className="my-2 border-gray-200" />
                            )}
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="text-center text-gray-500 py-4 text-sm">
                        No new notifications
                      </div>
                    )}
                  </div>
                </div>

                {notifications.length > 0 && (
                  <div className="border-t border-gray-200 p-3 bg-gray-50">
                    <button
                      onClick={() => {
                        if (onMarkAllAsRead) onMarkAllAsRead();
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
      
        
      </div>
    </>
  );
}

export default SellerDesktopMenu;
