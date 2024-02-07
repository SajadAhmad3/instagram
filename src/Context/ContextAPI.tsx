
import React, { createContext, useState, useContext, useMemo, Dispatch, SetStateAction, useEffect } from 'react';

export const UsernameContext = createContext<{
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  newPost: any;
  newPosts: any[]; 
  setNewPost: Dispatch<SetStateAction<any>>;
  setNewPosts: Dispatch<SetStateAction<any[]>>;
}>({
  username: '',
  setUsername: () => {},
  newPost: null,
  newPosts: [], 
  setNewPost: () => {},
  setNewPosts: () => {}, 
});

export const UsernameProvider: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => {
  const [username, setUsername] = useState('');
  const [newPost, setNewPost] = useState(null);
  const [newPosts, setNewPosts] = useState<any[]>([]);  

  const contextValue = useMemo(() => ({ username, setUsername, newPost, newPosts, setNewPost, setNewPosts }), [
    username,
    setUsername,
    newPost,
    newPosts,
    setNewPost,
    setNewPosts,
  ]);

  return (
    <UsernameContext.Provider value={contextValue}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => useContext(UsernameContext);

