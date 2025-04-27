const AddToCartButton = ({ productId }) => {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 4000);
  };

  return (
    <button
      onClick={handleClick}
      className={`mt-4 w-full py-2 rounded-full text-white font-medium text-sm transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
        added ? "bg-green-600" : "bg-bluee hover:bg-blue-700"
      }`}
      disabled={added}
    >
      {added ? (
        <>
          <FaCheckCircle />
          Added
        </>
      ) : (
        <>
          <FaShoppingCart />
          Add to Cart
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
