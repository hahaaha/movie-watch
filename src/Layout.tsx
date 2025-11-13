import { Link, Outlet } from 'react-router';

export default function Layout() {
  // const { data: userInfo } = useUserInfo();
  // const { setUserInfo } = useUserInfoStore();

  // useEffect(() => {
  //   if (userInfo) {
  //     setUserInfo(userInfo);
  //   }
  // }, [userInfo]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link to="/">
            <h1 className="text-2xl font-bold">movie-watch</h1>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span className="text-xl">D</span>
                </div>
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/favorite">Watch List</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
