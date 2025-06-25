import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

// Kiểu dữ liệu user
export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  isDeleted?: boolean;
  isPremium?: boolean;
  createdAt: string;
  avatar:string
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("idUser");
  console.log("user khi mới login", user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<any>(
          `http://localhost:3001/users/${idUser}`
        );
        console.log("res",res)
        const result = res.data.data
        setUser(result)
      } catch (error) {
        console.error("Lỗi khi tải thông tin user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    console.log("user context", user);
  }, [idUser]);
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
