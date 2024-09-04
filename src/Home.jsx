function Home({ solanaKeys }) {
  return (
    <div className='min-h-screen p-3 flex flex-col justify-center items-center'>
                <div className='font-semibold text-base'>Your Public Key:</div>    
                <div className='font-medium text-sm text-neutral-400'>{solanaKeys.publicKey}</div>
    </div>
          
  );
}

export default Home;
