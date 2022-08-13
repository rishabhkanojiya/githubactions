import { lazy, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";

const Test = lazy(() =>
  import(/* webpackChunkName: 'test' */ "./Component/Test")
);

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <span>Test</span>
            Edit <code>src/App.js</code> and save to reload.
            <Test />
          </p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Suspense>
  );
}

export default App;
