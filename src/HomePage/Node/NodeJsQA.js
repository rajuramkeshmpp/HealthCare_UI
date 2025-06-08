const NodeJsQA = () => {
  const containerStyle = {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f9f9f9",
    color: "#333",
    lineHeight: 1.6,
    padding: "20px",
    maxWidth: "900px",
    margin: "auto"
  };

  const h1Style = {
    color: "#0a5275",
    fontSize: "2rem",
    marginBottom: "1rem"
  };

  const h2Style = {
    color: "#064663",
    marginTop: "1.5rem"
  };

  const codeBlock = {
    background: "#f4f4f4",
    padding: "10px",
    borderRadius: "6px",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    marginTop: "5px",
    display: "block"
  };

  const questionList = [
    {
      q: "1. What is Node.js?",
      a: "Node.js is a runtime environment built on Chrome’s V8 JavaScript engine that allows executing JavaScript on the server side."
    },
    {
      q: "2. Is Node.js single-threaded?",
      a: "Yes, Node.js uses a single-threaded event loop architecture. However, it uses libuv to handle multi-threaded I/O operations like file system access and networking behind the scenes."
    },
    {
      q: "3. What are the key features of Node.js?",
      a: "Asynchronous and Event-driven, Fast execution via V8 engine, Single-threaded but highly scalable, NPM ecosystem."
    },
    {
      q: "4. What is the difference between require() and import?",
      a: "`require()` is CommonJS syntax (default in Node.js). `import` is ES6 module syntax (used in `.mjs` files or with `type: module`)."
    },
    {
      q: "5. What is the Event Loop in Node.js?",
      a: "The event loop allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel and processing them when ready."
    },
    {
      q: "6. What is the purpose of package.json?",
      a: "It holds metadata about your Node project like name, version, scripts, dependencies, and the main entry point."
    },
    {
      q: "7. What are Streams in Node.js?",
      a: "Streams are abstract interfaces for working with streaming data. Types: Readable, Writable, Duplex, and Transform."
    },
    {
      q: "8. What is middleware in Express.js?",
      a: (
        <>
          Middleware functions have access to req, res, and next(). <br />
          Example:
          <pre style={codeBlock}>
            {`app.use((req, res, next) => {
  console.log('Request received');
  next();
});`}
          </pre>
        </>
      )
    },
    {
      q: "9. How do you handle errors in async/await?",
      a: (
        <pre style={codeBlock}>
          {`async function getData() {
  try {
    const result = await fetchData();
  } catch (error) {
    console.error(error);
  }
}`}
        </pre>
      )
    },
    {
      q: "10. What is the difference between process.nextTick(), setImmediate(), and setTimeout()?",
      a: (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Function</th>
              <th>When it's executed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>process.nextTick</td>
              <td>Before the next event loop iteration</td>
            </tr>
            <tr>
              <td>setImmediate</td>
              <td>On the next event loop iteration</td>
            </tr>
            <tr>
              <td>setTimeout</td>
              <td>After a delay (minimum 1ms)</td>
            </tr>
          </tbody>
        </table>
      )
    },
    {
      q: "11. How do you create a simple HTTP server in Node.js?",
      a: (
        <pre style={codeBlock}>
          {`const http = require('http');
http.createServer((req, res) => {
  res.write('Hello World');
  res.end();
}).listen(3000);`}
        </pre>
      )
    },
    {
      q: "12. What is clustering in Node.js?",
      a: "Clustering allows Node.js to utilize multiple CPU cores by spawning child processes that share the same server port."
    },
    {
      q: "13. How to secure a Node.js app?",
      a: "Use helmet.js, sanitize inputs, avoid eval(), use HTTPS, set proper headers."
    },
    {
      q: "14. What is buffer in Node.js?",
      a: (
        <pre style={codeBlock}>
          {`const buf = Buffer.from('Hello');`}
        </pre>
      )
    },
    {
      q: "15. How do you connect Node.js with a database (e.g., MySQL)?",
      a: (
        <pre style={codeBlock}>
          {`const mysql = require('mysql');
const connection = mysql.createConnection({
  host, user, password, database
});
connection.connect();`}
        </pre>
      )
    }
  ];

  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>Node.js Interview Questions & Answers</h1>
      {questionList.map((item, index) => (
        <div key={index}>
          <h2 style={h2Style}>{item.q}</h2>
          <div>{item.a}</div>
        </div>
      ))}
    </div>
  );
};

export default NodeJsQA