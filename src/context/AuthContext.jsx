import { nanoid } from "nanoid";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const Auth = createContext();

export const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });
  const { reset } = useForm();
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  });

  const login = (data) => {
    let obj = users.find((elem) => elem.email === data.email.toLowerCase());

    if (!obj) {
      toast.warn("Seems like you haven't logged in, create an account first!",{
        position:'top-center'
      })
      navigate("/signup");
      return;
    }

    if (obj.password !== data.password) {
      toast.error("Password mismatch, try again!",{
        position:'top-center'
      })
      return;
    }

    setCurrentUser({
      id: obj.id,
      userName: obj.userName,
      email: obj.email,
    });

    navigate("/home");
    toast.dark("Loggin successfully, happy shoping!",{
      position:'top-center'
    })
    reset();
  };

  const signup = (data) => {
    const isLoggedin = users.some((elem) => elem.email === data.email);

    if (isLoggedin) {
      toast.warn("Email already exists, try logging in!", {
        position:'top-center'
      })
      navigate("/login");
      return;
    }

    const { userName, email, password } = data;

    let arr = [
      ...users,
      {
        id: nanoid(),
        userName,
        email,
        password,
      },
    ];
    setUsers(arr);
    reset();
    navigate("/login");
  };

  const logout = () => {
    setCurrentUser(null);
    toast.info("Hope you visit soon.",{
      position:'top-center'
    })
    navigate("/login");
    return;
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <Auth.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
