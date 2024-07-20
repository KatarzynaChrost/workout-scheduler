interface ILabeledInput {
  children: React.ReactNode;
  label: string;
}

const LabeledInput = ({ label, children }: ILabeledInput) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-base my-1">{label}</label>
      {children}
    </div>
  );
};

export default LabeledInput;
