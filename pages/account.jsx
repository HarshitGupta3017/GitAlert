import React from 'react';
import {useSession, signOut, getSession } from 'next-auth/react';

const account = () => {
  const {data: session, status} = useSession();
  
  if (status === 'authenticated') {
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else{
    return (
      <div>
        Not signed in <br />
      </div>
    );
  }
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if(!session){
    return{
      redirect:{
        destination: '/login'
      }
    }
  }
  return {
    props: {
      session
    },
  };
};
export default account;