import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/loaderSlice";
import { setUser } from "../Redux/userSlice";
import { getCurrentUser } from "../API/users";

function ProtectedRoute({ children }) {
  
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingUser, setLoadingUser] = useState(true); // 🆕 Local loading state

  const navItems = [
    // {
    //   label: "Home",
    //   key: "home",
    //   icon: <HomeOutlined />,
    // },
    {
      label: `${user ? user.name : ""}`,
      key: "user-menu",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.isAdmin) {
                  navigate("/admin");
                } else if (user.isPartner) {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          key: "profile",
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </Link>
          ),
          key: "logout",
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();
      dispatch(setUser(response.data.user));
      setLoadingUser(false); // ✅ Set loading to false after success
      dispatch(hideLoading());
    } catch (error) {
      dispatch(setUser(null));
      setLoadingUser(false); // ✅ Set loading to false even after error
      dispatch(hideLoading());
      message.error(error.message);
      navigate("/login"); // ✅ Redirect if error fetching user
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  // ✅ 1. While loading user => show nothing (or you can show a spinner here)
  if (loadingUser) {
    return null;
  }

  // ✅ 2. If no user even after loading => force login
  if (!user) {
    navigate("/login");
    return null;
  }

  // ✅ 3. User is present, now render protected content
  return (
    <div style={{ width: "100%", margin: "0", padding: "0" }}>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
            Book Our Show
          </h3>
          <Menu theme="dark" mode="horizontal" items={navItems} style={{ minWidth: "400px" }} />
        </Header>
        <div style={{ padding: 24, height: "90vh", width: "100%", background: "#fff" }}>
          {children}
        </div>
      </Layout>
    </div>
  );
}

export default ProtectedRoute;
