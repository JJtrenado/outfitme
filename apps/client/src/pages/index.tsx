import { getLocalUser } from '../common/Infrastructure/LocalStorageUser';
import Login from '../components/Login/Login';
import { useEffect, useState } from "react";

export default function Index() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
    };
    checkUser();
  }, []);

  if (!user)return <Login />;

  return <view>hola</view>;
}
