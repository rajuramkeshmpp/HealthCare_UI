import React from "react";

const sqlServerFaq = [
  {
    question: "What is SQL Server?",
    answer:
      "SQL Server is a relational database management system (RDBMS) developed by Microsoft. It stores and retrieves data as requested by other software applications, whether they run on the same computer or on another computer across a network.",
  },
  {
    question: "What are the different types of joins in SQL Server?",
    answer: (
      <>
        <p>
          - <b>INNER JOIN</b>: Returns records that have matching values in both tables.
        </p>
        <p>
          - <b>LEFT (OUTER) JOIN</b>: Returns all records from the left table, and the matched records from the right table. If no match, NULLs are returned.
        </p>
        <p>
          - <b>RIGHT (OUTER) JOIN</b>: Returns all records from the right table, and matched records from the left.
        </p>
        <p>
          - <b>FULL (OUTER) JOIN</b>: Returns all records when there is a match in either left or right table.
        </p>
        <pre style={{ backgroundColor: "#f4f4f4", padding: 10 }}>
          {`SELECT e.EmployeeID, e.Name, d.DepartmentName
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID;`}
        </pre>
      </>
    ),
  },
  {
    question: "What is the difference between WHERE and HAVING clauses?",
    answer: (
      <>
        <p>
          - <b>WHERE</b> is used to filter rows <i>before</i> grouping occurs.
        </p>
        <p>
          - <b>HAVING</b> is used to filter groups <i>after</i> the GROUP BY operation.
        </p>
        <pre style={{ backgroundColor: "#f4f4f4", padding: 10 }}>
          {`-- Using WHERE
SELECT * FROM Employees WHERE Salary > 50000;

-- Using HAVING
SELECT DepartmentID, COUNT(*) as EmployeeCount
FROM Employees
GROUP BY DepartmentID
HAVING COUNT(*) > 10;`}
        </pre>
      </>
    ),
  },
  {
    question: "What are the different types of indexes in SQL Server?",
    answer:
      "Clustered Index, Non-Clustered Index, Unique Index, Full-Text Index. Clustered index sorts data rows physically in the table; Non-Clustered index contains pointers to data rows; Unique index ensures uniqueness; Full-Text index enables text search.",
  },
  {
    question: "How do you find duplicate records in a SQL Server table?",
    answer: (
      <>
        <p>Use GROUP BY with HAVING to find duplicates:</p>
        <pre style={{ backgroundColor: "#f4f4f4", padding: 10 }}>
          {`SELECT Name, COUNT(*)
FROM Employees
GROUP BY Name
HAVING COUNT(*) > 1;`}
        </pre>
      </>
    ),
  },
  {
    question: "What is a stored procedure? How do you create one?",
    answer: (
      <>
        <p>
          A stored procedure is a precompiled collection of SQL statements stored under a name and processed as a unit. It can accept parameters and helps improve performance and security.
        </p>
        <pre style={{ backgroundColor: "#f4f4f4", padding: 10 }}>
          {`CREATE PROCEDURE GetEmployeeByID
    @EmployeeID INT
AS
BEGIN
    SELECT * FROM Employees WHERE EmployeeID = @EmployeeID;
END;

EXEC GetEmployeeByID @EmployeeID = 101;`}
        </pre>
      </>
    ),
  },
  {
    question: "What is the difference between TRUNCATE and DELETE?",
    answer: (
      <>
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", width: "100%", marginTop: 10 }}
        >
          <thead>
            <tr>
              <th>Operation</th>
              <th>DELETE</th>
              <th>TRUNCATE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              <td>DML (Data Manipulation Language)</td>
              <td>DDL (Data Definition Language)</td>
            </tr>
            <tr>
              <td>Locks</td>
              <td>Row-level locks</td>
              <td>Page and table-level locks</td>
            </tr>
            <tr>
              <td>Can use WHERE</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Logging</td>
              <td>Logs individual row deletions</td>
              <td>Minimal logging</td>
            </tr>
            <tr>
              <td>Can be rolled back</td>
              <td>Yes (if inside a transaction)</td>
              <td>Yes (if inside a transaction)</td>
            </tr>
            <tr>
              <td>Identity reset</td>
              <td>No</td>
              <td>Yes (resets identity counter)</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    question: "What is normalization? Explain the different normal forms.",
    answer: (
      <>
        <p>
          Normalization is a database design technique to minimize data redundancy and improve data integrity.
        </p>
        <ul>
          <li><b>1NF (First Normal Form):</b> Eliminate duplicate columns; ensure atomicity.</li>
          <li><b>2NF (Second Normal Form):</b> Meet 1NF and remove partial dependencies on a composite primary key.</li>
          <li><b>3NF (Third Normal Form):</b> Meet 2NF and remove transitive dependencies.</li>
          <li><b>BCNF (Boyce-Codd Normal Form):</b> A stronger version of 3NF.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How to retrieve the current date and time in SQL Server?",
    answer: (
      <>
        <p>Use the GETDATE() function.</p>
        <pre style={{ backgroundColor: "#f4f4f4", padding: 10 }}>
          {`SELECT GETDATE() AS CurrentDateTime;`}
        </pre>
      </>
    ),
  },
  {
    question: "What is a transaction in SQL Server?",
    answer: (
      <>
        <p>
          A transaction is a sequence of one or more SQL statements executed as a single logical unit of work. It must be <i>atomic</i> — either all statements succeed or none.
        </p>
        <pre style={{ backgroundColor: "#f4f4f4", padding: 10 }}>
          {`BEGIN TRANSACTION;

UPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 1;
UPDATE Accounts SET Balance = Balance + 100 WHERE AccountID = 2;

COMMIT;`}
        </pre>
        <p>If something fails, you can use <b>ROLLBACK</b> to undo changes.</p>
      </>
    ),
  },
];

export default function SqlServerDb() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "30px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: 8,
      }}
    >
      <h1 style={{ textAlign: "center", color: "#0a5275" }}>
        SQL Server Interview Q&A
      </h1>
      {sqlServerFaq.map(({ question, answer }, i) => (
        <section
          key={i}
          style={{
            marginBottom: 30,
            borderBottom: "1px solid #ddd",
            paddingBottom: 20,
          }}
        >
          <h2 style={{ color: "#1a73e8", fontSize: "1.25rem" }}>{question}</h2>
          <div style={{ fontSize: 16, color: "#333", lineHeight: 1.6 }}>
            {answer}
          </div>
        </section>
      ))}
    </div>
  );
}
