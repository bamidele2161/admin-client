const reviews = [
  { name: "John Doe", rating: "⭐⭐⭐⭐", review: "Great quality product!" },
];

const CustomerReviews = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
      <ul>
        {reviews.map((r, index) => (
          <li key={index} className="p-2 border-b">
            <p className="font-semibold">
              {r.name} {r.rating}
            </p>
            <p>{r.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CustomerReviews;
