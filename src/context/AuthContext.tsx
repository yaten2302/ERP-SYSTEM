import { checkStudentOrTeacher, getAccount } from "@/lib/supabase/api";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  isStudent: boolean;
  setIsStudent: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const InitialState = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: false,
  setIsLoading: () => {},
  checkAuthUser: async () => false as boolean,
  isStudent: false,
  setIsStudent: () => {},
};

const AuthContext = createContext<AuthContextType>(InitialState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  //check if user is already logged in or not
  const checkAuthUser = async () => {
    setIsLoading(true);

    try {
      const { data } = await getAccount();

      if (data?.session?.user?.aud == "authenticated") {
        setIsAuthenticated(true);

        return true;
      } else {
        setIsAuthenticated(false);

        return false;
      }
    } catch (error) {
      console.log(error);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  //check if the logged in user is a student or teacher
  const checkStudent = async () => {
    const { data } = await getAccount();

    const student = await checkStudentOrTeacher(data.session.user.email);

    if (student) {
      setIsStudent(true);

      return true;
    } else {
      setIsStudent(false);

      return false;
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      const authenticated = await checkAuthUser();

      if (authenticated) {
        const _student = await checkStudent();
        if (_student) {
          navigate("/student");
        } else {
          navigate("/teacher");
        }
      } else {
        navigate("/sign-in");
      }
    };

    authenticate();
  }, [navigate]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    checkAuthUser,
    isStudent,
    setIsStudent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserContext = () => useContext(AuthContext);
