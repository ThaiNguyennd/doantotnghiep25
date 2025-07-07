import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Kiểu dữ liệu user
export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  isDeleted?: boolean;
  isPremium?: boolean;
  createdAt: string;
  avatar: string;
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
  const token = AsyncStorage.getItem("token");
  const [idUser, setIdUser] = useState<string | null>("");
  useEffect(() => {
    const getitem = async () => {
      const idUser = await AsyncStorage.getItem("idUser");
      setIdUser(idUser);
      console.log("ádsad", idUser);
    };
    getitem();
  }, [idUser]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<any>(
          `http://192.168.0.101:3001/users/${idUser}`
        );
        console.log("res", res.data.data);
        const result = res.data.data;
        console.log("user context", result.result);

        setUser(result);
      } catch (error) {
        console.error("Lỗi khi tải thông tin user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
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
