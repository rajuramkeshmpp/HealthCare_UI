const MongoServerDb = () => {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#f4f4f4",
        color: "#333",
        padding: "20px",
        maxWidth: "960px",
        margin: "0 auto",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ color: "#0a5275" }}>MongoDB Interview Q&A</h1>
      <h3>1. What is MongoDB?</h3>
      <p>
        MongoDB is a NoSQL, document-oriented database that stores data in
        JSON-like BSON format. It's schema-less and designed for scalability and
        high performance.
      </p>

      <h3>2. What is a Document and a Collection?</h3>
      <ul>
        <li><strong>Document:</strong> A single record (like a row in RDBMS).</li>
        <li><strong>Collection:</strong> A group of documents (like a table).</li>
      </ul>

      <h3>3. Insert a Document</h3>
      <pre>{`db.users.insertOne({ name: "Anil", age: 30, email: "anil@example.com" });`}</pre>

      <h3>4. Find Documents</h3>
      <pre>{`db.users.find();\ndb.users.find({ age: 30 });`}</pre>

      <h3>5. MongoDB vs RDBMS</h3>
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Feature</th>
            <th>MongoDB</th>
            <th>RDBMS</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Data Format</td><td>BSON/JSON</td><td>Table/Row</td></tr>
          <tr><td>Schema</td><td>Flexible</td><td>Fixed</td></tr>
          <tr><td>Joins</td><td>Limited ($lookup)</td><td>Full joins</td></tr>
          <tr><td>Transactions</td><td>Supported (4.0+)</td><td>Fully supported</td></tr>
        </tbody>
      </table>

      <h2>🔹 Intermediate Questions</h2>
      <h3>6. Update and Delete</h3>
      <pre>{`db.users.updateOne({ name: "Anil" }, { $set: { age: 31 } });\ndb.users.deleteOne({ name: "Anil" });`}</pre>

      <h3>7. What are Indexes?</h3>
      <p>Indexes improve the speed of search queries.</p>
      <pre>{`db.users.createIndex({ name: 1 });`}</pre>

      <h3>8. Sorting and Limiting</h3>
      <pre>{`db.users.find().sort({ age: -1 }).limit(5);`}</pre>

      <h3>9. Aggregation</h3>
      <pre>{`db.users.aggregate([{ $group: { _id: "$age", count: { $sum: 1 } } }]);`}</pre>

      <h3>10. Schema</h3>
      <p>MongoDB is schema-less. You can enforce a schema using Mongoose.</p>

      <h2>🔹 Advanced Questions</h2>

      <h3>11. find() vs findOne()</h3>
      <ul>
        <li><strong>find():</strong> Returns a cursor to all matching documents.</li>
        <li><strong>findOne():</strong> Returns the first matched document.</li>
      </ul>

      <h3>12. Replication</h3>
      <p>MongoDB uses Replica Sets to ensure data redundancy and high availability.</p>

      <h3>13. Sharding</h3>
      <p>Sharding distributes data across servers for horizontal scaling.</p>

      <h3>14. $lookup Join</h3>
      <pre>{`db.orders.aggregate([{
  $lookup: {
    from: "customers",
    localField: "customerId",
    foreignField: "_id",
    as: "customerDetails"
  }
}]);`}</pre>

      <h3>15. Transactions</h3>
      <pre>{`const session = db.getMongo().startSession();
session.startTransaction();
try {
  db.users.insertOne({ name: "A" }, { session });
  db.orders.insertOne({ item: "Book" }, { session });
  session.commitTransaction();
} catch (e) {
  session.abortTransaction();
}`}</pre>

      <h2>🔹 Hot & Real-Time Usage</h2>

      <h3>16. Unique Index</h3>
      <pre>{`db.users.createIndex({ email: 1 }, { unique: true });`}</pre>

      <h3>17. ObjectId</h3>
      <p>ObjectId is a 12-byte unique identifier used as the default <code>_id</code> field.</p>

      <h3>18. Regex Search</h3>
      <pre>{`db.users.find({ name: { $regex: "^A" } });`}</pre>

      <h3>19. Update Many</h3>
      <pre>{`db.users.updateMany({}, { $set: { active: true } });`}</pre>

      <h3>20. Count Documents</h3>
      <pre>{`db.users.countDocuments({ age: { $gt: 25 } });`}</pre>
    </div>
  );
};

export default MongoServerDb