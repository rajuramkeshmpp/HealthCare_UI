const PostgreServerDb = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f4f4f4", padding: 20, maxWidth: 900, margin: "auto", color: "#333" }}>
      <h1 style={{ color: "#0a5275" }}>PostgreSQL Interview Q&A</h1>

      <h3>1. What is PostgreSQL?</h3>
      <p>PostgreSQL is an advanced, open-source, object-relational database system that supports both SQL (relational) and JSON (non-relational) querying.</p>

      <h3>2. Key Features</h3>
      <ul>
        <li>ACID compliance</li>
        <li>MVCC (Multiversion Concurrency Control)</li>
        <li>Support for JSON and XML</li>
        <li>Full-text search</li>
        <li>Table inheritance</li>
        <li>Extensibility</li>
      </ul>

      <h3>3. Create Database and Table</h3>
      <pre>{`
CREATE DATABASE mydb;

\\c mydb

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  salary NUMERIC(10, 2),
  hire_date DATE
);`}</pre>

      <h3>4. CHAR vs VARCHAR vs TEXT</h3>
      <ul>
        <li>CHAR(n): Fixed-length, space-padded.</li>
        <li>VARCHAR(n): Variable-length with limit.</li>
        <li>TEXT: Variable-length, no limit.</li>
      </ul>

      <h3>5. Insert and Select Data</h3>
      <pre>{`
INSERT INTO employees (name, salary, hire_date)
VALUES ('Anil', 50000.00, '2023-01-01');

SELECT * FROM employees;`}</pre>

      <h2>🔹 Intermediate Questions</h2>

      <h3>6. What is SERIAL?</h3>
      <p>Auto-increment integer used for primary keys.</p>

      <h3>7. Update and Delete</h3>
      <pre>{`
UPDATE employees SET salary = 60000 WHERE id = 1;
DELETE FROM employees WHERE id = 2;`}</pre>

      <h3>8. Use of JOIN</h3>
      <pre>{`
SELECT e.name, d.name AS dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id;`}</pre>

      <h3>9. Creating Index</h3>
      <pre>CREATE INDEX idx_name ON employees(name);</pre>

      <h3>10. CTE Example</h3>
      <pre>{`
WITH high_salary AS (
  SELECT * FROM employees WHERE salary > 70000
)
SELECT * FROM high_salary;`}</pre>

      <h2>🔹 Advanced Questions</h2>

      <h3>11. Explain MVCC</h3>
      <p>MVCC allows concurrent access by maintaining snapshot versions of data, avoiding locking issues.</p>

      <h3>12. WHERE vs HAVING</h3>
      <ul>
        <li>WHERE: Filters before grouping</li>
        <li>HAVING: Filters after grouping</li>
      </ul>

      <h3>13. Using JSON</h3>
      <pre>{`
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  data JSONB
);

INSERT INTO users (data) VALUES ('{"name": "Anil", "age": 30}');

SELECT data->>'name' FROM users;`}</pre>

      <h3>14. Stored Function</h3>
      <pre>{`
CREATE FUNCTION get_salary(emp_id INT) RETURNS NUMERIC AS $$
BEGIN
  RETURN (SELECT salary FROM employees WHERE id = emp_id);
END;
$$ LANGUAGE plpgsql;`}</pre>

      <h3>15. What is VACUUM?</h3>
      <p>Reclaims storage and updates stats. Avoids bloat.</p>
      <pre>VACUUM ANALYZE;</pre>

      <h2>🔹 Hot & Real-Time</h2>

      <h3>16. UPSERT (Insert or Update)</h3>
      <pre>{`
INSERT INTO employees(id, name, salary)
VALUES (1, 'Anil', 75000)
ON CONFLICT (id) DO UPDATE
SET salary = EXCLUDED.salary;`}</pre>

      <h3>17. Backup and Restore</h3>
      <pre>{`
pg_dump mydb > mydb_backup.sql
psql mydb < mydb_backup.sql`}</pre>

      <h3>18. Create User and Grant</h3>
      <pre>{`
CREATE USER anil WITH PASSWORD 'pass123';
GRANT SELECT, INSERT ON employees TO anil;`}</pre>

      <h3>19. List Databases and Tables</h3>
      <pre>{`
\\l    -- List databases
\\dt   -- List tables`}</pre>

      <h3>20. Pagination</h3>
      <pre>{`
SELECT * FROM employees
ORDER BY id
LIMIT 10 OFFSET 20;`}</pre>
    </div>
  );
};

export default PostgreServerDb