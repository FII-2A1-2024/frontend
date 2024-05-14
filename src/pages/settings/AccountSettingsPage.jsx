import { Outlet, useLocation } from "react-router-dom";

function AccountSettingsPage() {

    const pathname = useLocation();

    return (
      <>
        <div>
            {location.pathname === "/settings" ? (
                <div className="flex justify-center items-center flex-grow text-2xl">
                    Account settings
                </div>) : (
                <Outlet /> 
            )}
        </div>
      </>
    );
  }
  
  export default AccountSettingsPage;
  