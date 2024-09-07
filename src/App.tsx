import Avatar from './components/Avatar';

const App = () => {
  return (
    <div className="p-10">
      <Avatar
        src="https://images.unsplash.com/photo-1526297003708-f5a1c2c9c6e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        percent={75}
        level={10}
        color="red"
        animated
    />
    </div>
  );
}

export default App;
