const MainUI = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <div className="min-h-screen w-screen relative">
      <header className="text-2xl p-2 font-semibold absolute top-0 w-full border-b-2 border-gray-700">
        Cat Clicker App
      </header>
      <main className="py-16 p-4 text-left">{children}</main>
      <footer className="bg-gray-900 text-gray-200 w-full p-2 absolute bottom-0 text-center">
        2023 © yashodhan
      </footer>
    </div>
  );
};

export default MainUI;
