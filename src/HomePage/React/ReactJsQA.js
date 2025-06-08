const ReactJsQA = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f9f9f9", color: "#333", padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ color: "#0a5275" }}>React Interview Questions & Answers</h1>

      <h2>1. What is React?</h2>
      <p>React is a JavaScript library developed by Facebook for building <strong>user interfaces</strong>, especially for single-page applications. It allows developers to create <strong>reusable UI components</strong> and handle the view layer efficiently.</p>

      <h2>2. What are components in React?</h2>
      <p>Components are the <strong>building blocks</strong> of a React application. Two types:</p>
      <ul>
        <li><strong>Functional Components</strong> – JavaScript functions with hooks.</li>
        <li><strong>Class Components</strong> – ES6 classes with lifecycle methods.</li>
      </ul>

      <h2>3. What is JSX?</h2>
      <p>JSX (JavaScript XML) lets you write HTML inside JavaScript:</p>
      <pre>{`const element = <h1>Hello, world!</h1>;`}</pre>

      <h2>4. What is the Virtual DOM?</h2>
      <p>The Virtual DOM is a <strong>lightweight copy</strong> of the real DOM. React uses it for <strong>efficient updates</strong> through a diffing algorithm.</p>

      <h2>5. What are props in React?</h2>
      <p>Props are <strong>read-only inputs</strong> passed from parent to child components.</p>
      <pre>{`function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`}</pre>

      <h2>6. What is state in React?</h2>
      <p>State is a <strong>mutable object</strong> used to manage component data.</p>
      <pre>{`const [count, setCount] = useState(0);`}</pre>

      <h2>7. Difference between state and props?</h2>
      <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
        <thead><tr><th>Feature</th><th>Props</th><th>State</th></tr></thead>
        <tbody>
          <tr><td>Mutability</td><td>Immutable</td><td>Mutable</td></tr>
          <tr><td>Ownership</td><td>Parent</td><td>Component</td></tr>
          <tr><td>Purpose</td><td>Configuration</td><td>Data Management</td></tr>
        </tbody>
      </table>

      <h2>8. What are hooks in React?</h2>
      <p>Hooks let you use state and lifecycle features in functional components. Examples:</p>
      <ul>
        <li><code>useState()</code></li>
        <li><code>useEffect()</code></li>
        <li><code>useContext()</code></li>
        <li><code>useRef()</code></li>
      </ul>

      <h2>9. What is useEffect used for?</h2>
      <p><code>useEffect</code> is used for <strong>side effects</strong> like data fetching or subscriptions.</p>
      <pre>{`useEffect(() => {
  console.log("Component mounted");
}, []);`}</pre>

      <h2>10. Controlled vs Uncontrolled Components?</h2>
      <ul>
        <li><strong>Controlled:</strong> Form data is handled by React state.</li>
        <li><strong>Uncontrolled:</strong> Form data is handled by the DOM using refs.</li>
      </ul>

      <h2>11. What is lifting state up?</h2>
      <p>When multiple components need to share state, it is lifted to the <strong>nearest common ancestor</strong>.</p>

      <h2>12. What is React Router?</h2>
      <p>React Router is a library to handle navigation using components like:</p>
      <ul>
        <li><code>&lt;BrowserRouter&gt;</code></li>
        <li><code>&lt;Route&gt;</code></li>
        <li><code>&lt;Link&gt;</code></li>
        <li><code>&lt;Navigate&gt;</code></li>
      </ul>

      <h2>13. What are keys in React?</h2>
      <p>Keys help identify which items have changed, added or removed in a list.</p>
      <pre>{`items.map(item => <li key={item.id}>{item.name}</li>);`}</pre>

      <h2>14. How does conditional rendering work?</h2>
      <pre>{`{isLoggedIn ? <Dashboard /> : <Login />}`}</pre>

      <h2>15. What is Redux?</h2>
      <p>Redux is a predictable state container for JavaScript apps using:</p>
      <ul>
        <li><strong>Store</strong> – Holds state</li>
        <li><strong>Actions</strong> – Events</li>
        <li><strong>Reducers</strong> – Pure functions that handle state changes</li>
      </ul>
    </div>
  );
};

export default ReactJsQA