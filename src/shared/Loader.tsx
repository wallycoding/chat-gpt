interface LoaderProps {
  size: number;
}

const Loader = (props: LoaderProps) => {
  return (
    <div
      className="loader-ripple"
      style={{ height: props.size, width: props.size }}
    >
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
