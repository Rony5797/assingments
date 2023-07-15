import Content from "./Components/Content";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import "./App.css";

const App = () => {
  console.log();
  return (
    <div className="container">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default App;
