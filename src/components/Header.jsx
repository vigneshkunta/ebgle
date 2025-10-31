function Header({ online }) {
  return (
    <div className="top-0 left-0 w-full z-10 bg-zinc-900 shadow-md pt-2 pb-1 flex justify-center items-center border-b border-zinc-900">
      <h1 className="text-white font-semibold text-base">
        ONLINE USERS: {online}
      </h1>
    </div>
  );
}

export default Header;
