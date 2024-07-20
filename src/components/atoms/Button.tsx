import clsx from "clsx";

interface IButton {
  name: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ name, disabled = false, onClick }: IButton) => {
  return (
    <button
      className={clsx(
        "rounded-md text-white py-4 px-8 font-medium text-lg my-2 w-full bg-accent",
        {
          "bg-accent-muted cursor-not-allowed": disabled,
          "hover:bg-accent-dark": !disabled,
        }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
