const ErrorIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-exclamation-circle"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="var(--clr-red)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M12 9v4"></path>
        <path d="M12 16v.01"></path>
      </svg>
    </>
  );
};

export default ErrorIcon;
