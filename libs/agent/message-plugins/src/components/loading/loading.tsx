export const Loading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex items-center gap-spacing-md-v2">
      <div className="loader"></div>
      {text}
    </div>
  );
};
